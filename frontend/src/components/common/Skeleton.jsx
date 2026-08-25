import React from 'react';
import { Box } from '@chakra-ui/react';

const Skeleton = ({ h = '16px', w = '100%', mt, mb, radius = 'var(--r-structure)' }) => (
  <Box className="rv-skel" h={h} w={w} mt={mt} mb={mb} borderRadius={radius} aria-hidden="true" />
);

export const SkeletonGrid = ({ count = 6, h = '220px' }) => (
  <Box
    display="grid"
    gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }}
    gap="var(--gap-block)"
  >
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} h={h} />
    ))}
  </Box>
);

export const SkeletonRows = ({ count = 6, h = '48px' }) => (
  <Box display="flex" flexDirection="column" gap="8px">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} h={h} />
    ))}
  </Box>
);

export default Skeleton;
