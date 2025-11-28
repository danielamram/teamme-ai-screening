import React, { JSX, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

import SendButton from './SendButton';
import { CHAT_COLORS } from './types';

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  isOpen: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
}

export default function ChatInput({
  input,
  isStreaming,
  isOpen,
  onInputChange,
  onSend,
  onStop,
}: ChatInputProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus when chat is opened
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

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
    <div
      className='border-t px-5 py-4'
      style={{
        backgroundColor: '#ffffff',
        borderColor: CHAT_COLORS.borderLight,
      }}
    >
      <div
        className='flex flex-col rounded-2xl border-2 shadow-md transition-all focus-within:border-indigo-400 focus-within:shadow-lg'
        style={{
          borderColor: CHAT_COLORS.border,
          backgroundColor: '#ffffff',
        }}
      >
        {/* Search Bar */}
        <div className='flex w-full max-w-sm flex-row items-center justify-center space-x-2'>
          <div
            className='flex w-full items-center gap-3 rounded-full border px-5 py-3 transition-all hover:shadow-md'
            style={{
              borderColor: CHAT_COLORS.borderLight,
              backgroundColor: '#F8F9FA',
            }}
          >
            <button
              type='button'
              className='flex-shrink-0 transition-colors hover:opacity-70'
              aria-label='Add'
            >
              <Plus size={20} color='#9CA3AF' strokeWidth={2} />
            </button>

            <textarea
              name='chat-input'
              id='chat-input'
              ref={textareaRef}
              value={input}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Ask Anna anything...'
              rows={1}
              className='w-full resize-none bg-transparent pb-2 pr-4 pt-3 text-sm outline-none placeholder:text-gray-400 focus:outline-none'
              style={{
                border: 'none',
                color: CHAT_COLORS.text.primary,
                minHeight: '44px',
                maxHeight: '200px',
              }}
            />
          </div>
          <SendButton
            input={input}
            isStreaming={isStreaming}
            onSend={onSend}
            onStop={onStop}
          />
        </div>
      </div>
    </div>
  );
}
