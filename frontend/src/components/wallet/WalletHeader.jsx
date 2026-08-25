import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, Button, HStack, useToast } from '@chakra-ui/react';
import { PlusCircle, Bank } from '@phosphor-icons/react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Money from '../common/Money';
import { showToast } from '../common/toast';

const WalletHeader = ({
  digitalMoney,
  onAddMoneyClick,
  onWithdrawClick,
  hasPendingWithdrawal,
  withdrawalWindow,
}) => {
  const toast = useToast();
  const { width } = useWindowDimensions();
  const isMobile = width <= 480;
  const buttonSize = isMobile ? 'sm' : 'md';

  const [showWithdrawButton, setShowWithdrawButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWithdrawButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const isDisabled = hasPendingWithdrawal || (withdrawalWindow && !withdrawalWindow.allowed);
  const disabledReason = hasPendingWithdrawal
    ? 'A withdrawal request is already pending'
    : (withdrawalWindow && !withdrawalWindow.allowed ? (withdrawalWindow.reason || 'Withdrawals are closed right now') : '');

  const handleWithdrawClick = () => {
    if (isDisabled) {
      showToast(toast, {
        title: 'Withdrawal unavailable',
        description: disabledReason,
        status: 'warning',
      });
      return;
    }
    onWithdrawClick();
  };

  return (
    <Box w="100%" mb={5}>
      <Flex align="center" justify="space-between" wrap="wrap" gap={3} w="100%">
        <Box className="rv-cut" bg="var(--panel)" border="1px solid" borderColor="var(--border)" borderRadius="var(--r-structure)" px={4} py={3}>
          <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">
            Wallet
          </Text>
          <Money
            value={digitalMoney}
            style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text)' }}
          />
        </Box>
        <HStack spacing={2}>
          <Button size={buttonSize} leftIcon={<PlusCircle size={18} />} variant="rvSolid" onClick={onAddMoneyClick}>
            Add money
          </Button>
          {showWithdrawButton && (
            <Button
              size={buttonSize}
              leftIcon={<Bank size={18} />}
              variant="rvAccent"
              onClick={handleWithdrawClick}
              isDisabled={isDisabled}
            >
              Withdraw
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default WalletHeader;
