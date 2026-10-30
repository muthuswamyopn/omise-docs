'use client';

import React from 'react';

// Map of terms to their external documentation URLs
const EXTERNAL_LINKS: Record<string, string> = {
  'ISO 4217': 'https://en.wikipedia.org/wiki/ISO_4217',
  'ISO 3166': 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2',
};

interface LinkifiedTextProps {
  children: string;
  className?: string;
}

/**
 * Component that auto-links known terms (like ISO standards) in text.
 * All links open in a new tab with proper security attributes.
 */
export default function LinkifiedText({ children, className }: LinkifiedTextProps) {
  if (!children || typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  // Build a regex pattern from all the terms we want to linkify
  const terms = Object.keys(EXTERNAL_LINKS);
  const pattern = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

  const parts = children.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const url = EXTERNAL_LINKS[part];
        if (url) {
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1A1F71', textDecoration: 'underline' }}
            >
              {part}
            </a>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
