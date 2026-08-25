import React, { useEffect, useRef, useState } from 'react';
import { Text } from '@chakra-ui/react';

const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

const formatHms = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const Countdown = ({ unlockTimestamp, onUnlock }) => {
  const [remaining, setRemaining] = useState(() => unlockTimestamp - Date.now());
  const announced10 = useRef(false);
  const announcedUnlock = useRef(false);
  const [live, setLive] = useState('');

  useEffect(() => {
    const tick = () => {
      const next = unlockTimestamp - Date.now();
      setRemaining(next);
      if (next <= 10 * 60 * 1000 && next > 0 && !announced10.current) {
        announced10.current = true;
        setLive('Ten minutes remaining until this trade unlocks');
      }
      if (next <= 0 && !announcedUnlock.current) {
        announcedUnlock.current = true;
        setLive('This trade is now unlocked');
        if (onUnlock) onUnlock();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [unlockTimestamp, onUnlock]);

  if (remaining <= 0) {
    return (
      <>
        <Text
          fontFamily="var(--f-num)"
          fontSize="15px"
          fontWeight={500}
          color="var(--ok)"
          fontVariantNumeric="tabular-nums"
        >
          Unlocked
        </Text>
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }} aria-live="polite">
          {live}
        </span>
      </>
    );
  }

  return (
    <>
      <Text
        fontFamily="var(--f-num)"
        fontSize="15px"
        fontWeight={500}
        color="var(--warn)"
        fontVariantNumeric="tabular-nums"
        letterSpacing="-0.02em"
      >
        {formatHms(remaining)}
      </Text>
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }} aria-live="polite">
        {live}
      </span>
    </>
  );
};

export default Countdown;
