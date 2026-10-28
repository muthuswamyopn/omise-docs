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

export default function ECCubePage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'E-commerce Plugins', th: 'ปลั๊กอินอีคอมเมิร์ซ', ja: 'ECプラグイン' }, href: '/integrations/ecommerce-plugins' },
            { label: { en: 'EC-CUBE', th: 'EC-CUBE', ja: 'EC-CUBE' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '36px' }}>🇯🇵</span>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            EC-CUBE
          </h1>
          <span style={{ padding: '4px 10px', background: '#fee2e2', color: '#991b1b', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }}>JAPAN</span>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Payment plugin for EC-CUBE, popular in Japan. Supports JCB and Japanese card brands.
        </p>

        {/* Requirements */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '12px', border: '1px solid #e3e8ee' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 12px' }}>
              Requirements
            </h2>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>EC-CUBE Version</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>2.13.3 – 2.17</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>PHP</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>7.0+</div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Payment Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Payment Methods
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>💳</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>Credit & Debit Cards</span>
              </div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0 }}>
                Visa, Mastercard, JCB, AMEX, Diners Club
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>🏦</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>OCBC Digital</span>
              </div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0 }}>
                Singapore bank payments
              </p>
            </div>
          </div>

          <InfoCallout type="warning" title={{ en: 'Note', th: 'หมายเหตุ', ja: '注意' }}>
            3DS-enabled accounts are not supported by this plugin. Contact support for alternative solutions.
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
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Download the Plugin</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px' }}>Download the latest release from the GitHub repository.</p>
              <a href="https://github.com/omise/omise-eccube/releases/latest" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#1A1F71', textDecoration: 'none', fontWeight: 500 }}>
                Download from GitHub →
              </a>
            </div>

            {/* Step 2 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>2</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Access Owner Store</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>Log into EC-CUBE admin interface at <strong>/admin/ownersstore/</strong>.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/eccube/eccube-sc-1.png" alt="EC-CUBE Owner Store" caption="Access the Owner Store in EC-CUBE admin" />
            </div>

            {/* Step 3 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>3</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Upload Plugin</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>Select the downloaded file and click the install button.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/eccube/eccube-sc-2.png" alt="EC-CUBE upload plugin" caption="Upload and install the Omise plugin" />
            </div>

            {/* Step 4 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>4</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Activate</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>Enable the plugin by clicking the activation option.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/eccube/eccube-sc-3.png" alt="EC-CUBE activate plugin" caption="Activate the Omise plugin" />
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Configuration
          </h2>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/eccube/eccube-sc-4.png" alt="EC-CUBE Omise configuration" caption="Omise plugin configuration screen" />

          {/* API Keys */}
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              API Keys Setup
            </h3>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
              Enter both LIVE and TEST keys from your Omise dashboard. Both fields should be configured even in test mode.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e3e8ee' }}>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>LIVE Keys</div>
                <div style={{ fontSize: '13px', color: '#1a1a1a' }}>For production transactions</div>
              </div>
              <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e3e8ee' }}>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>TEST Keys</div>
                <div style={{ fontSize: '13px', color: '#1a1a1a' }}>For sandbox testing</div>
              </div>
            </div>
          </div>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/eccube/eccube-sc-5.png" alt="EC-CUBE API keys" caption="Enter your Omise API keys" />

          {/* Sandbox Mode */}
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Sandbox Mode Options
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: '#fef3c7', borderRadius: '6px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>T</span>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#92400e', fontSize: '13px' }}>Test Mode</div>
                  <div style={{ fontSize: '12px', color: '#92400e' }}>Use Test keys to run Omise API(s). No real transactions happen.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: '#dcfce7', borderRadius: '6px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>L</span>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#166534', fontSize: '13px' }}>Live Mode</div>
                  <div style={{ fontSize: '12px', color: '#166534' }}>Use Live keys to run Omise API(s). Real transactions happen.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Capture Settings */}
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Capture Settings
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e3e8ee' }}>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '13px', marginBottom: '4px' }}>Immediate Capture</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Capture payment on purchase</div>
              </div>
              <div style={{ padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #e3e8ee' }}>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '13px', marginBottom: '4px' }}>Authorization Only</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Manual capture later from admin</div>
              </div>
            </div>
          </div>

          {/* Payment Method Name */}
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
              Payment Method Display
            </h3>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
              Default name displayed to customers:
            </p>
            <span style={{ display: 'inline-block', padding: '8px 12px', background: '#1a1a2e', color: '#ffffff', borderRadius: '6px', fontSize: '14px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              クレジットカード決済[Omise]
            </span>
            <p style={{ fontSize: '13px', color: '#697386', marginTop: '8px' }}>
              This can be customized in the plugin settings.
            </p>
          </div>
        </section>

        {/* Activation */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Activate Payment Method
          </h2>

          <InfoCallout type="info" title={{ en: 'Required Step', th: 'ขั้นตอนที่จำเป็น', ja: '必須ステップ' }}>
            You must add the Omise payment method to your shipping method settings for activation.
            Without this step, the payment method will not appear at checkout.
          </InfoCallout>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/eccube/eccube-sc-6.png" alt="EC-CUBE checkout with Omise" caption="Omise payment option at checkout" />
        </section>

        {/* Resources */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Resources
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            The plugin is open source on GitHub, welcoming pull requests and community contributions.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="https://github.com/omise/omise-eccube"
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
            <Link href="/accept-payments/convenience-store" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Konbini Payments →</Link>
            <Link href="/getting-started/go-live-checklist" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Go Live Checklist →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
