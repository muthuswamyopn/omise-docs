import Link from 'next/link';

export default function Header() {
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
        href="https://www.omise.co/support"
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
