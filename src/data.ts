import { LinkItem } from './types';

export const LINKS_DATA: LinkItem[] = [
  // Portfolio Group (1 link)
  {
    id: 'behance',
    title: 'Behance Portfolio',
    subtitle: 'Brand identity systems, typography & visual case studies',
    url: 'https://behance.net/abdubranddesigner',
    category: 'Portfolio',
    icon: 'behance',
    badge: 'Featured',
    isExternal: true,
  },

  // Shop Group (1 link)
  {
    id: 'yebuna-shop',
    title: 'Yebuna shop',
    subtitle: 'Digital assets and creative assets',
    url: 'https://ye-buna.com/abdubranddesigner',
    category: 'Shop',
    icon: 'shop',
    isExternal: true,
  },

  // Social Group (7 links)
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Professional updates, design leadership & network',
    url: 'https://www.linkedin.com/in/abdu-brand-designer/',
    category: 'Social',
    icon: 'linkedin',
    isExternal: true,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: '@abdubranddesigner • Behind the scenes & visual craft',
    url: 'https://instagram.com/abdubranddesigner',
    category: 'Social',
    icon: 'instagram',
    isExternal: true,
  },
  {
    id: 'x',
    title: 'X (Twitter)',
    subtitle: '@abdubranddesign • Design discourse & industry notes',
    url: 'https://x.com/abdubranddesign',
    category: 'Social',
    icon: 'x',
    isExternal: true,
  },
  {
    id: 'youtube',
    title: 'YouTube',
    subtitle: '@abdubranddesigner • Brand walkthroughs & deep dives',
    url: 'https://youtube.com/@abdubranddesigner',
    category: 'Social',
    icon: 'youtube',
    isExternal: true,
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    subtitle: '@abdubranddesigner • Fast-paced design tips & breakdowns',
    url: 'https://tiktok.com/@abdubranddesigner',
    category: 'Social',
    icon: 'tiktok',
    isExternal: true,
  },
  {
    id: 'facebook',
    title: 'Facebook',
    subtitle: 'Community page & official design announcements',
    url: 'https://web.facebook.com/abdubranddesigner',
    category: 'Social',
    icon: 'facebook',
    isExternal: true,
  },
  {
    id: 'telegram',
    title: 'Telegram Channel',
    subtitle: '@abdubranddesigner • Design community & announcements',
    url: 'https://t.me/abdubranddesigner',
    category: 'Social',
    icon: 'telegram',
    isExternal: true,
  },

  // Direct Contact Group (2 links)
  {
    id: 'client-portal',
    title: 'Telegram Contact',
    subtitle: 'Direct support, active projects & inquiries',
    url: 'https://t.me/Abdubranddesigner_Support',
    category: 'Direct Contact',
    icon: 'telegram',
    badge: 'Direct',
    isExternal: true,
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp (Business Inquiries)',
    subtitle: '+251 955 303 950 • Rapid consultation & booking',
    url: 'https://wa.me/251955303950',
    category: 'Direct Contact',
    icon: 'whatsapp',
    badge: 'Fastest',
    isExternal: true,
  },
];

export const CATEGORY_METADATA = {
  Portfolio: {
    title: 'Portfolio & Work',
    label: 'Featured Showcase',
    count: 1,
  },
  Shop: {
    title: 'Shop',
    label: 'Yebuna shop',
    count: 1,
  },
  Social: {
    title: 'Social & Media',
    label: 'Channels & Community',
    count: 7,
  },
  'Direct Contact': {
    title: 'Direct Contact',
    label: 'Client Portal & Inquiries',
    count: 2,
  },
};
