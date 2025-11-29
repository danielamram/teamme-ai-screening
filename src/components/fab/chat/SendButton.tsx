import { JSX } from 'react';
import { ArrowUp, Square } from 'lucide-react';

import { CHAT_COLORS } from './types';

interface SendButtonProps {
  input: string;
  isStreaming: boolean;
  onSend: () => void;
  onStop: () => void;
}

export default function SendButton({
  input,
  isStreaming,
  onSend,
  onStop,
}: SendButtonProps): JSX.Element {
  const hasInput = input.trim().length > 0;

  if (isStreaming) {
    return (
      <button
        type='button'
        onClick={onStop}
        className='group flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 active:scale-90'
        style={{
          backgroundColor: CHAT_COLORS.error,
          boxShadow: `0 2px 8px ${CHAT_COLORS.error}40`,
        }}
        aria-label='Stop generating'
      >
        <Square
          size={14}
          color='#FFFFFF'
          fill='#FFFFFF'
          className='transition-transform'
        />
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={onSend}
      className='group flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 active:scale-90 disabled:cursor-not-allowed'
      style={{
        backgroundColor: hasInput ? CHAT_COLORS.primary : '#e8eaed',
        boxShadow: hasInput ? `0 2px 8px ${CHAT_COLORS.primary}40` : 'none',
        opacity: hasInput ? 1 : 0.6,
      }}
      aria-label='Send message'
      disabled={!hasInput}
    >
      <ArrowUp
        size={16}
        color={hasInput ? '#FFFFFF' : CHAT_COLORS.text.muted}
        strokeWidth={2.5}
        className='transition-transform'
      />
    </button>
  );
}
