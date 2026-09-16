import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import {
  Home,
  Laptop,
  Leaf,
  Calculator,
  LogIn,
  UserPlus,
  Menu,
  X,
  Compass,
  Shield,
} from 'lucide-react';
import './portal.css';

const NAV = [
  { to: '/', id: 'home', label: 'Home Summary', Icon: Home },
  { to: '/it-consultancy', id: 'it', label: 'IT Consultancy', Icon: Laptop },
  { to: '/tomato-export', id: 'tomato', label: 'Tomato Trade', Icon: Leaf },
  { to: '/payroll', id: 'payroll', label: 'Payroll Management', Icon: Calculator },
];

const navClass = (id, pathname) => {
  const active =
    (id === 'home' && pathname === '/') ||
    (id === 'it' && pathname.startsWith('/it-consultancy')) ||
    (id === 'tomato' && pathname.startsWith('/tomato-export')) ||
    (id === 'payroll' && pathname.startsWith('/payroll'));
  return `rv-p-nav-btn${active ? ` is-${id}` : ''}`;
};

const PortalLayout = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="rv-portal">
      <header className="rv-p-nav">
        <div className="rv-p-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
          <RouterLink to="/" className="rv-p-brand" onClick={() => setMenuOpen(false)}>
            <img src="/rouvin.png" alt="Rouvin" className="rv-p-logo" />
          </RouterLink>

          <nav className="rv-p-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV.map(({ to, id, label, Icon }) => (
              <RouterLink key={id} to={to} className={navClass(id, pathname)}>
                <Icon size={14} />
                <span>{label}</span>
              </RouterLink>
            ))}
          </nav>

          <div className="rv-p-auth-desktop" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <RouterLink to="/login" target="_blank" rel="noopener noreferrer" className="rv-p-btn rv-p-btn-ghost">
              <LogIn size={14} color="#0284c7" />
              Log In
            </RouterLink>
            <RouterLink to="/register" target="_blank" rel="noopener noreferrer" className="rv-p-btn rv-p-btn-grad">
              <UserPlus size={14} />
              Register
            </RouterLink>
          </div>

          <button
            type="button"
            className="rv-p-menu-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{ padding: 10, border: 0, background: 'transparent', borderRadius: 8, cursor: 'pointer', color: '#475569' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`rv-p-mobile${menuOpen ? ' open' : ''}`}>
          {NAV.map(({ to, id, label, Icon }) => (
            <RouterLink key={id} to={to} onClick={() => setMenuOpen(false)}>
              <Icon size={16} /> {label}
            </RouterLink>
          ))}
          <div className="rv-p-auth-mobile" style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
            <RouterLink to="/login" target="_blank" rel="noopener noreferrer" className="rv-p-btn rv-p-btn-ghost" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
              <LogIn size={14} /> Log In
            </RouterLink>
            <RouterLink to="/register" target="_blank" rel="noopener noreferrer" className="rv-p-btn rv-p-btn-grad" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
              <UserPlus size={14} /> Register
            </RouterLink>
          </div>
        </div>
      </header>

      <main style={{ flexGrow: 1 }}>
        <div key={pathname} className="rv-p-page">
          <Outlet />
        </div>
      </main>

      <footer className="rv-p-footer">
        <div className="rv-p-footer-orbs" aria-hidden="true">
          <span className="rv-p-footer-orb rv-p-footer-orb-a" />
          <span className="rv-p-footer-orb rv-p-footer-orb-b" />
        </div>
        <div className="rv-p-wrap rv-p-footer-inner">
          <div className="rv-p-footer-grid">
            <div className="rv-p-footer-brand">
              <RouterLink to="/" className="rv-p-brand">
                <img src="/rouvin.png" alt="Rouvin" className="rv-p-logo rv-p-logo-sm rv-p-footer-logo" />
              </RouterLink>
              <p>
                Empowering businesses with modern IT consultancy, global produce export/import logistics, and complete payroll automation.
              </p>
            </div>
            <div>
              <h5 className="rv-p-footer-h">
                <Compass size={14} /> Quick Navigation
              </h5>
              <nav className="rv-p-footer-links">
                {NAV.map(({ to, label }) => (
                  <RouterLink key={to} to={to}>{label}</RouterLink>
                ))}
              </nav>
            </div>
            <div>
              <h5 className="rv-p-footer-h">
                <Shield size={14} /> Account Portal
              </h5>
              <div className="rv-p-footer-auth">
                <RouterLink to="/login" target="_blank" rel="noopener noreferrer" className="rv-p-footer-login">
                  <LogIn size={13} /> Log In
                </RouterLink>
                <RouterLink to="/register" target="_blank" rel="noopener noreferrer" className="rv-p-footer-register">
                  <UserPlus size={13} /> Register Account
                </RouterLink>
              </div>
            </div>
          </div>
          <div className="rv-p-footer-legal">
            <div>© 2026 Rouvin Portal. All rights reserved.</div>
            <div className="rv-p-footer-meta">
              <span>Privacy Policy</span>
              <span className="rv-p-footer-dot" />
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortalLayout;
