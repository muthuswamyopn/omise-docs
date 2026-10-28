import { LocalizedContent } from './types';

export type Region = 'TH' | 'SG' | 'MY' | 'JP';

export type PaymentCategory =
  | 'cards'
  | 'bank-transfers'
  | 'e-wallets'
  | 'alipay-wechat'
  | 'installments'
  | 'convenience-store'
  | 'mobile-banking';

export interface AmountLimit {
  min: number;
  max: number;
  currency: string;
}

export interface FailureCode {
  code: string;
  description: string;
}

export interface FAQ {
  question: LocalizedContent;
  answer: LocalizedContent;
}

export interface PaymentMethod {
  id: string;
  name: LocalizedContent;
  sourceType: string;
  category: PaymentCategory;
  regions: Region[];
  description: LocalizedContent;
  shortDescription: LocalizedContent;
  currencies: string[];
  amountLimits: AmountLimit[];
  refundSupport: {
    full: boolean;
    partial: boolean;
    window: string; // e.g., "180 days", "30 days"
  } | null;
  voidSupport: boolean;
  voidWindow?: string; // e.g., "24 hours", "15 minutes"
  webhookEvents: string[];
  minimumApiVersion: string;
  status: 'available' | 'coming_soon' | 'deprecated';
  icon?: string;
  flow: 'redirect' | 'qr' | 'direct' | 'offline';
  authorizationWindow?: string; // e.g., "20 minutes", "5 minutes"
  chargeExpiry?: string; // e.g., "7 days", "8 days"
  failureCodes?: FailureCode[];
  requiresEnablement?: boolean; // if true, needs to contact support@omise.co
  sourceParams?: string[]; // additional required params like 'phone_number'
  testCredentials?: {
    phoneNumber?: string;
    cardNumber?: string;
    notes?: string;
  };
  faqs?: FAQ[];
}

// Common FAQs used across multiple payment methods
export const commonFAQs = {
  refundTiming: {
    question: { en: 'How long do refunds take to process?', th: 'การคืนเงินใช้เวลานานเท่าไร?', ja: '返金処理にはどのくらい時間がかかりますか？' },
    answer: { en: 'Refunds typically take 5-14 business days to appear in the customer\'s account, depending on the payment provider and bank.', th: 'การคืนเงินโดยทั่วไปใช้เวลา 5-14 วันทำการ ขึ้นอยู่กับผู้ให้บริการและธนาคาร', ja: '返金は通常5〜14営業日で顧客の口座に反映されます。決済プロバイダーと銀行によって異なります。' }
  },
  partialRefund: {
    question: { en: 'Can I issue a partial refund?', th: 'ฉันสามารถคืนเงินบางส่วนได้หรือไม่?', ja: '部分返金は可能ですか？' },
    answer: { en: 'Yes, you can issue multiple partial refunds as long as the total doesn\'t exceed the original charge amount.', th: 'ได้ คุณสามารถคืนเงินบางส่วนหลายครั้งได้ ตราบใดที่ยอดรวมไม่เกินจำนวนเงินเดิม', ja: 'はい、元の請求金額を超えない限り、複数回の部分返金が可能です。' }
  },
  testMode: {
    question: { en: 'How do I test this payment method?', th: 'ฉันจะทดสอบวิธีการชำระเงินนี้ได้อย่างไร?', ja: 'この決済方法をテストするにはどうすればよいですか？' },
    answer: { en: 'Use your test mode API keys. In test mode, you can simulate payment completion using the Omise Dashboard.', th: 'ใช้ API keys โหมดทดสอบ ในโหมดทดสอบ คุณสามารถจำลองการชำระเงินได้ในแดชบอร์ด Omise', ja: 'テストモードのAPIキーを使用してください。テストモードでは、Omiseダッシュボードで支払い完了をシミュレートできます。' }
  },
  webhookRequired: {
    question: { en: 'Do I need to set up webhooks?', th: 'ฉันต้องตั้งค่า webhooks หรือไม่?', ja: 'Webhookの設定は必要ですか？' },
    answer: { en: 'Yes, webhooks are essential for asynchronous payment methods. They notify your server when a payment is completed or fails.', th: 'ใช่ webhooks จำเป็นสำหรับวิธีการชำระเงินแบบอะซิงโครนัส เพื่อแจ้งเซิร์ฟเวอร์ของคุณเมื่อชำระเงินสำเร็จหรือล้มเหลว', ja: 'はい、非同期決済方式にはWebhookが不可欠です。支払いが完了または失敗した時にサーバーに通知されます。' }
  },
  currencyConversion: {
    question: { en: 'Is currency conversion supported?', th: 'รองรับการแปลงสกุลเงินหรือไม่?', ja: '通貨換算はサポートされていますか？' },
    answer: { en: 'This payment method only supports its native currency. Multi-currency pricing requires separate charges in supported currencies.', th: 'วิธีการชำระเงินนี้รองรับเฉพาะสกุลเงินท้องถิ่น การกำหนดราคาหลายสกุลเงินต้องสร้างรายการแยกต่างหาก', ja: 'この決済方法はネイティブ通貨のみサポートしています。マルチ通貨価格設定には、サポートされている通貨での個別請求が必要です。' }
  },
  minimumAmount: {
    question: { en: 'What is the minimum transaction amount?', th: 'จำนวนเงินขั้นต่ำในการทำธุรกรรมคือเท่าไร?', ja: '最低取引金額はいくらですか？' },
    answer: { en: 'Please refer to the Transaction Limits section above for minimum and maximum amounts per currency.', th: 'กรุณาดูส่วนขีดจำกัดการทำธุรกรรมด้านบนสำหรับจำนวนเงินขั้นต่ำและสูงสุดต่อสกุลเงิน', ja: '通貨ごとの最低額と最高額については、上記の取引限度額セクションをご参照ください。' }
  },
  qrExpiry: {
    question: { en: 'How long is the QR code valid?', th: 'QR code มีอายุเท่าไร?', ja: 'QRコードの有効期限はどのくらいですか？' },
    answer: { en: 'The QR code validity depends on the payment method. Check the charge expiry time for specific details.', th: 'อายุ QR code ขึ้นอยู่กับวิธีการชำระเงิน ตรวจสอบเวลาหมดอายุของรายการสำหรับรายละเอียด', ja: 'QRコードの有効期限は決済方法によって異なります。詳細は請求の有効期限をご確認ください。' }
  },
  redirectTimeout: {
    question: { en: 'What happens if the customer doesn\'t complete authorization?', th: 'จะเกิดอะไรขึ้นถ้าลูกค้าไม่ยืนยันการชำระเงิน?', ja: '顧客が認証を完了しない場合はどうなりますか？' },
    answer: { en: 'The charge will expire after the authorization window. You\'ll receive a webhook with status "expired".', th: 'รายการจะหมดอายุหลังจากหมดเวลายืนยัน คุณจะได้รับ webhook พร้อมสถานะ "expired"', ja: '認証ウィンドウの後、請求は期限切れになります。ステータス「expired」のWebhookを受信します。' }
  },
  enablePaymentMethod: {
    question: { en: 'How do I enable this payment method?', th: 'ฉันจะเปิดใช้งานวิธีการชำระเงินนี้ได้อย่างไร?', ja: 'この決済方法を有効にするにはどうすればよいですか？' },
    answer: { en: 'Contact support@omise.co to enable this payment method. Additional merchant agreements may be required.', th: 'ติดต่อ support@omise.co เพื่อเปิดใช้งาน อาจต้องมีข้อตกลงเพิ่มเติม', ja: 'この決済方法を有効にするにはsupport@omise.coにお問い合わせください。追加の加盟店契約が必要な場合があります。' }
  },
  saveCard: {
    question: { en: 'Can customers save their card for future payments?', th: 'ลูกค้าสามารถบันทึกบัตรสำหรับการชำระเงินในอนาคตได้หรือไม่?', ja: '顧客は将来の支払いのためにカードを保存できますか？' },
    answer: { en: 'Yes, you can create a Customer object and attach cards for recurring or future payments.', th: 'ได้ คุณสามารถสร้าง Customer object และแนบบัตรสำหรับการชำระเงินซ้ำหรือในอนาคต', ja: 'はい、Customerオブジェクトを作成し、定期的または将来の支払い用にカードを登録できます。' }
  },
  capture: {
    question: { en: 'Do I need to capture charges manually?', th: 'ฉันต้อง capture รายการด้วยตนเองหรือไม่?', ja: '手動でキャプチャする必要がありますか？' },
    answer: { en: 'By default, charges are captured automatically. Set capture=false to authorize first and capture later.', th: 'โดยค่าเริ่มต้น รายการจะถูก capture อัตโนมัติ ตั้ง capture=false เพื่อ authorize ก่อนแล้ว capture ทีหลัง', ja: 'デフォルトでは、請求は自動的にキャプチャされます。capture=falseを設定すると、最初に認証し、後でキャプチャできます。' }
  },
};

// Common failure codes used across multiple payment methods
export const commonFailureCodes: Record<string, FailureCode[]> = {
  redirect: [
    { code: 'payment_rejected', description: 'Payment provider rejected the transaction' },
    { code: 'failed_processing', description: 'General payment processing failure' },
    { code: 'invalid_account', description: 'No valid payment account found' },
    { code: 'insufficient_fund', description: 'Insufficient funds or limit reached' },
  ],
  ewallet: [
    { code: 'failed_processing', description: 'General payment processing failure' },
    { code: 'insufficient_balance', description: 'Insufficient wallet balance' },
    { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
    { code: 'timeout', description: 'Customer did not complete authorization in time' },
  ],
  qr: [
    { code: 'payment_expired', description: 'QR code expired before payment' },
    { code: 'failed_processing', description: 'General payment processing failure' },
  ],
};

export const paymentMethods: PaymentMethod[] = [
  // === CARDS ===
  {
    id: 'credit-debit',
    name: { en: 'Credit & Debit Cards', th: 'บัตรเครดิต/เดบิต', ja: 'クレジット/デビットカード' },
    sourceType: 'card',
    category: 'cards',
    regions: ['TH', 'SG', 'MY', 'JP'],
    description: {
      en: 'Accept Visa, Mastercard, JCB, and American Express cards with 3D Secure support for secure online payments.',
      th: 'รับชำระด้วยบัตร Visa, Mastercard, JCB และ American Express พร้อมรองรับ 3D Secure',
      ja: 'Visa、Mastercard、JCB、American Expressカードを3Dセキュア対応で受け付けます。',
    },
    shortDescription: {
      en: 'Accept major credit and debit cards',
      th: 'รับบัตรเครดิตและเดบิตหลัก',
      ja: '主要クレジット・デビットカードを受け付け',
    },
    currencies: ['THB', 'SGD', 'MYR', 'JPY', 'USD', 'EUR', 'GBP'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
      { min: 100, max: 99999999, currency: 'SGD' },
      { min: 100, max: 99999999, currency: 'MYR' },
      { min: 100, max: 99999999, currency: 'JPY' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: true,
    webhookEvents: ['charge.create', 'charge.complete', 'refund.create'],
    minimumApiVersion: '2014-07-27',
    status: 'available',
    flow: 'direct',
    failureCodes: [
      { code: 'invalid_card', description: 'Card information is invalid' },
      { code: 'insufficient_fund', description: 'Insufficient funds or credit limit reached' },
      { code: 'stolen_or_lost_card', description: 'Card reported as stolen or lost' },
      { code: 'expired_card', description: 'Card has expired' },
      { code: 'invalid_security_code', description: 'Incorrect CVV/CVC' },
      { code: 'failed_fraud_check', description: 'Failed fraud detection check' },
      { code: 'payment_rejected', description: 'Issuer rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
    ],
    testCredentials: {
      cardNumber: '4242424242424242',
      notes: 'Use test card numbers with any future expiry date and any 3-digit CVV. For declined cards, use 4111111111111111.',
    },
    faqs: [
      commonFAQs.saveCard,
      commonFAQs.capture,
      commonFAQs.partialRefund,
      {
        question: { en: 'Which card brands are supported?', th: 'รองรับบัตรยี่ห้ออะไรบ้าง?', ja: 'どのカードブランドがサポートされていますか？' },
        answer: { en: 'We support Visa, Mastercard, JCB, and American Express. Availability may vary by region.', th: 'เรารองรับ Visa, Mastercard, JCB และ American Express ความพร้อมใช้งานอาจแตกต่างกันตามภูมิภาค', ja: 'Visa、Mastercard、JCB、American Expressをサポートしています。地域によって利用可能なブランドが異なる場合があります。' }
      },
      {
        question: { en: 'Is 3D Secure required?', th: '3D Secure จำเป็นหรือไม่?', ja: '3Dセキュアは必須ですか？' },
        answer: { en: '3D Secure is strongly recommended and may be required by card networks. It reduces fraud and shifts liability.', th: '3D Secure แนะนำอย่างยิ่งและอาจจำเป็นตามข้อกำหนดของเครือข่ายบัตร ช่วยลดการฉ้อโกงและโอนความรับผิด', ja: '3Dセキュアを強くお勧めします。カードネットワークによっては必須の場合があります。不正を減らし、責任を移転します。' }
      },
    ],
  },
  {
    id: '3d-secure',
    name: { en: '3D Secure', th: '3D Secure', ja: '3Dセキュア' },
    sourceType: 'card',
    category: 'cards',
    regions: ['TH', 'SG', 'MY', 'JP'],
    description: {
      en: 'Enhanced card security with issuer authentication. Reduces fraud and shifts liability to card issuer.',
      th: 'ความปลอดภัยบัตรขั้นสูงด้วยการยืนยันจากธนาคารผู้ออกบัตร ลดการฉ้อโกงและโอนความรับผิดชอบไปยังธนาคาร',
      ja: '発行元認証による強化されたカードセキュリティ。詐欺を減らし、責任をカード発行者に移転します。',
    },
    shortDescription: {
      en: 'Issuer authentication for cards',
      th: 'การยืนยันจากธนาคารผู้ออกบัตร',
      ja: '発行元認証',
    },
    currencies: ['THB', 'SGD', 'MYR', 'JPY', 'USD', 'EUR', 'GBP'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: true,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2015-11-17',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'authentication_failed', description: '3D Secure authentication failed' },
      { code: 'payment_rejected', description: 'Issuer rejected after authentication' },
      { code: 'timeout', description: 'Customer did not complete 3D Secure challenge' },
      { code: 'failed_processing', description: 'General processing failure' },
    ],
    faqs: [
      {
        question: { en: 'What is 3D Secure?', th: '3D Secure คืออะไร?', ja: '3Dセキュアとは何ですか？' },
        answer: { en: '3D Secure is an authentication protocol that adds an extra security layer. Customers verify their identity with their bank during checkout.', th: '3D Secure เป็นโปรโตคอลยืนยันตัวตนที่เพิ่มความปลอดภัย ลูกค้ายืนยันตัวตนกับธนาคารระหว่างการชำระเงิน', ja: '3Dセキュアは追加のセキュリティ層を追加する認証プロトコルです。顧客はチェックアウト時に銀行で本人確認を行います。' }
      },
      {
        question: { en: 'Does 3D Secure prevent all chargebacks?', th: '3D Secure ป้องกันการปฏิเสธการชำระเงินทั้งหมดหรือไม่?', ja: '3Dセキュアはすべてのチャージバックを防ぎますか？' },
        answer: { en: 'No, but it significantly reduces fraud-related chargebacks and shifts liability to the card issuer for authenticated transactions.', th: 'ไม่ แต่ช่วยลดการปฏิเสธจากการฉ้อโกงได้มาก และโอนความรับผิดไปยังธนาคารผู้ออกบัตรสำหรับธุรกรรมที่ผ่านการยืนยัน', ja: 'いいえ、ただし詐欺関連のチャージバックを大幅に削減し、認証済み取引の責任をカード発行者に移転します。' }
      },
      commonFAQs.redirectTimeout,
      commonFAQs.testMode,
    ],
  },
  {
    id: 'apple-pay',
    name: { en: 'Apple Pay', th: 'Apple Pay', ja: 'Apple Pay' },
    sourceType: 'applepay',
    category: 'cards',
    regions: ['TH', 'SG', 'MY', 'JP'],
    description: {
      en: 'Accept payments from Apple devices using Face ID, Touch ID, or passcode authentication.',
      th: 'รับชำระจากอุปกรณ์ Apple ด้วย Face ID, Touch ID หรือรหัสผ่าน',
      ja: 'Face ID、Touch ID、またはパスコード認証を使用してAppleデバイスからの支払いを受け付けます。',
    },
    shortDescription: {
      en: 'Pay with Apple devices',
      th: 'ชำระด้วยอุปกรณ์ Apple',
      ja: 'Appleデバイスで支払い',
    },
    currencies: ['THB', 'SGD', 'MYR', 'JPY'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: true,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'direct',
    requiresEnablement: true,
    failureCodes: [
      { code: 'invalid_card', description: 'Card information is invalid' },
      { code: 'insufficient_fund', description: 'Insufficient funds or credit limit reached' },
      { code: 'payment_rejected', description: 'Issuer rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
    ],
    faqs: [
      commonFAQs.enablePaymentMethod,
      {
        question: { en: 'Which devices support Apple Pay?', th: 'อุปกรณ์ใดรองรับ Apple Pay?', ja: 'Apple Payをサポートするデバイスは？' },
        answer: { en: 'Apple Pay works on iPhone (6 and later), Apple Watch, iPad, and Mac. Safari browser is required for web payments.', th: 'Apple Pay ใช้งานได้บน iPhone (6 ขึ้นไป), Apple Watch, iPad และ Mac ต้องใช้ Safari สำหรับชำระบนเว็บ', ja: 'Apple PayはiPhone（6以降）、Apple Watch、iPad、Macで動作します。Web支払いにはSafariブラウザが必要です。' }
      },
      {
        question: { en: 'Do I need to integrate with Apple?', th: 'ฉันต้องเชื่อมต่อกับ Apple หรือไม่?', ja: 'Appleとの連携は必要ですか？' },
        answer: { en: 'Yes, you need to register with Apple and verify your domain. We handle the payment processing.', th: 'ใช่ คุณต้องลงทะเบียนกับ Apple และยืนยันโดเมน เราจัดการการประมวลผลการชำระเงิน', ja: 'はい、Appleに登録してドメインを確認する必要があります。決済処理は当社が行います。' }
      },
      commonFAQs.refundTiming,
    ],
  },
  {
    id: 'google-pay',
    name: { en: 'Google Pay', th: 'Google Pay', ja: 'Google Pay' },
    sourceType: 'googlepay',
    category: 'cards',
    regions: ['TH', 'SG', 'MY', 'JP'],
    description: {
      en: 'Accept payments from Android devices and Chrome browser with Google Pay.',
      th: 'รับชำระจากอุปกรณ์ Android และเบราว์เซอร์ Chrome ด้วย Google Pay',
      ja: 'AndroidデバイスとChromeブラウザからGoogle Payで支払いを受け付けます。',
    },
    shortDescription: {
      en: 'Pay with Google Pay',
      th: 'ชำระด้วย Google Pay',
      ja: 'Google Payで支払い',
    },
    currencies: ['THB', 'SGD', 'MYR', 'JPY'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: true,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'direct',
    requiresEnablement: true,
    failureCodes: [
      { code: 'invalid_card', description: 'Card information is invalid' },
      { code: 'insufficient_fund', description: 'Insufficient funds or credit limit reached' },
      { code: 'payment_rejected', description: 'Issuer rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
    ],
    testCredentials: {
      notes: 'Google Pay only supports PAN_ONLY card authentication. Cannot be used with Customers API for saving cards.',
    },
    faqs: [
      commonFAQs.enablePaymentMethod,
      {
        question: { en: 'Which devices support Google Pay?', th: 'อุปกรณ์ใดรองรับ Google Pay?', ja: 'Google Payをサポートするデバイスは？' },
        answer: { en: 'Google Pay works on Android devices and Chrome browser on desktop. NFC-enabled devices support contactless payments.', th: 'Google Pay ใช้งานได้บน Android และ Chrome บนเดสก์ท็อป อุปกรณ์ที่มี NFC รองรับการชำระแบบไร้สัมผัส', ja: 'Google PayはAndroidデバイスとデスクトップのChromeブラウザで動作します。NFC対応デバイスは非接触決済をサポートします。' }
      },
      {
        question: { en: 'Can I save Google Pay tokens for recurring payments?', th: 'ฉันสามารถบันทึก token Google Pay สำหรับการชำระซ้ำได้หรือไม่?', ja: 'Google Payトークンを定期支払い用に保存できますか？' },
        answer: { en: 'No, Google Pay tokens cannot be saved with the Customers API. Each payment requires new authentication.', th: 'ไม่ได้ Google Pay tokens ไม่สามารถบันทึกด้วย Customers API ได้ การชำระแต่ละครั้งต้องยืนยันตัวตนใหม่', ja: 'いいえ、Google PayトークンはCustomers APIで保存できません。各支払いには新しい認証が必要です。' }
      },
      commonFAQs.refundTiming,
    ],
  },

  // === BANK TRANSFERS ===
  {
    id: 'promptpay',
    name: { en: 'PromptPay', th: 'พร้อมเพย์', ja: 'PromptPay' },
    sourceType: 'promptpay',
    category: 'bank-transfers',
    regions: ['TH'],
    description: {
      en: 'Thailand\'s national QR payment system. Customers scan a QR code with their banking app to complete instant payments.',
      th: 'ระบบชำระเงินผ่าน QR ของประเทศไทย ลูกค้าสแกน QR ด้วยแอปธนาคารเพื่อชำระเงินทันที',
      ja: 'タイの国家QR決済システム。顧客は銀行アプリでQRコードをスキャンして即時決済を完了します。',
    },
    shortDescription: {
      en: 'Thai national QR payment',
      th: 'ระบบพร้อมเพย์ QR',
      ja: 'タイ国家QR決済',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 15000000, currency: 'THB' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'qr',
    chargeExpiry: '24 hours',
    failureCodes: [
      { code: 'payment_expired', description: 'QR code expired before customer scanned' },
      { code: 'failed_processing', description: 'General payment processing failure' },
    ],
    testCredentials: {
      notes: 'QR code expires in 24 hours by default. In test mode, use Dashboard to simulate payment completion.',
    },
    faqs: [
      commonFAQs.qrExpiry,
      commonFAQs.webhookRequired,
      {
        question: { en: 'Why doesn\'t PromptPay support refunds?', th: 'ทำไม PromptPay ไม่รองรับการคืนเงิน?', ja: 'なぜPromptPayは返金をサポートしていないのですか？' },
        answer: { en: 'PromptPay is an instant bank transfer system. Refunds must be processed manually through bank transfer to the customer.', th: 'PromptPay เป็นระบบโอนเงินทันที การคืนเงินต้องดำเนินการด้วยตนเองผ่านการโอนเงินไปยังลูกค้า', ja: 'PromptPayは即時銀行振込システムです。返金は顧客への銀行振込で手動で処理する必要があります。' }
      },
      {
        question: { en: 'Which banks support PromptPay?', th: 'ธนาคารใดรองรับ PromptPay?', ja: 'どの銀行がPromptPayをサポートしていますか？' },
        answer: { en: 'All major Thai banks support PromptPay including Bangkok Bank, Kasikornbank, SCB, Krungthai, and more.', th: 'ธนาคารหลักทุกแห่งในไทยรองรับ PromptPay รวมถึงกรุงเทพ กสิกรไทย ไทยพาณิชย์ กรุงไทย และอื่นๆ', ja: 'バンコク銀行、カシコン銀行、SCB、クルンタイなど、すべての主要タイ銀行がPromptPayをサポートしています。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'paynow',
    name: { en: 'PayNow', th: 'PayNow', ja: 'PayNow' },
    sourceType: 'paynow',
    category: 'bank-transfers',
    regions: ['SG'],
    description: {
      en: 'Singapore\'s instant payment system. Customers scan a QR code with any PayNow-enabled banking app.',
      th: 'ระบบชำระเงินทันทีของสิงคโปร์ ลูกค้าสแกน QR ด้วยแอปธนาคารที่รองรับ PayNow',
      ja: 'シンガポールの即時決済システム。顧客はPayNow対応の銀行アプリでQRコードをスキャンします。',
    },
    shortDescription: {
      en: 'Singapore instant QR payment',
      th: 'ระบบ QR สิงคโปร์',
      ja: 'シンガポール即時QR決済',
    },
    currencies: ['SGD'],
    amountLimits: [
      { min: 100, max: 2000000, currency: 'SGD' },
    ],
    refundSupport: { full: true, partial: true, window: '180 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'qr',
    failureCodes: [
      { code: 'payment_expired', description: 'QR code expired before customer scanned' },
      { code: 'failed_processing', description: 'General payment processing failure' },
    ],
    faqs: [
      commonFAQs.qrExpiry,
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'Which banks support PayNow?', th: 'ธนาคารใดรองรับ PayNow?', ja: 'どの銀行がPayNowをサポートしていますか？' },
        answer: { en: 'All major Singapore banks support PayNow including DBS, OCBC, UOB, Standard Chartered, and more.', th: 'ธนาคารหลักในสิงคโปร์ทั้งหมดรองรับ PayNow รวมถึง DBS, OCBC, UOB, Standard Chartered และอื่นๆ', ja: 'DBS、OCBC、UOB、Standard Charteredなど、すべての主要シンガポール銀行がPayNowをサポートしています。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'duitnow-qr',
    name: { en: 'DuitNow QR', th: 'DuitNow QR', ja: 'DuitNow QR' },
    sourceType: 'duitnow_qr',
    category: 'bank-transfers',
    regions: ['MY'],
    description: {
      en: 'Malaysia\'s universal QR payment system. Customers pay using any DuitNow-enabled banking or e-wallet app.',
      th: 'ระบบ QR สากลของมาเลเซีย ลูกค้าชำระผ่านแอปธนาคารหรือ e-wallet ที่รองรับ DuitNow',
      ja: 'マレーシアのユニバーサルQR決済システム。顧客はDuitNow対応の銀行またはe-walletアプリで支払います。',
    },
    shortDescription: {
      en: 'Malaysia universal QR payment',
      th: 'ระบบ QR มาเลเซีย',
      ja: 'マレーシアユニバーサルQR決済',
    },
    currencies: ['MYR'],
    amountLimits: [
      { min: 100, max: 2000000, currency: 'MYR' },
    ],
    refundSupport: { full: true, partial: true, window: '180 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'DuitNow rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'What is DuitNow QR?', th: 'DuitNow QR คืออะไร?', ja: 'DuitNow QRとは？' },
        answer: { en: 'DuitNow QR is Malaysia\'s universal QR payment standard that works across all participating banks and e-wallets.', th: 'DuitNow QR คือมาตรฐาน QR สากลของมาเลเซียที่ใช้งานได้กับธนาคารและ e-wallet ที่เข้าร่วม', ja: 'DuitNow QRはマレーシアの参加銀行およびe-wallet全体で機能するユニバーサルQR決済標準です。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'fpx',
    name: { en: 'FPX', th: 'FPX', ja: 'FPX' },
    sourceType: 'fpx',
    category: 'bank-transfers',
    regions: ['MY'],
    description: {
      en: 'Malaysia\'s online banking payment system. Customers select their bank, authenticate, and authorize payment securely.',
      th: 'ระบบชำระเงินผ่านธนาคารออนไลน์ของมาเลเซีย ลูกค้าเลือกธนาคารและยืนยันการชำระเงิน',
      ja: 'マレーシアのオンラインバンキング決済システム。顧客は銀行を選択し、認証して安全に支払いを承認します。',
    },
    shortDescription: {
      en: 'Malaysia online banking',
      th: 'ธนาคารออนไลน์มาเลเซีย',
      ja: 'マレーシアオンラインバンキング',
    },
    currencies: ['MYR'],
    amountLimits: [
      { min: 100, max: 3000000, currency: 'MYR' },
    ],
    refundSupport: { full: true, partial: true, window: '180 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    sourceParams: ['bank'],
    failureCodes: [
      { code: 'payment_rejected', description: 'Bank rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'invalid_account', description: 'Invalid bank account' },
      { code: 'payment_cancelled', description: 'Customer cancelled at bank site' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'Which banks support FPX?', th: 'ธนาคารใดรองรับ FPX?', ja: 'どの銀行がFPXをサポートしていますか？' },
        answer: { en: 'FPX supports all major Malaysian banks including Maybank, CIMB, Public Bank, RHB, Hong Leong, and more.', th: 'FPX รองรับธนาคารหลักทั้งหมดในมาเลเซีย รวมถึง Maybank, CIMB, Public Bank, RHB, Hong Leong และอื่นๆ', ja: 'FPXはMaybank、CIMB、Public Bank、RHB、Hong Leongなど、すべての主要マレーシア銀行をサポートしています。' }
      },
      {
        question: { en: 'How do I pass the bank parameter?', th: 'ฉันจะส่งพารามิเตอร์ธนาคารอย่างไร?', ja: '銀行パラメータはどのように渡しますか？' },
        answer: { en: 'Pass the bank code in the source creation request. Available banks can be retrieved from the /capability endpoint.', th: 'ส่งรหัสธนาคารในคำขอสร้าง source ธนาคารที่พร้อมใช้งานสามารถดึงได้จาก endpoint /capability', ja: 'ソース作成リクエストで銀行コードを渡します。利用可能な銀行は/capabilityエンドポイントから取得できます。' }
      },
      commonFAQs.testMode,
    ],
  },

  // === E-WALLETS ===
  {
    id: 'truemoney',
    name: { en: 'TrueMoney Wallet', th: 'TrueMoney Wallet', ja: 'TrueMoney Wallet' },
    sourceType: 'truemoney',
    category: 'e-wallets',
    regions: ['TH'],
    description: {
      en: 'Thailand\'s leading digital wallet. Customers enter their registered phone number and authorize via OTP. Supports wallet balance, bank accounts, cards, and Pay Next.',
      th: 'กระเป๋าเงินดิจิทัลชั้นนำของไทย ลูกค้าใส่เบอร์โทรและยืนยันด้วย OTP',
      ja: 'タイの主要デジタルウォレット。顧客は登録電話番号を入力し、OTPで認証します。',
    },
    shortDescription: {
      en: 'Thai digital wallet',
      th: 'กระเป๋าเงินดิจิทัลไทย',
      ja: 'タイのデジタルウォレット',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 10000000, currency: 'THB' },  // ฿20 - ฿100,000
    ],
    refundSupport: { full: true, partial: false, window: '30 days' },
    voidSupport: true,
    voidWindow: '24 hours',
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    authorizationWindow: '3 minutes',
    chargeExpiry: '7 days',
    requiresEnablement: true,
    sourceParams: ['phone_number'],
    failureCodes: [
      { code: 'payment_rejected', description: 'Payment provider rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'invalid_account', description: 'No valid TrueMoney account found for this phone number' },
      { code: 'insufficient_fund', description: 'Insufficient wallet balance or daily limit reached' },
    ],
    testCredentials: {
      phoneNumber: '0812345678',
      notes: 'Use any 10-digit phone number starting with 0. OTP authorization required.',
    },
    faqs: [
      commonFAQs.enablePaymentMethod,
      commonFAQs.webhookRequired,
      {
        question: { en: 'What phone number format is required?', th: 'ต้องใช้รูปแบบเบอร์โทรอะไร?', ja: '必要な電話番号形式は？' },
        answer: { en: 'Use a 10-digit Thai mobile number starting with 0. Example: 0812345678', th: 'ใช้เบอร์มือถือไทย 10 หลักที่ขึ้นต้นด้วย 0 ตัวอย่าง: 0812345678', ja: '0で始まる10桁のタイの携帯電話番号を使用します。例：0812345678' }
      },
      {
        question: { en: 'What happens if the phone number isn\'t registered?', th: 'จะเกิดอะไรขึ้นถ้าเบอร์โทรไม่ได้ลงทะเบียน?', ja: '電話番号が登録されていない場合はどうなりますか？' },
        answer: { en: 'The charge will fail with failure_code "invalid_account". Customers must have a TrueMoney Wallet account.', th: 'รายการจะล้มเหลวด้วย failure_code "invalid_account" ลูกค้าต้องมีบัญชี TrueMoney Wallet', ja: '請求はfailure_code "invalid_account"で失敗します。顧客はTrueMoney Walletアカウントを持っている必要があります。' }
      },
      commonFAQs.refundTiming,
    ],
  },
  {
    id: 'rabbit-linepay',
    name: { en: 'Rabbit LINE Pay', th: 'Rabbit LINE Pay', ja: 'Rabbit LINE Pay' },
    sourceType: 'rabbit_linepay',
    category: 'e-wallets',
    regions: ['TH'],
    description: {
      en: 'Popular e-wallet integrated with LINE messaging app. Customers authorize payment via QR scan or LINE login. Contact support@omise.co to enable.',
      th: 'กระเป๋าเงินยอดนิยมที่ผสานกับแอป LINE ลูกค้ายืนยันการชำระผ่าน QR หรือ LINE login',
      ja: 'LINEメッセージングアプリと統合された人気のe-wallet。QRスキャンまたはLINEログインで支払いを承認します。',
    },
    shortDescription: {
      en: 'LINE integrated wallet',
      th: 'กระเป๋าเงิน LINE',
      ja: 'LINE統合ウォレット',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 15000000, currency: 'THB' },  // ฿20 - ฿150,000
    ],
    refundSupport: { full: true, partial: true, window: '60 days' },
    voidSupport: true,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    authorizationWindow: '20 minutes',
    requiresEnablement: true,
    failureCodes: [
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'insufficient_balance', description: 'Insufficient LINE Pay balance or limit reached' },
      { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
      { code: 'timeout', description: 'Customer did not complete authorization within 20 minutes' },
    ],
    testCredentials: {
      notes: 'In test mode, manually mark charge as Successful or Failed in Dashboard.',
    },
    faqs: [
      commonFAQs.enablePaymentMethod,
      commonFAQs.webhookRequired,
      commonFAQs.redirectTimeout,
      {
        question: { en: 'What is Rabbit LINE Pay?', th: 'Rabbit LINE Pay คืออะไร?', ja: 'Rabbit LINE Payとは？' },
        answer: { en: 'Rabbit LINE Pay combines LINE messaging app with Rabbit card functionality for seamless mobile payments in Thailand.', th: 'Rabbit LINE Pay รวมแอป LINE กับบัตร Rabbit สำหรับการชำระเงินบนมือถือในประเทศไทย', ja: 'Rabbit LINE PayはLINEメッセージングアプリとRabbitカード機能を組み合わせた、タイでのシームレスなモバイル決済です。' }
      },
      {
        question: { en: 'Do customers need the LINE app?', th: 'ลูกค้าต้องมีแอป LINE หรือไม่?', ja: '顧客はLINEアプリが必要ですか？' },
        answer: { en: 'Yes, customers need the LINE app with Rabbit LINE Pay activated and sufficient balance or linked payment method.', th: 'ใช่ ลูกค้าต้องมีแอป LINE พร้อมเปิดใช้งาน Rabbit LINE Pay และมียอดเงินหรือวิธีชำระเงินที่เชื่อมต่อ', ja: 'はい、顧客はRabbit LINE Payが有効化されたLINEアプリと、十分な残高またはリンクされた支払い方法が必要です。' }
      },
      commonFAQs.refundTiming,
    ],
  },
  {
    id: 'grabpay',
    name: { en: 'GrabPay', th: 'GrabPay', ja: 'GrabPay' },
    sourceType: 'grabpay',
    category: 'e-wallets',
    regions: ['SG', 'MY'],
    description: {
      en: 'Southeast Asia\'s super app wallet. Supports wallet balance, credit cards, and PayLater installments.',
      th: 'กระเป๋าเงิน super app ของเอเชียตะวันออกเฉียงใต้ รองรับยอดเงินในกระเป๋า บัตรเครดิต และผ่อนชำระ',
      ja: '東南アジアのスーパーアプリウォレット。ウォレット残高、クレジットカード、PayLater分割払いをサポート。',
    },
    shortDescription: {
      en: 'Grab super app wallet',
      th: 'กระเป๋าเงิน Grab',
      ja: 'Grabスーパーアプリウォレット',
    },
    currencies: ['SGD', 'MYR'],
    amountLimits: [
      { min: 100, max: 500000, currency: 'SGD' },
      { min: 100, max: 150000, currency: 'MYR' },
    ],
    refundSupport: { full: true, partial: true, window: '90 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'GrabPay rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'insufficient_fund', description: 'Insufficient GrabPay balance or limit reached' },
      { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'Which countries support GrabPay?', th: 'ประเทศใดรองรับ GrabPay?', ja: 'GrabPayをサポートする国は？' },
        answer: { en: 'GrabPay is available in Singapore and Malaysia through Omise. Each country uses its local currency.', th: 'GrabPay มีให้บริการในสิงคโปร์และมาเลเซียผ่าน Omise แต่ละประเทศใช้สกุลเงินท้องถิ่น', ja: 'GrabPayはOmiseを通じてシンガポールとマレーシアで利用可能です。各国は現地通貨を使用します。' }
      },
      {
        question: { en: 'Can customers use PayLater installments?', th: 'ลูกค้าสามารถใช้ PayLater ผ่อนชำระได้หรือไม่?', ja: '顧客はPayLater分割払いを利用できますか？' },
        answer: { en: 'Yes, eligible customers can use GrabPay PayLater for installment payments if enabled in their Grab app.', th: 'ได้ ลูกค้าที่มีสิทธิ์สามารถใช้ GrabPay PayLater สำหรับการผ่อนชำระได้หากเปิดใช้งานในแอป Grab', ja: 'はい、Grabアプリで有効になっている場合、対象顧客はGrabPay PayLaterを分割払いに利用できます。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'shopeepay',
    name: { en: 'ShopeePay', th: 'ShopeePay', ja: 'ShopeePay' },
    sourceType: 'shopeepay_jumpapp',
    category: 'e-wallets',
    regions: ['TH', 'SG', 'MY'],
    description: {
      en: 'E-commerce integrated wallet for Shopee users. Supports wallet balance, SPayLater, and cards (Thailand). Available across Thailand, Singapore, and Malaysia.',
      th: 'กระเป๋าเงินสำหรับผู้ใช้ Shopee รองรับยอดเงินในกระเป๋า SPayLater และบัตร',
      ja: 'Shopeeユーザー向けのeコマース統合ウォレット。ウォレット残高、SPayLater、カード対応。',
    },
    shortDescription: {
      en: 'Shopee e-commerce wallet',
      th: 'กระเป๋าเงิน Shopee',
      ja: 'Shopee eコマースウォレット',
    },
    currencies: ['THB', 'SGD', 'MYR'],
    amountLimits: [
      { min: 2000, max: 15000000, currency: 'THB' },   // ฿20 - ฿150,000
      { min: 100, max: 2000000, currency: 'SGD' },     // $1 - $20,000
      { min: 100, max: 999900, currency: 'MYR' },      // RM1 - RM9,999
    ],
    refundSupport: { full: true, partial: true, window: '180 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    authorizationWindow: '20-60 minutes',
    chargeExpiry: '60 minutes max',
    failureCodes: [
      { code: 'payment_rejected', description: 'ShopeePay rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'insufficient_fund', description: 'Insufficient ShopeePay balance or limit reached' },
      { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    testCredentials: {
      notes: 'Refunds and voids are NOT available for off-us transactions (non-Shopee wallet funding sources). Use test mode to simulate payments.',
    },
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.redirectTimeout,
      {
        question: { en: 'Which countries support ShopeePay?', th: 'ประเทศใดรองรับ ShopeePay?', ja: 'ShopeePayをサポートする国は？' },
        answer: { en: 'ShopeePay is available in Thailand, Singapore, and Malaysia through Omise.', th: 'ShopeePay มีให้บริการในไทย สิงคโปร์ และมาเลเซียผ่าน Omise', ja: 'ShopeePayはOmiseを通じてタイ、シンガポール、マレーシアで利用可能です。' }
      },
      {
        question: { en: 'Can customers use SPayLater?', th: 'ลูกค้าสามารถใช้ SPayLater ได้หรือไม่?', ja: '顧客はSPayLaterを利用できますか？' },
        answer: { en: 'Yes, eligible customers can choose SPayLater installments during checkout in the Shopee app.', th: 'ได้ ลูกค้าที่มีสิทธิ์สามารถเลือกผ่อนชำระ SPayLater ระหว่างการชำระเงินในแอป Shopee', ja: 'はい、対象顧客はShopeeアプリでのチェックアウト時にSPayLater分割払いを選択できます。' }
      },
      {
        question: { en: 'Why can\'t I refund some ShopeePay transactions?', th: 'ทำไมฉันไม่สามารถคืนเงินธุรกรรม ShopeePay บางรายการ?', ja: '一部のShopeePay取引を返金できないのはなぜですか？' },
        answer: { en: 'Refunds are not available for "off-us" transactions where customers paid using linked cards or other non-wallet sources.', th: 'การคืนเงินไม่สามารถทำได้สำหรับธุรกรรม "off-us" ที่ลูกค้าชำระด้วยบัตรที่เชื่อมต่อหรือแหล่งอื่นที่ไม่ใช่กระเป๋าเงิน', ja: '顧客がリンクされたカードまたは他の非ウォレットソースを使用して支払った「off-us」取引には返金できません。' }
      },
    ],
  },
  {
    id: 'boost',
    name: { en: 'Boost', th: 'Boost', ja: 'Boost' },
    sourceType: 'boost',
    category: 'e-wallets',
    regions: ['MY'],
    description: {
      en: 'Malaysia\'s popular lifestyle e-wallet with rewards and cashback features. Desktop users see QR code; mobile users redirect to app.',
      th: 'กระเป๋าเงินไลฟ์สไตล์ยอดนิยมของมาเลเซียพร้อมรางวัลและเงินคืน',
      ja: '報酬とキャッシュバック機能を備えたマレーシアの人気ライフスタイルe-wallet。',
    },
    shortDescription: {
      en: 'Malaysia lifestyle wallet',
      th: 'กระเป๋าเงินมาเลเซีย',
      ja: 'マレーシアライフスタイルウォレット',
    },
    currencies: ['MYR'],
    amountLimits: [
      { min: 100, max: 499900, currency: 'MYR' },  // RM1 - RM4,999
    ],
    refundSupport: { full: true, partial: true, window: '180 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Boost rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'insufficient_fund', description: 'Insufficient Boost balance or limit reached' },
      { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'What is Boost?', th: 'Boost คืออะไร?', ja: 'Boostとは？' },
        answer: { en: 'Boost is a popular Malaysian e-wallet with rewards, cashback, and lifestyle features.', th: 'Boost เป็นกระเป๋าเงินยอดนิยมของมาเลเซียพร้อมรางวัล เงินคืน และฟีเจอร์ไลฟ์สไตล์', ja: 'Boostは報酬、キャッシュバック、ライフスタイル機能を備えた人気のマレーシアe-walletです。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'touch-n-go',
    name: { en: 'Touch \'n Go', th: 'Touch \'n Go', ja: 'Touch \'n Go' },
    sourceType: 'touch_n_go',
    category: 'e-wallets',
    regions: ['MY'],
    description: {
      en: 'Malaysia\'s most widely used e-wallet with over 20 million users. Desktop users scan QR; mobile users redirect to app.',
      th: 'กระเป๋าเงินที่ใช้กันอย่างแพร่หลายที่สุดในมาเลเซียมีผู้ใช้กว่า 20 ล้านคน',
      ja: '2,000万人以上のユーザーを持つマレーシアで最も広く使用されているe-wallet。',
    },
    shortDescription: {
      en: 'Malaysia\'s leading e-wallet',
      th: 'กระเป๋าเงินชั้นนำมาเลเซีย',
      ja: 'マレーシア主要e-wallet',
    },
    currencies: ['MYR'],
    amountLimits: [
      { min: 100, max: 999999, currency: 'MYR' },  // RM1 - RM9,999.99
    ],
    refundSupport: { full: true, partial: true, window: '180 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Touch \'n Go rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'insufficient_fund', description: 'Insufficient Touch \'n Go balance or limit reached' },
      { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'What is Touch \'n Go?', th: 'Touch \'n Go คืออะไร?', ja: 'Touch \'n Goとは？' },
        answer: { en: 'Touch \'n Go is Malaysia\'s leading e-wallet with over 20 million users, supporting online and offline payments.', th: 'Touch \'n Go คือกระเป๋าเงินชั้นนำของมาเลเซียมีผู้ใช้กว่า 20 ล้านคน รองรับการชำระออนไลน์และออฟไลน์', ja: 'Touch \'n Goは2,000万人以上のユーザーを持つマレーシアの主要e-walletで、オンラインとオフライン決済をサポートしています。' }
      },
      {
        question: { en: 'How does the payment flow work?', th: 'ขั้นตอนการชำระเงินทำงานอย่างไร?', ja: '支払いフローはどのように機能しますか？' },
        answer: { en: 'Desktop users scan a QR code; mobile users are redirected to the Touch \'n Go app to authorize payment.', th: 'ผู้ใช้เดสก์ท็อปสแกน QR code ผู้ใช้มือถือถูกนำไปยังแอป Touch \'n Go เพื่อยืนยันการชำระเงิน', ja: 'デスクトップユーザーはQRコードをスキャンし、モバイルユーザーは支払いを承認するためにTouch \'n Goアプリにリダイレクトされます。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'paypay',
    name: { en: 'PayPay', th: 'PayPay', ja: 'PayPay' },
    sourceType: 'paypay',
    category: 'e-wallets',
    regions: ['JP'],
    description: {
      en: 'Japan\'s most popular QR code payment service with over 60 million users. Supports app, QR scan, and browser login.',
      th: 'บริการชำระเงิน QR ยอดนิยมที่สุดของญี่ปุ่นที่มีผู้ใช้กว่า 60 ล้านคน',
      ja: '6,000万人以上のユーザーを持つ日本で最も人気のあるQRコード決済サービス。',
    },
    shortDescription: {
      en: 'Japan\'s leading QR payment',
      th: 'QR ชั้นนำญี่ปุ่น',
      ja: '日本主要QR決済',
    },
    currencies: ['JPY'],
    amountLimits: [
      { min: 100, max: 1000000, currency: 'JPY' },  // ¥100 - ¥1,000,000
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: true,
    voidWindow: 'until 12:15 AM next day (JST)',
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    authorizationWindow: '5 minutes',
    failureCodes: [
      { code: 'payment_expired', description: 'Authorization window closed (5 minutes)' },
      { code: 'payment_rejected', description: 'PayPay rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'insufficient_fund', description: 'Insufficient PayPay balance or limit reached' },
      { code: 'invalid_account', description: 'No valid PayPay account found' },
    ],
    testCredentials: {
      notes: 'Payment fee: 3.4%. Voids available until 12:15 AM next day (Japan Standard Time). Use test mode to simulate payments.',
    },
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.redirectTimeout,
      {
        question: { en: 'What is PayPay?', th: 'PayPay คืออะไร?', ja: 'PayPayとは？' },
        answer: { en: 'PayPay is Japan\'s largest QR code payment service with over 60 million users, backed by SoftBank and Yahoo Japan.', th: 'PayPay คือบริการชำระเงิน QR ที่ใหญ่ที่สุดของญี่ปุ่นมีผู้ใช้กว่า 60 ล้านคน', ja: 'PayPayは6,000万人以上のユーザーを持つ日本最大のQRコード決済サービスで、SoftBankとYahoo Japanが支援しています。' }
      },
      {
        question: { en: 'When can I void a PayPay charge?', th: 'เมื่อไหร่ที่ฉันสามารถยกเลิก PayPay charge ได้?', ja: 'PayPay請求をキャンセルできるのはいつですか？' },
        answer: { en: 'Voids must be initiated before 12:15 AM Japan Standard Time the next day.', th: 'การยกเลิกต้องทำก่อน 00:15 น. ตามเวลาญี่ปุ่นของวันถัดไป', ja: 'キャンセルは翌日の日本時間午前0時15分までに開始する必要があります。' }
      },
      commonFAQs.refundTiming,
    ],
  },

  // === ALIPAY & WECHAT ===
  {
    id: 'alipay',
    name: { en: 'Alipay', th: 'Alipay', ja: 'Alipay' },
    sourceType: 'alipay',
    category: 'alipay-wechat',
    regions: ['TH', 'SG', 'MY', 'JP'],
    description: {
      en: 'Accept payments from Chinese tourists and cross-border shoppers using Alipay.',
      th: 'รับชำระจากนักท่องเที่ยวชาวจีนและผู้ซื้อข้ามพรมแดนผ่าน Alipay',
      ja: 'Alipayを使用して中国人観光客やクロスボーダーショッパーからの支払いを受け付けます。',
    },
    shortDescription: {
      en: 'Chinese tourist payments',
      th: 'ชำระจากนักท่องเที่ยวจีน',
      ja: '中国人観光客の決済',
    },
    currencies: ['THB', 'SGD', 'MYR', 'JPY'],
    amountLimits: [
      { min: 2000, max: 15000000, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_expired', description: 'Authorization window closed' },
      { code: 'payment_rejected', description: 'Alipay rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'invalid_account', description: 'No valid Alipay account found' },
      { code: 'insufficient_fund', description: 'Insufficient balance or limit reached' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'Who uses Alipay?', th: 'ใครใช้ Alipay?', ja: 'Alipayは誰が使いますか？' },
        answer: { en: 'Alipay is primarily used by Chinese tourists and cross-border shoppers with accounts registered in mainland China.', th: 'Alipay ส่วนใหญ่ใช้โดยนักท่องเที่ยวชาวจีนและผู้ซื้อข้ามพรมแดนที่มีบัญชีในจีนแผ่นดินใหญ่', ja: 'Alipayは主に中国本土でアカウントを登録している中国人観光客やクロスボーダーショッパーが利用します。' }
      },
      {
        question: { en: 'How is the exchange rate determined?', th: 'อัตราแลกเปลี่ยนกำหนดอย่างไร?', ja: '為替レートはどのように決定されますか？' },
        answer: { en: 'Exchange rates are determined by Alipay at the time of transaction. Customers see the CNY equivalent before confirming.', th: 'อัตราแลกเปลี่ยนกำหนดโดย Alipay ในขณะทำธุรกรรม ลูกค้าเห็นยอดเป็น CNY ก่อนยืนยัน', ja: '為替レートは取引時にAlipayによって決定されます。顧客は確認前にCNY相当額を確認できます。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'alipay-plus',
    name: { en: 'Alipay+', th: 'Alipay+', ja: 'Alipay+' },
    sourceType: 'alipay_plus',
    category: 'alipay-wechat',
    regions: ['TH', 'SG', 'MY', 'JP'],
    description: {
      en: 'Accept payments from multiple Asian wallets including Alipay, AlipayHK, DANA, GCash, KakaoPay, and TrueMoney.',
      th: 'รับชำระจากหลาย wallet ในเอเชีย ได้แก่ Alipay, AlipayHK, DANA, GCash, KakaoPay และ TrueMoney',
      ja: 'Alipay、AlipayHK、DANA、GCash、KakaoPay、TrueMoneyを含む複数のアジアウォレットからの支払いを受け付けます。',
    },
    shortDescription: {
      en: 'Multi-wallet Alipay network',
      th: 'เครือข่าย Alipay หลาย wallet',
      ja: 'マルチウォレットAlipayネットワーク',
    },
    currencies: ['THB', 'SGD', 'MYR', 'JPY'],
    amountLimits: [
      { min: 2000, max: 15000000, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_expired', description: 'Authorization window closed' },
      { code: 'payment_rejected', description: 'Payment provider rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'invalid_account', description: 'No valid payment account found' },
      { code: 'insufficient_fund', description: 'Insufficient balance or limit reached' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'What is Alipay+?', th: 'Alipay+ คืออะไร?', ja: 'Alipay+とは？' },
        answer: { en: 'Alipay+ is a cross-border payment network connecting multiple Asian wallets including AlipayHK, DANA, GCash, KakaoPay, and TrueMoney.', th: 'Alipay+ เป็นเครือข่ายชำระเงินข้ามพรมแดนที่เชื่อมต่อหลาย wallet ในเอเชีย', ja: 'Alipay+はAlipayHK、DANA、GCash、KakaoPay、TrueMoneyを含む複数のアジアウォレットを接続するクロスボーダー決済ネットワークです。' }
      },
      {
        question: { en: 'Which wallets are supported?', th: 'wallet ใดบ้างที่รองรับ?', ja: 'どのウォレットがサポートされていますか？' },
        answer: { en: 'Alipay+  supports Alipay (China), AlipayHK, DANA (Indonesia), GCash (Philippines), KakaoPay (Korea), and TrueMoney (Thailand).', th: 'Alipay+ รองรับ Alipay (จีน), AlipayHK, DANA (อินโดนีเซีย), GCash (ฟิลิปปินส์), KakaoPay (เกาหลี) และ TrueMoney (ไทย)', ja: 'Alipay+はAlipay（中国）、AlipayHK、DANA（インドネシア）、GCash（フィリピン）、KakaoPay（韓国）、TrueMoney（タイ）をサポートしています。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'wechat-pay',
    name: { en: 'WeChat Pay', th: 'WeChat Pay', ja: 'WeChat Pay' },
    sourceType: 'wechat_pay',
    category: 'alipay-wechat',
    regions: ['TH', 'SG', 'MY', 'JP'],
    description: {
      en: 'Accept payments from WeChat users, popular among Chinese tourists and expats.',
      th: 'รับชำระจากผู้ใช้ WeChat ที่นิยมในกลุ่มนักท่องเที่ยวและชาวจีนในต่างแดน',
      ja: '中国人観光客や海外在住中国人に人気のWeChatユーザーからの支払いを受け付けます。',
    },
    shortDescription: {
      en: 'WeChat messenger payments',
      th: 'ชำระผ่าน WeChat',
      ja: 'WeChatメッセンジャー決済',
    },
    currencies: ['THB', 'SGD', 'MYR', 'JPY'],
    amountLimits: [
      { min: 2000, max: 15000000, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_expired', description: 'Authorization window closed' },
      { code: 'payment_rejected', description: 'WeChat Pay rejected the transaction' },
      { code: 'failed_processing', description: 'General payment processing failure' },
      { code: 'invalid_account', description: 'No valid WeChat Pay account found' },
      { code: 'insufficient_fund', description: 'Insufficient balance or limit reached' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'Who uses WeChat Pay?', th: 'ใครใช้ WeChat Pay?', ja: 'WeChat Payは誰が使いますか？' },
        answer: { en: 'WeChat Pay is popular among Chinese tourists, expats, and WeChat Mini Program users.', th: 'WeChat Pay เป็นที่นิยมในกลุ่มนักท่องเที่ยวชาวจีน ชาวต่างชาติ และผู้ใช้ WeChat Mini Program', ja: 'WeChat Payは中国人観光客、海外在住者、WeChatミニプログラムユーザーに人気があります。' }
      },
      {
        question: { en: 'Is WeChat different from Alipay?', th: 'WeChat แตกต่างจาก Alipay อย่างไร?', ja: 'WeChatはAlipayと異なりますか？' },
        answer: { en: 'Yes, they are separate services. WeChat is a messaging app with integrated payments, while Alipay is a dedicated payment platform.', th: 'ใช่ เป็นบริการที่แยกกัน WeChat เป็นแอปแชทที่มีการชำระเงินในตัว ส่วน Alipay เป็นแพลตฟอร์มชำระเงินโดยเฉพาะ', ja: 'はい、別々のサービスです。WeChatは決済機能が統合されたメッセージングアプリで、Alipayは専用の決済プラットフォームです。' }
      },
      commonFAQs.testMode,
    ],
  },

  // === INSTALLMENTS ===
  {
    id: 'card-installments',
    name: { en: 'Card Installments', th: 'ผ่อนชำระบัตรเครดิต', ja: 'カード分割払い' },
    sourceType: 'installment',
    category: 'installments',
    regions: ['TH'],
    description: {
      en: 'Offer installment plans on credit cards from major Thai banks including Kasikorn, SCB, Krungsri, and more.',
      th: 'เสนอผ่อนชำระผ่านบัตรเครดิตจากธนาคารชั้นนำ เช่น กสิกร ไทยพาณิชย์ กรุงศรี และอื่นๆ',
      ja: 'カシコン、SCB、クルンスリなど主要タイ銀行のクレジットカードで分割払いプランを提供します。',
    },
    shortDescription: {
      en: 'Thai bank card installments',
      th: 'ผ่อนบัตรเครดิตธนาคารไทย',
      ja: 'タイ銀行カード分割払い',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 300000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: false, window: '365 days' },
    voidSupport: true,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'invalid_card', description: 'Card information is invalid' },
      { code: 'insufficient_fund', description: 'Insufficient credit limit' },
      { code: 'payment_rejected', description: 'Bank rejected installment request' },
      { code: 'failed_processing', description: 'General processing failure' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'Which banks support installments?', th: 'ธนาคารใดรองรับการผ่อนชำระ?', ja: 'どの銀行が分割払いをサポートしていますか？' },
        answer: { en: 'Major Thai banks including Kasikorn, SCB, Krungthai, Bangkok Bank, Krungsri, and UOB support installments.', th: 'ธนาคารหลักในไทย ได้แก่ กสิกร ไทยพาณิชย์ กรุงไทย กรุงเทพ กรุงศรี และ UOB รองรับการผ่อนชำระ', ja: 'カシコン、SCB、クルンタイ、バンコク銀行、クルンスリ、UOBなど主要タイ銀行が分割払いをサポートしています。' }
      },
      {
        question: { en: 'What installment terms are available?', th: 'มีระยะเวลาผ่อนชำระอะไรบ้าง?', ja: '利用可能な分割払い期間は？' },
        answer: { en: 'Available terms vary by bank: typically 3, 4, 6, 10 months. Some banks offer 0% interest promotions.', th: 'ระยะเวลาที่มีแตกต่างกันตามธนาคาร: ปกติ 3, 4, 6, 10 เดือน บางธนาคารมีโปรโมชั่นดอกเบี้ย 0%', ja: '利用可能な期間は銀行によって異なります：通常3、4、6、10ヶ月。一部の銀行は0%金利プロモーションを提供しています。' }
      },
      commonFAQs.minimumAmount,
      commonFAQs.refundTiming,
    ],
  },
  {
    id: 'atome',
    name: { en: 'Atome', th: 'Atome', ja: 'Atome' },
    sourceType: 'atome',
    category: 'installments',
    regions: ['TH', 'SG', 'MY'],
    description: {
      en: 'Buy now, pay later service allowing customers to split payments into 3 interest-free installments.',
      th: 'บริการซื้อก่อนจ่ายทีหลัง แบ่งชำระ 3 งวดไม่มีดอกเบี้ย',
      ja: '顧客が支払いを3回の無利子分割払いに分割できる後払いサービス。',
    },
    shortDescription: {
      en: 'Buy now, pay later',
      th: 'ซื้อก่อนจ่ายทีหลัง',
      ja: '後払いサービス',
    },
    currencies: ['THB', 'SGD', 'MYR'],
    amountLimits: [
      { min: 2000, max: 5000000, currency: 'THB' },
    ],
    refundSupport: { full: true, partial: true, window: '365 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Atome rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled the transaction' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'What is Atome?', th: 'Atome คืออะไร?', ja: 'Atomeとは？' },
        answer: { en: 'Atome is a buy-now-pay-later service that splits payments into 3 equal interest-free installments.', th: 'Atome คือบริการซื้อก่อนจ่ายทีหลังที่แบ่งชำระเป็น 3 งวดเท่าๆ กันไม่มีดอกเบี้ย', ja: 'Atomeは支払いを3回の均等無利子分割払いに分割する後払いサービスです。' }
      },
      {
        question: { en: 'How does customer approval work?', th: 'การอนุมัติลูกค้าทำงานอย่างไร?', ja: '顧客承認はどのように機能しますか？' },
        answer: { en: 'Atome performs real-time credit checks. Customers are redirected to the Atome app to approve the purchase.', th: 'Atome ตรวจสอบเครดิตแบบเรียลไทม์ ลูกค้าถูกนำไปยังแอป Atome เพื่ออนุมัติการซื้อ', ja: 'Atomeはリアルタイムで与信審査を行います。顧客は購入を承認するためにAtomeアプリにリダイレクトされます。' }
      },
      commonFAQs.testMode,
    ],
  },

  // === CONVENIENCE STORE ===
  {
    id: 'konbini',
    name: { en: 'Konbini', th: 'Konbini', ja: 'コンビニ決済' },
    sourceType: 'econtext',
    category: 'convenience-store',
    regions: ['JP'],
    description: {
      en: 'Accept cash payments at Japanese convenience stores including 7-Eleven, FamilyMart, Lawson, and more.',
      th: 'รับชำระเงินสดที่ร้านสะดวกซื้อญี่ปุ่น เช่น 7-Eleven, FamilyMart, Lawson และอื่นๆ',
      ja: 'セブンイレブン、ファミリーマート、ローソンなどの日本のコンビニエンスストアで現金支払いを受け付けます。',
    },
    shortDescription: {
      en: 'Japan convenience store',
      th: 'ร้านสะดวกซื้อญี่ปุ่น',
      ja: 'コンビニ払い',
    },
    currencies: ['JPY'],
    amountLimits: [
      { min: 100, max: 30000000, currency: 'JPY' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'offline',
    chargeExpiry: '7 days',
    failureCodes: [
      { code: 'payment_expired', description: 'Payment code expired before customer paid' },
      { code: 'failed_processing', description: 'General processing failure' },
    ],
    testCredentials: {
      notes: 'Customer receives a payment code to present at the convenience store. Payment must be made within 7 days.',
    },
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'Which convenience stores are supported?', th: 'ร้านสะดวกซื้อใดรองรับ?', ja: 'どのコンビニがサポートされていますか？' },
        answer: { en: 'Major chains including 7-Eleven, FamilyMart, Lawson, Ministop, Daily Yamazaki, and Seicomart.', th: 'เครือข่ายหลัก ได้แก่ 7-Eleven, FamilyMart, Lawson, Ministop, Daily Yamazaki และ Seicomart', ja: 'セブンイレブン、ファミリーマート、ローソン、ミニストップ、デイリーヤマザキ、セイコーマートなど主要チェーン。' }
      },
      {
        question: { en: 'Why are refunds not supported?', th: 'ทำไมไม่รองรับการคืนเงิน?', ja: 'なぜ返金がサポートされていないのですか？' },
        answer: { en: 'Konbini is a cash-based payment at physical stores. Refunds must be processed manually via bank transfer.', th: 'Konbini เป็นการชำระเงินสดที่ร้านค้า การคืนเงินต้องดำเนินการด้วยตนเองผ่านการโอนเงิน', ja: 'コンビニ決済は実店舗での現金払いです。返金は銀行振込で手動処理する必要があります。' }
      },
      {
        question: { en: 'How long does the customer have to pay?', th: 'ลูกค้ามีเวลาชำระเงินนานเท่าไร?', ja: '顧客の支払い期限はどのくらいですか？' },
        answer: { en: 'Payment must be completed within 7 days. The charge expires after this period.', th: 'ต้องชำระเงินภายใน 7 วัน รายการจะหมดอายุหลังจากระยะเวลานี้', ja: '7日以内に支払いを完了する必要があります。この期間後、請求は期限切れになります。' }
      },
    ],
  },
  {
    id: 'pay-easy',
    name: { en: 'Pay-easy', th: 'Pay-easy', ja: 'Pay-easy' },
    sourceType: 'econtext',
    category: 'convenience-store',
    regions: ['JP'],
    description: {
      en: 'Accept payments via Japan\'s ATM and online banking network operated by multiple financial institutions.',
      th: 'รับชำระผ่านเครือข่าย ATM และธนาคารออนไลน์ของญี่ปุ่น',
      ja: '複数の金融機関が運営する日本のATMおよびオンラインバンキングネットワークで支払いを受け付けます。',
    },
    shortDescription: {
      en: 'Japan ATM payment network',
      th: 'เครือข่าย ATM ญี่ปุ่น',
      ja: 'ATM決済ネットワーク',
    },
    currencies: ['JPY'],
    amountLimits: [
      { min: 100, max: 99999900, currency: 'JPY' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'offline',
    chargeExpiry: '7 days',
    failureCodes: [
      { code: 'payment_expired', description: 'Payment code expired before customer paid' },
      { code: 'failed_processing', description: 'General processing failure' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'What is Pay-easy?', th: 'Pay-easy คืออะไร?', ja: 'Pay-easyとは？' },
        answer: { en: 'Pay-easy is Japan\'s ATM and online banking payment network operated by multiple financial institutions.', th: 'Pay-easy คือเครือข่ายการชำระเงินผ่าน ATM และธนาคารออนไลน์ของญี่ปุ่น', ja: 'Pay-easyは複数の金融機関が運営する日本のATMおよびオンラインバンキング決済ネットワークです。' }
      },
      {
        question: { en: 'How does the customer pay?', th: 'ลูกค้าชำระเงินอย่างไร?', ja: '顧客はどのように支払いますか？' },
        answer: { en: 'Customers receive payment details (company code, order number) and pay at an ATM or through their online banking.', th: 'ลูกค้าได้รับรายละเอียดการชำระเงิน (รหัสบริษัท หมายเลขคำสั่งซื้อ) และชำระที่ ATM หรือผ่านธนาคารออนไลน์', ja: '顧客は支払い情報（企業コード、注文番号）を受け取り、ATMまたはオンラインバンキングで支払います。' }
      },
      {
        question: { en: 'How long does the customer have to pay?', th: 'ลูกค้ามีเวลาชำระเงินนานเท่าไร?', ja: '顧客の支払い期限はどのくらいですか？' },
        answer: { en: 'Payment must be completed within 7 days. The charge expires after this period.', th: 'ต้องชำระเงินภายใน 7 วัน รายการจะหมดอายุหลังจากระยะเวลานี้', ja: '7日以内に支払いを完了する必要があります。この期間後、請求は期限切れになります。' }
      },
    ],
  },

  // === MOBILE BANKING ===
  {
    id: 'mobile-banking-kbank',
    name: { en: 'K PLUS (KBank)', th: 'K PLUS (กสิกรไทย)', ja: 'K PLUS (カシコン銀行)' },
    sourceType: 'mobile_banking_kbank',
    category: 'mobile-banking',
    regions: ['TH'],
    description: {
      en: 'Direct payment from Kasikornbank mobile banking app. Customers authorize payment with their K PLUS app.',
      th: 'ชำระตรงจากแอป K PLUS กสิกรไทย ลูกค้ายืนยันการชำระในแอป',
      ja: 'カシコン銀行モバイルバンキングアプリからの直接支払い。顧客はK PLUSアプリで支払いを承認します。',
    },
    shortDescription: {
      en: 'Kasikornbank mobile banking',
      th: 'กสิกรไทย โมบายแบงค์กิ้ง',
      ja: 'カシコン銀行モバイルバンキング',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Bank rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled in banking app' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'Does the customer need the K PLUS app?', th: 'ลูกค้าต้องมีแอป K PLUS หรือไม่?', ja: '顧客はK PLUSアプリが必要ですか？' },
        answer: { en: 'Yes, customers must have the K PLUS app installed and registered with their Kasikornbank account.', th: 'ใช่ ลูกค้าต้องติดตั้งแอป K PLUS และลงทะเบียนกับบัญชี Kasikornbank', ja: 'はい、顧客はK PLUSアプリをインストールし、カシコン銀行口座に登録している必要があります。' }
      },
      {
        question: { en: 'Why are refunds not supported?', th: 'ทำไมไม่รองรับการคืนเงิน?', ja: 'なぜ返金がサポートされていないのですか？' },
        answer: { en: 'Mobile banking payments are direct bank transfers. Refunds must be processed manually via bank transfer.', th: 'การชำระผ่าน Mobile banking เป็นการโอนเงินตรง การคืนเงินต้องดำเนินการด้วยตนเองผ่านการโอนเงิน', ja: 'モバイルバンキング決済は直接銀行振込です。返金は銀行振込で手動処理する必要があります。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'mobile-banking-scb',
    name: { en: 'SCB Easy (SCB)', th: 'SCB Easy (ไทยพาณิชย์)', ja: 'SCB Easy (サイアム商業銀行)' },
    sourceType: 'mobile_banking_scb',
    category: 'mobile-banking',
    regions: ['TH'],
    description: {
      en: 'Direct payment from Siam Commercial Bank mobile banking app.',
      th: 'ชำระตรงจากแอป SCB Easy ไทยพาณิชย์',
      ja: 'サイアム商業銀行モバイルバンキングアプリからの直接支払い。',
    },
    shortDescription: {
      en: 'SCB mobile banking',
      th: 'ไทยพาณิชย์ โมบายแบงค์กิ้ง',
      ja: 'SCBモバイルバンキング',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Bank rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled in banking app' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'Does the customer need the SCB Easy app?', th: 'ลูกค้าต้องมีแอป SCB Easy หรือไม่?', ja: '顧客はSCB Easyアプリが必要ですか？' },
        answer: { en: 'Yes, customers must have the SCB Easy app installed and registered with their SCB account.', th: 'ใช่ ลูกค้าต้องติดตั้งแอป SCB Easy และลงทะเบียนกับบัญชี SCB', ja: 'はい、顧客はSCB Easyアプリをインストールし、SCBアカウントに登録している必要があります。' }
      },
      {
        question: { en: 'Why are refunds not supported?', th: 'ทำไมไม่รองรับการคืนเงิน?', ja: 'なぜ返金がサポートされていないのですか？' },
        answer: { en: 'Mobile banking payments are direct bank transfers. Refunds must be processed manually via bank transfer.', th: 'การชำระผ่าน Mobile banking เป็นการโอนเงินตรง การคืนเงินต้องดำเนินการด้วยตนเองผ่านการโอนเงิน', ja: 'モバイルバンキング決済は直接銀行振込です。返金は銀行振込で手動処理する必要があります。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'mobile-banking-bbl',
    name: { en: 'Bualuang mBanking (BBL)', th: 'Bualuang mBanking (กรุงเทพ)', ja: 'Bualuang mBanking (バンコク銀行)' },
    sourceType: 'mobile_banking_bbl',
    category: 'mobile-banking',
    regions: ['TH'],
    description: {
      en: 'Direct payment from Bangkok Bank mobile banking app.',
      th: 'ชำระตรงจากแอป Bualuang mBanking กรุงเทพ',
      ja: 'バンコク銀行モバイルバンキングアプリからの直接支払い。',
    },
    shortDescription: {
      en: 'Bangkok Bank mobile banking',
      th: 'กรุงเทพ โมบายแบงค์กิ้ง',
      ja: 'バンコク銀行モバイルバンキング',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Bank rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled in banking app' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'Does the customer need the Bualuang mBanking app?', th: 'ลูกค้าต้องมีแอป Bualuang mBanking หรือไม่?', ja: '顧客はBualuang mBankingアプリが必要ですか？' },
        answer: { en: 'Yes, customers must have the Bualuang mBanking app installed and registered with their Bangkok Bank account.', th: 'ใช่ ลูกค้าต้องติดตั้งแอป Bualuang mBanking และลงทะเบียนกับบัญชีกรุงเทพ', ja: 'はい、顧客はBualuang mBankingアプリをインストールし、バンコク銀行アカウントに登録している必要があります。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'mobile-banking-bay',
    name: { en: 'KMA (Krungsri)', th: 'KMA (กรุงศรี)', ja: 'KMA (アユタヤ銀行)' },
    sourceType: 'mobile_banking_bay',
    category: 'mobile-banking',
    regions: ['TH'],
    description: {
      en: 'Direct payment from Bank of Ayudhya (Krungsri) mobile banking app.',
      th: 'ชำระตรงจากแอป KMA กรุงศรี',
      ja: 'アユタヤ銀行（クルンスリ）モバイルバンキングアプリからの直接支払い。',
    },
    shortDescription: {
      en: 'Krungsri mobile banking',
      th: 'กรุงศรี โมบายแบงค์กิ้ง',
      ja: 'クルンスリモバイルバンキング',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Bank rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled in banking app' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'Does the customer need the KMA app?', th: 'ลูกค้าต้องมีแอป KMA หรือไม่?', ja: '顧客はKMAアプリが必要ですか？' },
        answer: { en: 'Yes, customers must have the KMA app installed and registered with their Krungsri account.', th: 'ใช่ ลูกค้าต้องติดตั้งแอป KMA และลงทะเบียนกับบัญชีกรุงศรี', ja: 'はい、顧客はKMAアプリをインストールし、クルンスリアカウントに登録している必要があります。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'mobile-banking-ktb',
    name: { en: 'Krungthai NEXT', th: 'Krungthai NEXT', ja: 'Krungthai NEXT' },
    sourceType: 'mobile_banking_ktb',
    category: 'mobile-banking',
    regions: ['TH'],
    description: {
      en: 'Direct payment from Krungthai Bank mobile banking app.',
      th: 'ชำระตรงจากแอป Krungthai NEXT',
      ja: 'クルンタイ銀行モバイルバンキングアプリからの直接支払い。',
    },
    shortDescription: {
      en: 'Krungthai mobile banking',
      th: 'กรุงไทย โมบายแบงค์กิ้ง',
      ja: 'クルンタイモバイルバンキング',
    },
    currencies: ['THB'],
    amountLimits: [
      { min: 2000, max: 99999999, currency: 'THB' },
    ],
    refundSupport: null,
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'Bank rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled in banking app' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      {
        question: { en: 'Does the customer need the Krungthai NEXT app?', th: 'ลูกค้าต้องมีแอป Krungthai NEXT หรือไม่?', ja: '顧客はKrungthai NEXTアプリが必要ですか？' },
        answer: { en: 'Yes, customers must have the Krungthai NEXT app installed and registered with their Krungthai account.', th: 'ใช่ ลูกค้าต้องติดตั้งแอป Krungthai NEXT และลงทะเบียนกับบัญชีกรุงไทย', ja: 'はい、顧客はKrungthai NEXTアプリをインストールし、クルンタイアカウントに登録している必要があります。' }
      },
      commonFAQs.testMode,
    ],
  },
  {
    id: 'ocbc-digital',
    name: { en: 'OCBC Digital', th: 'OCBC Digital', ja: 'OCBC Digital' },
    sourceType: 'mobile_banking_ocbc',
    category: 'mobile-banking',
    regions: ['SG'],
    description: {
      en: 'Direct payment from OCBC Bank mobile banking app in Singapore.',
      th: 'ชำระตรงจากแอป OCBC ในสิงคโปร์',
      ja: 'シンガポールのOCBC銀行モバイルバンキングアプリからの直接支払い。',
    },
    shortDescription: {
      en: 'OCBC Singapore banking',
      th: 'OCBC สิงคโปร์',
      ja: 'OCBCシンガポールバンキング',
    },
    currencies: ['SGD'],
    amountLimits: [
      { min: 100, max: 99999999, currency: 'SGD' },
    ],
    refundSupport: { full: true, partial: true, window: '180 days' },
    voidSupport: false,
    webhookEvents: ['charge.create', 'charge.complete'],
    minimumApiVersion: '2017-11-02',
    status: 'available',
    flow: 'redirect',
    failureCodes: [
      { code: 'payment_rejected', description: 'OCBC rejected the transaction' },
      { code: 'failed_processing', description: 'General processing failure' },
      { code: 'payment_cancelled', description: 'Customer cancelled in banking app' },
      { code: 'timeout', description: 'Customer did not complete authorization in time' },
    ],
    faqs: [
      commonFAQs.webhookRequired,
      commonFAQs.refundTiming,
      {
        question: { en: 'Does the customer need the OCBC Digital app?', th: 'ลูกค้าต้องมีแอป OCBC Digital หรือไม่?', ja: '顧客はOCBC Digitalアプリが必要ですか？' },
        answer: { en: 'Yes, customers must have the OCBC Digital app installed and registered with their OCBC Singapore account.', th: 'ใช่ ลูกค้าต้องติดตั้งแอป OCBC Digital และลงทะเบียนกับบัญชี OCBC สิงคโปร์', ja: 'はい、顧客はOCBC Digitalアプリをインストールし、OCBCシンガポールアカウントに登録している必要があります。' }
      },
      commonFAQs.testMode,
    ],
  },
];

// Helper functions
export const getPaymentMethodsByCategory = (category: PaymentCategory): PaymentMethod[] => {
  return paymentMethods.filter(pm => pm.category === category);
};

export const getPaymentMethodsByRegion = (region: Region): PaymentMethod[] => {
  return paymentMethods.filter(pm => pm.regions.includes(region));
};

export const getPaymentMethodById = (id: string): PaymentMethod | undefined => {
  return paymentMethods.find(pm => pm.id === id);
};

export const categoryNames: Record<PaymentCategory, LocalizedContent> = {
  'cards': { en: 'Cards', th: 'บัตร', ja: 'カード' },
  'bank-transfers': { en: 'Bank Transfers', th: 'โอนเงินผ่านธนาคาร', ja: '銀行振込' },
  'e-wallets': { en: 'E-Wallets', th: 'กระเป๋าเงินดิจิทัล', ja: '電子ウォレット' },
  'alipay-wechat': { en: 'Alipay & WeChat', th: 'Alipay & WeChat', ja: 'Alipay & WeChat' },
  'installments': { en: 'Installments', th: 'ผ่อนชำระ', ja: '分割払い' },
  'convenience-store': { en: 'Convenience Store', th: 'ร้านสะดวกซื้อ', ja: 'コンビニ' },
  'mobile-banking': { en: 'Mobile Banking', th: 'โมบายแบงค์กิ้ง', ja: 'モバイルバンキング' },
};

export const regionNames: Record<Region, LocalizedContent> = {
  'TH': { en: 'Thailand', th: 'ไทย', ja: 'タイ' },
  'SG': { en: 'Singapore', th: 'สิงคโปร์', ja: 'シンガポール' },
  'MY': { en: 'Malaysia', th: 'มาเลเซีย', ja: 'マレーシア' },
  'JP': { en: 'Japan', th: 'ญี่ปุ่น', ja: '日本' },
};

export const regionFlags: Record<Region, string> = {
  'TH': '🇹🇭',
  'SG': '🇸🇬',
  'MY': '🇲🇾',
  'JP': '🇯🇵',
};
