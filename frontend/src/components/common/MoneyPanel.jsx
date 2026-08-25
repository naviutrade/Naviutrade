import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import Money from './Money';

const MoneyPanel = ({ label, value, delta, cut = true, size = 'md' }) => {
  const figureSize = size === 'lg' ? '30px' : '17px';
  return (
    <Box
      className={cut ? 'rv-cut' : undefined}
      bg="var(--panel)"
      border="1px solid"
      borderColor="var(--border)"
      borderRadius="var(--r-structure)"
      px={4}
      py={3}
      minW="0"
    >
      <Text
        fontSize="10px"
        fontWeight={600}
        letterSpacing="0.14em"
        textTransform="uppercase"
        color="var(--text-3)"
        mb="2px"
      >
        {label}
      </Text>
      <Money
        value={value}
        style={{ fontSize: figureSize, fontWeight: 700, color: 'var(--text)', display: 'block' }}
      />
      {delta != null && (
        <Money
          value={delta}
          signed
          style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginTop: '2px' }}
        />
      )}
    </Box>
  );
};

export default MoneyPanel;
