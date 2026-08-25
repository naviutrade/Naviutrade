import React, { useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { IconContext } from '@phosphor-icons/react';
import VendorRail from './VendorRail';
import VendorBottomBar from './VendorBottomBar';
import VendorThemeToggle, { getPreferredTheme } from '../common/VendorThemeToggle';
import Money from '../common/Money';
import { VendorLedgerProvider, useVendorLedger } from '../../context/VendorLedgerContext';
import { useAuth } from '../../AppContext';
import { formatISTDate } from '../../utils/dateUtils';
import {
  mobileSegmentsFor,
  mobileTitleFor,
  rememberNavSegment,
} from './nav.config';

const TITLE_MAP = [
  { match: '/vendor/dashboard', title: 'Dashboard' },
  { match: '/vendor/products', title: 'Products' },
  { match: '/vendor/wild-products', title: 'Wild products' },
  { match: '/vendor/purchase-history', title: 'Purchase history' },
  { match: '/vendor/wallet', title: 'Wallet' },
  { match: '/vendor/profile', title: 'Profile' },
  { match: '/vendor/activity', title: 'Recent activity' },
  { match: '/vendor/referrals', title: 'Referrals' },
  { match: '/product-trading', title: 'Product trading' },
];

const resolveTitle = (pathname, search) => {
  if (pathname.startsWith('/vendor/wallet') && search.includes('view=earnings')) return 'Claims';
  return TITLE_MAP.find((item) => pathname.startsWith(item.match))?.title || 'Vendor';
};

const istStamp = () => {
  const formatted = formatISTDate(new Date(), true, false);
  return `${formatted} · IST`;
};

const BalanceStrip = ({ compact = false }) => {
  const { balance, held, unrealised } = useVendorLedger();
  return (
    <Flex
      className="rv-cut"
      align="center"
      gap={3}
      px={4}
      py={2}
      bg="var(--panel)"
      border="1px solid"
      borderColor="var(--border)"
      borderRadius="var(--r-structure)"
      w={compact ? '100%' : 'auto'}
    >
      <Box minW={0}>
        <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">
          Wallet
        </Text>
        <Money value={balance} style={{ fontSize: compact ? '15px' : '17px', fontWeight: 700, color: 'var(--text)' }} />
      </Box>
      {!compact && (
        <>
          <Box w="1px" alignSelf="stretch" bg="var(--border)" />
          <Box minW={0}>
            <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">
              Held
            </Text>
            <Money value={held} style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)' }} />
          </Box>
        </>
      )}
      <Box w="1px" alignSelf="stretch" bg="var(--border)" />
      <Box minW={0}>
        <Text fontSize="10px" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="var(--text-3)">
          Unrealised
        </Text>
        <Money value={unrealised} signed style={{ fontSize: compact ? '15px' : '17px', fontWeight: 700 }} />
      </Box>
    </Flex>
  );
};

const SegmentBar = ({ segments }) => {
  if (!segments?.length) return null;
  return (
    <Flex
      bg="var(--panel-2)"
      border="1px solid"
      borderColor="var(--border)"
      borderRadius="var(--r-control)"
      p="3px"
      mb={0}
    >
      {segments.map((seg) => (
        <Flex
          key={seg.id}
          as={RouterLink}
          to={seg.to}
          flex="1"
          align="center"
          justify="center"
          h="34px"
          borderRadius="6px"
          bg={seg.active ? 'var(--bg)' : 'transparent'}
          color={seg.active ? 'var(--text)' : 'var(--text-3)'}
          fontWeight={600}
          fontSize="13.5px"
          boxShadow={seg.active ? '0 1px 2px rgba(11,20,36,.10)' : 'none'}
          aria-current={seg.active ? 'page' : undefined}
        >
          {seg.label}
        </Flex>
      ))}
    </Flex>
  );
};

const ProfileAvatar = () => {
  const { user } = useAuth();
  const name = user?.vendorName || user?.email || 'Vendor';
  return (
    <Avatar
      as={RouterLink}
      to="/vendor/profile"
      aria-label="Profile and account"
      name={name}
      size="sm"
      w="34px"
      h="34px"
      bg="var(--rail)"
      color="#fff"
      fontFamily="var(--f-num)"
      fontWeight={700}
      fontSize="12px"
      flexShrink={0}
    />
  );
};

const ContextHeader = ({ title, subtitle, tabs, actions, rootRef, segments }) => (
  <Box
    as="header"
    pos="sticky"
    top="0"
    zIndex="20"
    bg="var(--bg)"
    borderBottom="1px solid"
    borderColor="var(--hairline)"
    px={{ base: 4, md: 8 }}
    pt={4}
  >
    <Flex align="center" gap={3} wrap="nowrap" mb={tabs?.length || segments ? 0 : 3}>
      <Box minW="0" flex="1">
        <Text
          as="h1"
          fontFamily="var(--f-display)"
          fontWeight={700}
          fontSize={{ base: '19px', md: '26px' }}
          lineHeight={{ base: '24px', md: '30px' }}
          letterSpacing="-0.02em"
          color="var(--text)"
          m={0}
        >
          {title}
        </Text>
        {subtitle && (
          <Text fontSize={{ base: '11.5px', md: '13px' }} color="var(--text-3)" mt="2px">
            {subtitle}
          </Text>
        )}
      </Box>
      <Box display={{ base: 'none', lg: 'block' }}>
        <BalanceStrip />
      </Box>
      {actions && (
        <Box display={{ base: 'none', md: 'block' }}>
          {actions}
        </Box>
      )}
      <VendorThemeToggle rootRef={rootRef} />
      <Box display={{ base: 'block', md: 'none' }}>
        <ProfileAvatar />
      </Box>
    </Flex>

    <Box display={{ base: 'block', lg: 'none' }} mt={3} mb={tabs?.length || segments ? 2 : 3}>
      <BalanceStrip compact />
    </Box>

    {segments?.length > 0 && (
      <Box display={{ base: 'block', md: 'none' }} mb={3}>
        <SegmentBar segments={segments} />
      </Box>
    )}

    {tabs?.length > 0 && (
      <Flex gap="2px" overflowX="auto" mt={2} css={{ scrollbarWidth: 'none' }}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="unstyled"
            h="auto"
            px={3}
            pt="10px"
            pb="12px"
            borderRadius="0"
            color={tab.active ? 'var(--text)' : 'var(--text-3)'}
            fontWeight={tab.active ? 600 : 500}
            fontSize="14px"
            borderBottom="2px solid"
            borderColor={tab.active ? 'var(--accent)' : 'transparent'}
            onClick={tab.onSelect}
            whiteSpace="nowrap"
          >
            {tab.label}
          </Button>
        ))}
      </Flex>
    )}
  </Box>
);

const VendorShellInner = ({ children, title, subtitle, tabs, actions }) => {
  const location = useLocation();
  const rootRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false }, { fallback: 'md' });
  const mobileTitle = mobileTitleFor(location.pathname);
  const pageTitle = (isMobile && mobileTitle) || title || resolveTitle(location.pathname, location.search);
  const pageSubtitle = subtitle === undefined ? istStamp() : subtitle;
  const segments = mobileSegmentsFor(location.pathname);

  useEffect(() => {
    rememberNavSegment(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const theme = getPreferredTheme();
    const el = rootRef.current;
    document.documentElement.classList.add('rv-session');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.removeAttribute('data-density');
    if (el) {
      el.setAttribute('data-theme', theme);
      el.removeAttribute('data-density');
    }
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
    >
      <a href="#rv-content" className="rv-skip">Skip to content</a>
      <Box display={{ base: 'none', md: 'block' }} pos="sticky" top="0" h="100vh" flexShrink={0}>
        <VendorRail />
      </Box>
      <VendorBottomBar />

      <Flex direction="column" flex="1" minW="0">
        <ContextHeader
          title={pageTitle}
          subtitle={pageSubtitle}
          tabs={tabs}
          actions={actions}
          rootRef={rootRef}
          segments={segments}
        />
        <Box
          as="main"
          id="rv-content"
          flex="1"
          w="100%"
          maxW="100%"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={{ base: 5, md: 8 }}
          pb={{ base: 'calc(92px + env(safe-area-inset-bottom, 0px))', md: 8 }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

const VendorShell = ({ children, title, subtitle, tabs, actions, url = '' }) => (
  <IconContext.Provider value={{ size: 20, weight: 'bold', color: 'currentColor' }}>
    <VendorLedgerProvider url={url}>
      <VendorShellInner title={title} subtitle={subtitle} tabs={tabs} actions={actions}>
        {children}
      </VendorShellInner>
    </VendorLedgerProvider>
  </IconContext.Provider>
);

export default VendorShell;
