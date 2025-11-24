import { JSX, useState } from 'react';
import {
  ArrowUp,
  ChevronDown,
  CornerDownRight,
  Menu,
  MessageCircle,
  Plus,
  X,
} from 'lucide-react';

interface SuggestionItem {
  text: string;
}

const suggestions: SuggestionItem[] = [
  { text: 'What can TeamMe help me with' },
  { text: 'Summarize my recent activity' },
  { text: 'Help me get started' },
];

export default function FabHelpMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messageCount] = useState(1);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // Handle message submission
      console.log('Submitted:', inputValue);
      setInputValue('');
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className='fixed inset-0'
          style={{
            zIndex: 2147483645,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
          role='button'
          tabIndex={0}
          aria-label='Close menu'
        />
      )}

      {/* FAB Button */}
      <button
        type='button'
        onClick={toggleMenu}
        className='fixed flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:shadow-xl'
        style={{
          zIndex: 2147483647,
          bottom: '24px',
          left: '24px',
          width: '56px',
          height: '56px',
          backgroundColor: '#1e1b4b',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label={isOpen ? 'Close help menu' : 'Open help menu'}
      >
        {isOpen ? (
          <ChevronDown size={24} color='#FFFFFF' />
        ) : (
          <>
            <MessageCircle size={24} color='#FFFFFF' fill='#FFFFFF' />
            {messageCount > 0 && (
              <span
                className='absolute flex items-center justify-center rounded-full text-xs font-semibold'
                style={{
                  top: '-4px',
                  right: '-4px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#ef4444',
                  color: '#FFFFFF',
                }}
              >
                {messageCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Menu Popup */}
      {isOpen && (
        <div
          className='fixed flex flex-col overflow-hidden rounded-2xl shadow-2xl'
          style={{
            zIndex: 2147483646,
            bottom: '96px',
            left: '24px',
            width: '380px',
            height: '600px',
            backgroundColor: '#FFFFFF',
            animation: 'fadeInUp 200ms ease-out',
          }}
        >
          {/* Header */}
          <div
            className='flex items-center justify-between px-4 py-3'
            style={{
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='rounded-full p-2 transition-colors hover:bg-gray-100'
                aria-label='Menu'
              >
                <Menu size={20} color='#5f6368' />
              </button>
              <span
                className='text-lg font-medium'
                style={{ color: '#1f1f1f' }}
              >
                TeamMe
              </span>
            </div>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='rounded-full p-2 transition-colors hover:bg-gray-100'
              aria-label='Close menu'
            >
              <X size={20} color='#5f6368' />
            </button>
          </div>

          {/* Main Content */}
          <div className='flex flex-1 flex-col items-center justify-center px-6'>
            <h2
              className='text-center text-2xl font-normal'
              style={{
                background: 'linear-gradient(90deg, #4285f4, #34a853, #fbbc05, #ea4335)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ask about your work
            </h2>
          </div>

          {/* Suggestions */}
          <div className='px-4 pb-4'>
            <div className='flex flex-col gap-2'>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.text}
                  type='button'
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className='flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-gray-50'
                  style={{
                    color: '#1f1f1f',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <CornerDownRight size={16} color='#5f6368' />
                  <span className='text-sm'>{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className='px-4 pb-3'>
            <div
              className='flex items-center gap-2 rounded-2xl border px-4 py-3'
              style={{
                borderColor: '#e5e7eb',
                backgroundColor: '#f8f9fa',
              }}
            >
              <button
                type='button'
                className='rounded-full p-1 transition-colors hover:bg-gray-200'
                aria-label='Add attachment'
              >
                <Plus size={20} color='#5f6368' />
              </button>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
                placeholder='Ask TeamMe'
                className='flex-1 bg-transparent text-sm outline-none'
                style={{
                  border: 'none',
                  color: '#1f1f1f',
                }}
              />
              <button
                type='button'
                onClick={handleSubmit}
                className='rounded-full p-2 transition-colors'
                style={{
                  backgroundColor: inputValue.trim() ? '#1e1b4b' : '#e5e7eb',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                }}
                aria-label='Send message'
                disabled={!inputValue.trim()}
              >
                <ArrowUp
                  size={16}
                  color={inputValue.trim() ? '#FFFFFF' : '#9ca3af'}
                />
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className='px-4 pb-4 text-center'>
            <p className='text-xs' style={{ color: '#5f6368' }}>
              TeamMe AI can make mistakes, so double-check responses.{' '}
              <a
                href='#learn-more'
                className='underline'
                style={{ color: '#5f6368' }}
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
