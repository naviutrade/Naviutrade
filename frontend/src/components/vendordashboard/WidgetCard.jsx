import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { SkeletonRows } from '../common/Skeleton';
import Alert from '../common/Alert';

const WidgetCard = ({ title, aside, children, isLoading, error, height = 'auto' }) => {
  return (
    <Box
      bg="var(--panel)"
      p="var(--pad-panel)"
      borderRadius="var(--r-structure)"
      border="1px solid"
      borderColor="var(--border)"
      h={height}
      display="flex"
      flexDirection="column"
      overflow="hidden"
      minH={0}
    >
      <Flex justify="space-between" align="flex-start" gap={3} mb={4}>
        <Heading
          as="h3"
          fontFamily="var(--f-display)"
          fontWeight={600}
          fontSize="17px"
          letterSpacing="0.06em"
          textTransform="uppercase"
          color="var(--text)"
          m={0}
        >
          {title}
        </Heading>
        {aside}
      </Flex>
      <Box flex="1" minH={0} display="flex" flexDirection="column">
        {isLoading ? (
          <SkeletonRows count={4} />
        ) : error ? (
          <Alert tone="bad">{String(error)}</Alert>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default WidgetCard;
