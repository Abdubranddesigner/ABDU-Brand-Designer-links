import { useState, useEffect } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { LinkCard } from './components/LinkCard';
import { Toast } from './components/Toast';
import { LINKS_DATA, CATEGORY_METADATA } from './data';
import { CategoryType } from './types';

type DeviceMode = 'auto' | 'iphone' | 'tablet' | 'desktop';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 220);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 2500);
  };

  const handleShareProfile = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Profile link copied to clipboard');
      } else {
        showToast('Copied profile address');
      }
    } catch {
      showToast('Profile link ready');
    }
  };

  const handleCopyLinkUrl = async (url: string, title: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast(`${title} link copied`);
      }
    } catch {
      showToast(`Link copied: ${title}`);
    }
  };

  const categories: Array<'Portfolio' | 'Shop' | 'Social' | 'Direct Contact'> = [
    'Portfolio',
    'Shop',
    'Social',
    'Direct Contact',
  ];

  const filteredCategories =
    selectedCategory === 'All'
      ? categories
      : categories.filter((cat) => cat === selectedCategory);

  // Dynamic container width based on device simulation mode or fluid auto
  const getContainerWidthClass = () => {
    switch (deviceMode) {
      case 'iphone':
        return 'max-w-[390px] border border-white/10 rounded-[32px] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0c0e12] my-4';
      case 'tablet':
        return 'max-w-[768px] border border-white/10 rounded-[24px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#0c0e12] my-4';
      case 'desktop':
        return 'max-w-5xl px-4';
      case 'auto':
      default:
        return 'w-full max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-2 sm:px-0';
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0c0e12] text-[#ffffff] flex flex-col items-center justify-between py-5 sm:py-8 md:py-10 px-3 sm:px-6 md:px-8 relative safe-area-top safe-area-bottom safe-area-left safe-area-right selection:bg-[#f0b90b]/30 selection:text-white overflow-x-hidden">
      {/* Toast Notification Container */}
      <Toast message={toastMessage} />

      {/* Floating Device Mode / Responsive Simulation Bar */}
      <aside aria-label="Responsive View Switcher" className="w-full max-w-5xl mb-4 sm:mb-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#161a22]/80 backdrop-blur-md border border-white/10 text-xs shadow-lg">
          <button
            type="button"
            onClick={() => setShowDeviceSelector(!showDeviceSelector)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[#a3a3a3] hover:text-white transition-colors"
            title="Toggle responsive screen tester"
          >
            <span className="w-2 h-2 rounded-full bg-[#f0b90b] inline-block animate-pulse" />
            <span className="text-[11px] font-medium tracking-tight">Responsive View</span>
            <svg
              className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                showDeviceSelector ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showDeviceSelector && (
            <div className="flex items-center gap-1 pl-1 border-l border-white/10">
              <button
                type="button"
                onClick={() => setDeviceMode('auto')}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  deviceMode === 'auto'
                    ? 'bg-[#1d222c] text-[#f0b90b] border border-[#f0b90b]/20 shadow-sm'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
                title="Fluid auto responsive for current browser/screen"
              >
                Auto (Fluid)
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('iphone')}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  deviceMode === 'iphone'
                    ? 'bg-[#1d222c] text-[#f0b90b] border border-[#f0b90b]/20 shadow-sm'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
                title="iPhone / Phone viewport (390px)"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span>iPhone</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('tablet')}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  deviceMode === 'tablet'
                    ? 'bg-[#1d222c] text-[#f0b90b] border border-[#f0b90b]/20 shadow-sm'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
                title="Tablet / iPad viewport (768px)"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span>Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  deviceMode === 'desktop'
                    ? 'bg-[#1d222c] text-[#f0b90b] border border-[#f0b90b]/20 shadow-sm'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
                title="Desktop widescreen layout"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Desktop</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Semantic Container - Horizontally & Vertically Responsive */}
      <main className={`flex flex-col gap-6 sm:gap-7 md:gap-8 mx-auto transition-all duration-300 ${getContainerWidthClass()}`}>
        {/* Profile Architecture Header */}
        <ProfileHeader onShare={handleShareProfile} />

        {/* Category Filter Pill Bar + Grid/List Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
          {/* Minimal Category Filter Pill Bar (Smooth touch horizontal scroll on narrow mobile, full flex on tablet/desktop) */}
          <nav
            aria-label="Link categories"
            className="flex-1 flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-[#161a22] border border-white/5 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {(['All', 'Portfolio', 'Shop', 'Social', 'Direct Contact'] as CategoryType[]).map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 sm:flex-1 py-1.5 px-3 sm:px-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 tracking-tight text-center whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1d222c] text-[#ffffff] border border-white/10 shadow-sm'
                      : 'text-[#a3a3a3] hover:text-[#ffffff] hover:bg-white/[0.02]'
                  }`}
                >
                  {cat === 'Direct Contact' ? 'Contact' : cat}
                </button>
              );
            })}
          </nav>

          {/* Responsive Layout Toggle (2-Column Grid vs 1-Column List) */}
          <div className="flex items-center justify-end gap-1 p-1 rounded-xl bg-[#161a22] border border-white/5 self-end sm:self-auto flex-shrink-0">
            <button
              type="button"
              onClick={() => setLayoutMode('grid')}
              title="Responsive Grid (2 columns on tablet & desktop, 1 on mobile)"
              aria-label="Responsive Grid layout"
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                layoutMode === 'grid'
                  ? 'bg-[#1d222c] text-[#f0b90b] border border-white/10'
                  : 'text-[#a3a3a3] hover:text-[#ffffff]'
              }`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('list')}
              title="Single column list layout"
              aria-label="Single column list layout"
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                layoutMode === 'list'
                  ? 'bg-[#1d222c] text-[#f0b90b] border border-white/10'
                  : 'text-[#a3a3a3] hover:text-[#ffffff]'
              }`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categorized Link Groups - Responsive Grid / Adaptive Columns */}
        <div className="flex flex-col gap-6 sm:gap-7 md:gap-8">
          {filteredCategories.map((category) => {
            const links = LINKS_DATA.filter((item) => item.category === category);
            const meta = CATEGORY_METADATA[category];

            return (
              <section
                key={category}
                aria-labelledby={`heading-${category.replace(/\s+/g, '-').toLowerCase()}`}
                className="flex flex-col gap-2.5 sm:gap-3"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h2
                      id={`heading-${category.replace(/\s+/g, '-').toLowerCase()}`}
                      className="text-xs font-bold uppercase tracking-[0.08em] text-[#a3a3a3]"
                    >
                      {category}
                    </h2>
                    <span className="text-[10px] text-[#a3a3a3]/60 font-medium">
                      ({links.length})
                    </span>
                  </div>
                  <span className="text-[11px] text-[#a3a3a3]/70 font-normal">
                    {meta.label}
                  </span>
                </div>

                {/* Section Items Grid / Stack */}
                <div
                  className={
                    layoutMode === 'list'
                      ? 'flex flex-col gap-2.5 sm:gap-3'
                      : 'grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5'
                  }
                >
                  {links.map((link, idx) => {
                    // When in grid layout and section has only 1 item (Portfolio, Shop), let it span 2 cols on tablet/desktop for featured presence
                    const isSingleHero = layoutMode === 'grid' && links.length === 1;

                    return (
                      <div
                        key={link.id}
                        className={isSingleHero ? 'md:col-span-2' : ''}
                      >
                        <LinkCard
                          link={link}
                          index={idx}
                          onCopyUrl={handleCopyLinkUrl}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Semantic Footer */}
        <footer className="pt-6 pb-8 sm:pb-10 flex flex-col items-center justify-center border-t border-white/5 text-center mt-4">
          <p className="text-xs text-[#a3a3a3] font-medium tracking-wide">
            ABDU Brand Designer
          </p>
        </footer>
      </main>

      {/* Floating Smooth Back-to-Top Button for Vertical Responsiveness */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 p-2.5 sm:p-3 rounded-full bg-[#161a22]/90 backdrop-blur-md border border-white/10 text-[#a3a3a3] hover:text-[#f0b90b] hover:border-[#f0b90b]/40 shadow-xl hover:shadow-[0_4px_20px_rgba(240,185,11,0.2)] active:scale-95 transition-all duration-300"
        >
          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </div>
  );
}
