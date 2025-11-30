import { ArrowLeft, Loader2 } from 'lucide-react';
import { JSX } from 'react';

import { CHAT_COLORS } from '../types';

import { EXTENDED_COLORS } from './colors';

interface CandidateDetailLoadingProps {
  onBack: () => void;
}

export default function CandidateDetailLoading({
  onBack,
}: CandidateDetailLoadingProps): JSX.Element {
  return (
    <div
      className='flex h-full flex-col'
      style={{ backgroundColor: CHAT_COLORS.background }}
    >
      {/* Header with Back Button */}
      <div
        className='flex items-center gap-3 border-b px-4 py-3'
        style={{ borderColor: CHAT_COLORS.border }}
      >
        <button
          type='button'
          aria-label='Back to chat'
          onClick={onBack}
          className='flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-opacity-10'
          style={{
            backgroundColor: `${CHAT_COLORS.primary}08`,
          }}
        >
          <ArrowLeft size={18} style={{ color: CHAT_COLORS.primary }} />
        </button>
        <div
          className='h-5 w-32 animate-pulse rounded'
          style={{ backgroundColor: CHAT_COLORS.borderLight }}
        />
      </div>

      {/* Loading State */}
      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <div className='relative'>
            <div
              className='absolute inset-0 animate-ping rounded-full opacity-75'
              style={{ backgroundColor: EXTENDED_COLORS.indigo[100] }}
            />
            <Loader2
              size={40}
              className='relative animate-spin'
              style={{ color: CHAT_COLORS.primary }}
            />
          </div>
          <div className='space-y-1'>
            <p
              className='text-sm font-medium'
              style={{ color: CHAT_COLORS.text.primary }}
            >
              Analyzing Profile
            </p>
            <p className='text-xs' style={{ color: CHAT_COLORS.text.muted }}>
              Gathering insights and details...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
