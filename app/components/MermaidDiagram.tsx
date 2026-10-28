'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
}

// Initialize mermaid with custom theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#E8F4F8',
    primaryTextColor: '#1f2937',
    primaryBorderColor: '#1A1F71',
    lineColor: '#1A1F71',
    secondaryColor: '#D1FAE5',
    tertiaryColor: '#fef3c7',
    noteBkgColor: '#f6f9fc',
    noteTextColor: '#3c4257',
    actorBkg: '#f6f9fc',
    actorBorder: '#1A1F71',
    actorTextColor: '#1f2937',
    actorLineColor: '#d1d5db',
    signalColor: '#1A1F71',
    signalTextColor: '#3c4257',
    messageLine0TextColor: '#3c4257',
    messageLine1TextColor: '#3c4257',
  },
  sequence: {
    actorMargin: 80,
    diagramMarginX: 30,
    diagramMarginY: 20,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: false,
    useMaxWidth: true,
  },
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
});

export default function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      try {
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div style={{ marginBottom: '24px' }}>
      {title && (
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#697386',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          {title}
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          background: '#fff',
          border: '1px solid #e3e8ee',
          borderRadius: '12px',
          padding: '24px',
          overflow: 'auto',
        }}
      >
        {error ? (
          <div style={{ color: '#dc2626', fontSize: '14px' }}>{error}</div>
        ) : svg ? (
          <div
            dangerouslySetInnerHTML={{ __html: svg }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: 'fit-content',
            }}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            color: '#697386',
            fontSize: '14px',
          }}>
            Loading diagram...
          </div>
        )}
      </div>
    </div>
  );
}
