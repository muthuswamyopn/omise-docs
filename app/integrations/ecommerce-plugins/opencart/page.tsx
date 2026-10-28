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

export default function OpenCartPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'E-commerce Plugins', th: 'ปลั๊กอินอีคอมเมิร์ซ', ja: 'ECプラグイン' }, href: '/integrations/ecommerce-plugins' },
            { label: { en: 'OpenCart', th: 'OpenCart', ja: 'OpenCart' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '36px' }}>🛒</span>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            OpenCart
          </h1>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Free payment extension for OpenCart stores. Quick installation with comprehensive documentation.
        </p>

        {/* Requirements */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '12px', border: '1px solid #e3e8ee' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 12px' }}>
              Requirements
            </h2>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>OpenCart Version</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>2.0.3.1</div>
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

          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px', flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Credit & Debit Cards</div>
              <div style={{ fontSize: '13px', color: '#697386' }}>Visa, Mastercard, JCB, AMEX</div>
            </div>
            <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px', flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>OCBC Digital</div>
              <div style={{ fontSize: '13px', color: '#697386' }}>Singapore bank payments</div>
            </div>
          </div>

          <InfoCallout type="info" title={{ en: 'More Methods Available', th: 'มีวิธีการเพิ่มเติม', ja: '他の方法も利用可能' }}>
            Additional payment methods can be requested through support.
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
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Download the Extension</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px' }}>Download and extract the latest release from GitHub.</p>
              <a href="https://github.com/omise/omise-opencart" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#1A1F71', textDecoration: 'none', fontWeight: 500 }}>
                Download from GitHub →
              </a>
            </div>

            {/* Step 2 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>2</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Upload Files</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>Merge the src folder contents with your OpenCart root directory.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/opencart-plugin/manual_folder.png" alt="OpenCart folder structure" caption="Merge the plugin files with your OpenCart installation" />
            </div>

            {/* Step 3 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>3</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Install Extension</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>In admin panel, go to <strong>Extensions → Payments</strong>. Find "Omise Payment Gateway" and click the green plus button.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/opencart-plugin/setup_find.png" alt="Find Omise in OpenCart Extensions" caption="Locate Omise Payment Gateway in the extensions list" />
            </div>

            {/* Step 4 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>4</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Activate the Extension</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>Click to activate and ensure write permissions are available for the OpenCart folder.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/opencart-plugin/manual_activate.png" alt="Activate Omise extension" caption="Activate the Omise Payment Gateway extension" />
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Configuration
          </h2>

          <ol style={{ fontSize: '15px', color: '#3c4257', lineHeight: 2, marginBottom: '24px', paddingLeft: '20px' }}>
            <li>Go to <strong>Extensions → Payments</strong> in the admin panel</li>
            <li>Click the blue pencil icon on "Omise Payment Gateway"</li>
            <li>Access the <strong>Setting</strong> page</li>
            <li>Enter your API keys (test and live modes supported)</li>
          </ol>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/opencart-plugin/setup_edit.png" alt="OpenCart Omise settings" caption="Click the edit button to access Omise settings" />

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/opencart-plugin/setup_keys.png" alt="OpenCart API keys configuration" caption="Enter your Omise API keys" />

          {/* Settings Table */}
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', marginTop: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Setting</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { setting: 'Module Status', desc: 'Enable or disable the extension' },
                  { setting: 'Test/Live Mode', desc: 'Switch between TEST and LIVE transaction modes' },
                  { setting: 'API Keys', desc: 'Configure authentication credentials (public and secret keys)' },
                  { setting: '3D-Secure', desc: 'Enable fraud protection for card payments' },
                  { setting: 'Payment Action', desc: 'Choose auto-capture or manual capture authorization' },
                ].map((row, i, arr) => (
                  <tr key={row.setting}>
                    <td style={{ padding: '12px 16px', borderBottom: i < arr.length - 1 ? '1px solid #e3e8ee' : 'none', fontWeight: 500, color: '#1a1a1a' }}>{row.setting}</td>
                    <td style={{ padding: '12px 16px', borderBottom: i < arr.length - 1 ? '1px solid #e3e8ee' : 'none', fontSize: '14px', color: '#697386' }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/opencart-plugin/setup_enable.png" alt="OpenCart enable Omise" caption="Enable the Omise payment gateway" />
        </section>

        {/* 3D Secure */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            3D Secure Configuration
          </h2>

          <ol style={{ fontSize: '15px', color: '#3c4257', lineHeight: 2, marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Enable 3DS in the plugin configuration first</li>
            <li>Contact Omise support to activate 3DS on your account</li>
          </ol>

          <InfoCallout type="warning" title={{ en: 'Important', th: 'สำคัญ', ja: '重要' }}>
            Failure to enable 3DS in the plugin before contacting support may result in payment rejections with the message "3D Secure is requested, but return URI is not set."
          </InfoCallout>
        </section>

        {/* Resources */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Resources
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            The plugin is open-source on GitHub, allowing customization and community contributions.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="https://github.com/omise/omise-opencart"
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
            <Link href="/accept-payments/cards/credit-debit" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Card Payments →</Link>
            <Link href="/getting-started/go-live-checklist" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Go Live Checklist →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
