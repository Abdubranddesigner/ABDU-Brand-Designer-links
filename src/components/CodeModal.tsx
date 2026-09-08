import React, { useState } from 'react';
import {
  STANDALONE_HTML_SOURCE,
  STANDALONE_MODULAR_HTML,
  STANDALONE_CSS_SOURCE,
  STANDALONE_JS_SOURCE,
} from '../data';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

type TabType = 'html' | 'css' | 'js' | 'all' | 'tokens';

interface TabMeta {
  id: TabType;
  label: string;
  filename: string;
  badge: string;
  mime: string;
  code: string;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('html');

  if (!isOpen) return null;

  const tabDetails: Record<TabType, TabMeta> = {
    html: {
      id: 'html',
      label: 'HTML',
      filename: 'index.html',
      badge: 'HTML5 Semantic',
      mime: 'text/html',
      code: STANDALONE_MODULAR_HTML,
    },
    css: {
      id: 'css',
      label: 'CSS',
      filename: 'styles.css',
      badge: 'Vanilla CSS3',
      mime: 'text/css',
      code: STANDALONE_CSS_SOURCE,
    },
    js: {
      id: 'js',
      label: 'JavaScript',
      filename: 'script.js',
      badge: 'Vanilla JS (ES6+)',
      mime: 'text/javascript',
      code: STANDALONE_JS_SOURCE,
    },
    all: {
      id: 'all',
      label: 'All-in-One Bundle',
      filename: 'standalone.html',
      badge: 'Single-File Drop-in',
      mime: 'text/html',
      code: STANDALONE_HTML_SOURCE,
    },
    tokens: {
      id: 'tokens',
      label: 'Architecture & Tokens',
      filename: 'design-tokens.md',
      badge: 'Specifications',
      mime: 'text/markdown',
      code: '',
    },
  };

  const currentTab = tabDetails[activeTab];

  const handleCopyCode = async () => {
    const textToCopy = currentTab.code || STANDALONE_HTML_SOURCE;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      onShowToast(`${currentTab.label} (${currentTab.filename}) copied to clipboard`);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      onShowToast('Failed to copy. Please manually select the code.');
    }
  };

  const handleDownloadFile = () => {
    if (!currentTab.code) return;
    const blob = new Blob([currentTab.code], { type: currentTab.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentTab.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast(`Downloaded ${currentTab.filename}`);
  };

  const handleDownloadAll = () => {
    const files = [
      { name: 'index.html', content: STANDALONE_MODULAR_HTML, type: 'text/html' },
      { name: 'styles.css', content: STANDALONE_CSS_SOURCE, type: 'text/css' },
      { name: 'script.js', content: STANDALONE_JS_SOURCE, type: 'text/javascript' },
    ];

    files.forEach((file, index) => {
      setTimeout(() => {
        const blob = new Blob([file.content], { type: file.type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 200);
    });

    onShowToast('Downloading HTML, CSS & JavaScript package files');
  };

  const getLineCount = (code: string) => code ? code.split('\n').length : 0;
  const getByteSize = (code: string) => {
    if (!code) return '0 KB';
    const bytes = new Blob([code]).size;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#161a22] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#0c0e12]/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f0b90b] shadow-[0_0_8px_rgba(240,185,11,0.5)]" />
            <div>
              <h2 className="text-sm font-semibold tracking-[-0.02em] text-[#ffffff] flex items-center gap-2">
                <span>Production Source Code</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#f0b90b]/15 text-[#f0b90b] border border-[#f0b90b]/30">
                  HTML • CSS • JavaScript
                </span>
              </h2>
              <p className="text-[11px] text-[#a3a3a3] hidden sm:block">
                Zero dependencies • 100% vanilla web standard architecture
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#1d222c] rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-2.5 bg-[#0c0e12]/40 border-b border-white/5">
          {/* Language Tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'html'
                  ? 'bg-[#1d222c] text-[#ffffff] border border-[#f0b90b]/40 shadow-sm'
                  : 'text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#161a22]'
              }`}
            >
              <span className="text-[#f0b90b] font-bold">&lt;/&gt;</span>
              <span>HTML</span>
              <span className="text-[10px] opacity-60 hidden sm:inline">index.html</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'css'
                  ? 'bg-[#1d222c] text-[#ffffff] border border-[#f0b90b]/40 shadow-sm'
                  : 'text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#161a22]'
              }`}
            >
              <span className="text-[#60a5fa] font-bold">#</span>
              <span>CSS</span>
              <span className="text-[10px] opacity-60 hidden sm:inline">styles.css</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('js')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'js'
                  ? 'bg-[#1d222c] text-[#ffffff] border border-[#f0b90b]/40 shadow-sm'
                  : 'text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#161a22]'
              }`}
            >
              <span className="text-[#facc15] font-bold">JS</span>
              <span>JavaScript</span>
              <span className="text-[10px] opacity-60 hidden sm:inline">script.js</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-[#1d222c] text-[#ffffff] border border-[#f0b90b]/40 shadow-sm'
                  : 'text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#161a22]'
              }`}
            >
              <span className="text-[#4ade80] font-bold">1</span>
              <span>All-in-One</span>
              <span className="text-[10px] opacity-60 hidden sm:inline">standalone.html</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tokens')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'tokens'
                  ? 'bg-[#1d222c] text-[#ffffff] border border-white/10'
                  : 'text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#161a22]'
              }`}
            >
              Specs
            </button>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center gap-2">
            <a
              href={activeTab === 'html' ? '/index-static.html' : '/standalone.html'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-[#a3a3a3] hover:text-[#ffffff] hover:underline flex items-center gap-1 py-1 px-2"
              title="Open pure static page in a new browser tab"
            >
              <span>Live Preview</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {activeTab !== 'tokens' && (
              <button
                type="button"
                onClick={handleDownloadFile}
                title={`Download ${currentTab.filename}`}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#1d222c] hover:bg-[#252b38] border border-white/10 text-[#ffffff] rounded-lg font-medium text-[11px] transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-[#a3a3a3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#1d222c] hover:bg-[#161a22] border border-[#f0b90b]/50 text-[#ffffff] rounded-lg font-medium text-[11px] transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-[#f0b90b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[#f0b90b]">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[#f0b90b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy {currentTab.label}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Information Banner */}
        {activeTab !== 'tokens' && (
          <div className="flex items-center justify-between px-5 py-1.5 bg-[#0c0e12]/60 border-b border-white/5 text-[11px] text-[#a3a3a3]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-white font-medium">{currentTab.filename}</span>
              <span className="px-1.5 py-0.2 rounded bg-white/5 text-[10px] text-[#f0b90b]">
                {currentTab.badge}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>{getLineCount(currentTab.code)} lines</span>
              <span>•</span>
              <span>{getByteSize(currentTab.code)}</span>
            </div>
          </div>
        )}

        {/* Code Content Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-[11.5px] leading-relaxed text-[#d1d5db] bg-[#0c0e12]/90">
          {activeTab === 'tokens' ? (
            <div className="space-y-4 font-sans text-xs">
              <div className="p-4 rounded-xl bg-[#161a22] border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-[#ffffff] uppercase tracking-wider block">
                  Design Tokens & Color Architecture
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="flex items-center gap-2.5 p-2 rounded bg-[#0c0e12] border border-white/5">
                    <span className="w-4 h-4 rounded bg-[#0c0e12] border border-white/20" />
                    <div>
                      <span className="text-[#ffffff] font-medium block">--bg: #0c0e12</span>
                      <span className="text-[#a3a3a3] text-[10px]">Deep midnight canvas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded bg-[#0c0e12] border border-white/5">
                    <span className="w-4 h-4 rounded bg-[#161a22] border border-white/20" />
                    <div>
                      <span className="text-[#ffffff] font-medium block">--card-bg: #161a22</span>
                      <span className="text-[#a3a3a3] text-[10px]">Subtle elevated surface</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded bg-[#0c0e12] border border-white/5">
                    <span className="w-4 h-4 rounded bg-[#1d222c] border border-white/20" />
                    <div>
                      <span className="text-[#ffffff] font-medium block">--card-hover: #1d222c</span>
                      <span className="text-[#a3a3a3] text-[10px]">Interactive hover lift</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded bg-[#0c0e12] border border-white/5">
                    <span className="w-4 h-4 rounded bg-[#f0b90b]" />
                    <div>
                      <span className="text-[#ffffff] font-medium block">--accent: #f0b90b</span>
                      <span className="text-[#a3a3a3] text-[10px]">Architectural brand gold</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#161a22] border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-[#ffffff] uppercase tracking-wider block">
                  Language Implementation Breakdown
                </span>
                <div className="space-y-2 text-[12px] leading-relaxed text-[#a3a3a3]">
                  <p>
                    • <strong className="text-white">HTML5 (index.html)</strong>: Clean semantic DOM tree utilizing standard &lt;main&gt;, &lt;header&gt;, &lt;section&gt;, and &lt;article&gt; tags with accessible ARIA labeling and responsive meta viewport tags.
                  </p>
                  <p>
                    • <strong className="text-white">CSS3 (styles.css)</strong>: Pure custom properties (:root), fluid flex layouts, 12px border radius, micro-notch hover reveals, and prefers-reduced-motion media query handling.
                  </p>
                  <p>
                    • <strong className="text-white">JavaScript (script.js)</strong>: Lightweight ES6+ IntersectionObserver triggering staggered cascading entrance animations, avatar error fallbacks, and keyboard navigation.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap selection:bg-[#f0b90b]/30">
              <code>{currentTab.code}</code>
            </pre>
          )}
        </div>

        {/* Modal Footer with Download All Option */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-white/5 bg-[#0c0e12]/80 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[#a3a3a3]">
              Need all files separated?
            </span>
            <button
              type="button"
              onClick={handleDownloadAll}
              className="px-2.5 py-1 rounded bg-[#1d222c] hover:bg-[#252b38] text-[#f0b90b] border border-[#f0b90b]/30 text-[11px] font-medium transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download HTML + CSS + JS</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1d222c] hover:bg-white/10 text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
