import { ReactNode } from 'react';

type NoticeType = 'note' | 'warning' | 'error' | 'success';

interface NoticeProps {
  type?: NoticeType;
  title?: string;
  children: ReactNode;
}

const noticeStyles: Record<NoticeType, { borderColor: string; titleColor: string }> = {
  note: {
    borderColor: '#1A1F71',
    titleColor: '#1A1F71',
  },
  warning: {
    borderColor: '#f59e0b',
    titleColor: '#92400e',
  },
  error: {
    borderColor: '#dc2626',
    titleColor: '#991b1b',
  },
  success: {
    borderColor: '#0e6245',
    titleColor: '#0e6245',
  },
};

export default function Notice({ type = 'note', title, children }: NoticeProps) {
  const style = noticeStyles[type];

  const defaultTitles: Record<NoticeType, string> = {
    note: 'Note',
    warning: 'Warning',
    error: 'Important',
    success: 'Success',
  };

  const displayTitle = title ?? defaultTitles[type];

  return (
    <div
      style={{
        padding: '16px 20px',
        background: '#fff',
        border: '1px solid #e3e8ee',
        borderLeft: `4px solid ${style.borderColor}`,
        borderRadius: '8px',
        marginBottom: '24px',
      }}
    >
      <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
        <strong style={{ color: style.titleColor }}>{displayTitle}:</strong>{' '}
        {children}
      </p>
    </div>
  );
}
