import { JSX } from 'react';
import { MessageSquare } from 'lucide-react';

import { CHAT_COLORS, SuggestionItem } from './types';

interface ChatSuggestionsProps {
  suggestions: SuggestionItem[];
  onSuggestionClick: (text: string) => void;
}

export default function ChatSuggestions({
  suggestions,
  onSuggestionClick,
}: ChatSuggestionsProps): JSX.Element {
  return (
    <div className='relative flex flex-1 flex-col items-center justify-center px-6 py-8'>
      {/* Decorative background gradient circles */}
      <div
        className='pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full opacity-5 blur-3xl'
        style={{
          background: `radial-gradient(circle, ${CHAT_COLORS.primary} 0%, transparent 70%)`,
        }}
      />
      <div
        className='pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full opacity-5 blur-3xl'
        style={{
          background: `radial-gradient(circle, ${CHAT_COLORS.primaryDark} 0%, transparent 70%)`,
        }}
      />

      <div className='relative z-10 mb-12 text-center'>
        {/* Animated icon container */}
        <div className='relative mx-auto mb-5'>
          <div
            className='absolute inset-0 rounded-3xl opacity-20 blur-xl'
            style={{
              background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 70%)`,
            }}
          />

          <h2
            className='mb-2 text-3xl font-bold tracking-tight'
            style={{ color: CHAT_COLORS.text.primary }}
          >
            How can I help you?
          </h2>
          <p
            className='text-base font-medium'
            style={{ color: CHAT_COLORS.text.secondary }}
          >
            Choose a prompt below or ask me anything
          </p>
        </div>
      </div>

      <div className='relative z-10 grid w-full max-w-md grid-cols-1 gap-3'>
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.text}
            type='button'
            onClick={() => onSuggestionClick(suggestion.text)}
            className='group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
            style={{
              borderColor: CHAT_COLORS.border,
              color: CHAT_COLORS.text.primary,
              backgroundColor: CHAT_COLORS.background,
              animation: `fadeInUp 400ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms both`,
            }}
          >
            {/* Hover gradient effect */}
            <div
              className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
              style={{
                background: `linear-gradient(135deg, ${CHAT_COLORS.surface} 0%, transparent 100%)`,
              }}
            />

            <div className='relative flex items-center gap-4'>
              {/* Icon container with gradient background */}
              <div
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md'
                style={{
                  background: `linear-gradient(135deg, ${CHAT_COLORS.primary}15 0%, ${CHAT_COLORS.primaryLight}15 100%)`,
                }}
              >
                <MessageSquare
                  size={18}
                  strokeWidth={2.5}
                  style={{ color: CHAT_COLORS.primary }}
                  className='transition-transform duration-300 group-hover:scale-110'
                />
              </div>

              {/* Text content */}
              <span className='flex-1 text-[15px] font-medium leading-relaxed'>
                {suggestion.text}
              </span>

              {/* Arrow indicator */}
              <div
                className='translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100'
                style={{ color: CHAT_COLORS.primary }}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6 12L10 8L6 4'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
