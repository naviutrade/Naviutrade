import React, { useMemo } from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChartBar } from '@phosphor-icons/react';
import useApi from '../../hooks/useApi';
import WidgetCard from './WidgetCard';
import { axisMoney, sampleTicks, ChartTip, StatChip } from './chartUtils';
import { formatMoney } from '../common/Money';

const MAX_BARS = 30;

const EarningsChartWidget = ({ url }) => {
  const { data, isLoading, error } = useApi(url, '/api/vendor/dashboard/earnings-over-time');

  const { chartData, ticks, latest, dayChange, weekChange, clipped } = useMemo(() => {
    const rows = Array.isArray(data) ? data : [];
    if (!rows.length) {
      return { chartData: [], ticks: [], latest: 0, dayChange: 0, weekChange: 0, clipped: false };
    }

    const daily = rows.map((row, i, arr) => {
      const earnings = Number(row.earnings) || 0;
      const prev = i === 0 ? 0 : Number(arr[i - 1].earnings) || 0;
      return {
        name: row.name,
        earned: Math.max(0, earnings - prev),
        earnings,
      };
    });

    const last = daily[daily.length - 1];
    const weekAgo = daily[Math.max(0, daily.length - 8)];
    const clipped = daily.length > MAX_BARS;
    const chartData = clipped ? daily.slice(-MAX_BARS) : daily;

    return {
      chartData,
      ticks: sampleTicks(chartData.map((d) => d.name), 5),
      latest: last.earnings,
      dayChange: last.earned,
      weekChange: last.earnings - weekAgo.earnings,
      clipped,
    };
  }, [data]);

  const hasData = !isLoading && !error && chartData.length > 0;

  return (
    <WidgetCard
      title="Earnings over time"
      isLoading={isLoading}
      error={error}
      height={{ base: '380px', md: '420px' }}
      aside={hasData ? (
        <Flex gap={5} display={{ base: 'none', sm: 'flex' }}>
          <StatChip label="Lifetime" value={latest} />
          <StatChip label="Last day" value={dayChange} signed />
        </Flex>
      ) : null}
    >
      {hasData ? (
        <Box flex="1" minH={0} display="flex" flexDir="column">
          <Flex gap={5} mb={3} display={{ base: 'flex', sm: 'none' }}>
            <StatChip label="Lifetime" value={latest} />
            <StatChip label="Last day" value={dayChange} signed />
            <StatChip label="7 days" value={weekChange} signed />
          </Flex>
          <Box flex="1" minH="220px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid stroke="var(--hairline)" vertical={false} />
                <XAxis
                  dataKey="name"
                  ticks={ticks}
                  tick={{ fontSize: 12, fill: 'var(--text-3)', fontFamily: 'var(--f-num)' }}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickLine={false}
                  minTickGap={16}
                />
                <YAxis
                  tickFormatter={axisMoney}
                  width={56}
                  tick={{ fontSize: 12, fill: 'var(--text-3)', fontFamily: 'var(--f-num)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTip />} cursor={{ fill: 'var(--panel-2)' }} />
                <Bar
                  dataKey="earned"
                  name="Earned that day"
                  fill="var(--brand)"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Flex gap={3} mt={2} align="center" color="var(--text-3)" fontSize="12.5px">
            <Text>Each bar is what you earned that day.</Text>
            <Text ml="auto" fontFamily="var(--f-num)" display={{ base: 'none', sm: 'block' }}>
              {clipped ? 'Last 30 days · ' : ''}7 days {formatMoney(weekChange, { signed: true })}
            </Text>
          </Flex>
        </Box>
      ) : (
        !isLoading && !error && (
          <Center h="100%" flexDir="column" gap={2} color="var(--text-3)">
            <ChartBar size={40} weight="bold" />
            <Text textAlign="center">No earnings yet. Sales and claims will show as daily bars.</Text>
          </Center>
        )
      )}
    </WidgetCard>
  );
};

export default EarningsChartWidget;
