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
  if (isStreaming) {
    return (
      <button
        type='button'
        onClick={onStop}
        className='group rounded-xl p-2.5 shadow-sm transition-all hover:shadow-md'
        style={{
          backgroundColor: CHAT_COLORS.error,
        }}
        aria-label='Stop generating'
      >
        <Square
          size={16}
          color='#FFFFFF'
          fill='#FFFFFF'
          className='transition-transform group-hover:scale-110'
        />
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={onSend}
      className='group rounded-xl p-2.5 shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50'
      style={{
        backgroundColor:
          input.trim() && !isStreaming
            ? CHAT_COLORS.primary
            : CHAT_COLORS.borderLight,
      }}
      aria-label='Send message'
      disabled={!input.trim() || isStreaming}
    >
      <ArrowUp
        size={16}
        color={
          input.trim() && !isStreaming ? '#FFFFFF' : CHAT_COLORS.text.muted
        }
        className='transition-transform group-hover:scale-110 group-active:scale-95'
      />
    </button>
  );
}
