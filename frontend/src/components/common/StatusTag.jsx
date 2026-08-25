import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import {
  CheckCircle,
  Warning,
  XCircle,
  HourglassMedium,
  TrendUp,
  Prohibit,
  Circle,
} from '@phosphor-icons/react';

const SET = {
  approved: { label: 'Approved', bg: 'var(--ok-bg)', bd: 'var(--ok-bd)', fg: 'var(--ok)', Icon: CheckCircle, weight: 'fill' },
  pending: { label: 'Pending', bg: 'var(--warn-bg)', bd: 'var(--warn-bd)', fg: 'var(--warn)', Icon: Warning, weight: 'fill' },
  rejected: { label: 'Rejected', bg: 'var(--bad-bg)', bd: 'var(--bad-bd)', fg: 'var(--bad)', Icon: XCircle, weight: 'fill' },
  locked: { label: 'Locked', bg: 'var(--warn-bg)', bd: 'var(--warn-bd)', fg: 'var(--warn)', Icon: HourglassMedium, weight: 'fill' },
  unlocked: { label: 'Unlocked', bg: 'var(--ok-bg)', bd: 'var(--ok-bd)', fg: 'var(--ok)', Icon: TrendUp, weight: 'fill' },
  cancelled: { label: 'Cancelled', bg: 'var(--panel-2)', bd: 'var(--border)', fg: 'var(--text-2)', Icon: Prohibit, weight: 'fill' },
  draft: { label: 'Draft', bg: 'var(--note-bg)', bd: 'var(--note-bd)', fg: 'var(--note)', Icon: Circle, weight: 'bold' },
};

const StatusTag = ({ status, children }) => {
  const key = String(status || '').toLowerCase();
  const spec = SET[key] || SET.pending;
  const Icon = spec.Icon;
  return (
    <Flex
      as="span"
      display="inline-flex"
      align="center"
      gap="4px"
      px="8px"
      h="22px"
      borderRadius="var(--r-tag)"
      bg={spec.bg}
      border="1px solid"
      borderColor={spec.bd}
      color={spec.fg}
    >
      <Icon size={12} weight={spec.weight} />
      <Text
        as="span"
        fontFamily="var(--f-num)"
        fontSize="10.5px"
        fontWeight={500}
        letterSpacing="0.06em"
        textTransform="uppercase"
        lineHeight="1"
      >
        {children || spec.label}
      </Text>
    </Flex>
  );
};

export default StatusTag;
