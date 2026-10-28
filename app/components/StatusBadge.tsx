'use client';

import { PaymentStatus, LocalizedContent, t, Locale } from '../lib/types';

interface StatusBadgeProps {
  status: PaymentStatus | 'test_only';
  locale?: Locale;
  size?: 'sm' | 'md';
}

const statusConfig: Record<PaymentStatus | 'test_only', {
  label: LocalizedContent;
  bg: string;
  color: string;
  border: string;
}> = {
  available: {
    label: { en: 'Available', th: 'พร้อมใช้งาน', ja: '利用可能' },
    bg: '#dcfce7',
    color: '#166534',
    border: '#bbf7d0',
  },
  coming_soon: {
    label: { en: 'Coming Soon', th: 'เร็วๆ นี้', ja: '近日公開' },
    bg: '#e0e7ff',
    color: '#4338ca',
    border: '#c7d2fe',
  },
  deprecated: {
    label: { en: 'Deprecated', th: 'เลิกใช้แล้ว', ja: '非推奨' },
    bg: '#fee2e2',
    color: '#991b1b',
    border: '#fecaca',
  },
  test_only: {
    label: { en: 'Test Mode Only', th: 'โหมดทดสอบเท่านั้น', ja: 'テストモードのみ' },
    bg: '#fef3c7',
    color: '#92400e',
    border: '#fde68a',
  },
};

export default function StatusBadge({ status, locale = 'en', size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];

  const styles = {
    sm: {
      fontSize: '10px',
      padding: '2px 6px',
    },
    md: {
      fontSize: '12px',
      padding: '4px 10px',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 600,
        borderRadius: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        backgroundColor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        ...styles[size],
      }}
    >
      {t(config.label, locale)}
    </span>
  );
}
