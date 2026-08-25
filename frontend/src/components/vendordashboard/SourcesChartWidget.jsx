import React, { useMemo } from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ChartPie } from '@phosphor-icons/react';
import useApi from '../../hooks/useApi';
import WidgetCard from './WidgetCard';
import Money from '../common/Money';
import { ChartTip, StatChip } from './chartUtils';

const SERIES = [
  { match: /trade|sale/i, color: 'var(--brand)', dash: 'solid' },
  { match: /commission|claim/i, color: 'var(--accent)', dash: '8 4' },
  { match: /bonus|sign/i, color: 'var(--note)', dash: '2 3' },
  { match: /./, color: 'var(--ok)', dash: '1 0' },
];

const LABELS = {
  'Profit from Sales': 'Trades',
  'Referral Commissions': 'Commissions',
  'Sign-up Bonuses': 'Sign-up bonus',
};

const pickSeries = (name, index) => SERIES.find((s) => s.match.test(name)) || SERIES[Math.min(index, SERIES.length - 1)];

const SourcesChartWidget = ({ url }) => {
  const { data, isLoading, error } = useApi(url, '/api/vendor/dashboard/earnings-sources');

  const { slices, total } = useMemo(() => {
    const rows = Array.isArray(data) ? data : [];
    const slices = rows
      .map((row, index) => {
        const name = LABELS[row.name] || row.name;
        const series = pickSeries(name, index);
        return {
          name,
          value: Number(row.value) || 0,
          color: series.color,
        };
      })
      .filter((row) => row.value > 0)
      .sort((a, b) => b.value - a.value);
    const total = slices.reduce((sum, row) => sum + row.value, 0);
    return { slices, total };
  }, [data]);

  const hasData = !isLoading && !error && slices.length > 0;

  return (
    <WidgetCard
      title="Earnings mix"
      isLoading={isLoading}
      error={error}
      height={{ base: '380px', md: '420px' }}
      aside={hasData ? <StatChip label="Total" value={total} /> : null}
    >
      {hasData ? (
        <Flex flex="1" minH={0} direction={{ base: 'column', md: 'row' }} align="center" gap={4}>
          <Box position="relative" w={{ base: '100%', md: '48%' }} h={{ base: '180px', md: '100%' }} minH="180px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="88%"
                  paddingAngle={2}
                  stroke="var(--panel)"
                  strokeWidth={2}
                >
                  {slices.map((slice) => (
                    <Cell key={slice.name} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTip />} />
              </PieChart>
            </ResponsiveContainer>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
              pointerEvents="none"
            >
              <Text fontSize="10.5px" fontFamily="var(--f-num)" letterSpacing="0.06em" textTransform="uppercase" color="var(--text-3)">
                Mix
              </Text>
              <Text fontFamily="var(--f-num)" fontSize="12.5px" color="var(--text-2)">
                {slices.length} source{slices.length === 1 ? '' : 's'}
              </Text>
            </Box>
          </Box>
          <Box flex="1" w="100%">
            {slices.map((slice) => {
              const share = total > 0 ? (slice.value / total) * 100 : 0;
              return (
                <Box key={slice.name} py={2} borderBottom="1px solid" borderColor="var(--hairline)">
                  <Flex justify="space-between" align="baseline" gap={3} mb={1}>
                    <Flex align="center" gap={2} minW={0}>
                      <Box w="8px" h="8px" borderRadius="2px" bg={slice.color} flexShrink={0} />
                      <Text fontSize="13.5px" color="var(--text)" noOfLines={1}>{slice.name}</Text>
                    </Flex>
                    <Money value={slice.value} style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--text)' }} />
                  </Flex>
                  <Flex align="center" gap={2}>
                    <Box flex="1" h="4px" bg="var(--panel-2)" borderRadius="2px" overflow="hidden">
                      <Box h="100%" w={`${share}%`} bg={slice.color} />
                    </Box>
                    <Text fontFamily="var(--f-num)" fontSize="12.5px" color="var(--text-3)" minW="40px" textAlign="right">
                      {share.toFixed(0)}%
                    </Text>
                  </Flex>
                </Box>
              );
            })}
          </Box>
        </Flex>
      ) : (
        !isLoading && !error && (
          <Center h="100%" flexDir="column" gap={2} color="var(--text-3)">
            <ChartPie size={40} weight="bold" />
            <Text>No source mix to show yet.</Text>
          </Center>
        )
      )}
    </WidgetCard>
  );
};

export default SourcesChartWidget;
