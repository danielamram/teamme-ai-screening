import React, { JSX, useEffect, useRef } from 'react';
import { ArrowUp, Square } from 'lucide-react';

import { CHAT_COLORS } from './types';

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
}

export default function ChatInput({
  input,
  isStreaming,
  onInputChange,
  onSend,
  onStop,
}: ChatInputProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className='px-5 py-4' style={{ backgroundColor: '#ffffff' }}>
      <div
        className='flex flex-col rounded-2xl border-2 shadow-md transition-all focus-within:border-indigo-400 focus-within:shadow-lg'
        style={{
          borderColor: CHAT_COLORS.border,
          backgroundColor: '#ffffff',
        }}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type your message...'
          rows={1}
          className='w-full resize-none bg-transparent px-4 pb-2 pt-3 text-sm outline-none placeholder:text-gray-400'
          style={{
            border: 'none',
            color: CHAT_COLORS.text.primary,
            minHeight: '44px',
            maxHeight: '200px',
          }}
        />
        <div className='flex items-center justify-end px-3 pb-2'>
          {isStreaming ? (
            <button
              type='button'
              onClick={onStop}
              className='group rounded-xl p-2.5 shadow-sm transition-all hover:shadow-md'
              style={{
                backgroundColor: CHAT_COLORS.text.primary,
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
          ) : (
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
                  input.trim() && !isStreaming
                    ? '#FFFFFF'
                    : CHAT_COLORS.text.muted
                }
                className='transition-transform group-hover:scale-110 group-active:scale-95'
              />
            </button>
          )}
        </div>
      </div>
      <p
        className='mt-2 px-1 text-center text-xs'
        style={{ color: CHAT_COLORS.text.muted }}
      >
        Press{' '}
        <kbd className='rounded bg-gray-100 px-1.5 py-0.5 text-xs'>Enter</kbd>{' '}
        to send,{' '}
        <kbd className='rounded bg-gray-100 px-1.5 py-0.5 text-xs'>
          Shift + Enter
        </kbd>{' '}
        for new line
      </p>
    </div>
  );
}
