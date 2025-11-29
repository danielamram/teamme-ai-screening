import React, { JSX, useEffect, useRef, useState } from 'react';

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
  const [isFocused, setIsFocused] = useState(false);

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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
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
      className='px-4 pb-4 pt-3'
      style={{
        background: 'linear-gradient(to top, #ffffff 0%, #fafbfc 100%)',
      }}
    >
      <div
        className='flex items-end gap-2 rounded-2xl px-4 py-2 transition-all duration-200'
        style={{
          backgroundColor: isFocused ? '#ffffff' : '#f8f9fb',
          boxShadow: isFocused
            ? `0 0 0 2px ${CHAT_COLORS.primary}40, 0 4px 12px rgba(0,0,0,0.08)`
            : '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 2px rgba(0,0,0,0.02)',
          border: `1px solid ${isFocused ? `${CHAT_COLORS.primary}30` : CHAT_COLORS.border}`,
        }}
      >
        <textarea
          name='chat-input'
          id='chat-input'
          ref={textareaRef}
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder='Ask Aaron anything...'
          rows={1}
          className='flex-1 resize-none bg-transparent py-2 text-sm leading-relaxed outline-none placeholder:text-slate-400'
          style={{
            color: CHAT_COLORS.text.primary,
            minHeight: '40px',
            maxHeight: '120px',
          }}
        />
        <div className='mb-0.5'>
          <SendButton
            input={input}
            isStreaming={isStreaming}
            onSend={onSend}
            onStop={onStop}
          />
        </div>
      </div>
      <p
        className='mt-2 text-center text-xs'
        style={{ color: CHAT_COLORS.text.muted }}
      >
        Press{' '}
        <kbd className='rounded bg-slate-100 px-1.5 py-0.5 font-medium'>
          Enter
        </kbd>{' '}
        to send,{' '}
        <kbd className='rounded bg-slate-100 px-1.5 py-0.5 font-medium'>
          Shift+Enter
        </kbd>{' '}
        for new line
      </p>
    </div>
  );
}
