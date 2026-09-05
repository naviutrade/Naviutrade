import React, { useEffect, useMemo, useState } from 'react';
import { formatISTDate } from '../../utils/dateUtils';
import { Box, Input } from '@chakra-ui/react';
import { useAuth } from '../../AppContext';
import VendorShell from '../../components/layout/VendorShell';
import LedgerTable from '../../components/common/LedgerTable';
import Money from '../../components/common/Money';
import Alert from '../../components/common/Alert';
import { ClockCountdown } from '@phosphor-icons/react';

const RecentActivityPage = ({ url }) => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      if (!token) return;
      setLoading(true);
      setErr('');
      try {
        const res = await fetch(`${url}/api/vendor/dashboard/recent-activity?limit=500`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || 'Could not load activity');
        setData(Array.isArray(json) ? json : []);
      } catch (e) {
        setErr(e.message || 'Could not load activity');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token, url]);

  const filtered = useMemo(() => {
    if (!q) return data;
    const term = q.toLowerCase();
    return data.filter((tx) => {
      const type = String(tx.transaction_type || '').toLowerCase();
      const desc = String(tx.description || '').toLowerCase();
      const id = String(tx.trans_id || '').toLowerCase();
      const date = tx.created_at ? formatISTDate(tx.created_at, true, true).toLowerCase() : '';
      const amount = tx.amount != null ? String(tx.amount) : '';
      const upi = String(tx.upi_transaction_id || '').toLowerCase();
      return type.includes(term) || desc.includes(term) || id.includes(term) || date.includes(term) || amount.includes(term) || upi.includes(term);
    });
  }, [data, q]);

  const columns = [
    {
      key: 'transaction_type',
      header: 'Type',
      render: (tx) => String(tx.transaction_type || '').replace(/wild/gi, 'elite').replace(/_/g, ' '),
    },
    {
      key: 'created_at',
      header: 'Date',
      mono: true,
      sortValue: (tx) => tx.created_at || '',
      render: (tx) => (tx.created_at ? `${formatISTDate(tx.created_at, true, true)} · IST` : '—'),
    },
    {
      key: 'description',
      header: 'Detail',
      render: (tx) => tx.description || tx.upi_transaction_id || '—',
    },
    {
      key: 'amount',
      header: 'Amount',
      numeric: true,
      sortValue: (tx) => Number(tx.amount) || 0,
      render: (tx) => <Money value={tx.amount} signed />,
    },
  ];

  return (
    <VendorShell title="Recent activity" url={url}>
      <Input
        maxW="420px"
        mb={4}
        placeholder="Search by type, amount, date or description"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {err ? (
        <Alert tone="bad">{err}</Alert>
      ) : (
        <Box bg="var(--panel)" p="var(--pad-panel)" borderRadius="var(--r-structure)" border="1px solid" borderColor="var(--border)">
          <LedgerTable
            columns={columns}
            rows={filtered}
            loading={loading}
            getRowId={(tx) => tx.trans_id}
            emptyIcon={ClockCountdown}
            emptyHeadline={q ? 'No matching activity' : 'No activity yet'}
            emptyBody="Wallet, trades and claims will appear here as they happen."
          />
        </Box>
      )}
    </VendorShell>
  );
};

export default RecentActivityPage;
