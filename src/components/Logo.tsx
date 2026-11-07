import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark' || variant === 'footer';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official emblem icon in luxury cream/gold badge */}
      <div
        className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-transform duration-300 group-hover:scale-105 shrink-0 ${
          isDark
            ? 'bg-[#352A22] border-[#C5A36A]/50 text-[#F8F4EB] shadow-inner'
            : 'bg-[#FFFDF8] border-[#C5A36A]/40 text-[#352A22] shadow-sm'
        }`}
      >
        {/* Subtle flacon SVG with Amharic 'ጥሩ' (TERU) lettermark */}
        <svg
          viewBox="0 0 100 100"
          className="w-7 h-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stopper cap */}
          <rect
            x="40"
            y="12"
            width="20"
            height="14"
            rx="3"
            stroke="#C5A36A"
            strokeWidth="3.5"
            fill={isDark ? '#352A22' : '#FFFDF8'}
          />
          {/* Collar ring */}
          <line
            x1="36"
            y1="26"
            x2="64"
            y2="26"
            stroke="#C5A36A"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Circular Flacon Body */}
          <circle
            cx="50"
            cy="58"
            r="32"
            stroke="#C5A36A"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Inner Amharic 'ጥሩ' (TERU) stylized calligraphy */}
          <path
            d="M 37 46 L 47 46 L 47 68 M 53 46 L 63 46 L 63 68 M 47 57 L 53 57"
            stroke={isDark ? '#F8F4EB' : '#352A22'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Small gold dot accent */}
        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#C5A36A]" />
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <span
          className={`font-serif tracking-[0.15em] sm:tracking-[0.18em] uppercase font-bold text-base sm:text-lg leading-tight ${
            isDark ? 'text-[#F8F4EB]' : 'text-[#352A22]'
          }`}
        >
          TERU <span className="text-[#C5A36A] font-light">PERFUME</span>
        </span>
        {showSubtitle && (
          <span
            className={`hidden sm:block text-[9.5px] uppercase tracking-[0.26em] font-medium leading-none mt-0.5 ${
              isDark ? 'text-[#C5A36A]/80' : 'text-[#352A22]/70'
            }`}
          >
            Addis Ababa · Bole
          </span>
        )}
      </div>
    </div>
  );
};
