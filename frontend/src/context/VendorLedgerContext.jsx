import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../AppContext';

const VendorLedgerContext = createContext(null);

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const VendorLedgerProvider = ({ children, url = '' }) => {
  const { token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [held, setHeld] = useState(0);
  const [unrealised, setUnrealised] = useState(0);
  const [activeTrades, setActiveTrades] = useState([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [rejectedPurchases, setRejectedPurchases] = useState([]);
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);
  const [withdrawalWindow, setWithdrawalWindow] = useState({ allowed: true });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [walletRes, kpiRes, tradesRes, wdRes, histRes, windowRes] = await Promise.all([
        fetch(`${url}/api/wallet`, { headers }),
        fetch(`${url}/api/vendor/dashboard/kpis`, { headers }),
        fetch(`${url}/api/trading/active`, { headers }),
        fetch(`${url}/api/wallet/withdrawals`, { headers }),
        fetch(`${url}/api/trading/history`, { headers }),
        fetch(`${url}/api/wallet/withdrawal-window`, { headers }),
      ]);

      if (walletRes.ok) {
        const wallet = await walletRes.json();
        setBalance(num(wallet.digital_money));
        setHasPendingWithdrawal(Boolean(wallet.hasPendingWithdrawal));
      }
      if (kpiRes.ok) {
        const kpis = await kpiRes.json();
        setHeld(num(kpis.activeInvestmentValue));
      }
      let trades = [];
      if (tradesRes.ok) {
        const data = await tradesRes.json();
        trades = Array.isArray(data) ? data : [];
        setActiveTrades(trades);
        const u = trades.reduce((sum, t) => {
          const buy = num(t.purchase_price);
          const sell = num(t.current_selling_price);
          const qty = num(t.no_of_stock_bought);
          return sum + (sell - buy) * qty;
        }, 0);
        setUnrealised(u);
      }
      if (wdRes.ok) {
        const data = await wdRes.json();
        const list = Array.isArray(data) ? data : [];
        setPendingWithdrawals(list.filter((tx) => tx.status === 'pending'));
      }
      if (histRes.ok) {
        const data = await histRes.json();
        const list = Array.isArray(data) ? data : [];
        setRejectedPurchases(list.filter((p) => p.is_approved === 'rejected'));
      }
      if (windowRes.ok) {
        const data = await windowRes.json();
        setWithdrawalWindow(data || { allowed: true });
      }
    } catch (err) {
      console.error('Vendor ledger refresh failed', err);
    } finally {
      setLoading(false);
    }
  }, [token, url]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onRefresh = () => refresh();
    window.addEventListener('rv-ledger-refresh', onRefresh);
    return () => window.removeEventListener('rv-ledger-refresh', onRefresh);
  }, [refresh]);

  const unlockedTrades = useMemo(
    () => activeTrades.filter((t) => !t.is_locked),
    [activeTrades]
  );

  const value = {
    url,
    balance,
    held,
    unrealised,
    activeTrades,
    unlockedTrades,
    pendingWithdrawals,
    rejectedPurchases,
    hasPendingWithdrawal,
    withdrawalWindow,
    loading,
    refresh,
  };

  return <VendorLedgerContext.Provider value={value}>{children}</VendorLedgerContext.Provider>;
};

export const useVendorLedger = () => {
  const ctx = useContext(VendorLedgerContext);
  if (!ctx) {
    return {
      url: '',
      balance: 0,
      held: 0,
      unrealised: 0,
      activeTrades: [],
      unlockedTrades: [],
      pendingWithdrawals: [],
      rejectedPurchases: [],
      hasPendingWithdrawal: false,
      withdrawalWindow: { allowed: true },
      loading: true,
      refresh: () => {},
    };
  }
  return ctx;
};

export const requestLedgerRefresh = () => {
  window.dispatchEvent(new Event('rv-ledger-refresh'));
};
