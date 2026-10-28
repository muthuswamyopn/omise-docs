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

export default function WooCommercePage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'E-commerce Plugins', th: 'ปลั๊กอินอีคอมเมิร์ซ', ja: 'ECプラグイン' }, href: '/integrations/ecommerce-plugins' },
            { label: { en: 'WooCommerce', th: 'WooCommerce', ja: 'WooCommerce' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '36px' }}>🔮</span>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            WooCommerce
          </h1>
          <span style={{ padding: '4px 10px', background: '#dbeafe', color: '#1e40af', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }}>POPULAR</span>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept 30+ payment methods on your WordPress/WooCommerce store with the official Omise plugin.
          Easy installation from the WordPress Plugin Directory.
        </p>

        {/* Requirements */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '24px', background: '#f6f9fc', borderRadius: '12px', border: '1px solid #e3e8ee' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 16px' }}>
              System Requirements
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>WooCommerce</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>3.3.4 – 7.0.0</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>WordPress</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>5.0+</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>PHP</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>7.4+</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>SSL</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a' }}>Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation - WordPress Directory */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Installation from WordPress Plugin Directory
          </h2>
          <p style={{ fontSize: '15px', color: '#697386', marginBottom: '8px' }}>Recommended method</p>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Step 1 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>1</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Navigate to Add Plugins</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                In your WordPress admin panel, go to <strong>Plugins → Add New</strong>.
              </p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/directory_install.png" alt="WordPress Admin - Plugins > Add New menu" caption="Navigate to Plugins → Add New in WordPress admin" />
            </div>

            {/* Step 2 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>2</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Search for Omise</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                In the search box, type <strong>"Omise"</strong> and press Enter.
              </p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/directory_install.png" alt="WordPress Plugin Search showing Omise plugin" caption="Search for 'Omise' in the plugin directory" />
            </div>

            {/* Step 3 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>3</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Install the Plugin</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Click <strong>"Install Now"</strong> on the Omise Payment Gateway plugin. Wait for the installation to complete.
              </p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/directory_install.png" alt="Install Now button on Omise plugin" caption="Click 'Install Now' to download and install the plugin" />
            </div>

            {/* Step 4 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>4</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Activate the Plugin</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                After installation completes, click <strong>"Activate"</strong> to enable the plugin.
              </p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/directory_activate.png" alt="Activate button for Omise plugin" caption="Click 'Activate' to enable the Omise plugin" />
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <a
              href="https://wordpress.org/plugins/omise/"
              target="_blank"
              rel="noopener noreferrer"
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
              View on WordPress.org →
            </a>
          </div>
        </section>

        {/* Manual Installation */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Manual Installation
          </h2>
          <p style={{ fontSize: '15px', color: '#697386', marginBottom: '20px' }}>Alternative method for advanced users</p>

          <div style={{ padding: '24px', background: '#f6f9fc', borderRadius: '12px' }}>
            <ol style={{ fontSize: '15px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 2 }}>
              <li>Download the latest release from <a href="https://github.com/omise/omise-woocommerce/releases/latest" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71', fontWeight: 500 }}>GitHub</a></li>
              <li>Extract the ZIP file</li>
              <li>Upload the extracted folder to <code style={{ background: '#e3e8ee', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>/wp-content/plugins/</code></li>
              <li>Rename the folder to <strong>"omise"</strong></li>
              <li>Go to <strong>Plugins → Installed Plugins</strong> in WordPress admin</li>
              <li>Find "Omise Payment Gateway" and click <strong>Activate</strong></li>
            </ol>
          </div>

          <div style={{ marginTop: '16px' }}>
            <a
              href="https://github.com/omise/omise-woocommerce"
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
          </div>
        </section>

        {/* Configuration */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Configuration
          </h2>

          {/* Connect Account */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
              Connect Your Omise Account
            </h3>

            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Step 1: Access Omise Settings</div>
                <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  In WordPress admin, go to <strong>Omise → Settings</strong>.
                </p>
                <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/setup_keys.png" alt="Omise Settings menu in WordPress admin" caption="Navigate to Omise → Settings" />
              </div>

              <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Step 2: Enter Test Keys</div>
                <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
                  Find your test keys in the Omise Dashboard (make sure you're in Test Mode). Enter your:
                </p>
                <ul style={{ fontSize: '14px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                  <li><strong>Test Public Key</strong> (starts with <code style={{ background: '#e0e7ff', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>pkey_test_</code>)</li>
                  <li><strong>Test Secret Key</strong> (starts with <code style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>skey_test_</code>)</li>
                </ul>
                <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/setup_keys.png" alt="Omise API Keys configuration screen" caption="Enter your test API keys from the Omise Dashboard" />
              </div>

              <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Step 3: Enable Test Mode</div>
                <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Check the <strong>"Enable test mode"</strong> checkbox to use test keys for development and testing.
                </p>
              </div>

              <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Step 4: Add Live Keys (After Account Activation)</div>
                <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Once your Omise account is activated for live transactions, add your live keys and uncheck "Enable test mode".
                </p>
              </div>
            </div>
          </div>

          <InfoCallout type="info" title={{ en: 'Finding Your API Keys', th: 'การค้นหาคีย์ API', ja: 'APIキーの検索' }}>
            Test keys are found in the Omise Dashboard when in <strong>Test Mode</strong>. Live keys are only visible after your account is activated and you switch to <strong>Live Mode</strong>.
          </InfoCallout>
        </section>

        {/* Payment Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Payment Method Configuration
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            The plugin supports 30+ payment methods. Enable specific methods by clicking "config" next to each option.
          </p>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/setup_payment_methods.png" alt="WooCommerce Omise payment methods configuration screen" caption="Payment method configuration screen showing available options" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '24px' }}>
            {[
              { category: 'Cards', methods: ['Credit Cards', 'Debit Cards'] },
              { category: 'Digital Wallets', methods: ['Google Pay', 'Apple Pay', 'GrabPay', 'ShopeePay', 'TrueMoney', 'Rabbit LINE Pay'] },
              { category: 'Thailand', methods: ['PromptPay', 'Mobile Banking', 'Installments'] },
              { category: 'Singapore', methods: ['PayNow', 'GrabPay', 'OCBC Digital'] },
              { category: 'Malaysia', methods: ['FPX', 'DuitNow QR', 'DuitNow Online', 'Boost', 'Touch \'n Go'] },
              { category: 'Buy Now Pay Later', methods: ['Card Installments', 'Atome'] },
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

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            3D Secure adds an extra layer of authentication for card payments. Once enabled on your account,
            the plugin automatically supports both 3DS and non-3DS transactions.
          </p>

          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>To enable 3D Secure:</div>
            <ol style={{ fontSize: '14px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
              <li>Contact <a href="mailto:support@omise.co" style={{ color: '#1A1F71', fontWeight: 500 }}>support@omise.co</a> to enable 3DS on your Omise account</li>
              <li>No additional plugin configuration is required</li>
              <li>The plugin will automatically handle 3DS authentication when required</li>
            </ol>
          </div>
        </section>

        {/* Secure Form */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Secure Payment Form
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            The plugin includes an optional secure payment form that can be customized with light or dark themes.
          </p>

          <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/woocommerce-plugin/form-customization1.png" alt="Omise Secure Form customization interface" caption="Secure form customization with theme options" />

          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', marginTop: '20px' }}>
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>To enable the Secure Form:</div>
            <ol style={{ fontSize: '14px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
              <li>Go to <strong>WooCommerce → Settings → Payments</strong></li>
              <li>Click <strong>"Manage"</strong> next to Credit/Debit Cards</li>
              <li>Go to <strong>Advanced Settings</strong></li>
              <li>Enable <strong>Secure Form</strong></li>
              <li>Choose your theme (Light or Dark)</li>
              <li>Preview and save your changes</li>
            </ol>
          </div>

          <InfoCallout type="warning" title={{ en: 'Note', th: 'หมายเหตุ', ja: '注意' }}>
            Any customizations made to the earlier card payment form are <strong>NOT retained</strong> when switching to the new secure form.
          </InfoCallout>
        </section>

        {/* Troubleshooting */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Troubleshooting
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { issue: 'Plugin not appearing in WooCommerce settings', solution: 'Make sure the plugin is activated in Plugins → Installed Plugins.' },
              { issue: 'API key validation failing', solution: 'Verify you are using the correct keys for your mode (test keys for test mode, live keys for live mode).' },
              { issue: 'Payment methods not showing at checkout', solution: 'Go to Omise Settings and ensure the payment methods are enabled. Also check that your Omise account supports those methods.' },
              { issue: 'WooCommerce version not supported', solution: 'Contact support@omise.co for assistance with unsupported versions.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '14px' }}>{item.issue}</div>
                <div style={{ fontSize: '14px', color: '#697386', lineHeight: 1.6 }}>{item.solution}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Support */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Support
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            The plugin is open-source and welcomes community contributions. For support inquiries, include "Support Request: WooCommerce" in your email subject.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="mailto:support@omise.co?subject=Support Request: WooCommerce"
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
              href="https://github.com/omise/omise-woocommerce"
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
            <Link href="/integrations/advanced/webhooks" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Webhooks →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
