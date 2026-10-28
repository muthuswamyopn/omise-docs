'use client';

import Link from 'next/link';
import SidebarNew from './SidebarNew';
import Breadcrumb from './Breadcrumb';
import InfoCallout from './InfoCallout';
import { LocalizedContent, t, Locale, CalloutType } from '../lib/types';
import { getBreadcrumbs } from '../lib/navigation';

interface CodeExample {
  language: string;
  label: string;
  code: string;
}

interface GuideSection {
  id: string;
  title: LocalizedContent;
  content: LocalizedContent;
  codeExamples?: CodeExample[];
  callout?: {
    type: CalloutType;
    title?: LocalizedContent;
    content: LocalizedContent;
  };
  mermaid?: string;
}

interface RelatedPage {
  title: LocalizedContent;
  href: string;
  description?: LocalizedContent;
}

interface GuidePageProps {
  title: LocalizedContent;
  subtitle: LocalizedContent;
  sections: GuideSection[];
  relatedPages?: RelatedPage[];
  locale?: Locale;
  currentPath: string;
}

function MermaidDiagram({ chart }: { chart: string }) {
  return (
    <div
      className="mermaid-container"
      style={{
        background: '#f6f9fc',
        border: '1px solid #e3e8ee',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        overflow: 'auto',
      }}
    >
      <pre
        className="mermaid"
        style={{
          margin: 0,
          fontSize: '14px',
          fontFamily: "'SF Mono', Monaco, monospace",
        }}
      >
        {chart}
      </pre>
    </div>
  );
}

function CodeBlock({ examples, locale }: { examples: CodeExample[]; locale: Locale }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '0' }}>
        {examples.map((ex, i) => (
          <div
            key={i}
            style={{
              padding: '8px 16px',
              background: i === 0 ? '#1a2332' : '#1a3a5c',
              color: i === 0 ? '#fff' : '#b8c7d9',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
            }}
          >
            {ex.label}
          </div>
        ))}
      </div>
      <div
        style={{
          background: '#1a2332',
          borderRadius: '0 8px 8px 8px',
          overflow: 'hidden',
        }}
      >
        <pre
          style={{
            padding: '20px',
            margin: 0,
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#e6ebf1',
            overflow: 'auto',
            fontFamily: "'SF Mono', Monaco, monospace",
          }}
        >
          {examples[0].code}
        </pre>
      </div>
    </div>
  );
}

export default function GuidePage({
  title,
  subtitle,
  sections,
  relatedPages,
  locale = 'en',
  currentPath,
}: GuidePageProps) {
  const breadcrumbs = getBreadcrumbs(currentPath);

  return (
    <div className="docs-layout">
      <SidebarNew locale={locale} />

      <main className="content">
        <Breadcrumb items={breadcrumbs} locale={locale} />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          {t(title, locale)}
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          {t(subtitle, locale)}
        </p>

        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '16px',
                paddingTop: '24px',
                borderTop: '1px solid #e3e8ee',
              }}
            >
              {t(section.title, locale)}
            </h2>

            <div
              style={{
                fontSize: '15px',
                color: '#3c4257',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
              dangerouslySetInnerHTML={{ __html: t(section.content, locale) }}
            />

            {section.callout && (
              <InfoCallout type={section.callout.type} title={section.callout.title} locale={locale}>
                <span dangerouslySetInnerHTML={{ __html: t(section.callout.content, locale) }} />
              </InfoCallout>
            )}

            {section.mermaid && <MermaidDiagram chart={section.mermaid} />}

            {section.codeExamples && section.codeExamples.length > 0 && (
              <CodeBlock examples={section.codeExamples} locale={locale} />
            )}
          </section>
        ))}

        {relatedPages && relatedPages.length > 0 && (
          <div
            style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid #e3e8ee',
            }}
          >
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#697386',
                marginBottom: '16px',
              }}
            >
              {locale === 'th' ? 'หน้าที่เกี่ยวข้อง' : locale === 'ja' ? '関連ページ' : 'Related Pages'}
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {relatedPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    background: '#f6f9fc',
                    border: '1px solid #e3e8ee',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ fontWeight: 500, color: '#1A1F71', marginBottom: '4px' }}>
                    {t(page.title, locale)}
                  </div>
                  {page.description && (
                    <div style={{ fontSize: '14px', color: '#697386' }}>
                      {t(page.description, locale)}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Right Panel - Table of Contents */}
      <aside className="code-panel" style={{ background: '#f6f9fc', borderLeft: '1px solid #e3e8ee' }}>
        <div style={{ padding: '24px', position: 'sticky', top: '24px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#697386',
              marginBottom: '16px',
            }}
          >
            {locale === 'th' ? 'สารบัญ' : locale === 'ja' ? '目次' : 'On this page'}
          </div>
          <nav>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                style={{
                  display: 'block',
                  padding: '8px 0',
                  color: '#3c4257',
                  textDecoration: 'none',
                  fontSize: '14px',
                  borderLeft: '2px solid transparent',
                  paddingLeft: '12px',
                  marginLeft: '-12px',
                }}
              >
                {t(section.title, locale)}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
