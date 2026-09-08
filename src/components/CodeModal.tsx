import React, { useState } from 'react';
import { STANDALONE_HTML_SOURCE } from '../data';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'tokens'>('html');

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(STANDALONE_HTML_SOURCE);
      setCopied(true);
      onShowToast('Standalone HTML & Vanilla CSS copied to clipboard');
      setTimeout(() => setCopied(false), 2200);
    } catch {
      onShowToast('Failed to copy. Please manually select the code.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#161a22] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0c0e12]/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f0b90b]" />
            <h2 className="text-sm font-semibold tracking-[-0.02em] text-[#ffffff]">
              Production Standalone Web Component
            </h2>
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

        {/* Tab Selection & Copy Action */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#0c0e12]/30 border-b border-white/5 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'html'
                  ? 'bg-[#1d222c] text-[#ffffff] border border-white/10'
                  : 'text-[#a3a3a3] hover:text-[#ffffff]'
              }`}
            >
              Standalone HTML + CSS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tokens')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'tokens'
                  ? 'bg-[#1d222c] text-[#ffffff] border border-white/10'
                  : 'text-[#a3a3a3] hover:text-[#ffffff]'
              }`}
            >
              Architectural Constraints
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/standalone.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-[#a3a3a3] hover:text-[#ffffff] hover:underline flex items-center gap-1"
            >
              <span>Open in Tab</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#1d222c] hover:bg-[#161a22] border border-[#f0b90b]/40 text-[#ffffff] rounded-lg font-medium text-[11px] transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-[#f0b90b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[#f0b90b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy Clean Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content Body */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-[11px] leading-relaxed text-[#a3a3a3]">
          {activeTab === 'html' ? (
            <pre className="whitespace-pre-wrap selection:bg-[#f0b90b]/30">
              <code>{STANDALONE_HTML_SOURCE}</code>
            </pre>
          ) : (
            <div className="space-y-4 font-sans text-xs">
              <div className="p-3.5 rounded-lg bg-[#0c0e12] border border-white/5 space-y-2">
                <span className="text-xs font-semibold text-[#ffffff] uppercase tracking-wider block">
                  Strict Palette Adherence
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#0c0e12] border border-white/20" />
                    <span className="text-[#ffffff]">Background: #0c0e12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#161a22] border border-white/20" />
                    <span className="text-[#ffffff]">Card Default: #161a22</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#1d222c] border border-white/20" />
                    <span className="text-[#ffffff]">Card Hover: #1d222c</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#f0b90b]" />
                    <span className="text-[#ffffff]">Accent: #f0b90b</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0c0e12] border border-white/5 space-y-1.5">
                <span className="text-xs font-semibold text-[#ffffff] uppercase tracking-wider block">
                  Micro-Interaction Engineering
                </span>
                <p className="text-[#a3a3a3] text-[12px] leading-relaxed">
                  • <strong>Restrained Accent</strong>: The #f0b90b accent is strictly applied to hover states: the left notch reveal, subtle border glow, and diagonal arrow glide. Zero background flood.
                </p>
                <p className="text-[#a3a3a3] text-[12px] leading-relaxed">
                  • <strong>Tight Kerning</strong>: Headings use letter-spacing -0.04em, reducing optical whitespace and enforcing an architectural tone.
                </p>
                <p className="text-[#a3a3a3] text-[12px] leading-relaxed">
                  • <strong>Cluster Grouping</strong>: 10 links partitioned into Portfolio (2), Social (6), and Direct Contact (2) to minimize cognitive load.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-[#0c0e12]/60 text-xs">
          <span className="text-[#a3a3a3]">
            Zero dependencies • Pure Semantic HTML5 & Vanilla CSS
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-[#1d222c] hover:bg-white/10 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
