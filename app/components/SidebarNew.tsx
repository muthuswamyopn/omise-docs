'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, isPathActive, NavigationSection, NavigationItem } from '../lib/navigation';
import { t, Locale, LocalizedContent, HTTPMethod, methodColors } from '../lib/types';
import SearchDialog from './SearchDialog';

interface SidebarProps {
  locale?: Locale;
}

// Icons for each section
const sectionIcons: Record<string, React.ReactNode> = {
  'getting-started': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  'accept-payments': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  ),
  'manage-money': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
    </svg>
  ),
  'security': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  'integrations': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v6.5l3-1.5"/>
      <path d="m12 2 3 6.5"/>
      <path d="M12 2v6.5l-3-1.5"/>
      <path d="m12 2-3 6.5"/>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 22v-6.5l3 1.5"/>
      <path d="m12 22-3-6.5"/>
      <path d="M12 22v-6.5l-3 1.5"/>
      <path d="m12 22 3-6.5"/>
    </svg>
  ),
  'api-reference': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'support': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

function NavItem({
  item,
  currentPath,
  locale,
  depth = 0,
}: {
  item: NavigationItem;
  currentPath: string;
  locale: Locale;
  depth?: number;
}) {
  const isActive = currentPath === item.href;
  const isParentActive = item.items && item.items.some(child =>
    isPathActive(currentPath, child.href) ||
    (child.items && child.items.some(grandchild => isPathActive(currentPath, grandchild.href)))
  );
  const [isOpen, setIsOpen] = useState(isActive || isParentActive);

  useEffect(() => {
    if (isActive || isParentActive) {
      setIsOpen(true);
    }
  }, [isActive, isParentActive]);

  const hasChildren = item.items && item.items.length > 0;
  const paddingLeft = 12 + depth * 12;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          href={item.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
            padding: `8px 12px 8px ${paddingLeft}px`,
            color: isActive ? '#1A1F71' : '#3c4257',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: isActive ? 500 : 400,
            backgroundColor: isActive ? '#f6f9fc' : 'transparent',
            borderRadius: '6px',
            margin: '0 8px',
          }}
        >
          {item.method && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 4px',
                borderRadius: '3px',
                backgroundColor: methodColors[item.method].bg,
                color: methodColors[item.method].color,
              }}
            >
              {item.method}
            </span>
          )}
          <span style={{ flex: 1 }}>{t(item.name, locale)}</span>
          {item.testOnly && (
            <span style={{
              fontSize: '9px',
              fontWeight: 600,
              padding: '2px 4px',
              borderRadius: '3px',
              backgroundColor: '#fef3c7',
              color: '#92400e',
            }}>
              TEST
            </span>
          )}
          {item.status === 'coming_soon' && (
            <span style={{
              fontSize: '9px',
              fontWeight: 600,
              padding: '2px 4px',
              borderRadius: '3px',
              backgroundColor: '#e0e7ff',
              color: '#4338ca',
            }}>
              SOON
            </span>
          )}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              color: '#8792a2',
              marginRight: '8px',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            >
              <path d="M4 2l4 4-4 4" />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div>
          {item.items!.map((child) => (
            <NavItem
              key={child.href}
              item={child}
              currentPath={currentPath}
              locale={locale}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NavSection({
  section,
  currentPath,
  locale,
}: {
  section: NavigationSection;
  currentPath: string;
  locale: Locale;
}) {
  const isActive = section.href && isPathActive(currentPath, section.href);
  const hasActiveChild = section.items.some(item =>
    isPathActive(currentPath, item.href) ||
    (item.items && item.items.some(child => isPathActive(currentPath, child.href)))
  );
  const [isOpen, setIsOpen] = useState(isActive || hasActiveChild);

  useEffect(() => {
    if (isActive || hasActiveChild) {
      setIsOpen(true);
    }
  }, [isActive, hasActiveChild]);

  return (
    <div style={{ marginBottom: '8px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: '10px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          color: isActive || hasActiveChild ? '#1A1F71' : '#1a1a1a',
          textAlign: 'left',
        }}
      >
        <span style={{ color: isActive || hasActiveChild ? '#1A1F71' : '#8792a2' }}>
          {sectionIcons[section.id]}
        </span>
        <span style={{ flex: 1 }}>{t(section.title, locale)}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            color: '#8792a2',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>
      {isOpen && (
        <div style={{ marginTop: '4px' }}>
          {section.items.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              currentPath={currentPath}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SidebarNew({ locale = 'en' }: SidebarProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>
          Omise Docs
        </Link>
      </div>

      {/* Search Button */}
      <div style={{ padding: '0 16px', marginBottom: '16px' }}>
        <button
          onClick={() => setIsSearchOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '10px 12px',
            background: '#f6f9fc',
            border: '1px solid #e3e8ee',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#697386',
            fontSize: '14px',
            textAlign: 'left',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ flex: 1 }}>Search docs...</span>
          <kbd style={{
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: 500,
            background: '#fff',
            border: '1px solid #e3e8ee',
            borderRadius: '4px',
            color: '#8792a2',
          }}>
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Language Switcher - placeholder for now */}
      <div style={{
        padding: '8px 20px',
        marginBottom: '16px',
        display: 'flex',
        gap: '4px',
      }}>
        {['EN', 'TH', 'JP'].map((lang) => (
          <button
            key={lang}
            disabled={lang !== 'EN'}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: 600,
              border: '1px solid #e3e8ee',
              borderRadius: '4px',
              background: lang === 'EN' ? '#1A1F71' : '#fff',
              color: lang === 'EN' ? '#fff' : '#8792a2',
              cursor: lang === 'EN' ? 'default' : 'not-allowed',
              opacity: lang === 'EN' ? 1 : 0.5,
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      <nav>
        {navigation.map((section) => (
          <NavSection
            key={section.id}
            section={section}
            currentPath={pathname}
            locale={locale}
          />
        ))}
      </nav>

      {/* Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </aside>
  );
}
