import React, { useEffect, useRef } from 'react';
import { Box, Flex, FormLabel, Image } from '@chakra-ui/react';
import VendorThemeToggle, { getPreferredTheme } from '../common/VendorThemeToggle';

export const AuthLabel = (props) => (
  <FormLabel
    fontSize="12px"
    fontWeight={600}
    letterSpacing="0.04em"
    textTransform="uppercase"
    color="var(--text-3)"
    mb="6px"
    {...props}
  />
);

export const authControlSx = {
  bg: 'var(--bg)',
  color: 'var(--text)',
  borderColor: 'var(--control-border)',
  borderRadius: 'var(--r-control)',
  fontFamily: 'var(--f-body)',
  fontSize: '16px',
  _placeholder: { color: 'var(--text-3)' },
  _hover: { borderColor: 'var(--text-3)' },
  _focus: {
    borderColor: 'var(--brand)',
    boxShadow: '0 0 0 1px var(--brand)',
  },
  _focusVisible: {
    borderColor: 'var(--brand)',
    boxShadow: '0 0 0 1px var(--brand)',
  },
  _invalid: {
    borderColor: 'var(--bad)',
    boxShadow: '0 0 0 1px var(--bad)',
  },
  _disabled: {
    bg: 'var(--panel-2)',
    color: 'var(--text-2)',
    opacity: 1,
    cursor: 'not-allowed',
  },
};

export const authInputSx = {
  ...authControlSx,
  h: { base: '48px', md: '42px' },
};

export const authBtnH = { base: '48px', md: '42px' };

const AuthShell = ({ children, maxW = '420px' }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const theme = getPreferredTheme();
    const el = rootRef.current;
    document.documentElement.classList.add('rv-session');
    document.documentElement.setAttribute('data-theme', theme);
    if (el) el.setAttribute('data-theme', theme);
    return () => {
      document.documentElement.classList.remove('rv-session');
    };
  }, []);

  return (
    <Flex
      ref={rootRef}
      className="rv-vendor"
      minH="100vh"
      bg="var(--bg)"
      data-theme={getPreferredTheme()}
      align="center"
      justify="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
      pt={{ base: 'calc(24px + env(safe-area-inset-top, 0px))', md: 10 }}
      pb={{ base: 'calc(24px + env(safe-area-inset-bottom, 0px))', md: 10 }}
      position="relative"
    >
      <Box position="absolute" top="calc(12px + env(safe-area-inset-top, 0px))" right={3} zIndex={2}>
        <VendorThemeToggle rootRef={rootRef} plain />
      </Box>

      <Box w="full" maxW={maxW}>
        <Flex justify="center" mb={{ base: 6, md: 8 }}>
          <Image
            src="/rouvin.png"
            alt="Rouvin"
            h={{ base: '40px', md: '48px' }}
            w="auto"
            maxW="220px"
            objectFit="contain"
            display="block"
          />
        </Flex>
        {children}
      </Box>
    </Flex>
  );
};

export default AuthShell;
