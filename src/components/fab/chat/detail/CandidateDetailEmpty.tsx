import { ArrowLeft, User } from 'lucide-react';
import { JSX } from 'react';

import { CHAT_COLORS } from '../types';

import { EXTENDED_COLORS } from './colors';

interface CandidateDetailEmptyProps {
  onBack: () => void;
}

export default function CandidateDetailEmpty({
  onBack,
}: CandidateDetailEmptyProps): JSX.Element {
  return (
    <div
      className='flex h-full flex-col'
      style={{ backgroundColor: CHAT_COLORS.background }}
    >
      <div
        className='flex items-center gap-3 border-b px-4 py-3'
        style={{ borderColor: CHAT_COLORS.border }}
      >
        <button
          aria-label='Back to chat'
          type='button'
          onClick={onBack}
          className='flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-opacity-10'
          style={{
            backgroundColor: `${CHAT_COLORS.primary}08`,
          }}
        >
          <ArrowLeft size={18} style={{ color: CHAT_COLORS.primary }} />
        </button>
        <h3
          className='text-base font-semibold'
          style={{ color: CHAT_COLORS.text.primary }}
        >
          Details Unavailable
        </h3>
      </div>

      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='flex flex-col items-center gap-3 text-center'>
          <div
            className='rounded-full p-3'
            style={{ backgroundColor: EXTENDED_COLORS.red[50] }}
          >
            <User size={24} style={{ color: CHAT_COLORS.error }} />
          </div>
          <p
            className='text-sm font-medium'
            style={{ color: CHAT_COLORS.text.primary }}
          >
            Candidate profile not found
          </p>
          <button
            type='button'
            onClick={onBack}
            className='mt-2 rounded-lg px-4 py-2 text-sm font-medium transition-shadow hover:shadow-md'
            style={{
              backgroundColor: CHAT_COLORS.primary,
              color: CHAT_COLORS.background,
            }}
          >
            Return to Chat
          </button>
        </div>
      </div>
    </div>
  );
}
