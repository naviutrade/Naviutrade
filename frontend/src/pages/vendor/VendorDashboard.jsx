import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../AppContext';
import VendorShell from '../../components/layout/VendorShell';
import DashboardOverview from '../../components/vendordashboard/DashboardOverview';
import VendorTradingSection from '../../components/vendordashboard/VendorTradingSection';

const VendorDashboard = ({ url }) => {
  const { token } = useAuth();

  const [stats, setStats] = useState({
    purchasedProducts: 0,
    purchasedValue: 0,
    pendingTradeApprovals: 0,
    availableProducts: 0,
    availableWildProducts: 0,
    sellableTradesCount: 0,
    totalProfitEarned: 0,
  });

  const fetchAllStats = useCallback(async () => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [vendorResponse, productCountResponse, totalProfitResponse, wildProductCountResponse] = await Promise.all([
        fetch(`${url}/api/vendor/stats/dashboard`, { headers }),
        fetch(`${url}/api/products/stats/available-count`, { headers }),
        fetch(`${url}/api/trading/total-profit`, { headers }),
        fetch(`${url}/api/wild-products/stats/available-count`, { headers }),
      ]);
      if (!vendorResponse.ok || !productCountResponse.ok || !totalProfitResponse.ok || !wildProductCountResponse.ok) {
        throw new Error('Failed to fetch one or more vendor stats.');
      }
      const vendorStats = await vendorResponse.json();
      const productCountStats = await productCountResponse.json();
      const totalProfitData = await totalProfitResponse.json();
      const wildProductCountStats = await wildProductCountResponse.json();
      setStats((prev) => ({
        ...prev,
        ...vendorStats,
        availableProducts: productCountStats.availableProducts ?? 0,
        availableWildProducts: wildProductCountStats.availableWildProducts ?? 0,
        totalProfitEarned: totalProfitData.totalProfit || 0,
      }));
    } catch (error) {
      console.error('Error fetching vendor dashboard stats:', error);
    }
  }, [token, url]);

  useEffect(() => {
    if (token) fetchAllStats();
  }, [fetchAllStats, token]);

  document.title = 'Rouvin | Dashboard';

  return (
    <VendorShell title="Dashboard" url={url}>
      <VendorTradingSection stats={stats} url={url} />
      <DashboardOverview url={url} />
    </VendorShell>
  );
};

export default VendorDashboard;
