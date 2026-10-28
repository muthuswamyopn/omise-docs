'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse, { FuseResult } from 'fuse.js';
import { searchIndex, SearchItem } from '../lib/searchIndex';
import { methodColors, HTTPMethod } from '../lib/types';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Type icons by category
const typeIcons: Record<SearchItem['type'], React.ReactNode> = {
  guide: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  api: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  payment: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  faq: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

// Initialize Fuse.js
const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'breadcrumb', weight: 1 },
    { name: 'keywords', weight: 0.5 },
  ],
  threshold: 0.3,
  includeMatches: true,
  minMatchCharLength: 2,
});

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchItem>[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Search handler
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length >= 2) {
      const searchResults = fuse.search(searchQuery).slice(0, 8);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, []);

  // Navigate to selected result
  const navigateToResult = useCallback((item: SearchItem) => {
    router.push(item.href);
    onClose();
  }, [router, onClose]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          navigateToResult(results[selectedIndex].item);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  }, [results, selectedIndex, navigateToResult, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      {/* Dialog */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          margin: '0 16px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #e3e8ee',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#697386"
            strokeWidth="2"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            style={{
              flex: 1,
              marginLeft: '12px',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#1a1a1a',
              background: 'transparent',
            }}
          />
          <button
            onClick={onClose}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#697386',
              background: '#f6f9fc',
              border: '1px solid #e3e8ee',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {results.map((result, index) => (
              <div
                key={result.item.id}
                onClick={() => navigateToResult(result.item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  backgroundColor: index === selectedIndex ? '#f6f9fc' : 'transparent',
                  borderBottom: '1px solid #f0f0f0',
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {/* Type Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: '#f6f9fc',
                    color: '#697386',
                    flexShrink: 0,
                  }}
                >
                  {typeIcons[result.item.type as keyof typeof typeIcons]}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Method Badge */}
                    {result.item.method && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 4px',
                          borderRadius: '3px',
                          backgroundColor: methodColors[result.item.method as HTTPMethod].bg,
                          color: methodColors[result.item.method as HTTPMethod].color,
                        }}
                      >
                        {result.item.method}
                      </span>
                    )}
                    {/* Title */}
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#1a1a1a',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {result.item.title}
                    </span>
                  </div>
                  {/* Breadcrumb */}
                  {result.item.breadcrumb && (
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#697386',
                        marginTop: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {result.item.breadcrumb}
                    </div>
                  )}
                </div>

                {/* Enter hint */}
                {index === selectedIndex && (
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#697386',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 10 4 15 9 20" />
                      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query.length >= 2 && results.length === 0 && (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: '#697386',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ margin: '0 auto 16px' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>No results found</div>
            <div style={{ fontSize: '13px', marginTop: '4px' }}>
              Try searching for something else
            </div>
          </div>
        )}

        {/* Initial state */}
        {query.length < 2 && (
          <div
            style={{
              padding: '24px 20px',
              color: '#697386',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Links
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {[
                { title: 'Quick Start', href: '/getting-started/quick-start', type: 'guide' as const },
                { title: 'API Reference', href: '/api-reference', type: 'api' as const },
                { title: 'PromptPay', href: '/accept-payments/bank-transfers/promptpay', type: 'payment' as const },
                { title: 'Webhooks', href: '/integrations/advanced/webhooks', type: 'guide' as const },
              ].map((item) => (
                <div
                  key={item.href}
                  onClick={() => { router.push(item.href); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backgroundColor: '#f6f9fc',
                  }}
                >
                  <span style={{ color: '#697386' }}>{typeIcons[item.type]}</span>
                  <span style={{ fontSize: '14px', color: '#1a1a1a' }}>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            borderTop: '1px solid #e3e8ee',
            backgroundColor: '#f6f9fc',
            fontSize: '12px',
            color: '#697386',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ padding: '2px 6px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '11px' }}>↑</kbd>
              <kbd style={{ padding: '2px 6px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '11px' }}>↓</kbd>
              <span style={{ marginLeft: '4px' }}>Navigate</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ padding: '2px 6px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '11px' }}>Enter</kbd>
              <span style={{ marginLeft: '4px' }}>Select</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ padding: '2px 6px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '4px', fontSize: '11px' }}>Esc</kbd>
              <span style={{ marginLeft: '4px' }}>Close</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Search by</span>
            <span style={{ fontWeight: 600, color: '#1A1F71' }}>Fuse.js</span>
          </div>
        </div>
      </div>
    </div>
  );
}
