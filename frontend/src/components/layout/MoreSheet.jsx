import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  Text,
} from '@chakra-ui/react';
import { Bank, CaretRight, SignOut } from '@phosphor-icons/react';
import { DESTINATIONS, MORE_MOBILE, isDestActive } from './nav.config';

const MoreSheet = ({ isOpen, onClose, pathname, search, onLogout }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} autoFocus={false} blockScrollOnMount>
      <DrawerOverlay bg="rgba(6, 11, 22, 0.52)" />
      <DrawerContent
        bg="var(--bg)"
        borderTopRadius="18px"
        borderTop="1px solid"
        borderColor="var(--border)"
        maxH="78vh"
        pb="env(safe-area-inset-bottom)"
      >
        <DrawerBody px={4} pt={2} pb={5}>
          <Box w="38px" h="4px" borderRadius="2px" bg="var(--border)" mx="auto" mb={3} />
          <Text
            fontFamily="var(--f-display)"
            fontWeight={600}
            fontSize="13px"
            letterSpacing="0.06em"
            textTransform="uppercase"
            color="var(--text-3)"
            mb={3}
          >
            More
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            {MORE_MOBILE.map((id) => {
              const dest = DESTINATIONS[id];
              const Icon = dest.Icon;
              const active = isDestActive(dest, pathname, search);
              return (
                <Flex
                  key={id}
                  as={RouterLink}
                  to={dest.to}
                  onClick={onClose}
                  direction="column"
                  align="center"
                  justify="center"
                  gap="7px"
                  minH="80px"
                  px={2}
                  py={3}
                  bg="var(--panel)"
                  border="1px solid"
                  borderColor={active ? 'var(--accent)' : 'var(--border)'}
                  borderRadius="var(--r-structure)"
                  color={active ? 'var(--text)' : 'var(--text)'}
                  fontSize="12px"
                  fontWeight={500}
                  textAlign="center"
                  _active={{ bg: 'var(--panel-2)' }}
                >
                  <Box color="var(--text-2)">
                    <Icon size={23} weight={active ? 'fill' : 'bold'} />
                  </Box>
                  {dest.label}
                </Flex>
              );
            })}
          </Grid>
          <Box mt={3}>
            <Flex
              as={RouterLink}
              to="/vendor/wallet?action=withdraw"
              onClick={onClose}
              align="center"
              gap={3}
              minH="48px"
              px={2}
              borderRadius="var(--r-control)"
              color="var(--text)"
              fontSize="14px"
              _active={{ bg: 'var(--panel-2)' }}
            >
              <Box color="var(--text-3)"><Bank size={20} weight="bold" /></Box>
              Request a withdrawal
              <Box ml="auto" color="var(--text-3)"><CaretRight size={16} /></Box>
            </Flex>
            <Flex
              as="button"
              type="button"
              onClick={() => {
                onClose();
                onLogout();
              }}
              align="center"
              gap={3}
              minH="48px"
              px={2}
              w="full"
              borderRadius="var(--r-control)"
              color="var(--bad)"
              fontSize="14px"
              textAlign="left"
              _active={{ bg: 'var(--panel-2)' }}
            >
              <SignOut size={20} weight="bold" />
              Log out
            </Flex>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MoreSheet;
