import { JSX } from 'react';
import { Sparkles, X } from 'lucide-react';

import { CHAT_COLORS } from './types';

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps): JSX.Element {
  return (
    <div
      className='flex items-center justify-between px-5 py-4'
      style={{
        background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 100%)`,
      }}
    >
      <div className='flex items-center gap-3'>
        <div
          className='flex h-10 w-10 items-center justify-center rounded-xl shadow-lg'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Sparkles size={18} color='#FFFFFF' />
        </div>
        <div>
          <span className='block text-sm font-bold text-white'>
            Screening AI Assistant
          </span>
          <span className='block text-xs text-white/80'>
            Always here to help
          </span>
        </div>
      </div>
      <button
        type='button'
        onClick={onClose}
        className='rounded-lg p-2 transition-all hover:bg-white/20'
        aria-label='Close chat'
      >
        <X size={18} color='#FFFFFF' />
      </button>
    </div>
  );
}
