import { JSX } from 'react';

import { MorphingBlob } from '@/components/MorphingBall';

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
      {/* Main Content - Centered */}
      <div className='flex flex-1 flex-col items-center justify-center'>
        {/* Large Gradient Orb */}
        <div className='relative mb-12 h-48 w-48'>
          <MorphingBlob size={180} />
        </div>

        {/* Greeting Text */}
        <div className='mb-10 text-center'>
          <p
            className='mb-2 text-base'
            style={{ color: CHAT_COLORS.text.secondary }}
          >
            Hi, I&apos;m{' '}
            <span style={{ color: CHAT_COLORS.primary }}>Anna</span>
          </p>
          <h2
            className='text-3xl font-extrabold tracking-tight'
            style={{ color: CHAT_COLORS.text.primary }}
          >
            How can I help
            <br />
            you today?
          </h2>
        </div>
      </div>
    </div>
  );
}
