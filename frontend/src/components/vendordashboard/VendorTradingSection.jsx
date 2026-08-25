import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Bank, PlusCircle, TrendUp, Warning, XCircle } from '@phosphor-icons/react';
import Money, { formatMoney } from '../common/Money';
import EmptyState from '../common/EmptyState';
import { useVendorLedger } from '../../context/VendorLedgerContext';

const QueueRow = ({ icon: Icon, label, meta, tone = 'var(--text)', onClick }) => (
  <Flex
    as="button"
    type="button"
    w="full"
    align="center"
    gap={3}
    py={3}
    px={1}
    borderBottom="1px solid"
    borderColor="var(--hairline)"
    onClick={onClick}
    textAlign="left"
    _hover={{ bg: 'var(--panel-2)' }}
  >
    <Box color={tone}><Icon size={20} weight="fill" /></Box>
    <Box minW="0" flex="1">
      <Text fontSize="14px" fontWeight={600} color="var(--text)" noOfLines={1}>{label}</Text>
      {meta && <Text fontSize="12.5px" color="var(--text-3)" noOfLines={1}>{meta}</Text>}
    </Box>
  </Flex>
);

const n = (v) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

const VendorTradingSection = ({ stats = {} }) => {
  const navigate = useNavigate();
  const { balance, held, unrealised, unlockedTrades, pendingWithdrawals, rejectedPurchases } = useVendorLedger();

  const queue = [
    ...unlockedTrades.map((t) => ({
      id: `sell-${t.trade_id}`,
      icon: TrendUp,
      label: `Sell ${t.paper_type || 'trade'}`,
      meta: `${t.no_of_stock_bought || 0} units · ${formatMoney(t.current_selling_price)}`,
      tone: 'var(--ok)',
      onClick: () => navigate('/vendor/wallet?view=investments'),
    })),
    ...pendingWithdrawals.map((tx) => ({
      id: `wd-${tx.trans_id}`,
      icon: Warning,
      label: 'Pending withdrawal',
      meta: formatMoney(tx.amount),
      tone: 'var(--warn)',
      onClick: () => navigate('/vendor/wallet?view=withdrawals'),
    })),
    ...rejectedPurchases.slice(0, 3).map((p) => ({
      id: `rej-${p.trade_id}`,
      icon: XCircle,
      label: `Rejected · ${p.paper_type || 'purchase'}`,
      meta: formatMoney(p.total_amount_paid),
      tone: 'var(--bad)',
      onClick: () => navigate('/vendor/purchase-history'),
    })),
  ];

  return (
    <Box as="section" mb={8}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="var(--gap-block)" mb={6}>
        <Box
          className="rv-cut-lg"
          bg="var(--panel)"
          border="1px solid"
          borderColor="var(--border)"
          borderRadius="var(--r-structure)"
          p="var(--pad-panel)"
        >
          <Text
            fontFamily="var(--f-num)"
            fontSize="11px"
            fontWeight={500}
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="var(--accent-text)"
            mb={2}
          >
            Position
          </Text>
          <Text fontSize="13px" color="var(--text-3)" mb={1}>Wallet</Text>
          <Money value={balance} style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text)', display: 'block' }} />
          <Flex gap={6} mt={4} wrap="wrap">
            <Box>
              <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">Held</Text>
              <Money value={held} style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)' }} />
            </Box>
            <Box>
              <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">Unrealised</Text>
              <Money value={unrealised} signed style={{ fontSize: '15px', fontWeight: 500 }} />
            </Box>
          </Flex>
          <Flex gap={2} mt={5} wrap="wrap">
            <Button variant="rvSolid" leftIcon={<PlusCircle size={16} />} onClick={() => navigate('/vendor/wallet?action=add')}>
              Add money
            </Button>
            <Button variant="rvAccent" leftIcon={<Bank size={16} />} onClick={() => navigate('/vendor/wallet?action=withdraw')}>
              Withdraw
            </Button>
          </Flex>
        </Box>

        <Box
          bg="var(--panel)"
          border="1px solid"
          borderColor="var(--border)"
          borderRadius="var(--r-structure)"
          p="var(--pad-panel)"
        >
          <Text
            fontFamily="var(--f-display)"
            fontWeight={600}
            fontSize="17px"
            letterSpacing="0.06em"
            textTransform="uppercase"
            mb={2}
          >
            Needs you today
          </Text>
          {queue.length === 0 ? (
            <EmptyState
              headline="All clear"
              body="No unlocked trades, pending withdrawals, or rejected purchases."
            />
          ) : (
            <VStack spacing={0} align="stretch">
              {queue.slice(0, 6).map((item) => (
                <QueueRow key={item.id} {...item} />
              ))}
            </VStack>
          )}
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 2, lg: 4 }} spacing="var(--gap-block)">
        <Box bg="var(--panel)" border="1px solid" borderColor="var(--border)" borderRadius="var(--r-structure)" p={4}>
          <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">Products to buy</Text>
          <Text fontFamily="var(--f-num)" fontWeight={700} fontSize="30px" color="var(--text)" letterSpacing="-0.03em">
            {n(stats.availableProducts).toLocaleString('en-IN')}
          </Text>
        </Box>
        <Box bg="var(--panel)" border="1px solid" borderColor="var(--border)" borderRadius="var(--r-structure)" p={4}>
          <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">Wild available</Text>
          <Text fontFamily="var(--f-num)" fontWeight={700} fontSize="30px" color="var(--text)" letterSpacing="-0.03em">
            {n(stats.availableWildProducts).toLocaleString('en-IN')}
          </Text>
        </Box>
        <Box bg="var(--panel)" border="1px solid" borderColor="var(--border)" borderRadius="var(--r-structure)" p={4}>
          <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">Approved buys</Text>
          <Text fontFamily="var(--f-num)" fontWeight={700} fontSize="30px" color="var(--text)" letterSpacing="-0.03em">
            {n(stats.purchasedProducts).toLocaleString('en-IN')}
          </Text>
        </Box>
        <Box className="rv-cut" bg="var(--panel)" border="1px solid" borderColor="var(--border)" borderRadius="var(--r-structure)" p={4}>
          <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">Total spent</Text>
          <Money value={n(stats.purchasedValue)} style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text)' }} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default VendorTradingSection;
