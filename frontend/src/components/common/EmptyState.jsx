import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { Package } from '@phosphor-icons/react';

const EmptyState = ({
  icon: Icon = Package,
  headline,
  body,
  actionLabel,
  onAction,
  actionTo,
}) => (
  <VStack spacing={3} py={8} px={4} textAlign="center">
    <Box color="var(--text-3)" aria-hidden="true">
      <Icon size={48} weight="bold" />
    </Box>
    <Text
      fontFamily="var(--f-display)"
      fontWeight={700}
      fontSize="20px"
      lineHeight="25px"
      letterSpacing="-0.01em"
      color="var(--text)"
    >
      {headline}
    </Text>
    {body && (
      <Text fontSize="13.5px" color="var(--text-2)" maxW="52ch">
        {body}
      </Text>
    )}
    {actionLabel && (
      <Button
        variant="rvSolid"
        size="sm"
        onClick={onAction}
        as={actionTo ? RouterLink : undefined}
        to={actionTo}
      >
        {actionLabel}
      </Button>
    )}
  </VStack>
);

export default EmptyState;
