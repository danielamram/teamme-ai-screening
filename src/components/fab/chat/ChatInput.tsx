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
  onFileSelect?: (file: File) => void;
  selectedFile?: File | null;
  onFileRemove?: () => void;
}

export default function ChatInput({
  input,
  isStreaming,
  isOpen,
  onInputChange,
  onSend,
  onStop,
  onFileSelect,
  selectedFile,
  onFileRemove,
}: ChatInputProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      // Validate file type
      const allowedTypes = [
        'text/plain',
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = [
        'txt',
        'pdf',
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp',
      ];

      if (
        allowedTypes.includes(file.type) ||
        (fileExtension && allowedExtensions.includes(fileExtension))
      ) {
        onFileSelect(file);
      } else {
        alert('Please upload a valid file: txt, pdf, or image file');
      }
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  return (
    <div
      className='px-4 pb-4 pt-3'
      style={{
        background: 'linear-gradient(to top, #ffffff 0%, #fafbfc 100%)',
      }}
    >
      {/* Selected file preview */}
      {selectedFile && (
        <div
          className='mb-2 flex items-center gap-2 rounded-lg px-3 py-2'
          style={{
            backgroundColor: '#f1f3f5',
            border: `1px solid ${CHAT_COLORS.border}`,
          }}
        >
          <div className='flex min-w-0 flex-1 items-center gap-2'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              style={{ color: CHAT_COLORS.text.muted, flexShrink: 0 }}
            >
              <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' />
              <polyline points='13 2 13 9 20 9' />
            </svg>
            <span
              className='truncate text-sm'
              style={{ color: CHAT_COLORS.text.primary }}
            >
              {selectedFile.name}
            </span>
          </div>
          <button
            type='button'
            onClick={onFileRemove}
            className='flex items-center justify-center transition-all duration-200 hover:opacity-70'
            style={{
              width: '20px',
              height: '20px',
              minWidth: '20px',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: CHAT_COLORS.text.muted,
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label='Remove file'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>
      )}

      <div
        className='flex items-center gap-2 rounded-2xl px-4 py-2 transition-all duration-200'
        style={{
          backgroundColor: isFocused ? '#ffffff' : '#f8f9fb',
          boxShadow: isFocused
            ? `0 0 0 2px ${CHAT_COLORS.primary}40, 0 4px 12px rgba(0,0,0,0.08)`
            : '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 2px rgba(0,0,0,0.02)',
          border: `1px solid ${isFocused ? `${CHAT_COLORS.primary}30` : CHAT_COLORS.border}`,
        }}
      >
        {/* Hidden file input */}
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='.txt,.pdf,.jpg,.jpeg,.png,.gif,.webp,image/*,application/pdf,text/plain'
          className='hidden'
          aria-label='Upload file'
        />

        {/* Plus button for file upload */}
        <button
          type='button'
          onClick={handleFileButtonClick}
          disabled={isStreaming}
          className='flex items-center justify-center transition-all duration-200 hover:opacity-70 disabled:opacity-40'
          style={{
            width: '32px',
            height: '32px',
            minWidth: '32px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: CHAT_COLORS.text.muted,
            border: 'none',
            cursor: isStreaming ? 'not-allowed' : 'pointer',
          }}
          aria-label='Upload file'
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='12' y1='5' x2='12' y2='19' />
            <line x1='5' y1='12' x2='19' y2='12' />
          </svg>
        </button>

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
        <SendButton
          input={input}
          isStreaming={isStreaming}
          onSend={onSend}
          onStop={onStop}
        />
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
