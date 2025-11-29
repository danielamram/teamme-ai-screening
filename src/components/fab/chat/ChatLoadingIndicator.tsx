import { JSX } from 'react';
import { Sparkles } from 'lucide-react';

import { CHAT_COLORS } from './types';

export default function ChatLoadingIndicator(): JSX.Element {
  return (
    <div className='animate-in fade-in flex gap-3 duration-300'>
      {/* Avatar */}
      <div
        className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full'
        style={{
          background: `linear-gradient(145deg, ${CHAT_COLORS.primaryLight} 0%, ${CHAT_COLORS.primary} 50%, ${CHAT_COLORS.primaryDark} 100%)`,
          boxShadow: `0 3px 10px ${CHAT_COLORS.primary}30`,
        }}
      >
        <Sparkles size={14} color='#FFFFFF' strokeWidth={2.5} />
      </div>

      {/* Typing indicator bubble */}
      <div
        className='flex items-center gap-1 rounded-2xl rounded-tl-md px-4 py-3'
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <span
          className='h-2 w-2 rounded-full'
          style={{
            backgroundColor: CHAT_COLORS.primary,
            animation: 'typingPulse 1.4s ease-in-out infinite',
          }}
        />
        <span
          className='h-2 w-2 rounded-full'
          style={{
            backgroundColor: CHAT_COLORS.primary,
            animation: 'typingPulse 1.4s ease-in-out infinite 0.2s',
          }}
        />
        <span
          className='h-2 w-2 rounded-full'
          style={{
            backgroundColor: CHAT_COLORS.primary,
            animation: 'typingPulse 1.4s ease-in-out infinite 0.4s',
          }}
        />
      </div>

      <style>{`
        @keyframes typingPulse {
          0%, 60%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          30% {
            transform: scale(1.15);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
