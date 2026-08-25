import React, { useMemo, useState } from 'react';
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from '@chakra-ui/react';
import { CaretUp, CaretDown } from '@phosphor-icons/react';
import EmptyState from './EmptyState';
import { SkeletonRows } from './Skeleton';

const LedgerTable = ({
  columns = [],
  rows = [],
  loading = false,
  emptyHeadline = 'Nothing here yet',
  emptyBody,
  emptyIcon,
  selectedId,
  onSelect,
  getRowId,
  countLabel,
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('desc');

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find((c) => c.key === sortKey);
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = col?.sortValue ? col.sortValue(a) : a[sortKey];
      const bv = col?.sortValue ? col.sortValue(b) : b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [rows, sortKey, sortDir, columns]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  if (loading) return <SkeletonRows count={6} />;
  if (!rows.length) {
    return <EmptyState icon={emptyIcon} headline={emptyHeadline} body={emptyBody} />;
  }

  return (
    <Box>
      <Text fontFamily="var(--f-num)" fontSize="12.5px" color="var(--text-3)" mb={2}>
        {countLabel || `${sorted.length} result${sorted.length === 1 ? '' : 's'}`}
      </Text>
      <TableContainer display={{ base: 'none', md: 'block' }}>
        <Table size="sm" variant="unstyled">
          <Thead position="sticky" top={0} zIndex={1}>
            <Tr>
              {columns.map((col) => (
                <Th
                  key={col.key}
                  isNumeric={col.numeric}
                  cursor={col.sortable === false ? 'default' : 'pointer'}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                  py={3}
                >
                  <Flex align="center" justify={col.numeric ? 'flex-end' : 'flex-start'} gap={1}>
                    {col.header}
                    {sortKey === col.key && (sortDir === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />)}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {sorted.map((row, i) => {
              const id = getRowId ? getRowId(row) : row.id || i;
              const selected = selectedId != null && selectedId === id;
              return (
                <Tr
                  key={id}
                  onClick={() => onSelect && onSelect(row)}
                  bg={selected ? 'var(--panel-2)' : 'transparent'}
                  _hover={{ bg: 'var(--panel)' }}
                  cursor={onSelect ? 'pointer' : 'default'}
                  position="relative"
                  borderBottom="1px solid"
                  borderColor="var(--hairline)"
                  boxShadow={selected ? 'inset 3px 0 0 var(--accent)' : 'none'}
                >
                  {columns.map((col) => (
                    <Td
                      key={col.key}
                      isNumeric={col.numeric}
                      py={3}
                      fontFamily={col.numeric || col.mono ? 'var(--f-num)' : 'var(--f-body)'}
                      fontSize="13.5px"
                      color="var(--text)"
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Box display={{ base: 'flex', md: 'none' }} flexDirection="column" gap={3}>
        {sorted.map((row, i) => {
          const id = getRowId ? getRowId(row) : row.id || i;
          return (
            <Box
              key={id}
              bg="var(--panel)"
              border="1px solid"
              borderColor="var(--border)"
              borderRadius="var(--r-structure)"
              p={4}
            >
              {columns.map((col) => (
                <Flex key={col.key} justify="space-between" gap={3} py="6px">
                  <Text fontSize="12px" color="var(--text-3)" textTransform="uppercase" letterSpacing="0.04em">
                    {col.header}
                  </Text>
                  <Box textAlign="right" fontSize="13.5px" color="var(--text)">
                    {col.render ? col.render(row) : row[col.key]}
                  </Box>
                </Flex>
              ))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default LedgerTable;
