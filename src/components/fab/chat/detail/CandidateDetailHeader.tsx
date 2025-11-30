import { ArrowLeft } from 'lucide-react';
import { JSX } from 'react';

import { CHAT_COLORS } from '../types';

interface CandidateDetailHeaderProps {
  candidateName: string;
  score: number;
  scoreColor: string;
  onBack: () => void;
}

export default function CandidateDetailHeader({
  candidateName,
  score,
  scoreColor,
  onBack,
}: CandidateDetailHeaderProps): JSX.Element {
  return (
    <div
      className='sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3 backdrop-blur-md'
      style={{
        borderColor: CHAT_COLORS.border,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <button
        aria-label='Back to chat'
        type='button'
        onClick={onBack}
        className='flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200'
        style={{
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = CHAT_COLORS.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <ArrowLeft size={18} style={{ color: CHAT_COLORS.text.secondary }} />
      </button>
      <div className='flex flex-1 items-center justify-between overflow-hidden'>
        <h3
          className='truncate text-base font-semibold'
          style={{ color: CHAT_COLORS.text.primary }}
        >
          {candidateName}
        </h3>
        <div
          className='flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold'
          style={{
            backgroundColor: `${scoreColor}10`,
            color: scoreColor,
            border: `1px solid ${scoreColor}20`,
          }}
        >
          <span>{score}</span>
          <span className='text-[10px] opacity-70'>/100</span>
        </div>
      </div>
    </div>
  );
}
