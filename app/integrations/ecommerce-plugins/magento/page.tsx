'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';
import InfoCallout from '../../../components/InfoCallout';

// Component for actual screenshots
function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure style={{ margin: '20px 0', padding: '0' }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          maxWidth: '100%',
          borderRadius: '8px',
          border: '1px solid #e3e8ee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      />
      {caption && (
        <figcaption style={{ marginTop: '8px', fontSize: '13px', color: '#697386', textAlign: 'center', fontStyle: 'italic' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function MagentoPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'E-commerce Plugins', th: 'ปลั๊กอินอีคอมเมิร์ซ', ja: 'ECプラグイン' }, href: '/integrations/ecommerce-plugins' },
            { label: { en: 'Magento', th: 'Magento', ja: 'Magento' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '36px' }}>🧡</span>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            Magento 2
          </h1>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Enterprise-grade payment extension for Magento 2 stores. Install via Composer and accept 30+ payment methods.
        </p>

        {/* Requirements */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '24px', background: '#f6f9fc', borderRadius: '12px', border: '1px solid #e3e8ee' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 16px' }}>
              System Requirements
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Magento Version</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>2.1.18 – 2.4.5</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>PHP</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>7.4+</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Composer</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>Required</div>
              </div>
            </div>
          </div>

          <InfoCallout type="info" title={{ en: 'Version Requirement', th: 'ข้อกำหนดเวอร์ชัน', ja: 'バージョン要件' }}>
            Please use at least the minimum recommended version of the omise-magento library for best compatibility.
          </InfoCallout>
        </section>

        {/* Installation */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Installation via Composer
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Step 1: Install the Extension
            </h3>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
              Run the following command in your Magento root directory:
            </p>
            <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '8px' }}>
              <span style={{ color: '#ffffff', fontSize: '14px', fontFamily: "'SF Mono', Monaco, monospace", background: 'transparent' }}>
                composer require omise/omise-magento
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Step 2: Enable the Module
            </h3>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
              For existing Magento installations, run these additional commands:
            </p>
            <div style={{ padding: '20px', background: '#1a1a2e', borderRadius: '8px' }}>
              <div style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', color: '#ffffff', lineHeight: 2 }}>
                <div style={{ color: '#b8c7d9' }}># Enable the Omise module</div>
                <div style={{ color: '#ffffff' }}>php bin/magento module:enable Omise_Payment --clear-static-content</div>
                <div style={{ marginTop: '12px', color: '#b8c7d9' }}># Run setup upgrade</div>
                <div style={{ color: '#ffffff' }}>php bin/magento setup:upgrade</div>
                <div style={{ marginTop: '12px', color: '#b8c7d9' }}># Compile dependencies</div>
                <div style={{ color: '#ffffff' }}>php bin/magento setup:di:compile</div>
              </div>
            </div>
          </div>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/magento-plugin/configuration.png" alt="Magento Omise configuration screen" caption="Omise extension configuration in Magento admin" />
        </section>

        {/* Configuration */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Configuration
          </h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Step 1 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>1</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Access Payment Methods</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                In Magento Admin, navigate to <strong>Stores → Configuration → Sales → Payment Methods</strong>.
              </p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/magento-plugin/configuration.png" alt="Magento Admin - Stores > Configuration > Sales > Payment Methods" caption="Navigate to Payment Methods configuration" />
            </div>

            {/* Step 2 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>2</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Locate Omise Section</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Find the <strong>Omise</strong> section in the payment methods list and expand it.
              </p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/magento-plugin/configuration.png" alt="Omise payment method section in Magento admin" caption="Expand the Omise section to view configuration options" />
            </div>

            {/* Step 3 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>3</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Enter API Credentials</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Enter your API keys from the Omise Dashboard:
              </p>
              <ul style={{ fontSize: '14px', color: '#3c4257', margin: '0 0 16px', paddingLeft: '20px', lineHeight: 1.8 }}>
                <li><strong>Public Key</strong> – starts with <code style={{ background: '#e0e7ff', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>pkey_</code></li>
                <li><strong>Secret Key</strong> – starts with <code style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>skey_</code></li>
              </ul>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/magento-plugin/configuration.png" alt="Omise API credentials configuration in Magento" caption="Enter your public and secret keys" />
            </div>

            {/* Step 4 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>4</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Configure Sandbox Mode</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', lineHeight: 1.6 }}>
                Toggle <strong>Sandbox Mode</strong> appropriately:
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <div style={{ flex: 1, padding: '12px 16px', background: '#fef3c7', borderRadius: '6px' }}>
                  <div style={{ fontWeight: 600, color: '#92400e', fontSize: '13px' }}>Sandbox: Yes</div>
                  <div style={{ fontSize: '12px', color: '#92400e' }}>Uses test keys, no real charges</div>
                </div>
                <div style={{ flex: 1, padding: '12px 16px', background: '#dcfce7', borderRadius: '6px' }}>
                  <div style={{ fontWeight: 600, color: '#166534', fontSize: '13px' }}>Sandbox: No</div>
                  <div style={{ fontSize: '12px', color: '#166534' }}>Uses live keys, real charges</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Payment Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Payment Methods
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            The extension supports 30+ payment methods. Enable each method you want to offer:
          </p>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/magento-plugin/configuration.png" alt="Magento Omise payment methods list" caption="Enable payment methods for your store" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '24px' }}>
            {[
              { category: 'Cards', methods: ['Credit Cards', 'Debit Cards', 'Google Pay', 'Apple Pay'] },
              { category: 'QR & Bank Transfer', methods: ['PromptPay', 'PayNow', 'FPX', 'DuitNow'] },
              { category: 'E-Wallets', methods: ['GrabPay', 'ShopeePay', 'TrueMoney', 'Rabbit LINE Pay', 'Boost', 'Touch \'n Go'] },
              { category: 'Installments', methods: ['Card Installments', 'Atome'] },
            ].map(group => (
              <div key={group.category} style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '13px' }}>{group.category}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {group.methods.map(method => (
                    <span key={method} style={{ fontSize: '13px', color: '#697386' }}>{method}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3D Secure */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            3D Secure (3DS)
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            To enable 3D Secure processing:
          </p>

          <ol style={{ fontSize: '15px', color: '#3c4257', paddingLeft: '20px', lineHeight: 2, marginBottom: '20px' }}>
            <li>Contact <a href="mailto:support@omise.co" style={{ color: '#1A1F71', fontWeight: 500 }}>support@omise.co</a> to enable 3DS on your account</li>
            <li>Once enabled, 3DS is automatically handled by the extension</li>
          </ol>

          <InfoCallout type="warning" title={{ en: '3DS Return URI Error', th: 'ข้อผิดพลาด 3DS Return URI', ja: '3DS Return URIエラー' }}>
            If you see the error "3D Secure is requested, but return URI is not set", ensure 3DS is properly configured in both your Omise account and the Magento extension settings.
          </InfoCallout>
        </section>

        {/* Secure Form */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Secure Payment Form
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Configure the secure payment form appearance:
          </p>

          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', marginBottom: '20px' }}>
            <ol style={{ fontSize: '14px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
              <li>Go to <strong>Payment Settings → Configure Omise</strong></li>
              <li>Expand <strong>Enable Credit Card Payment</strong></li>
              <li>Set <strong>Secure Form</strong> to <strong>Yes</strong></li>
              <li>Choose your theme (<strong>Light</strong> or <strong>Dark</strong>)</li>
              <li>Customize the appearance using the provided interface</li>
              <li>Click <strong>Save Configuration</strong></li>
            </ol>
          </div>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/magento-plugin/form-customization-magento.png" alt="Magento Secure Form theme customization" caption="Choose between light and dark themes for the payment form" />

          <InfoCallout type="tip" title={{ en: 'Clear Cache', th: 'ล้างแคช', ja: 'キャッシュをクリア' }}>
            After making changes, clear your browser cache to see the updates immediately.
          </InfoCallout>
        </section>

        {/* Multi-Store */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Multi-Store Configuration
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            The extension supports Magento's multi-store functionality. Configure different payment settings for each store view:
          </p>

          <ol style={{ fontSize: '15px', color: '#3c4257', paddingLeft: '20px', lineHeight: 2 }}>
            <li>Select the <strong>Store View</strong> from the scope selector at the top of the configuration page</li>
            <li>Uncheck <strong>"Use Website"</strong> for settings you want to customize</li>
            <li>Enter store-specific API keys or payment method settings</li>
            <li>Save the configuration</li>
          </ol>
        </section>

        {/* Support */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Support
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            The extension is open-source and available on GitHub. For support inquiries, contact the Omise support team.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="mailto:support@omise.co?subject=Support Request: Magento"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#1A1F71',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Contact Support →
            </a>
            <a
              href="https://github.com/omise/omise-magento"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#1a1a1a',
                color: '#fff',
                fontWeight: 500,
                fontSize: '14px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Related
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/integrations/ecommerce-plugins" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>All Plugins →</Link>
            <Link href="/accept-payments" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Payment Methods →</Link>
            <Link href="/getting-started/go-live-checklist" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Go Live Checklist →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
