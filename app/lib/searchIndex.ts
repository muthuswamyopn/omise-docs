// Search index builder for site-wide search
import { navigation, NavigationSection, NavigationItem } from './navigation';
import { HTTPMethod } from './types';

export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  breadcrumb: string;
  type: 'guide' | 'api' | 'payment' | 'faq';
  method?: HTTPMethod;
  keywords: string[];
}

// Determine page type from path
function getPageType(href: string, sectionId: string): SearchItem['type'] {
  if (sectionId === 'api-reference') return 'api';
  if (sectionId === 'accept-payments') return 'payment';
  if (sectionId === 'support') return 'faq';
  return 'guide';
}

// Extract keywords from path and title
function extractKeywords(title: string, href: string): string[] {
  const keywords: string[] = [];

  // Add path segments as keywords
  const pathParts = href.split('/').filter(Boolean);
  keywords.push(...pathParts);

  // Add title words
  const titleWords = title.toLowerCase().split(/\s+/);
  keywords.push(...titleWords);

  // Add common variations
  if (href.includes('promptpay')) keywords.push('qr', 'thailand', 'th');
  if (href.includes('truemoney')) keywords.push('wallet', 'thailand', 'th');
  if (href.includes('grabpay')) keywords.push('wallet', 'singapore', 'sg', 'malaysia', 'my');
  if (href.includes('charges')) keywords.push('payment', 'transaction');
  if (href.includes('refund')) keywords.push('return', 'money back');
  if (href.includes('webhook')) keywords.push('event', 'notification', 'callback');

  return [...new Set(keywords)];
}

// Recursively flatten navigation items
function flattenItems(
  items: NavigationItem[],
  sectionId: string,
  sectionTitle: string,
  parentBreadcrumb: string[] = []
): SearchItem[] {
  const results: SearchItem[] = [];

  for (const item of items) {
    const title = item.name.en;
    const breadcrumbPath = [...parentBreadcrumb, title];
    const breadcrumb = [sectionTitle, ...parentBreadcrumb].join(' > ');

    results.push({
      id: item.href,
      title,
      href: item.href,
      breadcrumb,
      type: getPageType(item.href, sectionId),
      method: item.method,
      keywords: extractKeywords(title, item.href),
    });

    // Recurse into children
    if (item.items && item.items.length > 0) {
      results.push(...flattenItems(item.items, sectionId, sectionTitle, breadcrumbPath));
    }
  }

  return results;
}

// Build the full search index from navigation
export function buildSearchIndex(): SearchItem[] {
  const index: SearchItem[] = [];

  for (const section of navigation) {
    const sectionTitle = section.title.en;

    // Add section itself if it has an href
    if (section.href) {
      index.push({
        id: section.href,
        title: sectionTitle,
        href: section.href,
        breadcrumb: '',
        type: getPageType(section.href, section.id),
        keywords: extractKeywords(sectionTitle, section.href),
      });
    }

    // Add all items in the section
    index.push(...flattenItems(section.items, section.id, sectionTitle));
  }

  return index;
}

// Pre-built index for use in components
export const searchIndex = buildSearchIndex();
