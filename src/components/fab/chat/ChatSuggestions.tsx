import { JSX } from 'react';

import { MorphingBlob } from '@/components/MorphingBall';

import { CHAT_COLORS } from './types';

export default function ChatSuggestions(): JSX.Element {
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
            <span style={{ color: CHAT_COLORS.primary }}>Aaron</span>
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
