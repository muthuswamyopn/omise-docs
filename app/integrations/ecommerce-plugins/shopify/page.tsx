'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';
import InfoCallout from '../../../components/InfoCallout';

// Component for actual screenshots
function Screenshot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure style={{ margin: '16px 0', padding: '0' }}>
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

export default function ShopifyPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'E-commerce Plugins', th: 'ปลั๊กอินอีคอมเมิร์ซ', ja: 'ECプラグイン' }, href: '/integrations/ecommerce-plugins' },
            { label: { en: 'Shopify', th: 'Shopify', ja: 'Shopify' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '36px' }}>🛍️</span>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            Shopify
          </h1>
          <span style={{ padding: '4px 10px', background: '#dbeafe', color: '#1e40af', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }}>MOST POPULAR</span>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Connect Omise to your Shopify store through OAuth authentication. No programming required.
          Accept 30+ payment methods including cards, e-wallets, bank transfers, and installments.
        </p>

        {/* Quick Install Banner */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '24px', background: 'linear-gradient(135deg, #95bf47 0%, #5e8e3e 100%)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>
                  Install from Shopify App Store
                </h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                  One-click installation with OAuth authentication
                </p>
              </div>
              <a
                href="https://apps.shopify.com/omise"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 24px',
                  background: '#fff',
                  color: '#5e8e3e',
                  fontWeight: 600,
                  fontSize: '14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Install App →
              </a>
            </div>
          </div>
        </section>

        {/* Supported Payment Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Payment Methods
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            The Shopify integration supports 30+ payment methods across Southeast Asia and beyond:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {/* Cards */}
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Credit & Debit Cards</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Visa', 'Mastercard', 'JCB', 'AMEX', 'Diners', 'Discover'].map(card => (
                  <span key={card} style={{ padding: '4px 8px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>{card}</span>
                ))}
              </div>
            </div>

            {/* Digital Wallets */}
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Digital Wallets</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Alipay CN', 'Alipay HK', 'WeChat Pay', 'GrabPay', 'ShopeePay', 'TrueMoney', 'Rabbit LINE Pay', 'Boost', 'Touch \'n Go', 'DANA', 'GCash', 'PayPay'].map(wallet => (
                  <span key={wallet} style={{ padding: '4px 8px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>{wallet}</span>
                ))}
              </div>
            </div>

            {/* Bank Transfers */}
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Bank Transfers & QR</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['PromptPay', 'PayNow', 'DuitNow QR', 'DuitNow Online', 'FPX'].map(method => (
                  <span key={method} style={{ padding: '4px 8px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>{method}</span>
                ))}
              </div>
            </div>

            {/* Mobile Banking */}
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Mobile Banking (Thailand)</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Bangkok Bank', 'KBank', 'Krung Thai', 'Krungsri', 'SCB', 'OCBC'].map(bank => (
                  <span key={bank} style={{ padding: '4px 8px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>{bank}</span>
                ))}
              </div>
            </div>

            {/* Installments */}
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Installments & BNPL</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Card Installments', 'Atome'].map(method => (
                  <span key={method} style={{ padding: '4px 8px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>{method}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Installation Steps */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Installation
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Connect your Omise account to Shopify through the Omise Dashboard:
          </p>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Step 1 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>1</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Access Third-Party Integrations</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '4px', lineHeight: 1.6 }}>In your Omise Dashboard, navigate to <strong>Settings → Third Party Integrations</strong>.</p>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px' }}>You must have an active Omise account to proceed.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/shopify/shopify_guide_1.png" alt="Omise Dashboard - Third Party Integrations" caption="Navigate to Settings → Third Party Integrations in the Omise Dashboard" />
            </div>

            {/* Step 2 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>2</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Install the Shopify App</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '4px', lineHeight: 1.6 }}>Click <strong>"Install app"</strong> and you will be redirected to Shopify.</p>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px' }}>Log in with your Shopify admin credentials when prompted.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/shopify/shopify_guide_2.png" alt="Install Shopify App button" caption="Click 'Install app' to begin the OAuth connection" />
            </div>

            {/* Step 3 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>3</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Authorize the Connection</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '4px', lineHeight: 1.6 }}>On the Shopify authorization screen, click <strong>"Connect"</strong> then <strong>"Install app"</strong>.</p>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px' }}>This grants Omise permission to process payments for your store.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/shopify/shopify_guide_3.png" alt="Shopify authorization screen" caption="Authorize Omise to access your Shopify store" />
            </div>

            {/* Step 4 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>4</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Confirm Account Association</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '4px', lineHeight: 1.6 }}>You will be redirected back to the Omise dashboard to confirm the connection.</p>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px' }}>Select the team/account you want to associate with this Shopify store.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/shopify/shopify_guide_4.png" alt="Confirm account association" caption="Select the Omise account to connect" />
            </div>

            {/* Step 5 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>5</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Configure Payment Methods</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '4px', lineHeight: 1.6 }}>In your Shopify Admin, select which payment methods to enable.</p>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px' }}>Disable test mode when you are ready to accept real payments.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/shopify/shopify_guide_5.png" alt="Configure payment methods" caption="Select payment methods and configure test/live mode" />
            </div>

            {/* Step 6 */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>6</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Activate Omise</h3>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '4px', lineHeight: 1.6 }}>Click <strong>"Activate Omise"</strong> to enable the payment gateway on your checkout.</p>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px' }}>Your customers can now pay using Omise payment methods.</p>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/shopify/shopify_guide_6.png" alt="Activate Omise" caption="Click 'Activate Omise' to complete the setup" />
            </div>
          </div>

          <InfoCallout type="warning" title={{ en: 'Important: Key Rolling', th: 'สำคัญ: การเปลี่ยนคีย์', ja: '重要：キーのローリング' }}>
            Run these installation steps <strong>each time you roll your API keys</strong> to reconnect the Omise App with your Shopify account. Failing to do so will break payment processing.
          </InfoCallout>
        </section>

        {/* Configuration */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Configuration
          </h2>

          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Test vs Live Mode */}
            <div style={{ padding: '24px', background: '#f6f9fc', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                Test Mode vs Live Mode
              </h3>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Toggle between test and live modes through the Omise Dashboard. After switching modes:
              </p>
              <ol style={{ fontSize: '14px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>Go to your <strong>Shopify Admin</strong></li>
                <li>Navigate to <strong>Settings → Payments</strong></li>
                <li>Click <strong>"Manage"</strong> under Omise</li>
                <li>Toggle <strong>"Enable test mode"</strong> to match your dashboard setting</li>
                <li>Click <strong>Save</strong></li>
              </ol>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <div style={{ flex: 1, padding: '12px 16px', background: '#fef3c7', borderRadius: '6px' }}>
                  <div style={{ fontWeight: 600, color: '#92400e', fontSize: '13px' }}>Test Mode</div>
                  <div style={{ fontSize: '12px', color: '#92400e' }}>Uses test API keys. No real transactions.</div>
                </div>
                <div style={{ flex: 1, padding: '12px 16px', background: '#dcfce7', borderRadius: '6px' }}>
                  <div style={{ fontWeight: 600, color: '#166534', fontSize: '13px' }}>Live Mode</div>
                  <div style={{ fontSize: '12px', color: '#166534' }}>Uses live API keys. Real transactions.</div>
                </div>
              </div>
            </div>

            {/* 3D Secure */}
            <div style={{ padding: '24px', background: '#f6f9fc', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                3D Secure (3DS)
              </h3>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                3D Secure adds an extra layer of authentication for card payments, reducing fraud and chargebacks.
              </p>
              <div style={{ padding: '16px', background: '#fff', borderRadius: '8px', border: '1px solid #e3e8ee' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '14px' }}>To enable 3D Secure:</div>
                <ol style={{ fontSize: '14px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                  <li>Contact <a href="mailto:support@omise.co" style={{ color: '#1A1F71' }}>support@omise.co</a> to enable 3DS on your account</li>
                  <li>Once enabled, the plugin automatically processes both 3DS and non-3DS transactions</li>
                </ol>
              </div>
            </div>

            {/* Manual Capture */}
            <div style={{ padding: '24px', background: '#f6f9fc', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                Manual Payment Capture
              </h3>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Some payment methods do not support automatic capture and require manual capture through the Shopify admin:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {['TrueMoney Wallet', 'Installments', 'Some mobile banking methods'].map(method => (
                  <span key={method} style={{ padding: '6px 12px', background: '#fef3c7', color: '#92400e', fontSize: '12px', fontWeight: 500, borderRadius: '4px' }}>{method}</span>
                ))}
              </div>
              <div style={{ padding: '16px', background: '#fff', borderRadius: '8px', border: '1px solid #e3e8ee', marginBottom: '16px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '14px' }}>To manually capture a payment:</div>
                <ol style={{ fontSize: '14px', color: '#3c4257', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                  <li>Go to the order in Shopify Admin</li>
                  <li>Click on the transaction details</li>
                  <li>Enter the capture amount (usually the full amount)</li>
                  <li>Click <strong>Capture</strong></li>
                </ol>
              </div>
              <Screenshot src="https://cdn.omise.co/assets/screenshots/articles/2014-07-27/shopify/manual-capture.png" alt="Manual capture in Shopify" caption="Manually capture payment from the order details page" />
            </div>

            {/* Deprecated Payment Method */}
            <div style={{ padding: '24px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#991b1b', marginBottom: '12px' }}>
                Removing Deprecated Payment Method
              </h3>
              <p style={{ fontSize: '14px', color: '#991b1b', marginBottom: '12px', lineHeight: 1.6 }}>
                If you see an older "Omise payment (Credit/debit cards)" option, you should deactivate it:
              </p>
              <ol style={{ fontSize: '14px', color: '#7f1d1d', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>Go to <strong>Settings → Payments</strong> in Shopify Admin</li>
                <li>Find the deprecated payment method</li>
                <li>Click <strong>Deactivate</strong></li>
              </ol>
            </div>
          </div>
        </section>

        {/* Order Management */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Order Management
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                Viewing Payments
              </h3>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                All Omise payments are visible in both your Shopify Admin (Orders section) and your Omise Dashboard (Charges section).
              </p>
            </div>

            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                Processing Refunds
              </h3>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Refunds can be processed directly from Shopify Admin. Go to the order, click "Refund", and enter the amount.
              </p>
            </div>

            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                Order Status Sync
              </h3>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Order status automatically updates when payments complete, fail, or are refunded via webhooks.
              </p>
            </div>

            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                Transaction Details
              </h3>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Click on any order to view detailed transaction information including charge ID, payment method, and timeline.
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Troubleshooting
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              {
                issue: 'Payment methods not showing at checkout',
                solution: 'Make sure you have disabled test mode and selected the payment methods you want to enable in Shopify Admin under Settings → Payments → Manage.',
              },
              {
                issue: 'Connection lost after rolling API keys',
                solution: 'Re-run the installation steps from your Omise Dashboard (Settings → Third Party Integrations) to reconnect with your new API keys.',
              },
              {
                issue: '3D Secure payments failing',
                solution: 'Contact support@omise.co to ensure 3DS is properly enabled on your Omise account.',
              },
              {
                issue: 'Payments stuck in "Pending" status',
                solution: 'For payment methods requiring manual capture (TrueMoney, Installments), you must manually capture the payment from the order details page.',
              },
              {
                issue: 'Test transactions appearing in live mode',
                solution: 'Verify that both your Omise Dashboard and Shopify payment settings are set to Live mode, not Test mode.',
              },
              {
                issue: 'Webhook notifications not received',
                solution: 'Check that your Shopify store URL is accessible from the internet and not blocked by firewalls.',
              },
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
            Need help with your Shopify integration? Our support team is here to assist.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="mailto:support@omise.co?subject=Support Request: Shopify"
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
              href="https://apps.shopify.com/omise"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#fff',
                color: '#1A1F71',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '8px',
                textDecoration: 'none',
                border: '1px solid #1A1F71',
              }}
            >
              View on App Store
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
