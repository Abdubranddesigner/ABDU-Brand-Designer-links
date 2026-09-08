import { useState } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { LinkCard } from './components/LinkCard';
import { CodeModal } from './components/CodeModal';
import { Toast } from './components/Toast';
import { LINKS_DATA, CATEGORY_METADATA } from './data';
import { CategoryType } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const categories: Array<'Portfolio' | 'Social' | 'Direct Contact'> = [
    'Portfolio',
    'Social',
    'Direct Contact',
  ];

  const filteredCategories =
    selectedCategory === 'All'
      ? categories
      : categories.filter((cat) => cat === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#ffffff] flex flex-col items-center justify-start py-8 px-4 sm:px-6 relative">
      {/* Toast Notification Container */}
      <Toast message={toastMessage} />

      {/* Standalone Code Inspector Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Main Semantic Container - Mobile-first constrained layout */}
      <main className="w-full max-w-[480px] flex flex-col gap-7 mx-auto">
        {/* Profile Architecture Header */}
        <ProfileHeader
          onShare={handleShareProfile}
          onViewCode={() => setIsCodeModalOpen(true)}
        />

        {/* Minimal Category Filter Pill Bar */}
        <nav
          aria-label="Link categories"
          className="flex items-center justify-between p-1 rounded-xl bg-[#161a22] border border-white/5"
        >
          {(['All', 'Portfolio', 'Social', 'Direct Contact'] as CategoryType[]).map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex-1 py-1.5 px-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 tracking-tight text-center ${
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

        {/* Categorized Link Groups */}
        <div className="flex flex-col gap-6">
          {filteredCategories.map((category) => {
            const links = LINKS_DATA.filter((item) => item.category === category);
            const meta = CATEGORY_METADATA[category];

            return (
              <section
                key={category}
                aria-labelledby={`heading-${category.replace(/\s+/g, '-').toLowerCase()}`}
                className="flex flex-col gap-2.5"
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
                <div className="flex flex-col gap-2.5">
                  {links.map((link, idx) => (
                    <LinkCard
                      key={link.id}
                      link={link}
                      index={idx}
                      onCopyUrl={handleCopyLinkUrl}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Semantic Footer */}
        <footer className="pt-4 pb-8 flex flex-col items-center gap-3 border-t border-white/5 text-center">
          <p className="text-xs text-[#a3a3a3] font-medium">
            ABDU Brand Identity & Design System
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#a3a3a3]/70">
            <button
              type="button"
              onClick={() => setIsCodeModalOpen(true)}
              className="hover:text-[#ffffff] hover:underline transition-colors"
            >
              Export Standalone Code
            </button>
            <span>•</span>
            <a
              href="/standalone.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffffff] hover:underline transition-colors"
            >
              Raw HTML File
            </a>
            <span>•</span>
            <button
              type="button"
              onClick={handleShareProfile}
              className="hover:text-[#ffffff] hover:underline transition-colors"
            >
              Share Hub
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
