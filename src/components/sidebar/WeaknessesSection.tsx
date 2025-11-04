import { JSX } from 'react';
import type { Weakness } from '@/types/candidate';
import { AlertCircle } from 'lucide-react';

import { COLORS } from '@/constants/design';

interface WeaknessesSectionProps {
  weaknesses: Weakness[];
}

export default function WeaknessesSection({
  weaknesses,
}: WeaknessesSectionProps): JSX.Element {
  if (weaknesses.length === 0) {
    return (
      <div className='p-4'>
        <h3 className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400'>
          Areas for Improvement
        </h3>
        <p className='text-sm italic text-slate-500'>
          No significant weaknesses identified
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-3 p-4'>
      <h3 className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400'>
        Areas for Improvement
      </h3>

      <div className='space-y-2'>
        {weaknesses.map((weakness, index) => (
          <div
            key={weakness.id}
            className='flex gap-3 rounded-lg border border-orange-900/30 bg-orange-950/20 p-3 transition-all hover:border-orange-800/50 hover:bg-orange-950/30'
            style={{
              animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
            }}
          >
            <AlertCircle
              size={20}
              className='mt-0.5 flex-shrink-0'
              style={{ color: COLORS.warning }}
            />
            <p className='text-sm leading-relaxed text-slate-200'>
              {weakness.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
