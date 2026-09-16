import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Laptop,
  Globe,
  Calculator,
  Shield,
  Truck,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Package,
} from 'lucide-react';
import { Reveal } from '../../components/public/portalBits';

const PortalHomePage = () => {
  useEffect(() => {
    document.title = 'Rouvin | IT Consultancy, Tomato Trade & Payroll Solutions';
  }, []);

  return (
    <>
      <div className="rv-p-hero rv-p-hero-home">
        <div className="rv-p-dots" />
        <div className="rv-p-blob rv-p-blob-a rv-p-glow" />
        <div className="rv-p-blob rv-p-blob-b rv-p-glow" />

        <div
          className="rv-p-float rv-p-lg-only"
          style={{
            position: 'absolute',
            top: 64,
            left: 48,
            alignItems: 'center',
            gap: 12,
            background: 'rgba(15,23,42,0.8)',
            border: '1px solid #334155',
            padding: '10px 16px',
            borderRadius: 16,
          }}
        >
          <div className="rv-p-icon" style={{ width: 32, height: 32, background: 'rgba(139,92,246,0.2)', color: '#a78bfa' }}>
            <Shield size={16} />
          </div>
          <div style={{ fontSize: 12, textAlign: 'left' }}>
            <div style={{ fontWeight: 700 }}>Enterprise Security</div>
            <div style={{ color: '#94a3b8' }}>Cybersecurity & Audit</div>
          </div>
        </div>
        <div
          className="rv-p-float-d rv-p-lg-only"
          style={{
            position: 'absolute',
            bottom: 64,
            right: 48,
            alignItems: 'center',
            gap: 12,
            background: 'rgba(15,23,42,0.8)',
            border: '1px solid #334155',
            padding: '10px 16px',
            borderRadius: 16,
          }}
        >
          <div className="rv-p-icon" style={{ width: 32, height: 32, background: 'rgba(244,63,94,0.2)', color: '#fb7185' }}>
            <Truck size={16} />
          </div>
          <div style={{ fontSize: 12, textAlign: 'left' }}>
            <div style={{ fontWeight: 700 }}>Global Logistics</div>
            <div style={{ color: '#94a3b8' }}>Fresh Produce Freight</div>
          </div>
        </div>

        <div className="rv-p-wrap rv-p-hero-copy" style={{ position: 'relative', zIndex: 1 }}>
          <span
            className="rv-p-chip sky"
            style={{ marginBottom: 24, background: 'rgba(14,165,233,0.1)', color: '#38bdf8', borderColor: 'rgba(14,165,233,0.2)' }}
          >
            Integrated Multi-Service Enterprise Portal
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', maxWidth: 880, margin: '16px auto 0', lineHeight: 1.15 }}>
            Technology Solutions, Global Trade & Corporate Payroll
          </h1>
          <p style={{ margin: '24px auto 0', fontSize: 'clamp(16px, 2vw, 20px)', color: '#cbd5e1', maxWidth: 720, lineHeight: 1.7 }}>
            Drive business growth with tailored IT consultancy, streamline produce logistics with international fresh tomato trading, and automate your entire payroll workflow.
          </p>
          <div className="rv-p-hero-actions">
            <RouterLink to="/it-consultancy" className="rv-p-btn rv-p-btn-solid violet">
              <Laptop size={16} /> IT Consultancy Hub <ArrowRight size={12} />
            </RouterLink>
            <RouterLink to="/tomato-export" className="rv-p-btn rv-p-btn-solid rose">
              <Globe size={16} /> Tomato Import & Export <ArrowRight size={12} />
            </RouterLink>
            <RouterLink to="/payroll" className="rv-p-btn rv-p-btn-solid sky">
              <Calculator size={16} /> Payroll Management <ArrowRight size={12} />
            </RouterLink>
          </div>
        </div>
      </div>

      <div className="rv-p-wrap rv-p-section">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="rv-p-chip sky">Integrated Services</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: '#0f172a', marginTop: 12 }}>
              Explore Our Three Primary Divisions
            </h2>
            <p style={{ color: '#475569', maxWidth: 640, margin: '12px auto 0' }}>
              Click on any card below to navigate directly to the dedicated detail page and access specialized services.
            </p>
          </div>
        </Reveal>

        <div className="rv-p-split">
          <Reveal delay={0}>
          <HomeCard
            accent="violet"
            badge="Division 01"
            icon={Laptop}
            title="IT Consultancy Services"
            text="Smart technology solutions for your business. From IT strategy, software & app development to cybersecurity, cloud migration, and tech support."
            items={['IT Strategy & Digital Transformation', 'Custom Software & Web Applications', 'Cybersecurity & Cloud Migration']}
            to="/it-consultancy"
            cta="Go to IT Consultancy Page"
          />
          </Reveal>
          <Reveal delay={120}>
          <HomeCard
            accent="rose"
            badge="Division 02"
            icon={Globe}
            title="Tomato Export & Import"
            text="Fresh tomatoes, reliable supply, global markets. Sourcing directly from orchards with strict grading, cold-chain, and packaging."
            items={['Premium & Transport Grading', 'Cold-Chain & Custom Packaging', 'Global Logistics & Documentation']}
            to="/tomato-export"
            cta="Go to Tomato Trade Page"
          />
          </Reveal>
          <Reveal delay={240}>
          <HomeCard
            accent="sky"
            badge="Division 03"
            icon={Calculator}
            title="Payroll Management"
            text="Simplify your payroll and empower your employees with accurate salary processing, statutory compliance (PF/ESI/TDS), and payslips."
            items={['Salary & Attendance Processing', 'Statutory Support (PF, ESI, TDS)', 'Automated Payslip & Tax Reports']}
            to="/payroll"
            cta="Go to Payroll Page"
          />
          </Reveal>
        </div>
      </div>

      <div className="rv-p-band" style={{ background: 'rgba(241,245,249,0.8)', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="rv-p-wrap" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="rv-p-chip sky" style={{ background: '#fff', borderColor: '#e2e8f0' }}>Our Enterprise Pillars</span>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', marginTop: 12 }}>Built for Accuracy, Speed & Security</h2>
            <p style={{ color: '#475569', maxWidth: 720, margin: '16px auto 0', lineHeight: 1.7 }}>
              Whether you are scaling an SME IT infrastructure, managing bulk fresh agricultural export shipments, or running error-free monthly corporate payrolls, our system delivers operational perfection.
            </p>
          </Reveal>
          <div className="rv-p-pillars">
            <Reveal delay={0}><Pillar icon={Cpu} accent="#7c3aed" bg="#ede9fe" title="IT Solutions" text="Custom Digital Infrastructure & Managed Cyber Defense" /></Reveal>
            <Reveal delay={120}><Pillar icon={Package} accent="#e11d48" bg="#ffe4e6" title="Global Logistics" text="Quality Sourced Fresh Produce Export & Import Trade" /></Reveal>
            <Reveal delay={240}><Pillar icon={Shield} accent="#0284c7" bg="#e0f2fe" title="Payroll Compliance" text="Statutory & Accurate Monthly Salary Processing" /></Reveal>
          </div>
        </div>
      </div>
    </>
  );
};

const HomeCard = ({ accent, badge, icon: Icon, title, text, items, to, cta }) => {
  const colors = {
    violet: { color: '#7c3aed', bg: '#ede9fe', chip: 'violet' },
    rose: { color: '#e11d48', bg: '#ffe4e6', chip: 'rose' },
    sky: { color: '#0284c7', bg: '#e0f2fe', chip: 'sky' },
  }[accent];

  return (
    <div className="rv-p-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
      <div>
        <div className="rv-p-icon rv-p-icon-flip" style={{ width: 56, height: 56, background: colors.bg, color: colors.color, marginBottom: 24, borderRadius: 16 }}>
          <Icon size={26} />
        </div>
        <span className={`rv-p-chip ${colors.chip}`} style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 11 }}>{badge}</span>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '12px 0' }}>{title}</h3>
        <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.7 }}>{text}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: 10 }}>
          {items.map((item) => (
            <li key={item} className="rv-p-check">
              <CheckCircle2 size={15} color={colors.color} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
        <RouterLink to={to} className={`rv-p-btn rv-p-btn-dark ${accent}`}>
          {cta} <ArrowRight size={12} />
        </RouterLink>
      </div>
    </div>
  );
};

const Pillar = ({ icon: Icon, accent, bg, title, text }) => (
  <div className="rv-p-card" style={{ padding: 24, textAlign: 'center' }}>
    <div className="rv-p-icon rv-p-icon-flip" style={{ width: 56, height: 56, background: bg, color: accent, margin: '0 auto 16px', borderRadius: 16 }}>
      <Icon size={26} />
    </div>
    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 18 }}>{title}</div>
    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.6 }}>{text}</div>
  </div>
);

export default PortalHomePage;
