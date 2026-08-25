import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  FormControl,
  Input,
  VStack,
  Text,
  Link,
  HStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useAuth } from '../../AppContext';
import AuthShell, { AuthLabel, authInputSx, authBtnH } from '../../components/layout/AuthShell';
import Alert from '../../components/common/Alert';
import { showToast } from '../../components/common/toast';

const LoginPage = ({ url }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();

  const emailFromUrl = searchParams.get('email');
  const setPasswordFromUrl = searchParams.get('setPassword') === 'true';

  const [step, setStep] = useState(setPasswordFromUrl ? 'setPassword' : 'email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [identifier, setIdentifier] = useState(emailFromUrl || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordInputRef = useRef(null);
  const setPasswordInputRef = useRef(null);

  useEffect(() => {
    if (step === 'password' && passwordInputRef.current) {
      setTimeout(() => passwordInputRef.current.focus(), 0);
    }
    if (step === 'setPassword' && setPasswordInputRef.current) {
      setTimeout(() => setPasswordInputRef.current.focus(), 0);
    }
  }, [step]);

  document.title = 'Rouvin | Login';

  const navigateToDashboard = (userRole) => {
    switch (userRole) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'vendor':
        navigate('/vendor/dashboard');
        break;
      case 'employee':
        navigate('/employee/dashboard');
        break;
      case 'coordinator':
        navigate('/coordinator/dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${url}/api/auth/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Unexpected error.');

      switch (data.status) {
        case 'approved':
          setStep('password');
          break;
        case 'pending':
          setStep('pending');
          break;
        case 'setPassword':
          setStep('setPassword');
          break;
        case 'notFound':
          setError(data.message || 'No account found.');
          break;
        default:
          throw new Error('Unexpected status from server.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        throw new Error(data.message || 'Invalid credentials');
      }

      login(data.token, data.user);
      navigateToDashboard(data.user.role);
    } catch (err) {
      showToast(toast, {
        title: 'Login failed',
        description: err.message,
        status: 'error',
      });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const msg = 'Passwords do not match.';
      setError(msg);
      showToast(toast, { title: 'Error', description: msg, status: 'error' });
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${url}/api/auth/set-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        throw new Error(data.message || 'Could not set password.');
      }

      login(data.token, data.user);
      navigateToDashboard(data.user.role);
    } catch (err) {
      showToast(toast, { title: 'Error', description: err.message, status: 'error' });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setError('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setStep('email');
  };

  const heading =
    step === 'setPassword' ? 'Set your password' :
    step === 'pending' ? 'Waiting for approval' :
    step === 'password' ? 'Welcome back' :
    'Log in';

  const sub =
    step === 'setPassword' ? 'Your account is approved. Choose a password to continue.' :
    step === 'pending' ? 'An administrator still needs to approve this account.' :
    step === 'password' ? 'Enter your password to continue.' :
    'Use the email or phone number on your account.';

  return (
    <AuthShell maxW="420px">
      <Text
        as="h1"
        fontFamily="var(--f-display)"
        fontWeight={700}
        fontSize="28px"
        letterSpacing="-0.02em"
        color="var(--text)"
        m={0}
        textAlign="center"
      >
        {heading}
      </Text>
      <Text fontSize="14px" color="var(--text-3)" mt={1} mb={7} textAlign="center">
        {sub}
      </Text>

      <VStack spacing={5} align="stretch">
        <FormControl isRequired isReadOnly={step !== 'email'}>
          <AuthLabel>Email or phone</AuthLabel>
          <HStack align="stretch" spacing={2}>
            <Input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="name@email.com or 10-digit phone"
              autoFocus
              isDisabled={step !== 'email'}
              sx={authInputSx}
            />
            {step !== 'email' && (
              <Button variant="rvQuiet" onClick={handleGoBack} size="sm" h={authBtnH} flexShrink={0}>
                Change
              </Button>
            )}
          </HStack>
        </FormControl>

        {step === 'pending' && (
          <Alert tone="warn" title="Account approval pending">
            Check back later, or contact support if this has been waiting more than a day.
          </Alert>
        )}

        {step === 'setPassword' && (
          <VStack as="form" onSubmit={handleSetPassword} spacing={4} align="stretch">
            <Alert tone="note">Account approved. Set a password to log in.</Alert>
            <FormControl isRequired>
              <AuthLabel>New password</AuthLabel>
              <InputGroup>
                <Input
                  ref={setPasswordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={authInputSx}
                />
                <InputRightElement h="100%">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                    variant="rvGhost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <AuthLabel>Confirm password</AuthLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={authInputSx}
                />
                <InputRightElement h="100%">
                  <IconButton
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    icon={showConfirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                    variant="rvGhost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {error && <Text color="var(--bad)" fontSize="13.5px">{error}</Text>}
            <Button type="submit" variant="rvSolid" isLoading={isLoading} width="full" h={authBtnH}>
              Set password and log in
            </Button>
          </VStack>
        )}

        {step === 'password' && (
          <VStack as="form" onSubmit={handleLogin} spacing={4} align="stretch">
            <FormControl isRequired>
              <AuthLabel>Password</AuthLabel>
              <InputGroup>
                <Input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={authInputSx}
                />
                <InputRightElement h="100%">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                    variant="rvGhost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <HStack justify="flex-end" w="full">
              <Link
                as={RouterLink}
                to={`/forgot-password?identifier=${encodeURIComponent(identifier)}`}
                color="var(--accent-text)"
                fontSize="13.5px"
                fontWeight={600}
              >
                Forgot password
              </Link>
            </HStack>
            {error && <Text color="var(--bad)" fontSize="13.5px">{error}</Text>}
            <Button type="submit" variant="rvSolid" isLoading={isLoading} width="full" h={authBtnH}>
              Log in
            </Button>
          </VStack>
        )}

        {step === 'email' && (
          <VStack as="form" onSubmit={handleEmailCheck} spacing={4} align="stretch">
            {error && <Text color="var(--bad)" fontSize="13.5px">{error}</Text>}
            <Button
              type="submit"
              variant="rvSolid"
              isLoading={isLoading}
              isDisabled={!identifier.trim()}
              width="full"
              h={authBtnH}
            >
              Continue
            </Button>
          </VStack>
        )}

        {step !== 'setPassword' && (
          <Text fontSize="14px" color="var(--text-3)" textAlign="center" pt={2}>
            New vendor?{' '}
            <Link as={RouterLink} to="/register" color="var(--accent-text)" fontWeight={600}>
              Create an account
            </Link>
          </Text>
        )}
      </VStack>
    </AuthShell>
  );
};

export default LoginPage;
