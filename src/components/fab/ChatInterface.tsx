import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import type { UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ArrowUp, Check, Copy, Paperclip, Square, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface SuggestionItem {
  text: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: SuggestionItem[];
  apiEndpoint: string;
}

const extractMessageText = (message: UIMessage): string =>
  message.parts
    .map((part) => {
      if ('text' in part && typeof part.text === 'string') {
        return part.text;
      }
      return '';
    })
    .filter((text) => text.trim().length > 0)
    .join('\n')
    .trim();

function MessageItem({ message }: { message: UIMessage }): JSX.Element {
  const [copied, setCopied] = useState(false);
  const messageText = extractMessageText(message);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === 'user') {
    return (
      <div className='flex justify-end'>
        <div
          className='max-w-[85%] rounded-2xl px-4 py-3'
          style={{
            backgroundColor: '#f4f4f5',
          }}
        >
          <p
            className='whitespace-pre-wrap text-sm'
            style={{ color: '#18181b' }}
          >
            {messageText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-3'>
        <div
          className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full'
          style={{ backgroundColor: '#1e1b4b' }}
        >
          <span className='text-xs font-medium text-white'>T</span>
        </div>
        <div className='min-w-0 flex-1'>
          <div
            className='prose prose-sm max-w-none text-sm'
            style={{ color: '#18181b' }}
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className='mb-2 last:mb-0'>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className='mb-2 list-disc pl-4 last:mb-0'>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className='mb-2 list-decimal pl-4 last:mb-0'>
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className='mb-1'>{children}</li>,
                code: ({ className, children }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className='rounded bg-gray-100 px-1 py-0.5 text-xs'>
                      {children}
                    </code>
                  ) : (
                    <code
                      className={`block overflow-x-auto rounded bg-gray-100 p-2 text-xs ${className}`}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className='mb-2 overflow-x-auto rounded bg-gray-100 p-2 last:mb-0'>
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className='text-blue-600 hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className='font-semibold'>{children}</strong>
                ),
                h1: ({ children }) => (
                  <h1 className='mb-2 text-lg font-bold'>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className='mb-2 text-base font-bold'>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className='mb-2 text-sm font-bold'>{children}</h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className='mb-2 border-l-2 border-gray-300 pl-3 italic last:mb-0'>
                    {children}
                  </blockquote>
                ),
              }}
            >
              {messageText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className='ml-11 flex gap-1'>
        <button
          type='button'
          onClick={handleCopy}
          className='rounded-md p-1.5 transition-colors hover:bg-gray-100'
          aria-label='Copy message'
        >
          {copied ? (
            <Check size={14} color='#10b981' />
          ) : (
            <Copy size={14} color='#71717a' />
          )}
        </button>
      </div>
    </div>
  );
}

function SuggestedActions({
  suggestions,
  onSuggestionClick,
}: {
  suggestions: SuggestionItem[];
  onSuggestionClick: (text: string) => void;
}) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4'>
      <div className='mb-8'>
        <h2
          className='text-center text-2xl font-semibold'
          style={{ color: '#18181b' }}
        >
          How can I help you today?
        </h2>
      </div>
      <div className='grid w-full max-w-sm grid-cols-1 gap-2'>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.text}
            type='button'
            onClick={() => onSuggestionClick(suggestion.text)}
            className='rounded-xl border px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50'
            style={{
              borderColor: '#e4e4e7',
              color: '#18181b',
            }}
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    </div>
  );
}

const POSITION_ID = '1D.06B';

export default function ChatInterface({
  isOpen,
  onClose,
  suggestions,
  apiEndpoint,
}: ChatInterfaceProps): JSX.Element | null {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status, stop } = useChat<UIMessage>({
    transport: new DefaultChatTransport({
      api: apiEndpoint,
      body: {
        positionId: POSITION_ID,
      },
    }),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error('Chat error:', error);
    },
  });
  const isStreaming = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const sendCurrentMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isStreaming) return;

    try {
      await sendMessage({ text: trimmedInput });
      setInput('');
    } catch {
      // Errors surface via the onError callback from useChat.
    }
  }, [input, isStreaming, sendMessage]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendCurrentMessage();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <div
      className='fixed flex flex-col overflow-hidden rounded-2xl shadow-2xl'
      style={{
        zIndex: 2147483646,
        bottom: '96px',
        left: '24px',
        width: '400px',
        height: '600px',
        backgroundColor: '#FFFFFF',
        animation: 'fadeInUp 200ms ease-out',
      }}
    >
      {/* Header */}
      <div
        className='flex items-center justify-between px-4 py-3'
        style={{
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        <div className='flex items-center gap-2'>
          <div
            className='flex h-8 w-8 items-center justify-center rounded-full'
            style={{ backgroundColor: '#1e1b4b' }}
          >
            <span className='text-xs font-medium text-white'>T</span>
          </div>
          <span className='text-sm font-semibold' style={{ color: '#18181b' }}>
            TeamMe
          </span>
        </div>
        <button
          type='button'
          onClick={onClose}
          className='rounded-md p-1.5 transition-colors hover:bg-gray-100'
          aria-label='Close chat'
        >
          <X size={18} color='#71717a' />
        </button>
      </div>

      {/* Messages Area or Suggested Actions */}
      {hasMessages ? (
        <div className='flex-1 overflow-y-auto px-4 py-4'>
          <div className='flex flex-col gap-6'>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            {isStreaming && (
              <div className='flex gap-3'>
                <div
                  className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full'
                  style={{ backgroundColor: '#1e1b4b' }}
                >
                  <span className='text-xs font-medium text-white'>T</span>
                </div>
                <div className='flex items-center gap-1 py-2'>
                  <div
                    className='h-2 w-2 animate-bounce rounded-full bg-gray-400'
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className='h-2 w-2 animate-bounce rounded-full bg-gray-400'
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className='h-2 w-2 animate-bounce rounded-full bg-gray-400'
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <SuggestedActions
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      {/* Input Area */}
      <div className='px-4 pb-4'>
        <div
          className='flex flex-col rounded-2xl border'
          style={{
            borderColor: '#e4e4e7',
            backgroundColor: '#fafafa',
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Send a message...'
            rows={1}
            className='w-full resize-none bg-transparent px-4 pb-2 pt-3 text-sm outline-none'
            style={{
              border: 'none',
              color: '#18181b',
              minHeight: '44px',
              maxHeight: '200px',
            }}
          />
          <div className='flex items-center justify-between px-3 pb-2'>
            <button
              type='button'
              className='rounded-md p-1.5 transition-colors hover:bg-gray-200'
              aria-label='Attach file'
            >
              <Paperclip size={18} color='#71717a' />
            </button>
            {isStreaming ? (
              <button
                type='button'
                onClick={() => {
                  stop();
                }}
                className='rounded-full p-2 transition-colors'
                style={{
                  backgroundColor: '#18181b',
                }}
                aria-label='Stop generating'
              >
                <Square size={14} color='#FFFFFF' fill='#FFFFFF' />
              </button>
            ) : (
              <button
                type='button'
                onClick={() => {
                  sendCurrentMessage();
                }}
                className='rounded-full p-2 transition-colors'
                style={{
                  backgroundColor:
                    input.trim() && !isStreaming ? '#18181b' : '#e4e4e7',
                  cursor: input.trim() && !isStreaming ? 'pointer' : 'default',
                }}
                aria-label='Send message'
                disabled={!input.trim() || isStreaming}
              >
                <ArrowUp
                  size={14}
                  color={input.trim() && !isStreaming ? '#FFFFFF' : '#a1a1aa'}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
