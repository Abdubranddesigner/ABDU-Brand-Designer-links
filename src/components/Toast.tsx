import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1d222c] border border-[#f0b90b]/40 text-[#ffffff] text-xs font-medium shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-all duration-200"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#f0b90b]" />
      <span>{message}</span>
    </div>
  );
};
