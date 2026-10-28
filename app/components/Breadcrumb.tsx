'use client';

import Link from 'next/link';
import { LocalizedContent, t, Locale } from '../lib/types';

interface BreadcrumbItem {
  label: LocalizedContent | string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale?: Locale;
}

export default function Breadcrumb({ items, locale = 'en' }: BreadcrumbProps) {
  return (
    <nav style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
      {items.map((item, index) => {
        const label = typeof item.label === 'string' ? item.label : t(item.label, locale);
        const isLast = index === items.length - 1;

        return (
          <span key={index}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                style={{ color: '#1A1F71', textDecoration: 'none' }}
              >
                {label}
              </Link>
            ) : (
              <span style={{ color: isLast ? '#1a1a1a' : '#697386' }}>
                {label}
              </span>
            )}
            {!isLast && <span style={{ margin: '0 8px' }}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
