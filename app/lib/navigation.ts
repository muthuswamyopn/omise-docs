// Navigation configuration for Omise Documentation
// 6 main sections with multi-level nesting

import { LocalizedContent, NavigationSection, NavigationItem } from './types';
export type { NavigationSection, NavigationItem } from './types';

// Helper to create localized content
const lc = (en: string, th?: string, ja?: string): LocalizedContent => ({ en, th, ja });

export const navigation: NavigationSection[] = [
  // ============================================
  // 1. Getting Started
  // ============================================
  {
    id: 'getting-started',
    title: lc('Getting Started', 'เริ่มต้นใช้งาน', '始めに'),
    icon: 'rocket',
    href: '/getting-started',
    items: [
      { name: lc('Overview', 'ภาพรวม', '概要'), href: '/getting-started' },
      { name: lc('Quick Start', 'เริ่มต้นอย่างรวดเร็ว', 'クイックスタート'), href: '/getting-started/quick-start' },
      { name: lc('Core Concepts', 'แนวคิดหลัก', '基本コンセプト'), href: '/getting-started/core-concepts' },
      { name: lc('Go Live Checklist', 'รายการตรวจสอบก่อนใช้งานจริง', '本番開始チェックリスト'), href: '/getting-started/go-live-checklist' },
      { name: lc('Dashboard Overview', 'ภาพรวม Dashboard', 'ダッシュボード概要'), href: '/getting-started/dashboard-overview' },
    ],
  },

  // ============================================
  // 2. Accept Payments
  // ============================================
  {
    id: 'accept-payments',
    title: lc('Accept Payments', 'รับชำระเงิน', '決済を受け付ける'),
    icon: 'credit-card',
    href: '/accept-payments',
    items: [
      { name: lc('Overview', 'ภาพรวม', '概要'), href: '/accept-payments' },
      { name: lc('Capture', 'การจับ', 'キャプチャ'), href: '/accept-payments/capture' },
      {
        name: lc('Cards', 'บัตร', 'カード'),
        href: '/accept-payments/cards',
        items: [
          { name: lc('Collecting Cards', 'การรวบรวมบัตร', 'カード情報の収集'), href: '/accept-payments/cards/collecting-cards' },
          { name: lc('Credit & Debit Cards', 'บัตรเครดิตและเดบิต', 'クレジット＆デビットカード'), href: '/accept-payments/cards/credit-debit' },
          { name: lc('3D Secure', '3D Secure', '3Dセキュア'), href: '/accept-payments/cards/3d-secure' },
          { name: lc('Apple Pay', 'Apple Pay', 'Apple Pay'), href: '/accept-payments/cards/apple-pay' },
          { name: lc('Google Pay', 'Google Pay', 'Google Pay'), href: '/accept-payments/cards/google-pay' },
        ],
      },
      {
        name: lc('Bank Transfers & QR', 'โอนเงินและ QR', '銀行振込＆QR'),
        href: '/accept-payments/bank-transfers',
        items: [
          { name: lc('PromptPay', 'พร้อมเพย์', 'PromptPay'), href: '/accept-payments/bank-transfers/promptpay' },
          { name: lc('PayNow', 'PayNow', 'PayNow'), href: '/accept-payments/bank-transfers/paynow' },
          { name: lc('DuitNow', 'DuitNow', 'DuitNow'), href: '/accept-payments/bank-transfers/duitnow' },
          { name: lc('FPX', 'FPX', 'FPX'), href: '/accept-payments/bank-transfers/fpx' },
        ],
      },
      {
        name: lc('E-Wallets', 'กระเป๋าเงินอิเล็กทรอนิกส์', '電子ウォレット'),
        href: '/accept-payments/e-wallets',
        items: [
          {
            name: lc('TrueMoney', 'TrueMoney', 'TrueMoney'),
            href: '/accept-payments/e-wallets/truemoney',
            items: [
              { name: lc('App Redirection', 'เปลี่ยนเส้นทางแอป', 'アプリリダイレクト'), href: '/accept-payments/e-wallets/truemoney/jumpapp' },
              { name: lc('QR', 'QR', 'QR'), href: '/accept-payments/e-wallets/truemoney/qr' },
            ],
          },
          { name: lc('Rabbit LINE Pay', 'Rabbit LINE Pay', 'Rabbit LINE Pay'), href: '/accept-payments/e-wallets/rabbit-linepay' },
          { name: lc('GrabPay', 'GrabPay', 'GrabPay'), href: '/accept-payments/e-wallets/grabpay' },
          { name: lc('ShopeePay', 'ShopeePay', 'ShopeePay'), href: '/accept-payments/e-wallets/shopeepay' },
          { name: lc('Boost', 'Boost', 'Boost'), href: '/accept-payments/e-wallets/boost' },
          { name: lc('PayPay', 'PayPay', 'PayPay'), href: '/accept-payments/e-wallets/paypay' },
        ],
      },
      {
        name: lc('Alipay & WeChat', 'Alipay และ WeChat', 'Alipay＆WeChat'),
        href: '/accept-payments/alipay-wechat',
        items: [
          { name: lc('Alipay Online', 'Alipay Online', 'Alipayオンライン'), href: '/accept-payments/alipay-wechat/alipay' },
          { name: lc('Alipay+', 'Alipay+', 'Alipay+'), href: '/accept-payments/alipay-wechat/alipay-plus' },
          { name: lc('WeChat Pay', 'WeChat Pay', 'WeChat Pay'), href: '/accept-payments/alipay-wechat/wechat-pay' },
        ],
      },
      {
        name: lc('Installments & BNPL', 'ผ่อนชำระและ BNPL', '分割払い＆BNPL'),
        href: '/accept-payments/installments',
        items: [
          { name: lc('Card Installments', 'ผ่อนชำระผ่านบัตร', 'カード分割払い'), href: '/accept-payments/installments/card-installments' },
          { name: lc('Atome', 'Atome', 'Atome'), href: '/accept-payments/installments/atome' },
        ],
      },
      {
        name: lc('Convenience Store', 'ร้านสะดวกซื้อ', 'コンビニ'),
        href: '/accept-payments/convenience-store',
        items: [
          { name: lc('Konbini', 'Konbini', 'コンビニ決済'), href: '/accept-payments/convenience-store/konbini' },
          { name: lc('Pay-easy', 'Pay-easy', 'Pay-easy'), href: '/accept-payments/convenience-store/pay-easy' },
        ],
      },
      {
        name: lc('Mobile Banking', 'Mobile Banking', 'モバイルバンキング'),
        href: '/accept-payments/mobile-banking',
        items: [
          { name: lc('Thailand Banks', 'ธนาคารไทย', 'タイの銀行'), href: '/accept-payments/mobile-banking/thailand-banks' },
          { name: lc('OCBC Digital', 'OCBC Digital', 'OCBC Digital'), href: '/accept-payments/mobile-banking/ocbc' },
        ],
      },
    ],
  },

  // ============================================
  // 3. Manage Money
  // ============================================
  {
    id: 'manage-money',
    title: lc('Manage Money', 'จัดการเงิน', '資金管理'),
    icon: 'wallet',
    href: '/manage-money',
    items: [
      { name: lc('Overview', 'ภาพรวม', '概要'), href: '/manage-money' },
      { name: lc('Refunds', 'การคืนเงิน', '返金'), href: '/manage-money/refunds' },
      { name: lc('Voids & Reversals', 'การยกเลิกและย้อนกลับ', '取消と取り消し'), href: '/manage-money/voids-reversals' },
      { name: lc('Transfers & Payouts', 'การโอนและจ่ายเงิน', '振込と支払い'), href: '/manage-money/transfers-payouts' },
      { name: lc('Account Balance', 'ยอดคงเหลือบัญชี', '口座残高'), href: '/manage-money/account-balance' },
      { name: lc('Reconciliation', 'การกระทบยอด', '照合'), href: '/manage-money/reconciliation' },
    ],
  },

  // ============================================
  // 4. Security & Risk
  // ============================================
  {
    id: 'security',
    title: lc('Security & Risk', 'ความปลอดภัยและความเสี่ยง', 'セキュリティとリスク'),
    icon: 'shield',
    href: '/security',
    items: [
      { name: lc('Overview', 'ภาพรวม', '概要'), href: '/security' },
      { name: lc('Security at Omise', 'ความปลอดภัยที่ Omise', 'Omiseのセキュリティ'), href: '/security/security-at-omise' },
      { name: lc('Fraud Protection', 'การป้องกันการฉ้อโกง', '不正対策'), href: '/security/fraud-protection' },
      { name: lc('Disputes & Chargebacks', 'ข้อพิพาทและการปฏิเสธการชำระเงิน', '紛争とチャージバック'), href: '/security/disputes-chargebacks' },
      { name: lc('Compliance', 'การปฏิบัติตามกฎระเบียบ', 'コンプライアンス'), href: '/security/compliance' },
    ],
  },

  // ============================================
  // 5. Integrations
  // ============================================
  {
    id: 'integrations',
    title: lc('Integrations', 'การเชื่อมต่อ', '連携'),
    icon: 'plug',
    href: '/integrations',
    items: [
      { name: lc('Overview', 'ภาพรวม', '概要'), href: '/integrations' },
      { name: lc('Payment Links', 'ลิงก์ชำระเงิน', '決済リンク'), href: '/integrations/payment-links' },
      {
        name: lc('Client Libraries', 'ไลบรารีฝั่งไคลเอนต์', 'クライアントライブラリ'),
        href: '/integrations/client-libraries',
        items: [
          { name: lc('Omise.js', 'Omise.js', 'Omise.js'), href: '/integrations/client-libraries/omise-js' },
          { name: lc('iOS SDK', 'iOS SDK', 'iOS SDK'), href: '/integrations/client-libraries/ios-sdk' },
          { name: lc('Android SDK', 'Android SDK', 'Android SDK'), href: '/integrations/client-libraries/android-sdk' },
        ],
      },
      {
        name: lc('Server Libraries', 'ไลบรารีฝั่งเซิร์ฟเวอร์', 'サーバーライブラリ'),
        href: '/integrations/server-libraries',
        items: [
          { name: lc('Ruby', 'Ruby', 'Ruby'), href: '/integrations/server-libraries/ruby' },
          { name: lc('Python', 'Python', 'Python'), href: '/integrations/server-libraries/python' },
          { name: lc('PHP', 'PHP', 'PHP'), href: '/integrations/server-libraries/php' },
          { name: lc('Node.js', 'Node.js', 'Node.js'), href: '/integrations/server-libraries/nodejs' },
          { name: lc('Go', 'Go', 'Go'), href: '/integrations/server-libraries/go' },
          { name: lc('Java', 'Java', 'Java'), href: '/integrations/server-libraries/java' },
          { name: lc('C#', 'C#', 'C#'), href: '/integrations/server-libraries/csharp' },
          { name: lc('Elixir', 'Elixir', 'Elixir'), href: '/integrations/server-libraries/elixir' },
        ],
      },
      {
        name: lc('E-Commerce Plugins', 'ปลั๊กอินอีคอมเมิร์ซ', 'ECプラグイン'),
        href: '/integrations/ecommerce-plugins',
        items: [
          { name: lc('Shopify', 'Shopify', 'Shopify'), href: '/integrations/ecommerce-plugins/shopify' },
          { name: lc('WooCommerce', 'WooCommerce', 'WooCommerce'), href: '/integrations/ecommerce-plugins/woocommerce' },
          { name: lc('Magento', 'Magento', 'Magento'), href: '/integrations/ecommerce-plugins/magento' },
          { name: lc('OpenCart', 'OpenCart', 'OpenCart'), href: '/integrations/ecommerce-plugins/opencart' },
          { name: lc('PrestaShop', 'PrestaShop', 'PrestaShop'), href: '/integrations/ecommerce-plugins/prestashop' },
          { name: lc('EC-CUBE', 'EC-CUBE', 'EC-CUBE'), href: '/integrations/ecommerce-plugins/ec-cube' },
        ],
      },
      {
        name: lc('Advanced', 'ขั้นสูง', '高度な機能'),
        href: '/integrations/advanced',
        items: [
          { name: lc('Webhooks', 'Webhooks', 'Webhook'), href: '/integrations/advanced/webhooks' },
          { name: lc('Scheduled Charges', 'การเรียกเก็บเงินตามกำหนด', '定期課金'), href: '/integrations/advanced/scheduled-charges' },
        ],
      },
    ],
  },

  // ============================================
  // 6. API Reference
  // ============================================
  {
    id: 'api-reference',
    title: lc('API Reference', 'API อ้างอิง', 'APIリファレンス'),
    icon: 'code',
    href: '/api-reference',
    items: [
      { name: lc('Overview', 'ภาพรวม', '概要'), href: '/api-reference' },
      {
        name: lc('Basics', 'พื้นฐาน', '基本'),
        href: '/api-reference/overview',
        items: [
          { name: lc('Authentication', 'การยืนยันตัวตน', '認証'), href: '/api-reference/overview/authentication' },
          { name: lc('Versioning', 'การกำหนดเวอร์ชัน', 'バージョン管理'), href: '/api-reference/overview/versioning' },
          { name: lc('Rate Limiting', 'การจำกัดอัตรา', 'レート制限'), href: '/api-reference/overview/rate-limiting' },
          { name: lc('Errors', 'ข้อผิดพลาด', 'エラー'), href: '/api-reference/overview/errors' },
          { name: lc('Pagination', 'การแบ่งหน้า', 'ページネーション'), href: '/api-reference/overview/pagination' },
        ],
      },
      {
        name: lc('Core Resources', 'ทรัพยากรหลัก', 'コアリソース'),
        href: '/api-reference/charges',
        items: [
          {
            name: lc('Charges', 'Charges', 'Charge'),
            href: '/api-reference/charges',
            items: [
              { name: lc('Create a Charge', 'สร้าง Charge', 'Chargeを作成'), href: '/api-reference/charges/create', method: 'POST' as const },
              { name: lc('Retrieve a Charge', 'ดึงข้อมูล Charge', 'Chargeを取得'), href: '/api-reference/charges/retrieve', method: 'GET' as const },
              { name: lc('List Charges', 'รายการ Charges', 'Chargeの一覧'), href: '/api-reference/charges/list', method: 'GET' as const },
              { name: lc('Update a Charge', 'อัปเดต Charge', 'Chargeを更新'), href: '/api-reference/charges/update', method: 'PATCH' as const },
              { name: lc('Capture a Charge', 'จับ Charge', 'Chargeをキャプチャ'), href: '/api-reference/charges/capture', method: 'POST' as const },
              { name: lc('Reverse a Charge', 'ย้อนกลับ Charge', 'Chargeを取り消し'), href: '/api-reference/charges/reverse', method: 'POST' as const },
              { name: lc('Expire a Charge', 'หมดอายุ Charge', 'Chargeを期限切れに'), href: '/api-reference/charges/expire', method: 'POST' as const },
              { name: lc('Mark as Paid', 'ทำเครื่องหมายว่าชำระแล้ว', '支払済みにする'), href: '/api-reference/charges/mark-as-paid', method: 'POST' as const, testOnly: true },
              { name: lc('Mark as Failed', 'ทำเครื่องหมายว่าล้มเหลว', '失敗にする'), href: '/api-reference/charges/mark-as-failed', method: 'POST' as const, testOnly: true },
              { name: lc('Error Codes', 'รหัสข้อผิดพลาด', 'エラーコード'), href: '/api-reference/charges/errors' },
            ],
          },
          { name: lc('Sources', 'Sources', 'Source'), href: '/api-reference/sources' },
          { name: lc('Tokens', 'Tokens', 'Token'), href: '/api-reference/tokens' },
          { name: lc('Customers', 'Customers', 'Customer'), href: '/api-reference/customers' },
          { name: lc('Cards', 'Cards', 'Card'), href: '/api-reference/cards' },
        ],
      },
      {
        name: lc('Payment Operations', 'การดำเนินการชำระเงิน', '決済操作'),
        href: '/api-reference/refunds',
        items: [
          { name: lc('Refunds', 'Refunds', 'Refund'), href: '/api-reference/refunds' },
          { name: lc('Disputes', 'Disputes', 'Dispute'), href: '/api-reference/disputes' },
          { name: lc('Receipts', 'Receipts', 'Receipt'), href: '/api-reference/receipts' },
        ],
      },
      {
        name: lc('Payouts', 'การจ่ายเงิน', '支払い'),
        href: '/api-reference/recipients',
        items: [
          { name: lc('Recipients', 'Recipients', 'Recipient'), href: '/api-reference/recipients' },
          { name: lc('Transfers', 'Transfers', 'Transfer'), href: '/api-reference/transfers' },
          { name: lc('Bank Accounts', 'Bank Accounts', '銀行口座'), href: '/api-reference/bank-accounts' },
        ],
      },
      {
        name: lc('Account', 'บัญชี', 'アカウント'),
        href: '/api-reference/account',
        items: [
          { name: lc('Account', 'Account', 'Account'), href: '/api-reference/account' },
          { name: lc('Retrieve Account', 'ดึงข้อมูลบัญชี', 'アカウントを取得'), href: '/api-reference/account/retrieve', method: 'GET' as const },
          { name: lc('Update Account', 'อัปเดตบัญชี', 'アカウントを更新'), href: '/api-reference/account/update', method: 'PATCH' as const },
          { name: lc('Balance', 'Balance', 'Balance'), href: '/api-reference/balance' },
          { name: lc('Capabilities', 'Capabilities', 'Capability'), href: '/api-reference/capabilities' },
        ],
      },
      {
        name: lc('Scheduling', 'การตั้งเวลา', 'スケジューリング'),
        href: '/api-reference/schedules',
        items: [
          { name: lc('Schedules', 'Schedules', 'Schedule'), href: '/api-reference/schedules' },
          { name: lc('Occurrences', 'Occurrences', 'Occurrence'), href: '/api-reference/occurrences' },
        ],
      },
      {
        name: lc('Events & History', 'เหตุการณ์และประวัติ', 'イベントと履歴'),
        href: '/api-reference/events',
        items: [
          { name: lc('Events', 'Events', 'Event'), href: '/api-reference/events' },
          { name: lc('Transactions', 'Transactions', 'Transaction'), href: '/api-reference/transactions' },
        ],
      },
    ],
  },

  // ============================================
  // 7. Support & FAQs
  // ============================================
  {
    id: 'support',
    title: lc('Support & FAQs', 'ช่วยเหลือและคำถามที่พบบ่อย', 'サポートとFAQ'),
    icon: 'help-circle',
    href: '/support',
    items: [
      { name: lc('Overview', 'ภาพรวม', '概要'), href: '/support' },
      { name: lc('General Questions', 'คำถามทั่วไป', '一般的な質問'), href: '/support/general' },
      { name: lc('Pricing & Fees', 'ราคาและค่าธรรมเนียม', '料金と手数料'), href: '/support/pricing' },
      { name: lc('API Keys & Authentication', 'คีย์ API และการยืนยันตัวตน', 'APIキーと認証'), href: '/support/api-keys' },
      { name: lc('Refunds & Transfers', 'การคืนเงินและการโอน', '返金と振込'), href: '/support/refunds-transfers' },
      { name: lc('Disputes & Chargebacks', 'ข้อพิพาทและการปฏิเสธชำระเงิน', '紛争とチャージバック'), href: '/support/disputes' },
      { name: lc('Integration Help', 'ความช่วยเหลือในการเชื่อมต่อ', '連携サポート'), href: '/support/integration' },
    ],
  },
];

// Get section by ID
export function getSection(id: string): NavigationSection | undefined {
  return navigation.find(section => section.id === id);
}

// Get all paths for static generation
export function getAllPaths(): string[] {
  const paths: string[] = [];

  function collectPaths(items: NavigationSection['items'], parentPath?: string) {
    for (const item of items) {
      paths.push(item.href);
      if (item.items) {
        collectPaths(item.items);
      }
    }
  }

  for (const section of navigation) {
    if (section.href) {
      paths.push(section.href);
    }
    collectPaths(section.items);
  }

  return paths;
}

// Check if a path is active (for sidebar highlighting)
export function isPathActive(currentPath: string, itemPath: string): boolean {
  if (currentPath === itemPath) return true;
  // Check if current path is a child of item path
  return currentPath.startsWith(itemPath + '/');
}

// Get breadcrumb items for a path
export function getBreadcrumbs(path: string): { label: LocalizedContent; href?: string }[] {
  const breadcrumbs: { label: LocalizedContent; href?: string }[] = [
    { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
  ];

  for (const section of navigation) {
    if (path.startsWith('/' + section.id) || (section.href && path.startsWith(section.href))) {
      breadcrumbs.push({ label: section.title, href: section.href });

      // Find nested items
      function findInItems(items: NavigationSection['items'], parentPath: string) {
        for (const item of items) {
          if (path === item.href || path.startsWith(item.href + '/')) {
            breadcrumbs.push({ label: item.name, href: item.href });
            if (item.items) {
              findInItems(item.items, item.href);
            }
            break;
          }
        }
      }

      findInItems(section.items, section.href || '');
      break;
    }
  }

  return breadcrumbs;
}
