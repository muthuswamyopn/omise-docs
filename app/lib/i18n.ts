// Internationalization utilities for Omise Documentation

import { Locale, LocalizedContent } from './types';

// Default locale
export const defaultLocale: Locale = 'en';

// Available locales
export const locales: { code: Locale; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
];

// Get localized content with fallback to English
export function getLocalizedContent(content: LocalizedContent, locale: Locale = 'en'): string {
  return content[locale] || content.en;
}

// Alias for shorter usage
export const t = getLocalizedContent;

// Create a localized content object (helper for creating content)
export function createLocalizedContent(
  en: string,
  th?: string,
  ja?: string
): LocalizedContent {
  return { en, th, ja };
}

// Check if a locale has content
export function hasTranslation(content: LocalizedContent, locale: Locale): boolean {
  return locale === 'en' || !!content[locale];
}

// Get all available translations for content
export function getAvailableLocales(content: LocalizedContent): Locale[] {
  const available: Locale[] = ['en'];
  if (content.th) available.push('th');
  if (content.ja) available.push('ja');
  return available;
}

// Common UI strings (placeholder - to be filled with translations)
export const uiStrings = {
  // Navigation
  gettingStarted: { en: 'Getting Started', th: 'เริ่มต้นใช้งาน', ja: '始めに' },
  acceptPayments: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' },
  manageMoney: { en: 'Manage Money', th: 'จัดการเงิน', ja: '資金管理' },
  securityRisk: { en: 'Security & Risk', th: 'ความปลอดภัยและความเสี่ยง', ja: 'セキュリティとリスク' },
  integrations: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' },
  apiReference: { en: 'API Reference', th: 'API อ้างอิง', ja: 'APIリファレンス' },

  // Common actions
  tryItOut: { en: 'Try it out', th: 'ทดลองใช้', ja: '試してみる' },
  sendRequest: { en: 'Send Request', th: 'ส่งคำขอ', ja: 'リクエストを送信' },
  copyCode: { en: 'Copy code', th: 'คัดลอกโค้ด', ja: 'コードをコピー' },

  // Status badges
  available: { en: 'Available', th: 'พร้อมใช้งาน', ja: '利用可能' },
  comingSoon: { en: 'Coming Soon', th: 'เร็วๆ นี้', ja: '近日公開' },
  deprecated: { en: 'Deprecated', th: 'เลิกใช้แล้ว', ja: '非推奨' },
  testOnly: { en: 'Test Mode Only', th: 'โหมดทดสอบเท่านั้น', ja: 'テストモードのみ' },

  // HTTP Methods
  getMethod: { en: 'GET', th: 'GET', ja: 'GET' },
  postMethod: { en: 'POST', th: 'POST', ja: 'POST' },
  patchMethod: { en: 'PATCH', th: 'PATCH', ja: 'PATCH' },
  deleteMethod: { en: 'DELETE', th: 'DELETE', ja: 'DELETE' },

  // Form labels
  secretKey: { en: 'Secret Key', th: 'Secret Key', ja: 'シークレットキー' },
  required: { en: 'required', th: 'จำเป็น', ja: '必須' },
  optional: { en: 'optional', th: 'ไม่บังคับ', ja: '任意' },
  conditional: { en: 'conditional', th: 'ตามเงื่อนไข', ja: '条件付き' },

  // Regions
  thailand: { en: 'Thailand', th: 'ประเทศไทย', ja: 'タイ' },
  singapore: { en: 'Singapore', th: 'สิงคโปร์', ja: 'シンガポール' },
  malaysia: { en: 'Malaysia', th: 'มาเลเซีย', ja: 'マレーシア' },
  japan: { en: 'Japan', th: 'ญี่ปุ่น', ja: '日本' },

  // Payment related
  minAmount: { en: 'Minimum Amount', th: 'จำนวนขั้นต่ำ', ja: '最小金額' },
  maxAmount: { en: 'Maximum Amount', th: 'จำนวนสูงสุด', ja: '最大金額' },
  refundWindow: { en: 'Refund Window', th: 'ระยะเวลาคืนเงิน', ja: '返金期間' },

  // Callouts
  tip: { en: 'Tip', th: 'เคล็ดลับ', ja: 'ヒント' },
  warning: { en: 'Warning', th: 'คำเตือน', ja: '警告' },
  info: { en: 'Info', th: 'ข้อมูล', ja: '情報' },
  danger: { en: 'Danger', th: 'อันตราย', ja: '危険' },

  // Error messages
  rateLimitExceeded: {
    en: 'Rate limit exceeded. Try again tomorrow.',
    th: 'เกินขีดจำกัดการใช้งาน ลองใหม่พรุ่งนี้',
    ja: 'レート制限を超えました。明日もう一度お試しください。'
  },
  liveKeysNotAllowed: {
    en: 'Live keys not allowed. Use test keys only.',
    th: 'ไม่อนุญาตให้ใช้ Live Key ใช้ Test Key เท่านั้น',
    ja: 'ライブキーは使用できません。テストキーのみ使用してください。'
  },
} as const;

// Type for UI string keys
export type UIStringKey = keyof typeof uiStrings;

// Get UI string
export function getUIString(key: UIStringKey, locale: Locale = 'en'): string {
  return t(uiStrings[key], locale);
}
