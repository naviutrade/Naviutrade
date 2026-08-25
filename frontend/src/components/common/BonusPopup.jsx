import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Coins, Gift, Sparkle } from '@phosphor-icons/react';
import Money from './Money';

const BonusPopup = ({ isOpen, onClose, bonusAmount, daysHeld }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent className="rv-cut-lg" overflow="hidden">
        <ModalBody p={8}>
          <VStack
            spacing={5}
            align="center"
            sx={{
              '@media (prefers-reduced-motion: no-preference)': {
                animation: 'rv-settle 220ms var(--ease)',
              },
              '@keyframes rv-settle': {
                from: { opacity: 0, transform: 'scale(0.98)' },
                to: { opacity: 1, transform: 'scale(1)' },
              },
            }}
          >
            <Box color="var(--accent-text)">
              <Gift size={48} weight="fill" />
            </Box>
            <Text fontFamily="var(--f-display)" fontWeight={600} fontSize="20px" textAlign="center">
              Bonus claimed
            </Text>
            <Text fontSize="13.5px" color="var(--text-2)" textAlign="center">
              Held for {daysHeld} days
            </Text>
            <VStack spacing={1}>
              <Sparkle size={18} weight="fill" color="var(--accent-text)" />
              <Money value={bonusAmount} signed style={{ fontSize: '30px', fontWeight: 700 }} />
            </VStack>
            <Text fontSize="13.5px" color="var(--text-3)" textAlign="center" maxW="46ch">
              Extra bonus for holding beyond day 8. You earned up to ₹ 2.00 per stock.
            </Text>
            <Button variant="rvSolid" onClick={onClose} leftIcon={<Coins size={16} />}>
              Done
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BonusPopup;
