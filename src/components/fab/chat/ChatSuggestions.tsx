import { JSX } from 'react';
import { Menu, Mic, Plus } from 'lucide-react';

import { CHAT_COLORS, SuggestionItem } from './types';

interface ChatSuggestionsProps {
  suggestions: SuggestionItem[];
  onSuggestionClick: (text: string) => void;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ChatSuggestions(
  _props: ChatSuggestionsProps
): JSX.Element {
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <div className='relative flex flex-1 flex-col px-6 py-8'>
      {/* Hamburger Menu Icon */}
      <div className='absolute left-6 top-6 z-20'>
        <button
          type='button'
          className='rounded-lg p-2 transition-colors hover:bg-gray-100'
          aria-label='Menu'
        >
          <Menu size={24} color='#333333' strokeWidth={2} />
        </button>
      </div>

      {/* Main Content - Centered */}
      <div className='flex flex-1 flex-col items-center justify-center'>
        {/* Large Gradient Orb */}
        <div className='relative mb-12'>
          <div
            className='h-48 w-48 rounded-full'
            style={{
              background: `radial-gradient(circle at 30% 30%, #FFD700 0%, #FFA500 40%, #FF8C00 60%, rgba(255, 215, 0, 0.3) 100%)`,
              boxShadow: '0 20px 60px rgba(255, 165, 0, 0.3)',
            }}
          />
        </div>

        {/* Greeting Text */}
        <div className='mb-10 text-center'>
          <p
            className='mb-2 text-base'
            style={{ color: CHAT_COLORS.text.secondary }}
          >
            Hi <span style={{ color: CHAT_COLORS.text.primary }}>Jay</span>,
            I&apos;m <span style={{ color: '#FFA500' }}>Anna</span>! Your
            personal assistant.
          </p>
          <h2
            className='text-3xl font-bold tracking-tight'
            style={{ color: CHAT_COLORS.text.primary }}
          >
            How can I help
            <br />
            you today?
          </h2>
        </div>

        {/* Search Bar */}
        <div className='w-full max-w-sm'>
          <div
            className='flex items-center gap-3 rounded-full border px-5 py-3 transition-all hover:shadow-md'
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
            <input
              type='text'
              placeholder='Search'
              className='flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400'
              style={{ color: CHAT_COLORS.text.primary }}
            />
            <button
              type='button'
              className='flex-shrink-0 transition-colors hover:opacity-70'
              aria-label='Voice input'
            >
              <Mic size={20} color='#9CA3AF' strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
