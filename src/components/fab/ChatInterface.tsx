import React, { JSX, useRef, useEffect } from 'react';
import { ArrowUp, Copy, Check, X, Paperclip, Square } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface SuggestionItem {
  text: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onSuggestionClick: (text: string) => void;
  suggestions: SuggestionItem[];
  messages: Message[];
  isLoading?: boolean;
  onStop?: () => void;
}

function MessageItem({ message }: { message: Message }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] rounded-2xl px-4 py-3"
          style={{
            backgroundColor: '#f4f4f5',
          }}
        >
          <p className="text-sm whitespace-pre-wrap" style={{ color: '#18181b' }}>
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: '#1e1b4b' }}
        >
          <span className="text-xs font-medium text-white">T</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm whitespace-pre-wrap" style={{ color: '#18181b' }}>
            {message.content}
          </p>
        </div>
      </div>
      <div className="flex gap-1 ml-11">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
          aria-label="Copy message"
        >
          {copied ? (
            <Check size={14} color="#10b981" />
          ) : (
            <Copy size={14} color="#71717a" />
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
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <div className="mb-8">
        <h2
          className="text-center text-2xl font-semibold"
          style={{ color: '#18181b' }}
        >
          How can I help you today?
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.text}
            type="button"
            onClick={() => onSuggestionClick(suggestion.text)}
            className="rounded-xl border px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50"
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

export default function ChatInterface({
  isOpen,
  onClose,
  inputValue,
  onInputChange,
  onSubmit,
  onSuggestionClick,
  suggestions,
  messages,
  isLoading = false,
  onStop,
}: ChatInterfaceProps): JSX.Element | null {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  }, [inputValue]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div
      className="fixed flex flex-col overflow-hidden rounded-2xl shadow-2xl"
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
        className="flex items-center justify-between px-4 py-3"
        style={{
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: '#1e1b4b' }}
          >
            <span className="text-xs font-medium text-white">T</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: '#18181b' }}>
            TeamMe
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 transition-colors hover:bg-gray-100"
          aria-label="Close chat"
        >
          <X size={18} color="#71717a" />
        </button>
      </div>

      {/* Messages Area or Suggested Actions */}
      {hasMessages ? (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-6">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#1e1b4b' }}
                >
                  <span className="text-xs font-medium text-white">T</span>
                </div>
                <div className="flex items-center gap-1 py-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <SuggestedActions
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
      )}

      {/* Input Area */}
      <div className="px-4 pb-4">
        <div
          className="flex flex-col rounded-2xl border"
          style={{
            borderColor: '#e4e4e7',
            backgroundColor: '#fafafa',
          }}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            rows={1}
            className="w-full resize-none bg-transparent px-4 pt-3 pb-2 text-sm outline-none"
            style={{
              border: 'none',
              color: '#18181b',
              minHeight: '44px',
              maxHeight: '200px',
            }}
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <button
              type="button"
              className="rounded-md p-1.5 transition-colors hover:bg-gray-200"
              aria-label="Attach file"
            >
              <Paperclip size={18} color="#71717a" />
            </button>
            {isLoading ? (
              <button
                type="button"
                onClick={onStop}
                className="rounded-full p-2 transition-colors"
                style={{
                  backgroundColor: '#18181b',
                }}
                aria-label="Stop generating"
              >
                <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                className="rounded-full p-2 transition-colors"
                style={{
                  backgroundColor: inputValue.trim() ? '#18181b' : '#e4e4e7',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                }}
                aria-label="Send message"
                disabled={!inputValue.trim()}
              >
                <ArrowUp
                  size={14}
                  color={inputValue.trim() ? '#FFFFFF' : '#a1a1aa'}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
