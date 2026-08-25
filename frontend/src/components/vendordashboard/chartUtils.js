import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Money from '../common/Money';

export const axisMoney = (value) => {
  const n = Number(value);
  const amount = Number.isFinite(n) ? n : 0;
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '\u2212' : '';
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)}L`;
  if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(abs >= 10000 ? 0 : 1)}k`;
  return `${sign}₹${Math.round(abs)}`;
};

export const sampleTicks = (names, max = 5) => {
  if (!names.length) return [];
  if (names.length <= max) return names;
  const ticks = [];
  const last = names.length - 1;
  for (let i = 0; i < max; i += 1) {
    const index = Math.round((i * last) / (max - 1));
    ticks.push(names[index]);
  }
  return [...new Set(ticks)];
};

export const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const title = payload[0]?.payload?.fullName || label;
  return (
    <Box
      bg="var(--bg)"
      border="1px solid"
      borderColor="var(--border)"
      p={3}
      minW="180px"
      borderRadius="var(--r-structure)"
      boxShadow="var(--shadow-pop)"
    >
      {title != null && title !== '' && (
        <Text fontFamily="var(--f-num)" fontSize="12.5px" color="var(--text-3)" mb={2}>
          {title}
        </Text>
      )}
      {payload.map((entry) => (
        <Flex key={entry.dataKey || entry.name} justify="space-between" gap={4} align="baseline">
          <Flex align="center" gap={2}>
            <Box w="8px" h="8px" borderRadius="2px" bg={entry.color || 'var(--brand)'} flexShrink={0} />
            <Text fontSize="13.5px" color="var(--text-2)">
              {entry.name}
            </Text>
          </Flex>
          <Money value={entry.value} style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--text)' }} />
        </Flex>
      ))}
    </Box>
  );
};

export const StatChip = ({ label, value, signed = false }) => (
  <Box>
    <Text
      fontSize="10.5px"
      fontWeight={500}
      letterSpacing="0.06em"
      textTransform="uppercase"
      fontFamily="var(--f-num)"
      color="var(--text-3)"
    >
      {label}
    </Text>
    <Money
      value={value}
      signed={signed}
      style={{ fontSize: '15px', fontWeight: 500, color: signed ? undefined : 'var(--text)' }}
    />
  </Box>
);
