import React from 'react';
import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { formatISTDate } from '../../utils/dateUtils';
import useApi from '../../hooks/useApi';
import WidgetCard from './WidgetCard';
import EarningsChartWidget from './EarningsChartWidget';
import SourcesChartWidget from './SourcesChartWidget';
import ReferralBarsWidget from './ReferralBarsWidget';
import Money from '../common/Money';
import StatusTag from '../common/StatusTag';
import { rvQuiet } from '../../theme/rv';

const TYPE_LABEL = {
  sale: 'Sale',
  deposit: 'Deposit',
  purchase: 'Purchase',
  withdrawal: 'Withdrawal',
  commission_claim: 'Commission claim',
  referral_bonus: 'Sign-up bonus',
  referral_earning: 'Referral earning',
};

const ActivityWidget = ({ url }) => {
  const { data, isLoading, error } = useApi(url, '/api/vendor/dashboard/recent-activity');
  const rows = Array.isArray(data) ? data.slice(0, 4) : [];

  return (
    <WidgetCard title="Recent activity" isLoading={isLoading} error={error} height={{ base: '380px', md: '420px' }}>
      <Flex direction="column" flex="1" minH={0} overflow="hidden" h="100%">
        <Box flex="1" minH={0} overflowY="auto" pr={1}>
          {rows.length > 0 ? (
            rows.map((tx) => {
              const amount = Number(tx.amount) || 0;
              const type = TYPE_LABEL[tx.transaction_type] || String(tx.transaction_type || 'Entry').replace(/_/g, ' ');
              return (
                <Flex
                  key={tx.trans_id}
                  justify="space-between"
                  align="center"
                  gap={3}
                  py={2.5}
                  borderBottom="1px solid"
                  borderColor="var(--hairline)"
                >
                  <Box minW={0}>
                    <Text fontSize="14px" fontWeight={600} color="var(--text)" noOfLines={1}>
                      {type}
                    </Text>
                    <Text fontFamily="var(--f-num)" fontSize="12.5px" color="var(--text-3)">
                      {formatISTDate(tx.created_at, true, true)} · IST
                    </Text>
                  </Box>
                  <Flex align="center" gap={2} flexShrink={0}>
                    <StatusTag status={tx.status} />
                    <Money value={amount} signed={amount !== 0} style={{ fontSize: '15px', fontWeight: 500 }} />
                  </Flex>
                </Flex>
              );
            })
          ) : (
            !isLoading && !error && (
              <Text color="var(--text-3)" py={6}>No recent activity.</Text>
            )
          )}
        </Box>
        <Box pt={3} flexShrink={0}>
          <Button as={RouterLink} to="/vendor/activity" size="sm" {...rvQuiet}>
            View all activity
          </Button>
        </Box>
      </Flex>
    </WidgetCard>
  );
};

const DashboardOverview = ({ url }) => (
  <Box>
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="var(--gap-block)">
      <EarningsChartWidget url={url} />
      <SourcesChartWidget url={url} />
      <ReferralBarsWidget url={url} />
      <ActivityWidget url={url} />
    </SimpleGrid>
  </Box>
);

export default DashboardOverview;
