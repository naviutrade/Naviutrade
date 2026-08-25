import React, { useMemo } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { UsersThree } from '@phosphor-icons/react';
import useApi from '../../hooks/useApi';
import WidgetCard from './WidgetCard';
import { axisMoney, ChartTip, StatChip } from './chartUtils';

const BAR_COLORS = ['var(--note)', 'var(--brand)', 'var(--ok)', 'var(--accent)', 'var(--text-3)'];

const shortName = (name) => {
  const s = String(name || 'Vendor');
  return s.length > 14 ? `${s.slice(0, 13)}…` : s;
};

const ReferralBarsWidget = ({ url }) => {
  const { data, isLoading, error } = useApi(url, '/api/vendor/dashboard/referral-leaderboard');

  const { rows, total } = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    const rows = list
      .map((row) => ({
        name: shortName(row.name),
        fullName: row.name,
        value: Number(row.value) || 0,
      }))
      .filter((row) => row.value > 0);
    const total = rows.reduce((sum, row) => sum + row.value, 0);
    return { rows, total };
  }, [data]);

  const hasData = !isLoading && !error && rows.length > 0;

  return (
    <WidgetCard
      title="Top referrals"
      isLoading={isLoading}
      error={error}
      height={{ base: '380px', md: '420px' }}
      aside={hasData ? <StatChip label="From top 5" value={total} /> : null}
    >
      {hasData ? (
        <Box flex="1" minH="220px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 4 }}>
              <CartesianGrid stroke="var(--hairline)" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={axisMoney}
                tick={{ fontSize: 12, fill: 'var(--text-3)', fontFamily: 'var(--f-num)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={88}
                tick={{ fontSize: 12, fill: 'var(--text)', fontFamily: 'var(--f-body)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTip />} cursor={{ fill: 'var(--panel-2)' }} />
              <Bar dataKey="value" name="Commission" radius={[0, 3, 3, 0]} maxBarSize={22} barCategoryGap="28%">
                {rows.map((row, i) => (
                  <Cell key={row.fullName} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        !isLoading && !error && (
          <Center h="100%" flexDir="column" gap={2} color="var(--text-3)">
            <UsersThree size={40} weight="bold" />
            <Text textAlign="center">No referral commissions yet.</Text>
          </Center>
        )
      )}
    </WidgetCard>
  );
};

export default ReferralBarsWidget;
