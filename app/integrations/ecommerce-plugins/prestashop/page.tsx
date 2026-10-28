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

export default function PrestaShopPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'E-commerce Plugins', th: 'ปลั๊กอินอีคอมเมิร์ซ', ja: 'ECプラグイン' }, href: '/integrations/ecommerce-plugins' },
            { label: { en: 'PrestaShop', th: 'PrestaShop', ja: 'PrestaShop' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '36px' }}>🎯</span>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            PrestaShop
          </h1>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Payment module for PrestaShop 1.6+. Modern checkout experience with all Omise payment methods.
        </p>

        {/* Requirements */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '12px', border: '1px solid #e3e8ee' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 12px' }}>
              Requirements
            </h2>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>PrestaShop Version</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>1.6.1.19 – 1.6.1.23</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>PHP</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>7.0+</div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#697386', margin: '12px 0 0' }}>
              Using a different version? <a href="mailto:support@omise.co" style={{ color: '#1A1F71' }}>Contact support</a> for assistance.
            </p>
          </div>
        </section>

        {/* Supported Payment Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Payment Methods
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { method: 'Credit & Debit Cards', icon: '💳' },
              { method: 'Alipay Online', icon: '🔵' },
              { method: 'TrueMoney Wallet', icon: '🟠' },
              { method: 'OCBC Digital', icon: '🏦' },
              { method: 'Pay with Points', icon: '⭐' },
            ].map(item => (
              <div key={item.method} style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', color: '#1a1a1a', fontWeight: 500 }}>{item.method}</span>
              </div>
            ))}
          </div>

          <InfoCallout type="info" title={{ en: 'More Methods Available', th: 'มีวิธีการเพิ่มเติม', ja: '他の方法も利用可能' }}>
            Additional payment methods are available upon request. Contact support for more information.
          </InfoCallout>
        </section>

        {/* Installation */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Installation
          </h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Step 1 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>1</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Download the Module</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px' }}>Download the latest release from GitHub.</p>
              <a href="https://github.com/omise/omise-prestashop" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#1A1F71', textDecoration: 'none', fontWeight: 500 }}>
                Download from GitHub →
              </a>
            </div>

            {/* Step 2 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>2</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Access Module Manager</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>In PrestaShop admin, go to <strong>Modules & Services</strong>.</p>
              <Screenshot src="https://user-images.githubusercontent.com/4145121/33422261-b097cbc2-d5e7-11e7-8270-f2e20cc2ad68.png" alt="PrestaShop Modules menu" caption="Navigate to Modules & Services in PrestaShop admin" />
            </div>

            {/* Step 3 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>3</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Upload Module</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>Select <strong>"Upload a module"</strong> and choose the downloaded file.</p>
              <Screenshot src="https://user-images.githubusercontent.com/4145121/33428747-b0f73aa2-d5fc-11e7-93c1-2ada62d88e2c.png" alt="PrestaShop upload module" caption="Upload the Omise module file" />
            </div>

            {/* Step 4 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>4</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Install</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>The module will be installed automatically.</p>
              <Screenshot src="https://user-images.githubusercontent.com/4145121/33428763-bb96fccc-d5fc-11e7-8810-2b9f618b999b.png" alt="PrestaShop module installed" caption="Module installed successfully" />
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Configuration
          </h2>

          <ol style={{ fontSize: '15px', color: '#3c4257', lineHeight: 2, marginBottom: '24px', paddingLeft: '20px' }}>
            <li>Go to <strong>Modules and Services</strong> in the admin panel</li>
            <li>Search for and locate the <strong>Omise</strong> module</li>
            <li>Click <strong>Configuration</strong> to access settings</li>
            <li>Set <strong>Enable/Disable</strong> to "Yes"</li>
            <li>Enter your API keys (public and secret)</li>
          </ol>

          <Screenshot src="https://cloud.githubusercontent.com/assets/4145121/24504148/471ec17e-157f-11e7-91ae-170f39e2da50.png" alt="PrestaShop Omise configuration" caption="Configure the Omise module settings" />

          <Screenshot src="https://cloud.githubusercontent.com/assets/4145121/24504149/471fd1c2-157f-11e7-9106-44cc67699f1c.png" alt="PrestaShop API keys" caption="Enter your API keys in the configuration" />

          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', marginTop: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Sandbox Mode
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '12px 16px', background: '#fef3c7', borderRadius: '6px' }}>
                <div style={{ fontWeight: 600, color: '#92400e', fontSize: '13px', marginBottom: '4px' }}>Enabled (Test Mode)</div>
                <div style={{ fontSize: '12px', color: '#92400e' }}>Uses TEST keys for development</div>
              </div>
              <div style={{ padding: '12px 16px', background: '#dcfce7', borderRadius: '6px' }}>
                <div style={{ fontWeight: 600, color: '#166534', fontSize: '13px', marginBottom: '4px' }}>Disabled (Live Mode)</div>
                <div style={{ fontSize: '12px', color: '#166534' }}>Uses LIVE keys for real transactions</div>
              </div>
            </div>
          </div>

          <Screenshot src="https://cloud.githubusercontent.com/assets/4145121/24504150/47264c28-157f-11e7-866f-9dbfa94702c6.png" alt="PrestaShop payment checkout" caption="Omise payment option at checkout" />
        </section>

        {/* 3D Secure */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            3D Secure Setup
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            To implement 3DS processing:
          </p>

          <ol style={{ fontSize: '15px', color: '#3c4257', lineHeight: 2, marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Enable 3DS within the plugin configuration first</li>
            <li>Contact Omise support to activate 3DS on your account</li>
          </ol>

          <InfoCallout type="warning" title={{ en: 'Important', th: 'สำคัญ', ja: '重要' }}>
            This order is important. Enabling 3DS on your account before configuring the plugin may result in errors about missing return URIs.
          </InfoCallout>
        </section>

        {/* Resources */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Resources
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            The plugin is open source on GitHub, welcoming community contributions.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="https://github.com/omise/omise-prestashop"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
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
            <a
              href="mailto:support@omise.co"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: '#1A1F71',
                color: '#fff',
                fontWeight: 500,
                fontSize: '14px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Contact Support →
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
