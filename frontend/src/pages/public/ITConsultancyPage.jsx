import React, { useEffect } from 'react';
import {
  Quote, Laptop, Workflow, Code, Server, Shield, Cloud, Headset,
  Check, Building2, Sparkles,
} from 'lucide-react';
import {
  PageHero, IntroBanner, SectionHeading, ServiceCard, CheckList, Chip, CtaBanner, PageBody,
} from '../../components/public/portalBits';

const ITConsultancyPage = () => {
  useEffect(() => {
    document.title = 'Rouvin | IT Consultancy';
  }, []);

  return (
    <>
      <PageHero
        accent="violet"
        crumb="IT Consultancy"
        title="IT Consultancy Services"
        subtitle="Smart Technology Solutions for Your Business. We help you use technology effectively, securely, and efficiently."
        cta="Schedule IT Consultation"
        icon={Laptop}
      />
      <PageBody>
        <IntroBanner
          accent="violet"
          icon={Quote}
          title="Tailored Technology Strategy"
          text="From technology planning and software solutions to cybersecurity and IT infrastructure, we help you make the right technology decisions tailored to your business goals, budget, and future growth."
        />

        <div>
          <SectionHeading accent="violet" icon={Laptop}>Our Core IT Consultancy Services</SectionHeading>
          <div className="rv-p-cards">
            <ServiceCard accent="violet" icon={Workflow} title="1. IT Strategy & Planning" items={['IT infrastructure planning', 'Technology strategy definition', 'Digital transformation consulting', 'IT budget planning', 'Technology & readiness assessment']} />
            <ServiceCard accent="indigo" icon={Code} title="2. Software & Application Solutions" items={['Business software consulting', 'Modern website development', 'Web application development', 'Mobile application solutions', 'Custom software & integration']} />
            <ServiceCard accent="sky" icon={Server} title="3. IT Infrastructure" items={['Enterprise server solutions', 'Network setup & management', 'Secure cloud solutions', 'Data storage & backup systems', 'Hardware & software consulting']} />
            <ServiceCard accent="rose" icon={Shield} title="4. Cybersecurity" items={['Security assessment & audit', 'Data protection policies', 'Network security architecture', 'Identity & access management', 'Cybersecurity planning & awareness']} />
            <ServiceCard accent="emerald" icon={Cloud} title="5. Cloud Consulting" items={['Cloud migration planning', 'Cloud infrastructure deployment', 'High-availability cloud storage', 'Backup & disaster recovery', 'Cloud cost optimization']} />
            <ServiceCard accent="amber" icon={Headset} title="6. IT Support & Maintenance" items={['24/7 technical support', 'Real-time system monitoring', 'Routine software maintenance', 'Network troubleshooting', 'IT helpdesk support']} />
          </div>
        </div>

        <div className="rv-p-process rv-p-chain">
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, marginBottom: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <Workflow size={20} color="#a78bfa" /> Our Structured IT Consulting Process
          </h2>
          <div className="rv-p-chain-row cols-6">
            {[
              ['Business Context', 'Understand Business'],
              ['Audit & Review', 'Assess Current Tech'],
              ['Analysis', 'Identify Requirements'],
              ['Strategy', 'Recommend Solutions'],
              ['Execution', 'Implementation'],
              ['Sustained Growth', 'Support & Optimize'],
            ].map(([title, detail], i) => (
              <div key={title} className={`rv-p-chain-step it-${i}`}>
                <span className="rv-p-chain-num">{i + 1}</span>
                <span className="rv-p-chain-label">{title}</span>
                <span className="rv-p-chain-sub">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rv-p-split">
          <div className="rv-p-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={18} color="#7c3aed" /> Why Choose Our IT Consultancy?
            </h3>
            <CheckList
              accent="violet"
              items={[
                'Business-focused: Technology solutions designed around ROI.',
                'Experienced team: Certified software and infrastructure architects.',
                'Cost-effective: Optimized tech spending with scalable pricing.',
                'Scalable planning: Infrastructure built to handle future expansion.',
                'Security-focused: Proactive defense against modern cyber threats.',
                'Ongoing support: Dedicated technical support & system monitoring.',
              ]}
            />
          </div>
          <div className="rv-p-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Building2 size={18} color="#7c3aed" /> Industries We Serve
            </h3>
            <p style={{ color: '#475569', fontSize: 14, marginBottom: 24 }}>We provide customized technology consulting across diverse commercial sectors:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Small & Medium Businesses', 'Startups', 'Manufacturing', 'Retail', 'Education', 'Healthcare', 'Construction', 'Finance', 'Logistics', 'NGOs'].map((item) => (
                <Chip key={item} accent="violet">{item}</Chip>
              ))}
            </div>
          </div>
        </div>

        <CtaBanner
          accent="violet"
          icon={Sparkles}
          title="Transform Your Business With Technology"
          text="Let our IT consultants help you choose, implement, and manage the right technology for your business goals and growth strategy."
          button="Contact Us For IT Consultation"
        />
      </PageBody>
    </>
  );
};

export default ITConsultancyPage;
