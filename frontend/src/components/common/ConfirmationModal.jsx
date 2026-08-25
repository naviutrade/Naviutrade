import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';
import { Warning } from '@phosphor-icons/react';
import Alert from './Alert';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'rvDanger',
  isLoading = false,
  loadingText = 'Working',
  alertType = 'warning',
}) => {
  const handleClose = () => {
    if (!isLoading) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader pb={2}>
          <VStack spacing={3} align="center">
            <Box color="var(--warn)">
              <Warning size={28} weight="fill" />
            </Box>
            <Text fontFamily="var(--f-display)" fontSize="20px" fontWeight={600} textAlign="center">
              {title}
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        <ModalBody py={4}>
          <Alert tone={alertType === 'error' ? 'bad' : 'warn'}>{message}</Alert>
        </ModalBody>
        <ModalFooter pt={2}>
          <VStack spacing={3} w="full">
            <Button
              variant={confirmVariant}
              onClick={onConfirm}
              isLoading={isLoading}
              loadingText={loadingText}
              w="full"
              isDisabled={isLoading}
            >
              {confirmText}
            </Button>
            <Button variant="rvQuiet" onClick={handleClose} w="full" isDisabled={isLoading}>
              {cancelText}
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
