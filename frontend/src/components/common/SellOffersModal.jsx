import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Badge,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider
} from '@chakra-ui/react';

const SellOffersModal = ({ isOpen, onClose, onAcceptOffer, currentPrice, productName, stockCount }) => {
  const [step, setStep] = useState(2); // 1: Company selection, 2: Confirmation
  const [selectedOffer, setSelectedOffer] = useState(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  useEffect(() => {
    if (isOpen) {
      setStep(2);
      const offer = { 
        price: currentPrice || 0 
      };
      setSelectedOffer(offer);
    }
  }, [isOpen, currentPrice]);

  const generateOffers = () => {
    // No longer needed
  };

  const handleOfferSelection = (offer) => {
    setSelectedOffer(offer);
    setStep(2);
  };

  const handleConfirmSell = () => {
    if (selectedOffer) {
      onAcceptOffer(selectedOffer.price, stockCount);
      onClose();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const renderStepContent = () => {
    return (
      <VStack spacing={4}>
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold" color={textColor} mb={1}>
            Confirm Sale
          </Text>
          <Text fontSize="sm" color="gray.500">
            Review your transaction details
          </Text>
        </Box>
        
        <Box
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          p={4}
          borderRadius="md"
          w="full"
        >
          <VStack spacing={3} w="full">
            <Text fontWeight="bold" color="gray.800" fontSize="md" mb={2}>
              Sale Summary
            </Text>
            
            <HStack justify="space-between" w="full" flexWrap="wrap">
              <Text fontSize="sm" color="gray.600">Product:</Text>
              <Text fontSize="sm" fontWeight="bold" color="gray.800" textAlign="right" flex="1">{productName}</Text>
            </HStack>
            
            <HStack justify="space-between" w="full" flexWrap="wrap">
              <Text fontSize="sm" color="gray.600">Quantity:</Text>
              <Text fontSize="sm" fontWeight="bold" color="gray.800" textAlign="right" flex="1">{stockCount} units</Text>
            </HStack>
            
            <HStack justify="space-between" w="full" flexWrap="wrap">
              <Text fontSize="sm" color="gray.600">Price per unit:</Text>
              <Text fontSize="sm" fontWeight="bold" color="green.600" textAlign="right" flex="1">₹{selectedOffer?.price}</Text>
            </HStack>
            
            <Divider />
            
            <HStack justify="space-between" w="full" p={3} bg="green.50" borderRadius="md" flexWrap="wrap">
              <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold" color="green.700">Total Amount:</Text>
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="green.600" textAlign="right" flex="1">
                ₹{(selectedOffer?.price * stockCount).toFixed(2)}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: "sm", md: "md" }}>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent 
        bg={bgColor} 
        borderRadius="md" 
        mx={4}
        maxW={{ base: "95%", md: "500px" }}
      >
        <ModalHeader textAlign="center" borderBottom="1px solid" borderColor={borderColor}>
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Confirm Sale
            </Text>
          </VStack>
        </ModalHeader>
        
        <ModalBody py={6}>
          {renderStepContent()}
        </ModalBody>
        
        <ModalFooter>
          <HStack spacing={3} w="full">
            <Button
              colorScheme="green"
              onClick={handleConfirmSell}
              flex="1"
            >
              Confirm Sell
            </Button>
            <Button
              colorScheme="gray"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SellOffersModal;
