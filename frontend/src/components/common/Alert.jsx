import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CheckCircle, Warning, XCircle, Info } from '@phosphor-icons/react';

const TONE = {
  ok: { bg: 'var(--ok-bg)', bd: 'var(--ok-bd)', fg: 'var(--ok)', edge: 'var(--ok)', Icon: CheckCircle },
  success: { bg: 'var(--ok-bg)', bd: 'var(--ok-bd)', fg: 'var(--ok)', edge: 'var(--ok)', Icon: CheckCircle },
  warn: { bg: 'var(--warn-bg)', bd: 'var(--warn-bd)', fg: 'var(--warn)', edge: 'var(--warn)', Icon: Warning },
  warning: { bg: 'var(--warn-bg)', bd: 'var(--warn-bd)', fg: 'var(--warn)', edge: 'var(--warn)', Icon: Warning },
  bad: { bg: 'var(--bad-bg)', bd: 'var(--bad-bd)', fg: 'var(--bad)', edge: 'var(--bad)', Icon: XCircle },
  error: { bg: 'var(--bad-bg)', bd: 'var(--bad-bd)', fg: 'var(--bad)', edge: 'var(--bad)', Icon: XCircle },
  note: { bg: 'var(--note-bg)', bd: 'var(--note-bd)', fg: 'var(--note)', edge: 'var(--note)', Icon: Info },
  info: { bg: 'var(--note-bg)', bd: 'var(--note-bd)', fg: 'var(--note)', edge: 'var(--note)', Icon: Info },
};

const Alert = ({ tone = 'note', title, children }) => {
  const spec = TONE[tone] || TONE.note;
  const Icon = spec.Icon;
  return (
    <Flex
      role="alert"
      align="flex-start"
      gap={3}
      p={3}
      bg={spec.bg}
      border="1px solid"
      borderColor={spec.bd}
      borderRadius="var(--r-structure)"
      position="relative"
      overflow="hidden"
      pl={4}
    >
      <Box position="absolute" left="0" top="0" bottom="0" w="3px" bg={spec.edge} />
      <Box color={spec.fg} mt="2px">
        <Icon size={18} weight="fill" />
      </Box>
      <Box minW="0">
        {title && (
          <Text fontWeight={600} fontSize="15px" color="var(--text)" mb={1}>
            {title}
          </Text>
        )}
        <Text fontSize="13.5px" color="var(--text-2)">
          {children}
        </Text>
      </Box>
    </Flex>
  );
};

export default Alert;
