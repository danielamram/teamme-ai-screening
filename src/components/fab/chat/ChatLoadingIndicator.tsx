import { JSX } from 'react';
import { Sparkles } from 'lucide-react';

import { CHAT_COLORS } from './types';

export default function ChatLoadingIndicator(): JSX.Element {
  return (
    <div className='animate-in fade-in flex gap-3 duration-300'>
      <div
        className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm'
        style={{
          background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 100%)`,
        }}
      >
        <Sparkles size={14} color='#FFFFFF' />
      </div>
      <div className='flex items-center gap-1.5 py-2'>
        <div
          className='h-2 w-2 animate-bounce rounded-full'
          style={{
            backgroundColor: CHAT_COLORS.primary,
            animationDelay: '0ms',
          }}
        />
        <div
          className='h-2 w-2 animate-bounce rounded-full'
          style={{
            backgroundColor: CHAT_COLORS.primary,
            animationDelay: '150ms',
          }}
        />
        <div
          className='h-2 w-2 animate-bounce rounded-full'
          style={{
            backgroundColor: CHAT_COLORS.primary,
            animationDelay: '300ms',
          }}
        />
      </div>
    </div>
  );
}
