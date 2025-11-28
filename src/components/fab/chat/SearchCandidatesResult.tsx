import { JSX } from 'react';
import { Check } from 'lucide-react';
import type { Candidate } from './CandidateCard';

import CandidateCard from './CandidateCard';
import { CHAT_COLORS } from './types';

export interface SearchCandidatesOutput {
  candidates: Candidate[];
  totalFound: number;
}

export default function SearchCandidatesResult({
  output,
}: {
  output: SearchCandidatesOutput;
}): JSX.Element {
  return (
    <div className='space-y-4'>
      {/* Subtle success indicator */}
      <div
        className='flex items-center gap-2 rounded-lg border px-3 py-2'
        style={{
          backgroundColor: `${CHAT_COLORS.success}08`,
          borderColor: `${CHAT_COLORS.success}30`,
        }}
      >
        <Check
          size={16}
          style={{ color: CHAT_COLORS.success }}
          className='shrink-0'
        />
        <span
          className='text-sm font-medium'
          style={{ color: CHAT_COLORS.text.primary }}
        >
          Found {output.totalFound} candidate
          {output.totalFound !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Candidate Cards */}
      <div className='space-y-3'>
        {output.candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}
