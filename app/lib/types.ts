// Shared types for Omise Documentation Site

// ============================================
// Internationalization
// ============================================

export type Locale = 'en' | 'th' | 'ja';

export interface LocalizedContent {
  en: string;
  th?: string;
  ja?: string;
}

// Helper to get localized content with fallback
export function t(content: LocalizedContent, locale: Locale = 'en'): string {
  return content[locale] || content.en;
}

// ============================================
// Regions
// ============================================

export type Region = 'TH' | 'SG' | 'MY' | 'JP';

export interface RegionConfig {
  code: Region;
  name: LocalizedContent;
  fullName: LocalizedContent;
  currency: string;
  flag: string;
}

// ============================================
// Payment Methods
// ============================================

export type PaymentStatus = 'available' | 'coming_soon' | 'deprecated';
export type PaymentFlow = 'redirect' | 'qr' | 'direct' | 'offline' | 'app_redirect';
export type PaymentCategory =
  | 'cards'
  | 'bank_transfers'
  | 'e_wallets'
  | 'alipay_wechat'
  | 'installments'
  | 'convenience_store'
  | 'mobile_banking';

export interface PaymentMethodRegion {
  country: Region;
  status: PaymentStatus;
  currencies: string[];
  minAmount?: number;
  maxAmount?: number;
  refundWindow?: string;
}

export interface PaymentMethod {
  id: string;
  name: LocalizedContent;
  sourceType: string;
  category: PaymentCategory;
  description: LocalizedContent;
  regions: PaymentMethodRegion[];
  flow: PaymentFlow;
  refundSupported: boolean;
  partialRefund: boolean;
  webhookEvents: string[];
  testCredentials?: {
    field: string;
    value: string;
    description: LocalizedContent;
  }[];
}

// ============================================
// API Reference
// ============================================

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export interface EndpointParam {
  name: string;
  type: string;
  required: boolean | 'conditional';
  desc: LocalizedContent;
  default?: string;
  options?: string[];
  inPath?: boolean;
}

export interface EndpointConfig {
  method: HTTPMethod;
  path: string;
  title: LocalizedContent;
  description: LocalizedContent;
  longDescription?: LocalizedContent;
  params: EndpointParam[];
  testModeOnly?: boolean;
}

export interface ResourceConfig {
  name: LocalizedContent;
  description: LocalizedContent;
  objectExample?: object;
  endpoints: Record<string, EndpointConfig>;
}

// ============================================
// Navigation
// ============================================

export interface NavigationItem {
  name: LocalizedContent;
  href: string;
  method?: HTTPMethod;
  testOnly?: boolean;
  status?: PaymentStatus;
  items?: NavigationItem[];
}

export interface NavigationSection {
  id: string;
  title: LocalizedContent;
  icon?: string;
  href?: string;
  items: NavigationItem[];
  badge?: 'new' | 'updated';
}

// ============================================
// Guides & Content
// ============================================

export interface GuideSection {
  id: string;
  title: LocalizedContent;
  content: LocalizedContent;
  codeExamples?: Record<string, string>;
}

export interface GuideConfig {
  title: LocalizedContent;
  subtitle: LocalizedContent;
  sections: GuideSection[];
  relatedPages?: {
    title: LocalizedContent;
    href: string;
  }[];
}

// ============================================
// Integrations
// ============================================

export type IntegrationType = 'client_library' | 'server_library' | 'ecommerce_plugin' | 'advanced';

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  description: LocalizedContent;
  version?: string;
  repoUrl?: string;
  packageUrl?: string;
  installCommand?: string;
  features: LocalizedContent[];
  requirements?: LocalizedContent[];
}

// ============================================
// Code Examples
// ============================================

export type Language = 'curl' | 'ruby' | 'python' | 'node' | 'php' | 'go' | 'java' | 'csharp' | 'elixir';

export interface LanguageConfig {
  id: Language;
  name: string;
  extension: string;
}

export const languages: LanguageConfig[] = [
  { id: 'curl', name: 'cURL', extension: 'sh' },
  { id: 'ruby', name: 'Ruby', extension: 'rb' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'node', name: 'Node.js', extension: 'js' },
  { id: 'php', name: 'PHP', extension: 'php' },
  { id: 'go', name: 'Go', extension: 'go' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'csharp', name: 'C#', extension: 'cs' },
  { id: 'elixir', name: 'Elixir', extension: 'ex' },
];

// ============================================
// UI Components
// ============================================

export type CalloutType = 'tip' | 'warning' | 'info' | 'danger';

export interface BreadcrumbItem {
  label: LocalizedContent;
  href?: string;
}

// ============================================
// Method Colors (for badges)
// ============================================

export const methodColors: Record<HTTPMethod, { bg: string; color: string }> = {
  GET: { bg: '#d6ecff', color: '#0055bc' },
  POST: { bg: '#cbf4c9', color: '#0e6245' },
  PATCH: { bg: '#fcefc7', color: '#9c6f19' },
  DELETE: { bg: '#fde2dd', color: '#cd3d64' },
  PUT: { bg: '#e8defd', color: '#5f25a4' },
};
