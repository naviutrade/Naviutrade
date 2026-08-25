import {
  SquaresFour,
  Package,
  Leaf,
  Receipt,
  Wallet,
  Gift,
  UsersThree,
  UserCircle,
  ClockCounterClockwise,
} from '@phosphor-icons/react';

export const DESTINATIONS = {
  dashboard: {
    id: 'dashboard',
    label: 'Home',
    railLabel: 'Dashboard',
    to: '/vendor/dashboard',
    Icon: SquaresFour,
    match: ['/vendor/dashboard'],
  },
  products: {
    id: 'products',
    label: 'Products',
    to: '/vendor/products',
    Icon: Package,
    match: ['/vendor/products'],
  },
  buy: {
    id: 'buy',
    label: 'Buy',
    to: '/vendor/products',
    Icon: Package,
    match: ['/vendor/products', '/vendor/wild-products'],
  },
  wild: {
    id: 'wild',
    label: 'Wild products',
    to: '/vendor/wild-products',
    Icon: Leaf,
    match: ['/vendor/wild-products'],
  },
  purchases: {
    id: 'purchases',
    label: 'Purchases',
    to: '/vendor/purchase-history',
    Icon: Receipt,
    match: ['/vendor/purchase-history'],
  },
  history: {
    id: 'history',
    label: 'History',
    to: '/vendor/purchase-history',
    Icon: Receipt,
    match: ['/vendor/purchase-history', '/vendor/activity', '/vendor/referrals'],
  },
  wallet: {
    id: 'wallet',
    label: 'Wallet',
    to: '/vendor/wallet',
    Icon: Wallet,
    match: ['/vendor/wallet'],
  },
  claims: {
    id: 'claims',
    label: 'Claims',
    to: '/vendor/wallet?view=earnings',
    Icon: Gift,
    match: ['/vendor/wallet?view=earnings'],
  },
  referrals: {
    id: 'referrals',
    label: 'Referrals',
    to: '/vendor/referrals',
    Icon: UsersThree,
    match: ['/vendor/referrals'],
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    to: '/vendor/profile',
    Icon: UserCircle,
    match: ['/vendor/profile'],
  },
  activity: {
    id: 'activity',
    label: 'Activity',
    to: '/vendor/activity',
    Icon: ClockCounterClockwise,
    match: ['/vendor/activity'],
  },
};

export const RAIL_DESKTOP = ['dashboard', 'products', 'wild', 'purchases', 'wallet', 'claims', 'referrals'];
export const TABS_MOBILE = ['dashboard', 'buy', 'wallet', 'history'];
export const MORE_MOBILE = ['wild', 'claims', 'referrals', 'profile'];

export const BUY_SEGMENTS = [
  { id: 'reg', label: 'Regular', to: '/vendor/products' },
  { id: 'wild', label: 'Wild', to: '/vendor/wild-products' },
];

export const HISTORY_SEGMENTS = [
  { id: 'purchases', label: 'Purchases', to: '/vendor/purchase-history' },
  { id: 'activity', label: 'Activity', to: '/vendor/activity' },
  { id: 'referrals', label: 'Referrals', to: '/vendor/referrals' },
];

export const isDestActive = (dest, pathname, search) => {
  if (!dest) return false;
  if (dest.id === 'claims') {
    return pathname.startsWith('/vendor/wallet') && search.includes('view=earnings');
  }
  if (dest.id === 'wallet') {
    return pathname.startsWith('/vendor/wallet');
  }
  if (dest.id === 'products') {
    return pathname.startsWith('/vendor/products');
  }
  return (dest.match || [dest.to.split('?')[0]]).some((path) => pathname.startsWith(path));
};

const BUY_KEY = 'rv-last-buy';
const HISTORY_KEY = 'rv-last-history';

export const rememberNavSegment = (pathname) => {
  try {
    if (pathname.startsWith('/vendor/wild-products')) sessionStorage.setItem(BUY_KEY, 'wild');
    else if (pathname.startsWith('/vendor/products')) sessionStorage.setItem(BUY_KEY, 'reg');
    if (pathname.startsWith('/vendor/activity')) sessionStorage.setItem(HISTORY_KEY, 'activity');
    else if (pathname.startsWith('/vendor/referrals')) sessionStorage.setItem(HISTORY_KEY, 'referrals');
    else if (pathname.startsWith('/vendor/purchase-history')) sessionStorage.setItem(HISTORY_KEY, 'purchases');
  } catch {
    /* ignore */
  }
};

export const getBuyPath = () => {
  try {
    return sessionStorage.getItem(BUY_KEY) === 'wild' ? '/vendor/wild-products' : '/vendor/products';
  } catch {
    return '/vendor/products';
  }
};

export const getHistoryPath = () => {
  try {
    const last = sessionStorage.getItem(HISTORY_KEY);
    if (last === 'activity') return '/vendor/activity';
    if (last === 'referrals') return '/vendor/referrals';
  } catch {
    /* ignore */
  }
  return '/vendor/purchase-history';
};

export const mobileTitleFor = (pathname) => {
  if (pathname.startsWith('/vendor/products') || pathname.startsWith('/vendor/wild-products')) return 'Buy';
  if (
    pathname.startsWith('/vendor/purchase-history') ||
    pathname.startsWith('/vendor/activity') ||
    pathname.startsWith('/vendor/referrals')
  ) {
    return 'History';
  }
  return null;
};

export const mobileSegmentsFor = (pathname) => {
  if (pathname.startsWith('/vendor/products') || pathname.startsWith('/vendor/wild-products')) {
    return BUY_SEGMENTS.map((seg) => ({
      ...seg,
      active: seg.id === 'wild'
        ? pathname.startsWith('/vendor/wild-products')
        : pathname.startsWith('/vendor/products'),
    }));
  }
  if (
    pathname.startsWith('/vendor/purchase-history') ||
    pathname.startsWith('/vendor/activity') ||
    pathname.startsWith('/vendor/referrals')
  ) {
    return HISTORY_SEGMENTS.map((seg) => ({
      ...seg,
      active: pathname.startsWith(seg.to),
    }));
  }
  return null;
};
