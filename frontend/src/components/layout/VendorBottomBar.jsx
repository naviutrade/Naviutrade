import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { DotsThree } from '@phosphor-icons/react';
import { useAuth } from '../../AppContext';
import { useVendorLedger } from '../../context/VendorLedgerContext';
import { DESTINATIONS, TABS_MOBILE, isDestActive, getBuyPath, getHistoryPath } from './nav.config';
import MoreSheet from './MoreSheet';

const TabButton = ({ dest, active, badge, onClick }) => {
  const Icon = dest.Icon;
  return (
    <Flex
      as={RouterLink}
      to={dest.to}
      onClick={onClick}
      direction="column"
      align="center"
      justify="center"
      gap="3px"
      flex="1"
      minW={0}
      minH="48px"
      px="2px"
      pt="6px"
      pb="6px"
      position="relative"
      color={active ? 'var(--text)' : 'var(--text-3)'}
      borderRadius="var(--r-control)"
      _active={{ bg: 'var(--panel-2)' }}
      aria-label={dest.label}
      aria-current={active ? 'page' : undefined}
    >
      {active && (
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          w="22px"
          h="3px"
          bg="var(--accent)"
          borderRadius="0 0 3px 3px"
        />
      )}
      {badge && (
        <Box
          position="absolute"
          top="5px"
          right="calc(50% - 16px)"
          w="7px"
          h="7px"
          borderRadius="full"
          bg="var(--accent)"
          border="1.5px solid"
          borderColor="var(--bg)"
        />
      )}
      <Icon size={22} weight={active ? 'fill' : 'bold'} />
      <Text
        as="span"
        fontSize="10.5px"
        fontWeight={500}
        lineHeight="1.1"
        noOfLines={1}
        maxW="100%"
      >
        {dest.label}
      </Text>
    </Flex>
  );
};

const VendorBottomBar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { unlockedTrades, rejectedPurchases } = useVendorLedger();
  const [moreOpen, setMoreOpen] = useState(false);

  const moreActive = moreOpen || location.pathname.startsWith('/vendor/profile');

  return (
    <>
      <Flex
        as="nav"
        aria-label="Main"
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        zIndex={30}
        bg="var(--bg)"
        borderTop="1px solid"
        borderColor="var(--hairline)"
        px="4px"
        pt="6px"
        pb="calc(10px + env(safe-area-inset-bottom, 0px))"
      >
        {TABS_MOBILE.map((id) => {
          const dest = DESTINATIONS[id];
          const to = id === 'buy' ? getBuyPath() : id === 'history' ? getHistoryPath() : dest.to;
          const active = isDestActive(dest, location.pathname, location.search);
          const badge =
            (id === 'wallet' && unlockedTrades.length > 0) ||
            (id === 'history' && rejectedPurchases.length > 0);
          return (
            <TabButton
              key={id}
              dest={{ ...dest, to }}
              active={active}
              badge={badge}
              onClick={() => setMoreOpen(false)}
            />
          );
        })}
        <Flex
          as="button"
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          direction="column"
          align="center"
          justify="center"
          gap="3px"
          flex="1"
          minW={0}
          minH="48px"
          px="2px"
          pt="6px"
          pb="6px"
          position="relative"
          color={moreActive ? 'var(--text)' : 'var(--text-3)'}
          borderRadius="var(--r-control)"
          _active={{ bg: 'var(--panel-2)' }}
          aria-label="More"
          aria-haspopup="dialog"
          aria-expanded={moreOpen}
        >
          {moreActive && (
            <Box
              position="absolute"
              top="0"
              left="50%"
              transform="translateX(-50%)"
              w="22px"
              h="3px"
              bg="var(--accent)"
              borderRadius="0 0 3px 3px"
            />
          )}
          <DotsThree size={22} weight="bold" />
          <Text as="span" fontSize="10.5px" fontWeight={500} lineHeight="1.1">
            More
          </Text>
        </Flex>
      </Flex>
      <MoreSheet
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        pathname={location.pathname}
        search={location.search}
        onLogout={logout}
      />
    </>
  );
};

export default VendorBottomBar;
