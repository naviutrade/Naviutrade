import React, { useState, useEffect } from 'react';
import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AuthShell, { authBtnH } from '../../components/layout/AuthShell';
import Alert from '../../components/common/Alert';
import Money from '../../components/common/Money';

const PaymentPage = ({ url }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(true);
  const [registrationFee, setRegistrationFee] = useState(4999); // Default value


  // #helo

  useEffect(() => {
    const registrationDataString = sessionStorage.getItem('registrationData');
    if (!registrationDataString) {
      toast({
        title: 'Error',
        description: 'No registration data found. Please start the registration process again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/register');
      return;
    }
    
    try {
      const registrationData = JSON.parse(registrationDataString);
      console.log('🔍 PaymentPage - Registration data loaded:', registrationData);
      
      // Trim and set data with defensive checks
      const emailValue = (registrationData.email || '').trim();
      const vendorNameValue = (registrationData.vendorName || '').trim();
      const phoneNumberValue = (registrationData.phoneNumber || '').trim();
      
      console.log('🔍 PaymentPage - Trimmed values:', { emailValue, vendorNameValue, phoneNumberValue });
      
      if (!emailValue || !vendorNameValue || !phoneNumberValue) {
        const missingFields = [];
        if (!emailValue) missingFields.push('Email');
        if (!vendorNameValue) missingFields.push('Vendor Name');
        if (!phoneNumberValue) missingFields.push('Phone Number');
        
        toast({
          title: 'Registration Data Error',
          description: `Missing required data: ${missingFields.join(', ')}. Please complete registration again.`,
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
        navigate('/register');
        return;
      }

      // #hello
      
      setEmail(emailValue);
      setVendorName(vendorNameValue);
      setPhoneNumber(phoneNumberValue);
    } catch (parseError) {
      console.error('❌ Error parsing registration data:', parseError);
      toast({
        title: 'Data Error',
        description: 'Failed to load registration data. Please start the registration process again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/register');
    }

    // Fetch registration fee from API
    const fetchRegistrationFee = async () => {
      try {
        const response = await fetch(`${url}/api/payment/easebuzz/config`);
        if (response.ok) {
          const data = await response.json();
          if (data.registrationFee) {
            setRegistrationFee(data.registrationFee);
          }
        }
      } catch (error) {
        console.error('Failed to fetch registration fee:', error);
        // Keep default value
      }
    };

    fetchRegistrationFee();
  }, [navigate, toast, url]);

  const handlePaymentGateway = async () => {
    // Validate parameters before sending request
    const trimmedEmail = email ? email.trim() : '';
    const trimmedPhoneNumber = phoneNumber ? phoneNumber.trim() : '';
    const trimmedName = vendorName ? vendorName.trim() : '';
    
    console.log('🔍 PaymentPage - Payment initiation with data:', {
      email: trimmedEmail,
      phoneNumber: trimmedPhoneNumber,
      name: trimmedName,
      registrationFee,
      emailLength: trimmedEmail.length,
      phoneLength: trimmedPhoneNumber.length,
      nameLength: trimmedName.length
    });
    
    // Check for missing required fields with specific error messages
    const missingFields = [];
    if (!trimmedEmail) missingFields.push('Email');
    if (!trimmedPhoneNumber) missingFields.push('Phone Number');
    if (!trimmedName) missingFields.push('Vendor Name');
    if (!registrationFee || registrationFee <= 0) missingFields.push('Registration Fee');
    
    if (missingFields.length > 0) {
      console.error('❌ PaymentPage - Missing fields:', missingFields);
      toast({
        title: 'Validation Error',
        description: `Missing required fields: ${missingFields.join(', ')}. Current values - Email: "${trimmedEmail}", Phone: "${trimmedPhoneNumber}", Name: "${trimmedName}", Fee: ${registrationFee}. Please go back and complete registration again.`,
        status: 'error',
        duration: 8000,
        isClosable: true
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: 'Validation Error',
        description: 'Invalid email format. Please enter a valid email address.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }
    
    // Validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(trimmedPhoneNumber)) {
      toast({
        title: 'Validation Error',
        description: 'Invalid phone number format. Please enter a valid 10-digit phone number.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }
    
    // Validate name (minimum length)
    if (trimmedName.length < 2) {
      toast({
        title: 'Validation Error',
        description: 'Name must be at least 2 characters long.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }
    
    // Validate amount
    const amountNum = parseFloat(registrationFee);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Invalid registration fee amount.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }
    
    setIsLoading(true);
    setShowPaymentButton(false);

    try {
      const response = await fetch(`${url}/api/payment/easebuzz/registration/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amountNum,
          email: trimmedEmail,
          phoneNumber: trimmedPhoneNumber,
          name: trimmedName
        })
      });

      const data = await response.json();

      console.log('🔍 PaymentPage - API Response:', JSON.stringify({
        status: data.status,
        hasPaymentUrl: !!(data.data && data.data.payment_url),
        responseData: data
      }, null, 2));

      if (!response.ok) {
        const errorDetails = {
          status: response.status,
          statusText: response.statusText,
          data: data,
          dataString: JSON.stringify(data, null, 2)
        };
        console.error('❌ PaymentPage - API Error Response:', JSON.stringify(errorDetails, null, 2));
        const errorMessage = data.message || data.error || `Failed to initiate payment (Status: ${response.status})`;
        throw new Error(errorMessage);
      }

      if (data.status === 1 && data.data && data.data.payment_url) {
        console.log('✅ PaymentPage - Redirecting to payment gateway:', data.data.payment_url);
        // Redirect to payment gateway
        window.location.href = data.data.payment_url;
      } else {
        console.error('❌ PaymentPage - Invalid response structure:', data);
        throw new Error(data.message || 'Failed to get payment URL from gateway response');
      }

    } catch (err) {
      console.error('❌ PaymentPage - Payment initiation error:', {
        error: err,
        message: err.message,
        stack: err.stack,
        currentData: {
          email: trimmedEmail,
          phoneNumber: trimmedPhoneNumber,
          name: trimmedName,
          amount: amountNum
        }
      });
      toast({
        title: 'Payment Failed',
        description: err.message || 'Failed to initiate payment gateway. Please check your registration data and try again.',
        status: 'error',
        duration: 7000,
        isClosable: true
      });
      setIsLoading(false);
      setShowPaymentButton(true);
    }
  };

  const totalAmount = registrationFee;

  if (!sessionStorage.getItem('registrationData')) return null;

  return (
    <AuthShell maxW="440px">
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
        Registration payment
      </Text>
      <Text fontSize="14px" color="var(--text-3)" mt={1} mb={7} textAlign="center">
        One-time fee. You will be sent to the payment gateway to finish.
      </Text>

      <VStack spacing={5} align="stretch">
        <Box
          className="rv-cut"
          bg="var(--panel)"
          border="1px solid"
          borderColor="var(--border)"
          borderRadius="var(--r-structure)"
          px={4}
          py={3}
        >
          <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">
            Amount due
          </Text>
          <Money value={totalAmount} style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)' }} />
        </Box>

        {(email || vendorName || phoneNumber) && (
          <Box
            bg="var(--panel)"
            border="1px solid"
            borderColor="var(--border)"
            borderRadius="var(--r-structure)"
            p={4}
          >
            <Text fontSize="12px" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="var(--text-3)" mb={2}>
              Registration details
            </Text>
            <VStack align="stretch" spacing={1} fontSize="14px" color="var(--text-2)">
              {vendorName && <Text>{vendorName}</Text>}
              {email && <Text>{email}</Text>}
              {phoneNumber && <Text fontFamily="var(--f-num)">{phoneNumber}</Text>}
            </VStack>
          </Box>
        )}

        <Alert tone="note">
          You will leave Rouvin briefly to pay, then return here.
        </Alert>

        {showPaymentButton && (
          <Button
            variant="rvAccent"
            w="full"
            h={authBtnH}
            onClick={handlePaymentGateway}
            isLoading={isLoading}
            loadingText="Opening gateway"
          >
            Pay now
          </Button>
        )}

        {!showPaymentButton && (
          <Text color="var(--text-3)" textAlign="center">
            Redirecting to the payment gateway…
          </Text>
        )}
      </VStack>
    </AuthShell>
  );
};

export default PaymentPage;