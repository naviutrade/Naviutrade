import React from 'react';
import { formatISTDate } from '../../utils/dateUtils';
import { Box, Heading, Text, VStack, Flex, Button } from '@chakra-ui/react';
import Money from '../common/Money';
import StatusTag from '../common/StatusTag';

const TransactionItem = ({ tx, type, onCancel, isLoading }) => {
  const showCancelButton = type === 'withdrawal' && tx.status === 'pending' && onCancel;

  return (
    <Flex
      justify="space-between"
      align="center"
      p={4}
      bg="var(--panel)"
      border="1px solid"
      borderColor="var(--border)"
      borderRadius="var(--r-structure)"
      w="100%"
      className={type === 'withdrawal' ? 'rv-cut' : undefined}
    >
      <Box flex="1">
        <Text fontWeight={500}>{tx.description || 'No description'}</Text>
        <Text fontSize="12.5px" color="var(--text-3)" fontFamily="var(--f-num)">
          {tx.created_at ? formatISTDate(tx.created_at, true, true) : tx.created_at} · IST
        </Text>
        {tx.upi_transaction_id && (
          <Text fontSize="12.5px" color="var(--text-3)" fontFamily="var(--f-num)">
            {tx.upi_transaction_id}
          </Text>
        )}
      </Box>
      <Flex align="center" gap={3}>
        <Money value={tx.amount} signed={type !== 'deposit'} style={{ fontSize: '15px', fontWeight: 500, color: type === 'deposit' ? 'var(--ok)' : 'var(--bad)' }} />
        {showCancelButton && (
          <Button
            size="sm"
            variant="rvDanger"
            onClick={() => onCancel(tx.trans_id)}
            isLoading={isLoading}
            loadingText="Cancelling"
          >
            Cancel
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const TransactionList = ({ title, transactions, type, onCancel, isLoading }) => {
  if (!transactions || transactions.length === 0) return null;

  const statusMap = {
    Approved: 'approved',
    Pending: 'pending',
    Rejected: 'rejected',
    Cancelled: 'cancelled',
  };

  return (
    <Box mb={8}>
      <Flex align="center" mb={4} gap={3}>
        <Heading as="h3" fontSize="17px" fontWeight={600} letterSpacing="0.06em" textTransform="uppercase">
          {title}
        </Heading>
        <StatusTag status={statusMap[title] || 'pending'}>{transactions.length}</StatusTag>
      </Flex>
      <VStack spacing={3} align="stretch">
        {transactions.map((tx) => (
          <TransactionItem
            key={tx.trans_id}
            tx={tx}
            type={type}
            onCancel={onCancel}
            isLoading={isLoading}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default TransactionList;
