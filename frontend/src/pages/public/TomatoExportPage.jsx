import React, { useEffect } from 'react';
import {
  Leaf, Star, ShoppingBasket, Truck, Droplets, Sprout, Package, Store, Globe,
  PlaneTakeoff, PlaneLanding, Microscope, Box, Route, Users,
} from 'lucide-react';
import {
  PageHero, IntroBanner, SectionHeading, CheckList, Chip, CtaBanner, PageBody,
} from '../../components/public/portalBits';

const products = [
  { icon: Star, title: 'Premium Grade', text: 'Firm, uniform colour for supermarket shelves and retail packs.', tag: 'Retail', tone: 'gold' },
  { icon: ShoppingBasket, title: 'Classic Tomatoes', text: 'Reliable wholesale grade for daily market and bulk buyers.', tag: 'Wholesale', tone: 'orange' },
  { icon: Truck, title: 'Transport-Grade', text: 'Built for long-distance freight with extra shelf-life strength.', tag: 'Logistics', tone: 'crimson' },
  { icon: Droplets, title: 'Processing / Juice', text: 'High-yield fruit for sauce, paste, puree and juice plants.', tag: 'Processing', tone: 'coral' },
  { icon: Sprout, title: 'Fresh Farm Tomatoes', text: 'Direct orchard harvests with tight farm-to-pack timelines.', tag: 'Farm fresh', tone: 'green' },
  { icon: Package, title: 'Bulk Tomatoes', text: 'High-volume supply for distributors and large-scale buyers.', tag: 'Bulk', tone: 'amber' },
  { icon: Store, title: 'Commercial-Grade', text: 'Consistent lots for hotels, restaurants and food service.', tag: 'Hospitality', tone: 'rose' },
  { icon: Globe, title: 'Global Varieties', text: 'International import grades matched to destination specs.', tag: 'Export', tone: 'lime' },
];

const process = [
  'Farmer/Supplier',
  'Quality Checking',
  'Sorting & Grading',
  'Packaging',
  'Documentation',
  'Transportation',
  'Shipment',
  'Buyer Delivery',
];

const TomatoExportPage = () => {
  useEffect(() => {
    document.title = 'Rouvin | Tomato Export & Import';
  }, []);

  return (
    <>
      <PageHero
        accent="rose"
        crumb="Tomato Trade"
        title="Tomato Export & Import"
        subtitle="Fresh Tomatoes. Reliable Supply. Global Markets. Sourcing quality tomatoes for domestic and international buyers."
        cta="Enquire Bulk Wholesale Quote"
        icon={Globe}
      />
      <PageBody>
        <IntroBanner
          accent="rose"
          icon={Leaf}
          title="Global Agriculture Produce Logistics"
          text="We specialize in the export and import of fresh tomatoes, connecting quality tomato producers and suppliers with domestic and international markets. Our focus is on quality sourcing, proper grading, safe packaging, efficient logistics, and timely delivery."
        />

        <div>
          <SectionHeading accent="rose" icon={Sprout}>Our Tomato Product Catalog</SectionHeading>
          <div className="rv-p-catalog">
            {products.map(({ icon: Icon, title, text, tag, tone }) => (
              <article key={title} className={`rv-p-produce tone-${tone}`}>
                <div className="rv-p-produce-media">
                  <div className="rv-p-produce-icon">
                    <Icon size={36} strokeWidth={2.1} />
                  </div>
                </div>
                <div className="rv-p-produce-body">
                  <span className="rv-p-produce-tag">{tag}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rv-p-split">
          <div className="rv-p-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div className="rv-p-icon" style={{ width: 48, height: 48, background: '#ffe4e6', color: '#e11d48' }}>
                <PlaneTakeoff size={22} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Tomato Export Services</h3>
            </div>
            <p style={{ color: '#475569', fontSize: 14, marginBottom: 16 }}>We source fresh tomatoes from reliable growers and prepare them for global markets through:</p>
            <CheckList accent="rose" items={['Quality inspection', 'Sorting & grading', 'Proper packaging', 'Bulk order management', 'Cold-chain coordination where required', 'Transportation & logistics', 'Complete export documentation']} />
          </div>
          <div className="rv-p-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div className="rv-p-icon" style={{ width: 48, height: 48, background: '#ffe4e6', color: '#e11d48' }}>
                <PlaneLanding size={22} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Tomato Import Services</h3>
            </div>
            <p style={{ color: '#475569', fontSize: 14, marginBottom: 16 }}>We help domestic buyers source tomatoes from international suppliers according to required specs:</p>
            <CheckList accent="rose" items={['Custom quantity & volume matching', 'Quality & grade verification', 'Size & firmness criteria compliance', 'Customized packaging configurations', 'Specified delivery location dispatch', 'Reliable delivery schedule tracking']} />
          </div>
        </div>

        <div className="rv-p-split">
          <div className="rv-p-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Microscope size={18} color="#e11d48" /> Quality & Grading Criteria
            </h3>
            <p style={{ color: '#475569', fontSize: 14, marginBottom: 16 }}>Our tomatoes are strictly selected based on parameters:</p>
            <div className="rv-p-mini-grid" style={{ marginBottom: 16 }}>
              {['Size & Firmness', 'Colour & Freshness', 'Visual Appearance', 'Extended Shelf Life'].map((item) => (
                <div key={item} style={{ padding: 12, background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: 12, color: '#9f1239', fontSize: 12, fontWeight: 700, textAlign: 'center' }}>{item}</div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Guaranteed damage-free quality delivered to your harbor or facility.</p>
          </div>
          <div className="rv-p-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Box size={18} color="#e11d48" /> Packaging & Transportation
            </h3>
            <p style={{ color: '#475569', fontSize: 14, marginBottom: 16 }}>Options designed to reduce damage during transit:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Plastic Crates', 'Heavy-duty Cartons', 'Ventilated Boxes', 'Bulk Wooden Pallets', 'Custom Buyer Packaging'].map((item) => (
                <Chip key={item} accent="slate">{item}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="rv-p-process rv-p-chain">
          <h3 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, marginBottom: 32, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
            <Route size={20} color="#fb7185" /> Our Export Supply Chain Process
          </h3>
          <div className="rv-p-chain-row">
            {process.map((step, i) => (
              <div key={step} className={`rv-p-chain-step shade-${i}`}>
                <span className="rv-p-chain-num">{i + 1}</span>
                <span className="rv-p-chain-label">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rv-p-card" style={{ padding: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Users size={18} color="#e11d48" /> Who We Serve & Global Supply
          </h3>
          <p style={{ color: '#475569', fontSize: 14, marginBottom: 24 }}>We build reliable connections between Indian tomato suppliers and international buyers:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Importers & Exporters', 'Wholesale Markets', 'Supermarkets & Retail Chains', 'Food Processing Companies', 'Juice & Sauce Manufacturers', 'Hotels & Restaurants', 'Distributors & Buyers'].map((item) => (
              <Chip key={item} accent="slate">{item}</Chip>
            ))}
          </div>
        </div>

        <CtaBanner
          accent="rose"
          icon={Globe}
          title="Looking for Fresh Tomatoes?"
          text="Tell us your required quantity, tomato grade, destination, packaging requirements, and delivery date."
          button="Send Tomato Import/Export Enquiry"
        />
      </PageBody>
    </>
  );
};

export default TomatoExportPage;
