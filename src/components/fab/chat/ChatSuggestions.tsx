import { JSX } from 'react';
import { Building2, Clock, Search, Target, Trophy, Users } from 'lucide-react';

import { CHAT_COLORS, SuggestionItem } from './types';

interface ChatSuggestionsProps {
  suggestions: SuggestionItem[];
  onSuggestionClick: (text: string) => void;
}

const getIconForType = (iconType: SuggestionItem['icon']) => {
  switch (iconType) {
    case 'search':
      return Search;
    case 'building':
      return Building2;
    case 'trophy':
      return Trophy;
    case 'clock':
      return Clock;
    case 'users':
      return Users;
    case 'target':
      return Target;
    default:
      return Search;
  }
};

export default function ChatSuggestions({
  suggestions,
  onSuggestionClick,
}: ChatSuggestionsProps): JSX.Element {
  return (
    <div className='relative flex flex-1 flex-col items-center justify-center px-6 py-6'>
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

      {/* Header Section - Tighter spacing */}
      <div className='relative z-10 mb-8 text-center'>
        <h2
          className='mb-1.5 text-2xl font-bold tracking-tight'
          style={{ color: CHAT_COLORS.text.primary }}
        >
          Let&apos;s find your next hire
        </h2>
        <p
          className='text-sm font-medium'
          style={{ color: CHAT_COLORS.text.secondary }}
        >
          Try a quick search or ask me anything
        </p>
      </div>

      {/* Suggestions Grid - 2 column layout */}
      <div className='relative z-10 grid w-full max-w-md grid-cols-2 gap-3'>
        {suggestions.map((suggestion, index) => {
          const IconComponent = getIconForType(suggestion.icon);
          return (
            <button
              key={suggestion.text}
              type='button'
              onClick={() => onSuggestionClick(suggestion.text)}
              className='group relative overflow-hidden rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
              style={{
                borderColor: CHAT_COLORS.border,
                color: CHAT_COLORS.text.primary,
                backgroundColor: CHAT_COLORS.background,
                animation: `fadeInUp 300ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms both`,
              }}
            >
              {/* Hover gradient effect */}
              <div
                className='absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                style={{
                  background: `linear-gradient(135deg, ${CHAT_COLORS.primary}08 0%, ${CHAT_COLORS.primaryLight}08 100%)`,
                }}
              />

              <div className='relative flex flex-col gap-3'>
                {/* Icon container with gradient background */}
                <div className='flex items-center justify-between'>
                  <div
                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-md'
                    style={{
                      background: `linear-gradient(135deg, ${CHAT_COLORS.primary}20 0%, ${CHAT_COLORS.primaryLight}20 100%)`,
                    }}
                  >
                    <IconComponent
                      size={16}
                      strokeWidth={2.5}
                      style={{ color: CHAT_COLORS.primary }}
                      className='transition-transform duration-200'
                    />
                  </div>

                  {/* Arrow indicator */}
                  <div
                    className='translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100'
                    style={{ color: CHAT_COLORS.primary }}
                  >
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6 12L10 8L6 4'
                        stroke='currentColor'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>

                {/* Text content */}
                <span className='text-[13px] font-semibold leading-snug'>
                  {suggestion.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
