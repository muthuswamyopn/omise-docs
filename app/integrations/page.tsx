'use client';

import Link from 'next/link';
import SidebarNew from '../components/SidebarNew';
import Breadcrumb from '../components/Breadcrumb';

interface PaymentMethod {
  name: string;
  href: string;
  badge?: string;
}

const paymentMethods: Record<string, PaymentMethod[]> = {
  'Alipay+ Offline': [
    { name: 'Merchant-Presented Mode (C scan B)', href: '/accept-payments/alipay-wechat' },
    { name: 'User-Presented Mode Payment (B scan C)', href: '/accept-payments/alipay-wechat' },
  ],
  'Alipay+ Online': [
    { name: 'Alipay CN', href: '/accept-payments/alipay-wechat/alipay-cn' },
    { name: 'Alipay HK', href: '/accept-payments/alipay-wechat/alipay-hk' },
    { name: 'DANA', href: '/accept-payments/e-wallets/dana' },
    { name: 'GCash', href: '/accept-payments/e-wallets/gcash' },
    { name: 'KakaoPay', href: '/accept-payments/e-wallets/kakaopay' },
  ],
  'E-Wallets': [
    { name: 'Apple Pay', href: '/accept-payments/cards', badge: 'BETA' },
    { name: 'Atome', href: '/accept-payments/installments' },
    { name: 'Boost', href: '/accept-payments/e-wallets/boost' },
    { name: 'Google Pay', href: '/accept-payments/e-wallets/google-pay' },
    { name: 'GrabPay', href: '/accept-payments/e-wallets/grabpay' },
    { name: 'Rabbit LINE Pay', href: '/accept-payments/e-wallets/rabbit-linepay' },
    { name: 'ShopeePay', href: '/accept-payments/e-wallets/shopeepay' },
    { name: 'Touch \'n Go', href: '/accept-payments/e-wallets/touch-n-go' },
    { name: 'TrueMoney', href: '/accept-payments/e-wallets/truemoney' },
  ],
  'Bank Transfers & QR': [
    { name: 'DuitNow', href: '/accept-payments/bank-transfers' },
    { name: 'Malaysia FPX', href: '/accept-payments/bank-transfers/fpx' },
    { name: 'Maybank QR', href: '/accept-payments/bank-transfers' },
    { name: 'PayNow', href: '/accept-payments/bank-transfers/paynow' },
    { name: 'PromptPay', href: '/accept-payments/bank-transfers/promptpay' },
  ],
  'Mobile Banking': [
    { name: 'Bangkok Bank (Bualuang mBanking)', href: '/accept-payments/mobile-banking' },
    { name: 'KBank (K PLUS)', href: '/accept-payments/mobile-banking' },
    { name: 'Krung Thai (KTB NEXT)', href: '/accept-payments/mobile-banking' },
    { name: 'Krungsri (KMA)', href: '/accept-payments/mobile-banking' },
    { name: 'OCBC Digital', href: '/accept-payments/mobile-banking' },
    { name: 'SCB (SCB Easy)', href: '/accept-payments/mobile-banking' },
  ],
  'Convenience Store & Other': [
    { name: 'Konbini, Pay-easy, and Online Banking', href: '/accept-payments/convenience-store' },
    { name: 'Online Direct Debit', href: '/accept-payments/bank-transfers' },
    { name: 'PayPay', href: '/accept-payments/e-wallets/paypay' },
    { name: 'Installment Payments', href: '/accept-payments/installments' },
  ],
  'WeChat Pay': [
    { name: 'WeChat Pay', href: '/accept-payments/alipay-wechat/wechat-pay' },
    { name: 'WeChat Pay MPM (C scan B)', href: '/accept-payments/alipay-wechat/wechat-pay', badge: 'NEW' },
    { name: 'WeChat Pay UPM (B scan C)', href: '/accept-payments/alipay-wechat/wechat-pay', badge: 'NEW' },
  ],
};

const plugins = [
  {
    name: 'EC-CUBE',
    href: '/integrations/ecommerce-plugins/ec-cube',
    methods: {
      cards: ['Credit and Debit Cards'],
      ewallets: [],
      bankTransfers: ['OCBC Digital'],
      other: [],
    },
  },
  {
    name: 'Magento',
    href: '/integrations/ecommerce-plugins/magento',
    methods: {
      cards: ['Credit and Debit Cards'],
      ewallets: ['Alipay CN', 'Alipay HK', 'Boost', 'DANA', 'GCash', 'Google Pay', 'GrabPay', 'KakaoPay', 'PayPay', 'Rabbit LINE Pay', 'ShopeePay', 'Touch \'n Go', 'TrueMoney Wallet'],
      bankTransfers: ['DuitNow OBW', 'DuitNow QR', 'FPX', 'Konbini/Pay-easy', 'Maybank QR', 'Mobile Banking', 'PayNow', 'PromptPay'],
      other: ['Installments'],
    },
  },
  {
    name: 'OpenCart',
    href: '/integrations/ecommerce-plugins/opencart',
    methods: {
      cards: ['Credit and Debit Cards'],
      ewallets: [],
      bankTransfers: ['OCBC Digital'],
      other: [],
    },
  },
  {
    name: 'PrestaShop',
    href: '/integrations/ecommerce-plugins/prestashop',
    methods: {
      cards: ['Credit and Debit Cards'],
      ewallets: ['Alipay (Online)', 'TrueMoney Wallet'],
      bankTransfers: ['OCBC Digital'],
      other: [],
    },
  },
  {
    name: 'Shopify',
    href: '/integrations/ecommerce-plugins/shopify',
    methods: {
      cards: ['Credit and Debit Cards'],
      ewallets: ['Alipay CN', 'Alipay HK', 'Boost', 'DANA', 'GCash', 'GrabPay', 'KakaoPay', 'PayPay', 'Rabbit LINE Pay', 'ShopeePay', 'Touch \'n Go', 'TrueMoney Wallet'],
      bankTransfers: ['DuitNow OBW', 'DuitNow QR', 'FPX', 'Maybank QR', 'Mobile Banking', 'PayNow', 'PromptPay'],
      other: ['Installments'],
    },
  },
  {
    name: 'WooCommerce',
    href: '/integrations/ecommerce-plugins/woocommerce',
    methods: {
      cards: ['Credit and Debit Cards'],
      ewallets: ['Alipay CN', 'Alipay HK', 'Boost', 'DANA', 'GCash', 'Google Pay', 'GrabPay', 'KakaoPay', 'PayPay', 'Rabbit LINE Pay', 'ShopeePay', 'Touch \'n Go', 'TrueMoney Wallet'],
      bankTransfers: ['DuitNow OBW', 'DuitNow QR', 'FPX', 'Konbini/Pay-easy', 'Maybank QR', 'Mobile Banking', 'PayNow', 'PromptPay'],
      other: ['Installments'],
    },
  },
];

const clientLibraries = [
  {
    name: 'Omise.js',
    href: '/integrations/client-libraries/omise-js',
    github: 'https://github.com/omise/omise.js',
    supports: 'All payment methods',
  },
  {
    name: 'iOS SDK',
    href: '/integrations/client-libraries/ios-sdk',
    github: 'https://github.com/omise/omise-ios',
    supports: 'Cards, e-wallets, bank transfers, installments',
  },
  {
    name: 'Android SDK',
    href: '/integrations/client-libraries/android-sdk',
    github: 'https://github.com/omise/omise-android',
    supports: 'Cards, e-wallets, bank transfers, installments',
  },
  {
    name: 'Omise Flutter',
    href: '/integrations/client-libraries/flutter-sdk',
    github: 'https://pub.dev/packages/omise_flutter',
    supports: 'Tokenize cards, authorize payments',
  },
  {
    name: 'Omise Dart',
    href: '/integrations/client-libraries/dart-sdk',
    github: 'https://pub.dev/packages/omise_dart',
    supports: 'Tokenize cards, source creation',
  },
];

const serverLibraries = [
  { name: 'Ruby', github: 'https://github.com/omise/omise-ruby', supports: 'All payment methods' },
  { name: 'Python', github: 'https://github.com/omise/omise-python', supports: 'All payment methods' },
  { name: 'PHP', github: 'https://github.com/omise/omise-php', supports: 'All payment methods' },
  { name: 'Node.js', github: 'https://github.com/omise/omise-node', supports: 'All payment methods' },
  { name: 'Go', github: 'https://github.com/omise/omise-go', supports: 'All payment methods' },
  { name: 'Java', github: 'https://github.com/omise/omise-java', supports: 'Cards, e-wallets, bank transfers, installments' },
  { name: '.NET', github: 'https://github.com/omise/omise-dotnet', supports: 'Cards, e-wallets, bank transfers' },
  { name: 'Elixir', github: 'https://github.com/omise/omise-elixir', supports: 'All payment methods' },
];

const paymentsByCountry = [
  {
    country: 'Thailand',
    flag: '🇹🇭',
    methods: ['Credit and Debit Cards', 'Google Pay', 'PromptPay', 'Bangkok Bank', 'KBank', 'Krung Thai', 'Krungsri', 'SCB', 'Rabbit LINE Pay', 'TrueMoney Wallet', 'WeChat Pay', 'Installments', 'Alipay CN', 'Alipay HK', 'KakaoPay', 'ShopeePay'],
  },
  {
    country: 'Singapore',
    flag: '🇸🇬',
    methods: ['Credit and Debit Cards', 'Google Pay', 'PayNow', 'OCBC Digital', 'GrabPay', 'ShopeePay', 'DANA', 'GCash', 'KakaoPay', 'Alipay CN', 'Alipay HK'],
  },
  {
    country: 'Malaysia',
    flag: '🇲🇾',
    methods: ['Credit and Debit Cards', 'Google Pay', 'FPX', 'DuitNow QR', 'DuitNow OBW', 'Maybank QR', 'Boost', 'GrabPay', 'Touch \'n Go', 'ShopeePay'],
  },
  {
    country: 'Japan',
    flag: '🇯🇵',
    methods: ['Credit and Debit Cards', 'Google Pay', 'Konbini', 'Pay-easy', 'PayPay'],
  },
];

// Payment method name to URL mapping for the plugins table
const paymentMethodLinks: Record<string, string> = {
  // Cards
  'Credit and Debit Cards': '/accept-payments/cards/credit-debit',
  // E-Wallets
  'Alipay CN': '/accept-payments/alipay-wechat/alipay-cn',
  'Alipay HK': '/accept-payments/alipay-wechat/alipay-hk',
  'Alipay (Online)': '/accept-payments/alipay-wechat/alipay-cn',
  'Boost': '/accept-payments/e-wallets/boost',
  'DANA': '/accept-payments/e-wallets/dana',
  'GCash': '/accept-payments/e-wallets/gcash',
  'Google Pay': '/accept-payments/e-wallets/google-pay',
  'GrabPay': '/accept-payments/e-wallets/grabpay',
  'KakaoPay': '/accept-payments/e-wallets/kakaopay',
  'PayPay': '/accept-payments/e-wallets/paypay',
  'Rabbit LINE Pay': '/accept-payments/e-wallets/rabbit-linepay',
  'ShopeePay': '/accept-payments/e-wallets/shopeepay',
  "Touch 'n Go": '/accept-payments/e-wallets/touch-n-go',
  'TrueMoney Wallet': '/accept-payments/e-wallets/truemoney',
  // Bank Transfers & QR
  'DuitNow OBW': '/accept-payments/bank-transfers/duitnow',
  'DuitNow QR': '/accept-payments/bank-transfers/duitnow',
  'FPX': '/accept-payments/bank-transfers/fpx',
  'Konbini/Pay-easy': '/accept-payments/convenience-store',
  'Maybank QR': '/accept-payments/bank-transfers',
  'Mobile Banking': '/accept-payments/mobile-banking',
  'PayNow': '/accept-payments/bank-transfers/paynow',
  'PromptPay': '/accept-payments/bank-transfers/promptpay',
  'OCBC Digital': '/accept-payments/mobile-banking',
  // Other
  'Installments': '/accept-payments/installments',
};

const faqs = [
  {
    q: "What's the difference between a client-side library and a server-side library?",
    a: "Client-side libraries run on the customer's own device and use public key authentication to securely accept and tokenize sensitive data, such as card details. Server-side libraries run on your systems and use secret-key authentication to process already tokenized data, such as creating a charge from a token. Omise Dart is an exception — it supports both.",
  },
  {
    q: 'Do I need both a client-side library and a server-side library?',
    a: "Typically, yes, for card payments — a client-side library (or Omise.js) tokenizes the card on the customer's device, and a server-side library then uses that token to create a charge or perform other actions on your server.",
  },
  {
    q: 'Which e-commerce platforms have a dedicated plugin?',
    a: 'EC-CUBE, Magento, OpenCart, PrestaShop, Shopify, and WooCommerce each have a dedicated plugin.',
  },
  {
    q: 'Is a plugin required, or can I integrate directly with a library instead?',
    a: "A plugin is the fastest path if you're already using one of the supported e-commerce platforms. If you're building a custom integration, or your platform doesn't have a dedicated plugin, use the client-side and server-side libraries directly instead.",
  },
  {
    q: "What if my e-commerce platform or programming language isn't listed?",
    a: "Use the client-side and server-side libraries directly rather than a plugin — most languages have a dedicated server-side library, and Omise.js works as a general-purpose client-side option regardless of platform. If your specific language isn't covered by any library either, you can call the Omise API directly over HTTP.",
  },
  {
    q: 'How do I contribute to an Omise library?',
    a: "Omise's libraries are open source on GitHub. To contribute a feature or fix a bug, send a pull request.",
  },
];

// Helper function to render payment methods as links
function renderPaymentMethodLinks(methods: string[]) {
  if (methods.length === 0) return '—';

  return methods.map((method, index) => {
    const href = paymentMethodLinks[method];
    const isLast = index === methods.length - 1;

    if (href) {
      return (
        <span key={method}>
          <Link
            href={href}
            style={{ color: '#1A1F71', textDecoration: 'none' }}
          >
            {method}
          </Link>
          {!isLast && ', '}
        </span>
      );
    }
    // If no link found, render as plain text
    return (
      <span key={method}>
        {method}
        {!isLast && ', '}
      </span>
    );
  });
}

export default function IntegrationsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '1000px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Integrations
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '40px', lineHeight: 1.6 }}>
          Omise provides plugins, libraries, and SDKs for major programming languages and platforms
          to integrate merchant systems with Omise servers.
        </p>

        {/* Payment Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>
            Payment Methods
          </h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            {Object.entries(paymentMethods).map(([category, methods]) => (
              <div key={category} style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
                  {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {methods.map((method) => (
                    <Link
                      key={method.name}
                      href={method.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: '#f6f9fc',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        color: '#1A1F71',
                        fontSize: '13px',
                        fontWeight: 500,
                      }}
                    >
                      {method.name}
                      {method.badge && (
                        <span style={{
                          padding: '2px 6px',
                          background: method.badge === 'NEW' ? '#dcfce7' : '#dbeafe',
                          color: method.badge === 'NEW' ? '#166534' : '#1e40af',
                          fontSize: '10px',
                          fontWeight: 600,
                          borderRadius: '3px',
                        }}>
                          {method.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* E-commerce Plugins */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            E-commerce Plugins
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ textAlign: 'left', padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontWeight: 600, color: '#1a1a1a' }}>Plugin</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontWeight: 600, color: '#1a1a1a' }}>Cards</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontWeight: 600, color: '#1a1a1a' }}>E-Wallets</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontWeight: 600, color: '#1a1a1a' }}>Bank Transfers & QR</th>
                  <th style={{ textAlign: 'left', padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontWeight: 600, color: '#1a1a1a' }}>Other</th>
                </tr>
              </thead>
              <tbody>
                {plugins.map((plugin) => (
                  <tr key={plugin.name}>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #e3e8ee', verticalAlign: 'top' }}>
                      <Link href={plugin.href} style={{ color: '#1A1F71', textDecoration: 'none', fontWeight: 600 }}>
                        {plugin.name}
                      </Link>
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontSize: '13px', color: '#697386', verticalAlign: 'top' }}>
                      {renderPaymentMethodLinks(plugin.methods.cards)}
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontSize: '13px', color: '#697386', verticalAlign: 'top', maxWidth: '200px' }}>
                      {renderPaymentMethodLinks(plugin.methods.ewallets)}
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontSize: '13px', color: '#697386', verticalAlign: 'top', maxWidth: '200px' }}>
                      {renderPaymentMethodLinks(plugin.methods.bankTransfers)}
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #e3e8ee', fontSize: '13px', color: '#697386', verticalAlign: 'top' }}>
                      {renderPaymentMethodLinks(plugin.methods.other)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Client-Side Libraries */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Client-Side Libraries
          </h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '20px', lineHeight: 1.6 }}>
            Run on the customer's device and use <strong>public key</strong> authentication to securely tokenize sensitive data.
          </p>

          <div style={{ display: 'grid', gap: '12px' }}>
            {clientLibraries.map((lib) => (
              <div key={lib.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>{lib.name}</div>
                  <div style={{ fontSize: '13px', color: '#697386' }}>{lib.supports}</div>
                </div>
                <a href={lib.github} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: '#1A1F71',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Server-Side Libraries */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Server-Side Libraries
          </h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '20px', lineHeight: 1.6 }}>
            Run on your systems and use <strong>secret key</strong> authentication to create charges, refunds, and manage payments.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {serverLibraries.map((lib) => (
              <a
                key={lib.name}
                href={lib.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{lib.name}</div>
                  <div style={{ fontSize: '12px', color: '#697386' }}>{lib.supports}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1A1F71">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* Payment Methods by Country */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Payment Methods by Country
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {paymentsByCountry.map((country) => (
              <div key={country.country} style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{country.flag}</span>
                  <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px' }}>{country.country}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {country.methods.map((method) => (
                    <span key={method} style={{
                      padding: '4px 10px',
                      background: '#f6f9fc',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#3c4257',
                    }}>
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 8px' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Content */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Related Content
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <Link href="/integrations/client-libraries/omise-js" style={{
              padding: '16px 20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Omise.js</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0 }}>Web tokenization library</p>
            </Link>

            <Link href="/accept-payments/cards/credit-debit" style={{
              padding: '16px 20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Collecting Cards</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0 }}>Accept card payments</p>
            </Link>

            <Link href="/api-reference/charges" style={{
              padding: '16px 20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Charges API</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0 }}>Create and manage charges</p>
            </Link>
          </div>
        </section>

        {/* Open Source Note */}
        <section>
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', border: '1px solid #e3e8ee' }}>
            <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
              All libraries are <strong>open source</strong> on <a href="https://github.com/omise" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71' }}>GitHub</a>.
              To contribute a feature or fix a bug, send a pull request.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
