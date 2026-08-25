import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Button, FormControl, Input, VStack, SimpleGrid,
  FormHelperText, FormErrorMessage, Textarea, Text, Link, useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import AuthShell, { AuthLabel, authInputSx, authControlSx, authBtnH } from '../../components/layout/AuthShell';
import { showToast } from '../../components/common/toast';

const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);
const validateAadharNumber = (aadhar) => /^\d{12}$/.test(aadhar);
const validatePanCardNumber = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

const Section = ({ title, children }) => (
  <Box>
    <Text
      fontFamily="var(--f-display)"
      fontWeight={600}
      fontSize="12px"
      letterSpacing="0.08em"
      textTransform="uppercase"
      color="var(--text-3)"
      mb={3}
    >
      {title}
    </Text>
    <VStack spacing={4} align="stretch">
      {children}
    </VStack>
  </Box>
);

const RegistrationPage = ({ url }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [searchParams] = useSearchParams();

  const initialFormData = {
    vendorName: '', phoneNumber: '', email: '', panCardNumber: '', aadharNumber: '',
    referralId: '', bankName: '', accountNumber: '', ifscCode: '', address: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  document.title = 'Rouvin | Registration';

  useEffect(() => {
    const referralCode = searchParams.get('ref');
    if (referralCode) {
      setFormData((prevData) => ({ ...prevData, referralId: referralCode }));
    }
    sessionStorage.removeItem('registrationData');
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const finalValue = id === 'panCardNumber' ? value.toUpperCase() : value;
    setFormData({ ...formData, [id]: finalValue });

    let error = '';
    if (id === 'phoneNumber' && finalValue && !validatePhoneNumber(finalValue)) {
      error = 'Phone number must be exactly 10 digits.';
    } else if (id === 'aadharNumber' && finalValue && !validateAadharNumber(finalValue)) {
      error = 'Aadhar number must be exactly 12 digits.';
    } else if (id === 'panCardNumber' && finalValue && !validatePanCardNumber(finalValue)) {
      error = 'Invalid PAN card format.';
    }
    setFormErrors({ ...formErrors, [id]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!validatePhoneNumber(formData.phoneNumber)) errors.phoneNumber = 'Phone number must be exactly 10 digits.';
    if (formData.aadharNumber && !validateAadharNumber(formData.aadharNumber)) errors.aadharNumber = 'Aadhar number must be exactly 12 digits.';
    if (!validatePanCardNumber(formData.panCardNumber)) errors.panCardNumber = 'Invalid PAN card format.';

    if (Object.values(errors).some((error) => error)) {
      setFormErrors((prev) => ({ ...prev, ...errors }));
      showToast(toast, {
        title: 'Check the form',
        description: 'Correct the highlighted fields before submitting.',
        status: 'error',
      });
      return;
    }

    setIsLoading(true);
    const uploadData = new FormData();
    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }
    if (passportPhoto) {
      uploadData.append('passportPhoto', passportPhoto);
    }

    try {
      const response = await fetch(`${url}/api/auth/register`, {
        method: 'POST',
        body: uploadData,
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(data.message || 'An account with this email already exists.');
        }
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      const requiresPayment = data && typeof data.requiresPayment === 'boolean' ? data.requiresPayment : true;

      const trimmedEmail = (formData.email || '').trim();
      const trimmedVendorName = (formData.vendorName || '').trim();
      const trimmedPhoneNumber = (formData.phoneNumber || '').trim();

      if (!trimmedEmail || !trimmedVendorName || !trimmedPhoneNumber) {
        showToast(toast, {
          title: 'Data error',
          description: 'Some required fields are missing. Please fill all required fields.',
          status: 'error',
        });
        return;
      }

      sessionStorage.setItem('registrationData', JSON.stringify({
        email: trimmedEmail,
        vendorName: trimmedVendorName,
        phoneNumber: trimmedPhoneNumber,
      }));

      showToast(toast, {
        title: 'Details saved',
        description: requiresPayment
          ? 'Redirecting to payment.'
          : 'Submitted. Your account is pending administrator approval.',
        status: 'success',
      });

      if (requiresPayment) {
        navigate('/payment');
      } else {
        navigate(`/login?email=${encodeURIComponent(trimmedEmail)}`);
      }
    } catch (err) {
      showToast(toast, { title: 'Submission error', description: err.message, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const requiredFields = { ...formData };
  delete requiredFields.referralId;
  delete requiredFields.aadharNumber;
  const isFormValid =
    !Object.values(requiredFields).some((val) => val === '') &&
    !Object.values(formErrors).some((err) => err !== '');

  const isReferralFromLink = !!searchParams.get('ref');

  return (
    <AuthShell maxW="540px">
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
        Vendor registration
      </Text>
      <Text fontSize="14px" color="var(--text-3)" mt={1} mb={7} textAlign="center">
        Identity, bank and address. Required fields are marked.
      </Text>

      <VStack spacing={8} as="form" onSubmit={handleSubmit} align="stretch">
        <Section title="Identity">
          <FormControl isRequired>
            <AuthLabel>Vendor name</AuthLabel>
            <Input id="vendorName" value={formData.vendorName} onChange={handleInputChange} sx={authInputSx} />
          </FormControl>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.phoneNumber}>
              <AuthLabel>Phone</AuthLabel>
              <Input id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} maxLength="10" sx={authInputSx} />
              <FormErrorMessage color="var(--bad)">{formErrors.phoneNumber}</FormErrorMessage>
              {!formErrors.phoneNumber && <FormHelperText color="var(--text-3)">10 digits</FormHelperText>}
            </FormControl>

            <FormControl isRequired isInvalid={!!formErrors.email}>
              <AuthLabel>Email</AuthLabel>
              <Input id="email" type="email" value={formData.email} onChange={handleInputChange} sx={authInputSx} />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired isInvalid={!!formErrors.panCardNumber}>
              <AuthLabel>PAN</AuthLabel>
              <Input id="panCardNumber" value={formData.panCardNumber} onChange={handleInputChange} maxLength="10" sx={authInputSx} />
              <FormErrorMessage color="var(--bad)">{formErrors.panCardNumber}</FormErrorMessage>
              {!formErrors.panCardNumber && <FormHelperText color="var(--text-3)">ABCDE1234F</FormHelperText>}
            </FormControl>

            <FormControl isInvalid={!!formErrors.aadharNumber}>
              <AuthLabel>Aadhaar (optional)</AuthLabel>
              <Input id="aadharNumber" value={formData.aadharNumber} onChange={handleInputChange} maxLength="12" sx={authInputSx} />
              <FormErrorMessage color="var(--bad)">{formErrors.aadharNumber}</FormErrorMessage>
              {!formErrors.aadharNumber && <FormHelperText color="var(--text-3)">12 digits, no spaces</FormHelperText>}
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <AuthLabel>Referral ID</AuthLabel>
            <Input
              id="referralId"
              value={formData.referralId}
              onChange={handleInputChange}
              placeholder="v_001"
              isReadOnly={isReferralFromLink}
              sx={authInputSx}
            />
          </FormControl>

          <FormControl>
            <AuthLabel>Passport photo (optional)</AuthLabel>
            <Input
              ref={fileInputRef}
              id="passportPhoto"
              type="file"
              h={authBtnH}
              pt="7px"
              accept="image/*"
              onChange={(e) => setPassportPhoto(e.target.files[0])}
              sx={authControlSx}
            />
            <FormHelperText color="var(--text-3)">
              {passportPhoto ? passportPhoto.name : 'Clear passport-size photo'}
            </FormHelperText>
          </FormControl>
        </Section>

        <Section title="Bank">
          <FormControl isRequired>
            <AuthLabel>Bank name</AuthLabel>
            <Input id="bankName" value={formData.bankName} onChange={handleInputChange} sx={authInputSx} />
          </FormControl>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired>
              <AuthLabel>Account number</AuthLabel>
              <Input id="accountNumber" value={formData.accountNumber} onChange={handleInputChange} sx={authInputSx} />
            </FormControl>
            <FormControl isRequired>
              <AuthLabel>IFSC</AuthLabel>
              <Input id="ifscCode" value={formData.ifscCode} onChange={handleInputChange} sx={authInputSx} />
            </FormControl>
          </SimpleGrid>
        </Section>

        <Section title="Address">
          <FormControl isRequired>
            <AuthLabel>Full address</AuthLabel>
            <Textarea
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              minH="96px"
              sx={authControlSx}
            />
          </FormControl>
        </Section>

        <Button
          type="submit"
          variant="rvSolid"
          w="full"
          h={authBtnH}
          isLoading={isLoading}
          isDisabled={!isFormValid}
        >
          Submit and proceed
        </Button>

        <Text fontSize="14px" color="var(--text-3)" textAlign="center">
          Already registered?{' '}
          <Link as={RouterLink} to="/login" color="var(--accent-text)" fontWeight={600}>
            Log in
          </Link>
        </Text>
      </VStack>
    </AuthShell>
  );
};

export default RegistrationPage;
