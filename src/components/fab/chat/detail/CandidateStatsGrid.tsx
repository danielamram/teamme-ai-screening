import { Briefcase, GraduationCap } from 'lucide-react';
import { JSX } from 'react';

import { CHAT_COLORS } from '../types';

import { EXTENDED_COLORS } from './colors';

interface CandidateStatsGridProps {
  yearsOfExperience: number;
  educationSummary?: string;
}

export default function CandidateStatsGrid({
  yearsOfExperience,
  educationSummary,
}: CandidateStatsGridProps): JSX.Element {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {/* Experience Stat */}
      <div
        className='group relative overflow-hidden rounded-2xl border p-5 shadow-md transition-all hover:shadow-lg'
        style={{
          borderColor: CHAT_COLORS.border,
          background: `linear-gradient(to bottom right, ${CHAT_COLORS.background}, ${CHAT_COLORS.surface})`,
        }}
      >
        <div
          className='absolute right-0 top-0 h-20 w-20 rounded-bl-full opacity-0 transition-opacity group-hover:opacity-100'
          style={{
            background: `linear-gradient(to bottom right, ${EXTENDED_COLORS.indigo[100]}80, transparent)`,
          }}
        />
        <div className='relative mb-3 flex items-center gap-2.5'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-xl'
            style={{
              background: `linear-gradient(to bottom right, ${EXTENDED_COLORS.indigo[100]}, ${EXTENDED_COLORS.indigo[50]})`,
              color: EXTENDED_COLORS.indigo[600],
            }}
          >
            <Briefcase size={18} />
          </div>
          <span
            className='text-xs font-bold uppercase tracking-wider'
            style={{ color: CHAT_COLORS.text.secondary }}
          >
            Experience
          </span>
        </div>
        <div
          className='relative text-3xl font-bold'
          style={{ color: EXTENDED_COLORS.slate[900] }}
        >
          {yearsOfExperience}
          <span
            className='ml-1 text-lg font-semibold'
            style={{ color: CHAT_COLORS.primary }}
          >
            +
          </span>
          <span
            className='ml-2 text-sm font-medium'
            style={{ color: CHAT_COLORS.text.secondary }}
          >
            Years
          </span>
        </div>
      </div>

      {/* Education Stat */}
      <div
        className='group relative overflow-hidden rounded-2xl border p-5 shadow-md transition-all hover:shadow-lg'
        style={{
          borderColor: CHAT_COLORS.border,
          background: `linear-gradient(to bottom right, ${CHAT_COLORS.background}, ${CHAT_COLORS.surface})`,
        }}
      >
        <div
          className='absolute right-0 top-0 h-20 w-20 rounded-bl-full opacity-0 transition-opacity group-hover:opacity-100'
          style={{
            background: `linear-gradient(to bottom right, ${EXTENDED_COLORS.emerald[100]}80, transparent)`,
          }}
        />
        <div className='relative mb-3 flex items-center gap-2.5'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-xl'
            style={{
              background: `linear-gradient(to bottom right, ${EXTENDED_COLORS.emerald[100]}, ${EXTENDED_COLORS.emerald[50]})`,
              color: EXTENDED_COLORS.emerald[600],
            }}
          >
            <GraduationCap size={18} />
          </div>
          <span
            className='text-xs font-bold uppercase tracking-wider'
            style={{ color: CHAT_COLORS.text.secondary }}
          >
            Education
          </span>
        </div>
        <div
          className='relative line-clamp-2 text-sm font-semibold leading-snug'
          style={{ color: EXTENDED_COLORS.slate[900] }}
        >
          {educationSummary?.split('.')[0] || 'Not specified'}
        </div>
      </div>
    </div>
  );
}
