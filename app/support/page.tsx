'use client';

import Link from 'next/link';
import SidebarNew from '../components/SidebarNew';
import Breadcrumb from '../components/Breadcrumb';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    description: 'Account setup, getting started, and basic platform questions.',
    href: '/support/general',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
      </svg>
    ),
    color: '#1A1F71',
    faqs: [
      {
        question: 'How do I create an Omise account?',
        answer: 'Visit omise.co and click "Get Started". You\'ll need to provide business information, verify your email, and complete KYC verification to accept live payments.',
      },
      {
        question: 'What countries does Omise support?',
        answer: 'Omise operates in Thailand, Japan, Singapore, and Malaysia. Each country has specific payment methods and requirements.',
      },
      {
        question: 'How long does account verification take?',
        answer: 'KYC verification typically takes 1-3 business days. You can use test mode immediately while awaiting approval.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Fees',
    description: 'Transaction fees, transfer costs, and billing questions.',
    href: '/support/pricing',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    color: '#10b981',
    faqs: [
      {
        question: 'What are the transaction fees?',
        answer: 'For Thailand: 3.65% + VAT per successful card transaction. No setup fees, monthly fees, or minimum charges. Alternative payment methods may have different rates.',
      },
      {
        question: 'Are there any upfront or monthly fees?',
        answer: 'No. Omise has no setup fees, no monthly fees, and no minimum transaction requirements. You only pay when you process a successful payment.',
      },
      {
        question: 'What are the transfer/payout fees?',
        answer: 'Transfer fees vary by country: Thailand (฿30 per transfer), Japan (¥250 per transfer), Singapore (S$0.50 per transfer), Malaysia (RM2 per transfer).',
      },
      {
        question: 'Are fees charged on refunded transactions?',
        answer: 'The original transaction fee is not returned when you issue a refund. However, you are not charged additional fees for processing the refund.',
      },
    ],
  },
  {
    id: 'api-keys',
    title: 'API Keys & Authentication',
    description: 'Managing API keys, test mode, and authentication.',
    href: '/support/api-keys',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
      </svg>
    ),
    color: '#f59e0b',
    faqs: [
      {
        question: 'Where do I find my API keys?',
        answer: 'Go to your Omise Dashboard and click "Keys" in the left menu. You\'ll see both test and live key pairs (public and secret).',
      },
      {
        question: 'What is the difference between test and live keys?',
        answer: 'Test keys (starting with pkey_test_ and skey_test_) work in sandbox mode—no real money moves. Live keys process real payments. Test mode keys are always visible; live secret keys are shown for only 15 minutes after generation.',
      },
      {
        question: 'I lost my live secret key. How do I recover it?',
        answer: 'You cannot recover a lost secret key. You must generate a new key pair from the Dashboard. Update your integration with the new keys and invalidate the old ones.',
      },
      {
        question: 'How should I store my secret keys?',
        answer: 'Never expose secret keys in client-side code or version control. Use environment variables or a secrets manager. Only your server should use the secret key.',
      },
    ],
  },
  {
    id: 'refunds-transfers',
    title: 'Refunds & Transfers',
    description: 'Processing refunds and receiving payouts.',
    href: '/support/refunds-transfers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10"/>
        <polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    color: '#8b5cf6',
    faqs: [
      {
        question: 'How do I issue a refund?',
        answer: 'Refunds can be issued via the Dashboard (Charges > select charge > Refund) or via the API using POST /charges/{id}/refunds. You can refund the full amount or a partial amount.',
      },
      {
        question: 'How long do refunds take?',
        answer: 'Refunds are processed immediately on our end. For credit cards, customers see the refund on their next billing statement (typically 5-10 business days). Debit cards may take 30-60 days.',
      },
      {
        question: 'When do I receive my payouts?',
        answer: 'Transfers are batched daily and processed on business days only. Thailand: T+2 settlement. Japan: T+4 settlement. Singapore: T+7 settlement. Malaysia: T+7 settlement.',
      },
      {
        question: 'Can I cancel a pending transfer?',
        answer: 'Transfers cannot be cancelled once initiated. Ensure your bank account details are correct before requesting transfers.',
      },
    ],
  },
  {
    id: 'disputes',
    title: 'Disputes & Chargebacks',
    description: 'Handling disputes and providing evidence.',
    href: '/support/disputes',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    color: '#dc2626',
    faqs: [
      {
        question: 'What is a chargeback?',
        answer: 'A chargeback occurs when a cardholder disputes a charge with their bank. The bank reverses the payment and debits your account while investigating.',
      },
      {
        question: 'How long do I have to respond to a dispute?',
        answer: 'You have 7 days from notification to submit evidence. Failing to respond typically results in the dispute being decided in the customer\'s favor.',
      },
      {
        question: 'What evidence should I submit?',
        answer: 'Submit proof of delivery/service (tracking numbers, signed receipts), customer communications, terms of service accepted, IP/device logs, and any refund policy acknowledgment.',
      },
      {
        question: 'How can I prevent disputes?',
        answer: 'Use clear billing descriptors, send order confirmations, provide tracking information, have clear refund policies, use 3D Secure for high-risk transactions, and respond quickly to customer inquiries.',
      },
    ],
  },
  {
    id: 'integration',
    title: 'Integration Help',
    description: 'Technical questions about API integration.',
    href: '/support/integration',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: '#06b6d4',
    faqs: [
      {
        question: 'Which programming languages do you support?',
        answer: 'We provide official libraries for Ruby, Python, PHP, Node.js, Go, Java, C#, and Elixir. We also provide Omise.js for browser integration and mobile SDKs for iOS and Android.',
      },
      {
        question: 'How do I test my integration?',
        answer: 'Use your test API keys (pkey_test_ and skey_test_) to process test transactions. Use test card numbers like 4242424242424242 to simulate successful payments.',
      },
      {
        question: 'How do webhooks work?',
        answer: 'Webhooks notify your server of events in real-time. Configure your endpoint URL in the Dashboard, then listen for events like charge.complete, refund.create, etc.',
      },
      {
        question: 'Why is my API request failing?',
        answer: 'Check: 1) Correct API key for mode (test vs live), 2) Valid request format (JSON body, correct headers), 3) Required parameters included, 4) Valid payment source/token. Check the error code and message in the response.',
      },
    ],
  },
];

export default function SupportPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Support & FAQs', th: 'ช่วยเหลือและคำถามที่พบบ่อย', ja: 'サポートとFAQ' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Support & FAQs
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Find answers to common questions about Omise, or contact our support team for additional help.
        </p>

        {/* Contact Support Card */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{
            padding: '24px',
            background: '#1a2332',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>
                Need more help?
              </h3>
              <p style={{ fontSize: '14px', color: '#b8c7d9', margin: 0, lineHeight: 1.6 }}>
                Our support team is available to assist you with any questions.
              </p>
            </div>
            <a
              href="mailto:support@omise.co"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#1A1F71',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Support
            </a>
          </div>
        </section>

        {/* FAQ Categories Grid */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            {faqCategories.map((category) => (
              <div
                key={category.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                {/* Category Header */}
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #e3e8ee',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: `${category.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color,
                    flexShrink: 0,
                  }}>
                    {category.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px' }}>
                      {category.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#697386', margin: 0 }}>
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* FAQ Items */}
                <div style={{ padding: '16px 24px' }}>
                  {category.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '16px 0',
                        borderBottom: idx < category.faqs.length - 1 ? '1px solid #f0f0f0' : 'none',
                      }}
                    >
                      <h4 style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        margin: '0 0 8px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '20px',
                          height: '20px',
                          background: '#1A1F71',
                          color: '#fff',
                          borderRadius: '50%',
                          fontSize: '11px',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: '1px',
                        }}>
                          Q
                        </span>
                        {faq.question}
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#3c4257',
                        margin: 0,
                        lineHeight: 1.7,
                        paddingLeft: '30px',
                      }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>
            Additional Resources
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <Link
              href="/getting-started/quick-start"
              style={{
                display: 'block',
                padding: '20px',
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>
                Quick Start Guide
              </div>
              <div style={{ fontSize: '14px', color: '#697386' }}>
                Get up and running in minutes
              </div>
            </Link>

            <Link
              href="/api-reference"
              style={{
                display: 'block',
                padding: '20px',
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>
                API Reference
              </div>
              <div style={{ fontSize: '14px', color: '#697386' }}>
                Complete API documentation
              </div>
            </Link>

            <Link
              href="/integrations"
              style={{
                display: 'block',
                padding: '20px',
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>
                Integrations
              </div>
              <div style={{ fontSize: '14px', color: '#697386' }}>
                Libraries, SDKs, and plugins
              </div>
            </Link>

            <Link
              href="/security"
              style={{
                display: 'block',
                padding: '20px',
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>
                Security & Risk
              </div>
              <div style={{ fontSize: '14px', color: '#697386' }}>
                Compliance and fraud prevention
              </div>
            </Link>
          </div>
        </section>

        {/* Status Page Link */}
        <section style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#166534', fontSize: '14px' }}>
                System Status
              </div>
              <div style={{ fontSize: '13px', color: '#15803d' }}>
                Check real-time API status at <a href="https://status.omise.co" target="_blank" rel="noopener noreferrer" style={{ color: '#166534', textDecoration: 'underline' }}>status.omise.co</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
