import { JSX } from 'react';
import type { Strength } from '@/types/candidate';
import { CheckCircle2 } from 'lucide-react';

import { COLORS } from '@/constants/design';

interface StrengthsSectionProps {
  strengths: Strength[];
}

export default function StrengthsSection({
  strengths,
}: StrengthsSectionProps): JSX.Element {
  return (
    <div className='space-y-3 p-4'>
      <h3 className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400'>
        Key Strengths
      </h3>

      <div className='space-y-2'>
        {strengths.map((strength, index) => (
          <div
            key={strength.id}
            className='flex gap-3 rounded-lg border border-green-900/30 bg-green-950/20 p-3 transition-all hover:border-green-800/50 hover:bg-green-950/30'
            style={{
              animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
            }}
          >
            <CheckCircle2
              size={20}
              className='mt-0.5 flex-shrink-0'
              style={{ color: COLORS.success }}
            />
            <p className='text-sm leading-relaxed text-slate-200'>
              {strength.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
