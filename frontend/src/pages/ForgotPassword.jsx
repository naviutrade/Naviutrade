import React, { useState, useEffect } from 'react';
import {
  Button, FormControl, Input, VStack, Text, Link, useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router-dom';
import AuthShell, { AuthLabel, authInputSx, authBtnH } from '../components/layout/AuthShell';
import Alert from '../components/common/Alert';
import { showToast } from '../components/common/toast';

const ForgotPassword = ({ url }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const prefilledEmail = searchParams.get('email') || searchParams.get('identifier') || '';
  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('email');

  document.title = 'Rouvin | Forgot Password';

  useEffect(() => {
    setEmail(prefilledEmail);
  }, [prefilledEmail]);

  const handleSendOTP = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${url}/api/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server error. Please contact admin.');
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("This email doesn't exist in our system. Please contact admin.");
        }
        throw new Error(data.message || 'Failed to send OTP');
      }

      showToast(toast, {
        title: 'OTP sent',
        description: 'Check your email for the code.',
        status: 'success',
      });
      setStep('otp');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${url}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');

      setOtpVerified(true);
      showToast(toast, {
        title: 'OTP verified',
        description: 'You can now set a new password.',
        status: 'success',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${url}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Reset failed');

      showToast(toast, {
        title: 'Password reset',
        description: 'Your password has been updated.',
        status: 'success',
      });

      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        Forgot password
      </Text>
      <Text fontSize="14px" color="var(--text-3)" mt={1} mb={7} textAlign="center">
        {step === 'email' ? 'We will send a one-time code to this email.' : 'Enter the code, then choose a new password.'}
      </Text>

      <VStack spacing={4} align="stretch">
        {error && <Alert tone="bad">{error}</Alert>}

        {step === 'email' && (
          <>
            <FormControl isRequired>
              <AuthLabel>Email</AuthLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                sx={authInputSx}
              />
            </FormControl>
            <Button variant="rvSolid" width="full" h={authBtnH} onClick={handleSendOTP} isLoading={isLoading}>
              Send OTP
            </Button>
          </>
        )}

        {step === 'otp' && (
          <>
            <FormControl isRequired>
              <AuthLabel>OTP</AuthLabel>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Code from your email"
                sx={authInputSx}
              />
            </FormControl>
            <Button variant="rvSolid" width="full" h={authBtnH} onClick={handleVerifyOTP} isLoading={isLoading}>
              Verify OTP
            </Button>

            {otpVerified && (
              <>
                <FormControl isRequired>
                  <AuthLabel>New password</AuthLabel>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={authInputSx}
                  />
                </FormControl>
                <FormControl isRequired>
                  <AuthLabel>Confirm password</AuthLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={authInputSx}
                  />
                </FormControl>
                <Button variant="rvAccent" width="full" h={authBtnH} onClick={handleResetPassword} isLoading={isLoading}>
                  Reset password
                </Button>
              </>
            )}
          </>
        )}

        <Text fontSize="14px" color="var(--text-3)" textAlign="center" pt={2}>
          <Link as={RouterLink} to="/login" color="var(--accent-text)" fontWeight={600}>
            Back to log in
          </Link>
        </Text>
      </VStack>
    </AuthShell>
  );
};

export default ForgotPassword;
