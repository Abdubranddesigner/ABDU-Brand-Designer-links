export type CategoryType = 'All' | 'Portfolio' | 'Shop' | 'Social' | 'Direct Contact';

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  category: 'Portfolio' | 'Shop' | 'Social' | 'Direct Contact';
  icon: string;
  badge?: string;
  isExternal?: boolean;
}
