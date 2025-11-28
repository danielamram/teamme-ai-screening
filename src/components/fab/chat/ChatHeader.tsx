import { JSX } from 'react';
import { RotateCcw, Sparkles, X } from 'lucide-react';

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
    if (isStreaming) return 'Searching candidate pool...';
    if (hasMessages) return 'Ready to help';
    return 'ATS AI Assistant';
  };

  return (
    <div
      className='flex items-center justify-between px-5 py-4'
      style={{
        background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 100%)`,
      }}
    >
      <div className='flex items-center gap-3'>
        <div className='relative'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-xl shadow-lg'
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              animation: isStreaming
                ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                : 'none',
            }}
          >
            <Sparkles
              size={18}
              color='#FFFFFF'
              style={{
                animation: isStreaming ? 'spin 3s linear infinite' : 'none',
              }}
            />
          </div>
          {/* Status indicator dot */}
          {!isStreaming && (
            <div
              className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white'
              style={{
                backgroundColor: '#10b981',
                animation:
                  'statusPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          )}
        </div>
        <div>
          <span className='block text-sm font-bold text-white'>Anna</span>
          <span className='block text-xs text-white/80'>{getStatusText()}</span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        {hasMessages && (
          <button
            type='button'
            onClick={onReset}
            className='rounded-lg p-2 transition-all hover:bg-white/20'
            aria-label='Reset chat'
            title='Reset chat'
          >
            <RotateCcw size={18} color='#FFFFFF' />
          </button>
        )}
        <button
          type='button'
          onClick={onClose}
          className='rounded-lg p-2 transition-all hover:bg-white/20'
          aria-label='Close chat'
        >
          <X size={18} color='#FFFFFF' />
        </button>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes statusPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
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
