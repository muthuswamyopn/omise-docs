'use client';

import { CalloutType, LocalizedContent, t, Locale } from '../lib/types';

interface InfoCalloutProps {
  type: CalloutType;
  title?: LocalizedContent | string;
  children: React.ReactNode;
  locale?: Locale;
}

const calloutConfig: Record<CalloutType, {
  bg: string;
  border: string;
  titleColor: string;
  icon: React.ReactNode;
}> = {
  tip: {
    bg: '#f0fdf4',
    border: '#bbf7d0',
    titleColor: '#166534',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
        <path d="M9 21h6"/>
        <path d="M10 21v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1"/>
      </svg>
    ),
  },
  warning: {
    bg: '#fefce8',
    border: '#fde68a',
    titleColor: '#92400e',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  info: {
    bg: '#eff6ff',
    border: '#bfdbfe',
    titleColor: '#1e40af',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
  },
  danger: {
    bg: '#fef2f2',
    border: '#fecaca',
    titleColor: '#991b1b',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#991b1b" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
  },
};

export default function InfoCallout({ type, title, children, locale = 'en' }: InfoCalloutProps) {
  const config = calloutConfig[type];
  const titleText = title ? (typeof title === 'string' ? title : t(title, locale)) : null;

  return (
    <div
      style={{
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: '8px',
        padding: '16px 20px',
        marginBottom: '16px',
      }}
    >
      {titleText && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            color: config.titleColor,
            marginBottom: '8px',
          }}
        >
          {config.icon}
          {titleText}
        </div>
      )}
      <div
        style={{
          fontSize: '14px',
          color: '#3c4257',
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
}
