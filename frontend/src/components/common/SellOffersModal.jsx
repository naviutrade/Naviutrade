import React, { useEffect, useState } from 'react';
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
  Divider,
} from '@chakra-ui/react';
import Money from './Money';

const SellOffersModal = ({ isOpen, onClose, onAcceptOffer, currentPrice, productName, stockCount }) => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedOffer({ price: currentPrice || 0 });
    }
  }, [isOpen, currentPrice]);

  const handleConfirmSell = () => {
    if (selectedOffer) {
      onAcceptOffer(selectedOffer.price, stockCount);
      onClose();
    }
  };

  const total = (selectedOffer?.price || 0) * (stockCount || 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'sm', md: 'md' }}>
      <ModalOverlay />
      <ModalContent className="rv-cut-lg" mx={4} maxW={{ base: '95%', md: '500px' }}>
        <ModalHeader borderBottom="1px solid" borderColor="var(--hairline)">
          <Text fontFamily="var(--f-display)" fontWeight={600} fontSize="20px">
            Sell now
          </Text>
        </ModalHeader>
        <ModalBody py={6}>
          <VStack spacing={4}>
            <Text fontSize="13.5px" color="var(--text-3)">
              Review the sale before it is booked
            </Text>
            <Box bg="var(--panel)" border="1px solid" borderColor="var(--border)" p={4} borderRadius="var(--r-structure)" w="full">
              <VStack spacing={3} w="full">
                <HStack justify="space-between" w="full">
                  <Text fontSize="13.5px" color="var(--text-3)">Product</Text>
                  <Text fontSize="13.5px" fontWeight={600}>{productName}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="13.5px" color="var(--text-3)">Quantity</Text>
                  <Text fontFamily="var(--f-num)" fontSize="13.5px">{stockCount} units</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="13.5px" color="var(--text-3)">Price per unit</Text>
                  <Money value={selectedOffer?.price} />
                </HStack>
                <Divider borderColor="var(--hairline)" />
                <HStack justify="space-between" w="full">
                  <Text fontSize="14px" fontWeight={600}>Total</Text>
                  <Money value={total} style={{ fontSize: '20px', fontWeight: 700 }} />
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3} w="full">
            <Button variant="rvQuiet" onClick={onClose} flex="1">Cancel</Button>
            <Button variant="rvAccent" onClick={handleConfirmSell} flex="1">Sell now</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SellOffersModal;
