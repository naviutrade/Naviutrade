import React, { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Home, ArrowRight } from 'lucide-react';

const ACCENT = {
  violet: { color: '#7c3aed', soft: '#ede9fe', ink: '#5b21b6' },
  rose: { color: '#e11d48', soft: '#ffe4e6', ink: '#9f1239' },
  sky: { color: '#0284c7', soft: '#e0f2fe', ink: '#075985' },
  indigo: { color: '#4f46e5', soft: '#e0e7ff', ink: '#3730a3' },
  emerald: { color: '#059669', soft: '#d1fae5', ink: '#065f46' },
  amber: { color: '#d97706', soft: '#fef3c7', ink: '#92400e' },
  purple: { color: '#9333ea', soft: '#f3e8ff', ink: '#6b21a8' },
};

export const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '', style }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv-p-reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
};

export const CheckList = ({ items, accent = 'sky' }) => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
    {items.map((item) => (
      <li key={item} className="rv-p-check">
        <CheckCircle2 size={16} color={ACCENT[accent].color} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const ServiceCard = ({ icon: Icon, title, items, accent = 'violet' }) => {
  const a = ACCENT[accent];
  return (
    <div className="rv-p-card" style={{ padding: 24 }}>
      <div
        className="rv-p-icon rv-p-icon-flip"
        style={{ width: 48, height: 48, background: a.soft, color: a.color, marginBottom: 16 }}
      >
        <Icon size={22} />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>{title}</h3>
      <CheckList items={items} accent={accent} />
    </div>
  );
};

export const IntroBanner = ({ icon: Icon, title, text, accent = 'sky' }) => {
  const a = ACCENT[accent];
  return (
    <div className={`rv-p-intro ${accent}`}>
      <div className="rv-p-icon" style={{ width: 40, height: 40, background: a.color, color: '#fff' }}>
        <Icon size={18} />
      </div>
      <div>
        <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: 18, marginBottom: 4 }}>{title}</h3>
        <p style={{ color: '#475569', margin: 0, lineHeight: 1.7 }}>{text}</p>
      </div>
    </div>
  );
};

export const PageHero = ({ accent, crumb, title, subtitle, cta, to = '/register', icon: Icon }) => (
  <section className={`rv-p-hero rv-p-hero-page rv-p-hero-${accent}`}>
    <div className={`rv-p-dots ${accent}`} />
    <div className="rv-p-hero-shine" />
    {Icon && (
      <div className="rv-p-hero-watermark" aria-hidden>
        <Icon size={240} strokeWidth={1} />
      </div>
    )}
    <div className="rv-p-wrap rv-p-banner">
      <div className="rv-p-banner-copy">
        <nav className="rv-p-crumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
          <RouterLink to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, opacity: 0.9 }}>
            <Home size={13} /> Home
          </RouterLink>
          <ChevronRight size={11} />
          <span>{crumb}</span>
        </nav>
        <h1 className="rv-p-banner-title" style={{ fontSize: 'clamp(30px, 4.4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.12 }}>
          {title}
        </h1>
        <span className="rv-p-banner-rule" />
        <p className="rv-p-banner-sub" style={{ marginTop: 16, maxWidth: 640, opacity: 0.88, fontSize: 17, lineHeight: 1.65 }}>
          {subtitle}
        </p>
      </div>
      <RouterLink to={to} target="_blank" rel="noopener noreferrer" className={`rv-p-btn rv-p-btn-solid ${accent} rv-p-banner-cta`}>
        {cta}
        <ArrowRight size={14} />
      </RouterLink>
    </div>
  </section>
);

export const SectionHeading = ({ children, icon: Icon, accent = 'sky' }) => (
  <h2 className={`rv-p-h-bar ${accent}`} style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#0f172a', marginBottom: 32 }}>
    <span>{children}</span>
    {Icon && <Icon size={20} color={ACCENT[accent].color} />}
  </h2>
);

export const CtaBanner = ({ accent, icon: Icon, title, text, button }) => (
  <div className={`rv-p-cta ${accent}`}>
    <div>
      <h3 style={{ fontSize: 24, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
        {Icon && <Icon size={22} />}
        {title}
      </h3>
      <p style={{ margin: '8px 0 0', opacity: 0.85, maxWidth: 640, fontSize: 14 }}>{text}</p>
    </div>
    <RouterLink to="/register" target="_blank" rel="noopener noreferrer" className={`rv-p-btn rv-p-btn-solid ${accent}`}>
      {button}
    </RouterLink>
  </div>
);

export const Chip = ({ children, accent = 'slate' }) => (
  <span className={`rv-p-chip ${accent}`}>{children}</span>
);

export const PageBody = ({ children }) => (
  <div className="rv-p-wrap" style={{ paddingTop: 64, paddingBottom: 64, display: 'grid', gap: 64 }}>
    {React.Children.map(children, (child, i) => (
      <Reveal delay={i * 70}>{child}</Reveal>
    ))}
  </div>
);
