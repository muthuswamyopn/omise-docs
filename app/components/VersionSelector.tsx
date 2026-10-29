'use client';

import { useState, useEffect } from 'react';
import { API_VERSIONS, DEFAULT_VERSION, ApiVersion } from '../lib/apiVersions';

interface VersionSelectorProps {
  currentVersion: string;
  onVersionChange: (codename: string) => void;
}

export default function VersionSelector({ currentVersion, onVersionChange }: VersionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const current = API_VERSIONS.find(v => v.codename === currentVersion) || API_VERSIONS[0];

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        API Version
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '280px',
          padding: '10px 14px',
          background: '#fff',
          border: '2px solid #e3e8ee',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#1a1a1a',
          fontWeight: 500,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            background: current.isLatest ? '#cbf4c9' : '#f6f9fc',
            color: current.isLatest ? '#0e6245' : '#697386',
          }}>
            {current.codename}
          </span>
          <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '13px', color: '#3c4257' }}>
            {current.date}
          </span>
          {current.isLatest && (
            <span style={{
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '9px',
              fontWeight: 700,
              background: '#1A1F71',
              color: '#fff',
            }}>
              LATEST
            </span>
          )}
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            color: '#697386',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '4px',
          width: '100%',
          maxWidth: '280px',
          background: '#fff',
          border: '1px solid #e3e8ee',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 100,
          overflow: 'hidden',
        }}>
          {API_VERSIONS.map((version) => (
            <button
              key={version.codename}
              onClick={() => {
                onVersionChange(version.codename);
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 14px',
                background: version.codename === currentVersion ? '#f6f9fc' : '#fff',
                border: 'none',
                borderBottom: '1px solid #e3e8ee',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: version.isLatest ? '#cbf4c9' : '#f6f9fc',
                  color: version.isLatest ? '#0e6245' : '#697386',
                }}>
                  {version.codename}
                </span>
                <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '13px', color: '#3c4257' }}>
                  {version.date}
                </span>
              </div>
              {version.isLatest && (
                <span style={{
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '9px',
                  fontWeight: 700,
                  background: '#1A1F71',
                  color: '#fff',
                }}>
                  LATEST
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Version info tooltip */}
      <div style={{
        marginTop: '12px',
        padding: '12px 16px',
        background: '#f6f9fc',
        borderRadius: '6px',
        fontSize: '13px',
        color: '#697386',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: '#1a1a1a' }}>Version: {current.codename}</strong>
        <br />
        Use the <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '3px', fontSize: '12px' }}>Omise-Version</code> header
        or set your account default to use this API version.
      </div>
    </div>
  );
}

// Badge component for showing when a field was added
export function VersionBadge({ addedIn, small = false }: { addedIn: string; small?: boolean }) {
  const versionColors: Record<string, { bg: string; color: string }> = {
    aegaeon: { bg: '#fde2dd', color: '#cd3d64' },
    bestla: { bg: '#fef3c7', color: '#92400e' },
    cordelia: { bg: '#e0f2fe', color: '#0369a1' },
    deimos: { bg: '#cbf4c9', color: '#0e6245' },
  };

  const colors = versionColors[addedIn] || { bg: '#f6f9fc', color: '#697386' };

  return (
    <span style={{
      padding: small ? '1px 4px' : '2px 6px',
      borderRadius: '3px',
      fontSize: small ? '9px' : '10px',
      fontWeight: 700,
      textTransform: 'uppercase',
      background: colors.bg,
      color: colors.color,
      marginLeft: '6px',
    }}>
      {addedIn}
    </span>
  );
}

// Component to show version differences
export function VersionDiff({ currentVersion }: { currentVersion: string }) {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const currentIndex = versionOrder.indexOf(currentVersion);
  const latestIndex = versionOrder.indexOf('deimos');

  if (currentIndex === latestIndex) {
    return null;
  }

  const newerVersions = versionOrder.slice(currentIndex + 1);

  return (
    <div style={{
      padding: '16px 20px',
      background: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '8px',
      marginBottom: '24px',
    }}>
      <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
        <strong style={{ color: '#92400e' }}>Viewing older API version</strong>
        <br />
        You are viewing <strong>{currentVersion}</strong>. Newer versions ({newerVersions.join(', ')}) have additional features.
        <br />
        <a href="#" style={{ color: '#1A1F71', fontWeight: 600 }}>See what's new in the latest version</a>
      </div>
    </div>
  );
}
