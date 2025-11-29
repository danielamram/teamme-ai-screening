import { JSX } from 'react';
import { RotateCcw, X } from 'lucide-react';

import { CHAT_COLORS } from './types';

interface ChatHeaderProps {
  onClose: () => void;
  onReset: () => void;
  isStreaming?: boolean;
  hasMessages?: boolean;
}

export default function ChatHeader({
  onClose,
  onReset,
  isStreaming = false,
  hasMessages = false,
}: ChatHeaderProps): JSX.Element {
  const getStatusText = () => {
    if (isStreaming) return '';
    if (hasMessages) return 'Online';
    return 'Online';
  };

  return (
    <div
      className='relative flex items-center justify-between px-5 py-4'
      style={{
        background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 100%)`,
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '16px 16px',
        }}
      />

      <div className='relative flex items-center gap-3'>
        {/* Avatar with gradient ring */}
        <div className='relative'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-full'
            style={{
              background: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
            }}
          >
            <span className='text-base font-semibold text-white'>A</span>
          </div>
          {/* Status indicator */}
          <div
            className='absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full'
            style={{
              backgroundColor: isStreaming ? CHAT_COLORS.warning : '#22c55e',
              border: '2.5px solid white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              animation: isStreaming
                ? 'statusBlink 1s ease-in-out infinite'
                : 'none',
            }}
          />
        </div>

        {/* Name and status */}
        <div className='flex flex-col'>
          <span className='text-[15px] font-semibold leading-tight text-white'>
            Aaron
          </span>
          <span
            className='mt-2 flex items-center gap-1.5 text-xs text-white/75'
            style={{ marginTop: '2px' }}
          >
            {isStreaming && (
              <span className='mt-2 flex gap-0.5'>
                <span
                  className='h-1 w-1 rounded-full bg-white/80'
                  style={{ animation: 'dotBounce 1.2s infinite ease-in-out' }}
                />
                <span
                  className='h-1 w-1 rounded-full bg-white/80'
                  style={{
                    animation: 'dotBounce 1.2s infinite ease-in-out 0.2s',
                  }}
                />
                <span
                  className='h-1 w-1 rounded-full bg-white/80'
                  style={{
                    animation: 'dotBounce 1.2s infinite ease-in-out 0.4s',
                  }}
                />
              </span>
            )}
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className='relative flex items-center gap-0.5'>
        {hasMessages && (
          <button
            type='button'
            onClick={onReset}
            className='group flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/15 active:scale-90'
            aria-label='Reset chat'
            title='Start new chat'
          >
            <RotateCcw
              size={15}
              strokeWidth={2.5}
              className='text-white/90 transition-transform duration-300 group-hover:rotate-[-45deg]'
            />
          </button>
        )}
        <button
          type='button'
          onClick={onClose}
          className='group flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/15 active:scale-90'
          aria-label='Close chat'
        >
          <X size={15} strokeWidth={2.5} className='text-white/90' />
        </button>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes statusBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

ChatHeader.defaultProps = {
  isStreaming: false,
  hasMessages: false,
};
