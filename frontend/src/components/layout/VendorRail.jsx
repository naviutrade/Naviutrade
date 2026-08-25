import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Image, Tooltip } from '@chakra-ui/react';
import { UserCircle, SignOut } from '@phosphor-icons/react';
import { useAuth } from '../../AppContext';
import { DESTINATIONS, RAIL_DESKTOP, isDestActive } from './nav.config';

const RailButton = ({ icon: Icon, label, to, onClick, active, danger }) => (
  <Tooltip label={label} placement="right" hasArrow openDelay={200}>
    <Flex
      as={to ? RouterLink : 'button'}
      to={to || undefined}
      onClick={onClick}
      type={to ? undefined : 'button'}
      align="center"
      justify="center"
      w="48px"
      h="48px"
      minW="48px"
      minH="48px"
      borderRadius="var(--r-control)"
      position="relative"
      bg={active ? 'rgba(255,255,255,0.13)' : 'transparent'}
      color={danger ? 'var(--bad)' : active ? '#fff' : 'var(--rail-text)'}
      _hover={{ bg: 'rgba(255,255,255,0.09)', color: '#fff' }}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      title={label}
    >
      {active && (
        <Box
          position="absolute"
          left="-1px"
          top="12px"
          bottom="12px"
          w="3px"
          bg="var(--accent)"
          borderRadius="0 2px 2px 0"
        />
      )}
      <Icon size={23} weight={active ? 'fill' : 'bold'} />
    </Flex>
  </Tooltip>
);

const VendorRail = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <Flex
      as="nav"
      aria-label="Vendor sections"
      direction="column"
      align="center"
      h="100vh"
      w="var(--rail-w)"
      bg="var(--rail)"
      py={4}
      gap="4px"
      position="sticky"
      top="0"
    >
      <Image src="/rouvin.png" alt="Rouvin" w="36px" h="36px" mb="14px" objectFit="contain" />
      {RAIL_DESKTOP.map((id) => {
        const dest = DESTINATIONS[id];
        return (
          <RailButton
            key={id}
            icon={dest.Icon}
            label={dest.railLabel || dest.label}
            to={dest.to}
            active={isDestActive(dest, location.pathname, location.search)}
          />
        );
      })}
      <Box flex="1" />
      <RailButton
        icon={UserCircle}
        label="Profile"
        to="/vendor/profile"
        active={isDestActive(DESTINATIONS.profile, location.pathname, location.search)}
      />
      <RailButton icon={SignOut} label="Log out" onClick={logout} danger />
    </Flex>
  );
};

export default VendorRail;
