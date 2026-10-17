import React, { useState, useEffect, useRef } from 'react';
import { LinkItem } from '../types';
import { BrandIcon } from './Icons';

interface LinkCardProps {
  link: LinkItem;
  index?: number;
  onCopyUrl: (url: string, title: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, index = 0, onCopyUrl }) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCopyUrl(link.url, link.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Gentle stagger delay based on item position (capped to prevent long waits)
  const staggerDelay = `${Math.min((index % 5) * 60, 240)}ms`;

  return (
    <div
      ref={cardRef}
      id={`link-card-${link.id}`}
      style={{
        transitionDelay: isVisible ? staggerDelay : '0ms',
      }}
      className={`relative group/card w-full transform-gpu transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <a
        id={`link-anchor-${link.id}`}
        href={link.url}
        target={link.isExternal ? '_blank' : undefined}
        rel={link.isExternal ? 'noopener noreferrer' : undefined}
        className="group relative flex items-center justify-between w-full p-3 sm:p-3.5 md:p-4 min-h-[58px] sm:min-h-[64px] rounded-xl bg-[#161a22] hover:bg-[#1d222c] border border-white/5 hover:border-[#f0b90b]/30 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6),0_0_0_1px_rgba(240,185,11,0.15)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] sm:active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0b90b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0e12] overflow-hidden"
      >
        {/* Subtle Architectural Left Accent Notch Reveal */}
        <span
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f0b90b] scale-y-0 group-hover:scale-y-100 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
          aria-hidden="true"
        />

        {/* Left: Icon & Text content (fluid, wraps or clamps cleanly on all screen sizes) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 pr-2">
          {/* Icon frame */}
          <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-[#0c0e12] border border-white/5 flex items-center justify-center text-[#a3a3a3] group-hover:text-[#ffffff] group-hover:border-white/10 transition-colors duration-200">
            <BrandIcon name={link.icon} className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>

          {/* Titles & Description */}
          <div className="flex flex-col min-w-0 flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[13px] sm:text-sm md:text-[15px] font-semibold tracking-[-0.015em] text-[#ffffff] truncate group-hover:text-[#ffffff] transition-colors duration-200">
                {link.title}
              </span>
            </div>
            {link.subtitle && (
              <span className="text-[11px] sm:text-[12px] text-[#a3a3a3] line-clamp-1 sm:line-clamp-2 mt-0.5 font-normal leading-snug break-words">
                {link.subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Right: Badge, Copy button & Arrow action */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {link.badge && (
            <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-[#a3a3a3] tracking-wide border border-white/5 whitespace-nowrap">
              {link.badge}
            </span>
          )}

          {/* Copy URL micro-action (accessible on touch devices with gentle visibility, full on hover/focus) */}
          <button
            type="button"
            onClick={handleCopy}
            title={`Copy ${link.title} link`}
            aria-label={`Copy link for ${link.title}`}
            className="opacity-40 sm:opacity-0 group-hover/card:opacity-100 focus:opacity-100 p-1.5 rounded-md text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#0c0e12] transition-all duration-150 touch-manipulation"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-[#f0b90b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </button>

          {/* Arrow Micro-Interaction: Diagonal glide up-right + accent color switch on hover */}
          <div className="w-5 h-5 flex items-center justify-center text-[#a3a3a3] group-hover:text-[#f0b90b] transition-colors duration-200">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};
