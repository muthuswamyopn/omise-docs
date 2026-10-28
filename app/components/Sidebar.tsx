'use client';

import { useState } from 'react';
import Link from 'next/link';

const navigation = [
  {
    title: 'Charges',
    href: '/charges',
    items: [
      { name: 'Overview', href: '/charges' },
      { name: 'Create a charge', href: '/charges/create', method: 'POST' },
      { name: 'Retrieve a charge', href: '/charges/retrieve', method: 'GET' },
      { name: 'List all charges', href: '/charges/list', method: 'GET' },
      { name: 'Update a charge', href: '/charges/update', method: 'PATCH' },
      { name: 'Capture a charge', href: '/charges/capture', method: 'POST' },
      { name: 'Reverse a charge', href: '/charges/reverse', method: 'POST' },
      { name: 'Expire a charge', href: '/charges/expire', method: 'POST' },
      { name: 'Mark as paid', href: '/charges/mark-as-paid', method: 'POST', testOnly: true },
      { name: 'Mark as failed', href: '/charges/mark-as-failed', method: 'POST', testOnly: true },
      { name: 'Error Codes', href: '/charges/errors' },
    ]
  },
  {
    title: 'Refunds',
    href: '/refunds',
    items: [
      { name: 'Overview', href: '/refunds' },
      { name: 'Create a refund', href: '/refunds#create' },
      { name: 'Retrieve a refund', href: '/refunds#retrieve' },
      { name: 'List all refunds', href: '/refunds#list' },
    ]
  },
  {
    title: 'Customers',
    href: '/customers',
    items: [
      { name: 'Overview', href: '/customers' },
      { name: 'Create a customer', href: '/customers#create' },
      { name: 'Retrieve a customer', href: '/customers#retrieve' },
      { name: 'Update a customer', href: '/customers#update' },
      { name: 'Delete a customer', href: '/customers#delete' },
      { name: 'List all customers', href: '/customers#list' },
    ]
  },
  {
    title: 'Sources',
    href: '/sources',
    items: [
      { name: 'Overview', href: '/sources' },
      { name: 'Create a source', href: '/sources#create' },
      { name: 'Retrieve a source', href: '/sources#retrieve' },
    ]
  },
];

const methodColors: Record<string, { bg: string; color: string }> = {
  GET: { bg: '#d6ecff', color: '#0055bc' },
  POST: { bg: '#cbf4c9', color: '#0e6245' },
  PATCH: { bg: '#fcefc7', color: '#9c6f19' },
  DELETE: { bg: '#fde2dd', color: '#cd3d64' },
};

interface SidebarProps {
  currentPage?: string;
}

export default function Sidebar({ currentPage }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = { 'Getting Started': true };
    navigation.forEach(section => {
      // Auto-expand sections that contain the current page
      if (section.items.some(item => currentPage && item.href.includes(currentPage))) {
        initial[section.title] = true;
      }
      // Also expand Charges by default
      if (section.title === 'Charges') {
        initial[section.title] = true;
      }
    });
    return initial;
  });

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-logo" style={{ textDecoration: 'none', display: 'block' }}>
        Omise API
      </Link>
      {navigation.map((section) => (
        <div key={section.title} className="sidebar-section">
          <div
            className="sidebar-title"
            onClick={() => toggleSection(section.title)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
            }}
          >
            {section.title}
            <span style={{
              fontSize: '10px',
              transition: 'transform 0.2s',
              transform: expandedSections[section.title] ? 'rotate(90deg)' : 'rotate(0deg)',
            }}>
              &#9654;
            </span>
          </div>
          {expandedSections[section.title] && section.items.map((item) => {
            const isActive = currentPage && (
              item.href === `/${currentPage}` ||
              item.href.startsWith(`/${currentPage}`)
            );
            const method = 'method' in item ? item.method as string : null;
            const methodStyle = method ? methodColors[method] : null;
            const testOnly = 'testOnly' in item ? item.testOnly : false;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {methodStyle && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '2px 4px',
                    borderRadius: '3px',
                    background: methodStyle.bg,
                    color: methodStyle.color,
                    fontFamily: "'SF Mono', Monaco, monospace",
                  }}>
                    {method}
                  </span>
                )}
                <span>{item.name}</span>
                {testOnly && (
                  <span style={{
                    fontSize: '8px',
                    fontWeight: 700,
                    padding: '2px 4px',
                    borderRadius: '3px',
                    background: '#fef3c7',
                    color: '#92400e',
                    marginLeft: 'auto',
                  }}>
                    TEST
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
