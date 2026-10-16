import React, { useState, useRef, useEffect } from 'react';
import { ABDU_AVATAR_DATA_URL, ABDU_AVATAR_PATH } from '../avatarData';

interface ProfileHeaderProps {
  onShare: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onShare }) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(ABDU_AVATAR_DATA_URL || ABDU_AVATAR_PATH);
  const [hasImageError, setHasImageError] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Check if user has previously saved an avatar in local storage
    const savedAvatar = localStorage.getItem('abdu_profile_avatar');
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
      setHasImageError(false);
    }
  }, []);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setAvatarSrc(result);
        setHasImageError(false);
        try {
          localStorage.setItem('abdu_profile_avatar', result);
        } catch {
          // localStorage quota catch
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageError = () => {
    if (avatarSrc !== ABDU_AVATAR_DATA_URL) {
      setAvatarSrc(ABDU_AVATAR_DATA_URL);
    } else {
      setHasImageError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="flex flex-col items-center text-center w-full relative">
      {/* Hidden file input for updating profile picture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        aria-label="Upload profile image"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top quick utility toolbar */}
      <div className="w-full flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0b90b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f0b90b]"></span>
          </span>
          <span className="text-[11px] font-medium tracking-wide uppercase text-[#a3a3a3]">
            Available for Q3/Q4 Projects
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            aria-label="Share profile link"
            title="Share profile link"
            className="p-1.5 text-[#a3a3a3] hover:text-[#ffffff] bg-[#161a22] hover:bg-[#1d222c] border border-white/5 hover:border-[#f0b90b]/30 rounded-lg transition-all duration-200 micro-press"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>

      {/* Avatar with image display, micro-ring, interactive upload/dropzone, and status dot */}
      <div className="relative group mb-4">
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          title="Profile picture (Click or drag & drop to update)"
          className={`w-24 h-24 rounded-full bg-[#161a22] border-2 cursor-pointer relative overflow-hidden flex items-center justify-center text-[#ffffff] font-extrabold text-3xl kerning-tight-hero shadow-[0_16px_36px_-6px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:border-[#f0b90b]/40 group-hover:scale-[1.02] ${
            isDragging ? 'border-[#f0b90b] ring-4 ring-[#f0b90b]/20 scale-105' : 'border-white/10'
          }`}
        >
          {!hasImageError ? (
            <img
              src={avatarSrc}
              alt="ABDU - Brand Designer"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full select-none"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1d222c] to-[#12151b] text-[#ffffff]">
              <span>A</span>
            </div>
          )}

          {/* Hover overlay indicating upload / edit capability */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center rounded-full text-white backdrop-blur-[2px]">
            <svg className="w-5 h-5 text-[#f0b90b] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span className="text-[9px] font-semibold tracking-wider uppercase text-white/90">Update</span>
          </div>
        </div>

        {/* Restrained Accent Status Indicator */}
        <span
          className="absolute bottom-1 right-1.5 w-3.5 h-3.5 bg-[#f0b90b] border-[2.5px] border-[#0c0e12] rounded-full shadow-[0_0_8px_rgba(240,185,11,0.5)] status-dot-pulse pointer-events-none"
          title="Active & Available"
        />
      </div>

      {/* Name with tight kerning as requested */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.04em] text-[#ffffff] leading-tight mb-1">
        ABDU Brand Designer
      </h1>

      {/* Handle */}
      <p className="text-sm font-medium tracking-[-0.01em] text-[#a3a3a3] mb-3">
        @abdubranddesigner
      </p>

      {/* Bio */}
      <div className="text-sm text-[#a3a3a3] leading-relaxed max-w-md px-2 font-normal space-y-1.5">
        <p className="text-[#ffffff] font-medium tracking-tight">
          I designed Brands that tell stories and solve problems
        </p>
        <div className="flex items-center justify-center gap-3 text-xs text-[#a3a3a3]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f0b90b]/80" />
            <span>Brand Identity Design</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f0b90b]/80" />
            <span>UI/UX Design</span>
          </span>
        </div>
      </div>
    </header>
  );
};
