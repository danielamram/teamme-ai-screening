import { JSX } from 'react';

import { MorphingBlob } from '@/components/MorphingBall';

import { CHAT_COLORS } from './types';

interface Prompt {
  question: string;
  description?: string;
}

interface ChatSuggestionsProps {
  onPromptClick: (question: string) => void;
}

const PREDEFINED_PROMPTS: Prompt[] = [
  {
    question: 'Show me the top candidates for this position',
    description: 'View candidates ranked by match score',
  },
  {
    question: 'Find candidates with specific skills',
    description: 'Search by technical skills or experience',
  },
  {
    question: 'What are the next steps for this position?',
    description: 'Get suggested actions and recommendations',
  },
  {
    question: 'Summarize candidate pipeline status',
    description: 'Overview of all candidates in the hiring process',
  },
];

export default function ChatSuggestions({
  onPromptClick,
}: ChatSuggestionsProps): JSX.Element {
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

        {/* Predefined Prompts */}
        <div className='w-full max-w-sm'>
          <div className='flex flex-col gap-2'>
            {PREDEFINED_PROMPTS.map((prompt) => (
              <button
                key={prompt.question}
                type='button'
                onClick={() => onPromptClick(prompt.question)}
                className='group w-full rounded-xl px-4 py-3 text-left transition-all duration-200 active:scale-[0.98]'
                style={{
                  backgroundColor: '#f8f9fb',
                  border: `1px solid ${CHAT_COLORS.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f2f5';
                  e.currentTarget.style.borderColor = `${CHAT_COLORS.primary}40`;
                  e.currentTarget.style.boxShadow = `0 2px 8px ${CHAT_COLORS.primary}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fb';
                  e.currentTarget.style.borderColor = CHAT_COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <p
                  className='text-sm font-medium leading-relaxed'
                  style={{ color: CHAT_COLORS.text.primary }}
                >
                  {prompt.question}
                </p>
                {prompt.description && (
                  <p
                    className='mt-1 text-xs'
                    style={{ color: CHAT_COLORS.text.muted }}
                  >
                    {prompt.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
