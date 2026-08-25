import React, { useEffect, useMemo, useState } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { useAuth } from '../../AppContext';
import VendorShell from '../../components/layout/VendorShell';
import LedgerTable from '../../components/common/LedgerTable';
import Money from '../../components/common/Money';
import Alert from '../../components/common/Alert';
import { UsersThree } from '@phosphor-icons/react';

const MyReferralsPage = ({ url }) => {
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
        const res = await fetch(`${url}/api/vendor/dashboard/my-referrals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || 'Could not load referrals');
        setData(Array.isArray(json) ? json : []);
      } catch (e) {
        setErr(e.message || 'Could not load referrals');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token, url]);

  const filtered = useMemo(() => {
    if (!q) return data;
    const term = q.toLowerCase();
    return data.filter((r) => {
      const name = String(r.name || '').toLowerCase();
      const email = String(r.email || '').toLowerCase();
      const id = String(r.id || '').toLowerCase();
      return name.includes(term) || email.includes(term) || id.includes(term);
    });
  }, [data, q]);

  const columns = [
    { key: 'name', header: 'Name', render: (r) => r.name || '—' },
    {
      key: 'purchaseCount',
      header: 'Purchases',
      numeric: true,
      sortValue: (r) => Number(r.purchaseCount) || 0,
      render: (r) => r.purchaseCount || 0,
    },
    {
      key: 'totalSpent',
      header: 'Spent',
      numeric: true,
      sortValue: (r) => Number(r.totalSpent) || 0,
      render: (r) => <Money value={r.totalSpent} />,
    },
  ];

  return (
    <VendorShell title="Referrals" url={url}>
      <Input
        maxW="420px"
        mb={4}
        placeholder="Search by name"
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
            getRowId={(r, i) => r.id || `${r.name}-${i}`}
            countLabel={`${data.length} referral${data.length === 1 ? '' : 's'}`}
            emptyIcon={UsersThree}
            emptyHeadline={q ? 'No matching referrals' : 'No referrals yet'}
            emptyBody="Share your referral link from the command palette or profile."
          />
        </Box>
      )}
    </VendorShell>
  );
};

export default MyReferralsPage;
