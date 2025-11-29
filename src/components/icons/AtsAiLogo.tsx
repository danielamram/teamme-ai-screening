import { type CSSProperties, type JSX } from 'react';

interface MicrosoftLoopLogoProps {
  size?: number; // Size in rem units
  className?: string;
}

// eslint-disable-next-line import/prefer-default-export
export function AtsAiLogo({
  size = 24,
  className = '',
}: MicrosoftLoopLogoProps): JSX.Element {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` } as CSSProperties}
      className={`atn-logo-shape relative h-full w-full overflow-hidden border border-white/5 shadow-2xl shadow-indigo-900/40 ${className}`}
    >
      {/* Gradient Layer (React: beforeStyle) */}
      <div className='atn-conic-gradient atn-hole-mask absolute inset-0' />

      {/* Inner Gloss/Detail (Enhancement) */}
      <div className='absolute inset-0 scale-90 rounded-full border border-white/10 opacity-50' />

      {/* <!-- This simulates the bottom flap/fold with correct rotation relative to container --> */}
      <div
        className='absolute bottom-0 left-0 h-[50%] w-[50%] border-t border-white/10 bg-indigo-900/10 mix-blend-overlay backdrop-blur-sm'
        style={{ borderRadius: '0 100% 0 0' } as CSSProperties}
      />

      {/* Decorative subtle shine */}
      <div className='pointer-events-none absolute right-0 top-0 h-full w-full bg-gradient-to-bl from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
    </div>
  );
}
