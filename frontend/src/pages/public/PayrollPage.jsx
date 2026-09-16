import React, { useEffect } from 'react';
import {
  Calculator, Banknote, CalendarCheck, Scale, FileText, PieChart, Receipt,
  Target, Clock, Shield, Lock, BarChart3, Settings, ArrowRight, UserCheck,
} from 'lucide-react';
import {
  PageHero, IntroBanner, SectionHeading, ServiceCard, Chip, CtaBanner, PageBody,
} from '../../components/public/portalBits';

const reasons = [
  { icon: Target, title: 'Accuracy', text: 'Reduce payroll calculation errors and maintain accurate salary records.' },
  { icon: Clock, title: 'Time Saving', text: 'Save valuable time by outsourcing repetitive payroll activities.' },
  { icon: Shield, title: 'Compliance Support', text: 'Stay organized with payroll records and statutory compliance requirements.' },
  { icon: Lock, title: 'Data Security', text: 'Employee salary and payroll information is handled with confidentiality.' },
  { icon: BarChart3, title: 'Easy Reporting', text: 'Get clear payroll reports whenever you need them.' },
];

const flow = ['Employee Data', 'Attendance & Leave', 'Salary Calculation', 'Deductions', 'Statutory Calc', 'Payslip Gen'];

const PayrollPage = () => {
  useEffect(() => {
    document.title = 'Rouvin | Payroll Management';
  }, []);

  return (
    <>
      <PageHero
        accent="sky"
        crumb="Payroll Management"
        title="Payroll Management Services"
        subtitle="Simplify Your Payroll. Empower Your Employees. Accurate salary calculations, statutory compliance, and payslips."
        cta="Get Started Today"
        icon={Calculator}
      />
      <PageBody>
        <IntroBanner
          accent="sky"
          icon={Calculator}
          title="Automated HR & Payroll Operations"
          text="Our Payroll Management Services help businesses manage employee salaries, attendance, deductions, statutory compliance, payslips, and payroll records accurately and efficiently. We take care of the payroll process so you can focus on growing your business."
        />

        <div>
          <SectionHeading accent="sky" icon={Receipt}>Our Payroll Services Breakdown</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <ServiceCard accent="sky" icon={Banknote} title="1. Employee Payroll Processing" items={['Monthly salary calculation', 'Basic salary & allowances', 'Overtime & incentive logic', 'Bonuses & commissions', 'Salary revisions', 'Full & final settlement']} />
            <ServiceCard accent="indigo" icon={CalendarCheck} title="2. Attendance & Leave" items={['Employee attendance tracking', 'Leave management', 'Late coming & overtime calculation', 'Paid & unpaid leave calculation', 'Attendance-based salary processing']} />
            <ServiceCard accent="emerald" icon={Scale} title="3. Statutory Payroll Compliance" items={['PF calculation & support', 'ESI calculation & support', 'Professional Tax (PT)', 'TDS & salary compliance', 'Labour law payroll support', 'Statutory reports & records']} />
            <ServiceCard accent="amber" icon={FileText} title="4. Payslip & Salary Documents" items={['Monthly employee payslips', 'Detailed salary statements', 'Form 16 support', 'Salary certificates', 'Bank salary transfer statements', 'Complete payroll registers']} />
            <ServiceCard accent="purple" icon={PieChart} title="5. Clear Payroll Reports" items={['Employee salary report', 'Department-wise payroll report', 'Attendance & deduction logs', 'PF & ESI filing reports', 'Tax deduction reports', 'Monthly payroll summary']} />
          </div>
        </div>

        <div className="rv-p-process">
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, marginBottom: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <Calculator size={20} color="#38bdf8" /> Standard Payroll Execution Flow
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 12, fontWeight: 700 }}>
            {flow.map((step) => (
              <React.Fragment key={step}>
                <span className="rv-p-step" style={{ padding: '12px 16px' }}>{step}</span>
                <ArrowRight size={14} color="#64748b" />
              </React.Fragment>
            ))}
            <span className="rv-p-step rv-p-step-final sky" style={{ padding: '12px 20px' }}>Payroll Reports</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          <div className="rv-p-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              Why Choose Our Payroll Services?
            </h3>
            <div style={{ display: 'grid', gap: 16 }}>
              {reasons.map(({ icon: Icon, title, text }) => (
                <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div className="rv-p-icon" style={{ width: 36, height: 36, background: '#f0f9ff', color: '#0284c7' }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#0f172a', fontSize: 14 }}>{title}</strong>
                    <span style={{ color: '#475569', fontSize: 14 }}>{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rv-p-card" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Settings size={18} color="#0284c7" /> Who Can Use Our Payroll Services?
            </h3>
            <p style={{ color: '#475569', fontSize: 14, marginBottom: 24 }}>Our payroll management solutions are suitable for:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Startups', 'Small & Medium Businesses', 'Private Companies', 'Schools & Educational Institutions', 'Hospitals', 'NGOs', 'Retail Businesses', 'Manufacturing Companies', 'Construction Companies', 'Service Businesses'].map((item) => (
                <Chip key={item} accent="slate-sky">{item}</Chip>
              ))}
            </div>
            <div style={{ marginTop: 32, padding: 20, background: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: 16 }}>
              <h4 style={{ fontWeight: 800, color: '#0c4a6e', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                <Target size={14} color="#0284c7" /> Our Mission & Goal
              </h4>
              <p style={{ fontSize: 12, color: '#075985', marginTop: 8, lineHeight: 1.7 }}>
                To provide simple, accurate, secure, and compliant payroll management solutions that reduce administrative workload and help businesses manage their employees efficiently.
              </p>
            </div>
          </div>
        </div>

        <CtaBanner
          accent="sky"
          icon={UserCheck}
          title="Let Us Manage Your Payroll"
          text="Focus on your business while we take care of your payroll operations."
          button="Contact Us For Payroll Services"
        />
      </PageBody>
    </>
  );
};

export default PayrollPage;
