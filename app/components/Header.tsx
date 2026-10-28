'use client';

import Link from 'next/link';
import { useState } from 'react';

const apiVersions = [
  '2019-05-29',
  '2017-11-02',
  '2015-11-17',
  '2014-07-27',
];

export default function Header() {
  const [selectedVersion, setSelectedVersion] = useState('2019-05-29');
  const [isVersionOpen, setIsVersionOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '24px',
      padding: '12px 24px',
      background: '#fff',
      borderBottom: '1px solid #e3e8ee',
    }}>
      {/* API Version Selector */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsVersionOpen(!isVersionOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#f6f9fc',
            border: '1px solid #e3e8ee',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#3c4257',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: '#697386' }}>API</span>
          <span style={{ fontWeight: 500 }}>{selectedVersion}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>

        {isVersionOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '4px',
            background: '#fff',
            border: '1px solid #e3e8ee',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            minWidth: '140px',
          }}>
            {apiVersions.map((version) => (
              <button
                key={version}
                onClick={() => {
                  setSelectedVersion(version);
                  setIsVersionOpen(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 14px',
                  background: version === selectedVersion ? '#f6f9fc' : '#fff',
                  border: 'none',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: '13px',
                  color: version === selectedVersion ? '#1A1F71' : '#3c4257',
                  fontWeight: version === selectedVersion ? 600 : 400,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                {version}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status */}
      <a
        href="https://status.omise.co"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: '#697386',
          textDecoration: 'none',
        }}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#10b981',
        }} />
        Status
      </a>

      {/* Contact */}
      <a
        href="https://www.omise.co/contact"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '13px',
          color: '#697386',
          textDecoration: 'none',
        }}
      >
        Contact us
      </a>

      {/* Sign In */}
      <a
        href="https://dashboard.omise.co"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          background: '#1A1F71',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 500,
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Sign in
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </header>
  );
}
