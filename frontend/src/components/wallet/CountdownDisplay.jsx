import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Countdown from '../common/Countdown';
import StatusTag from '../common/StatusTag';

const CountdownDisplay = ({ unlockTimestamp }) => {
  const [done, setDone] = useState(unlockTimestamp - Date.now() <= 0);

  useEffect(() => {
    setDone(unlockTimestamp - Date.now() <= 0);
  }, [unlockTimestamp]);

  return (
    <Box
      w={{ base: '100%', md: '180px' }}
      minH="44px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      border="1px solid"
      borderColor="var(--warn-bd)"
      bg="var(--warn-bg)"
      borderRadius="var(--r-control)"
      px={3}
    >
      <StatusTag status={done ? 'unlocked' : 'locked'} />
      {!done && <Countdown unlockTimestamp={unlockTimestamp} onUnlock={() => setDone(true)} />}
    </Box>
  );
};

export default CountdownDisplay;
