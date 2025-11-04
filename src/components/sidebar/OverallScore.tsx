import { JSX } from 'react';
import { TrendingUp } from 'lucide-react';

import { getScoreColor } from '@/constants/design';
import { useCountUp } from '@/hooks/useAnimations';

interface OverallScoreProps {
  score: number;
  maxScore: number;
}

export default function OverallScore({
  score,
  maxScore,
}: OverallScoreProps): JSX.Element {
  const animatedScore = useCountUp(score, 1500);
  const percentage = (score / maxScore) * 100;
  const scoreColor = getScoreColor(score);

  const circumference = 2 * Math.PI * 80; // radius = 80
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className='flex flex-col items-center gap-4 p-6'>
      <div className='relative'>
        {/* Background circle */}
        <svg width='200' height='200' className='rotate-[-90deg] transform'>
          <circle
            cx='100'
            cy='100'
            r='80'
            fill='none'
            stroke='rgba(148, 163, 184, 0.2)'
            strokeWidth='12'
          />
          {/* Animated progress circle */}
          <circle
            cx='100'
            cy='100'
            r='80'
            fill='none'
            stroke={scoreColor}
            strokeWidth='12'
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap='round'
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>

        {/* Score display */}
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <div className='flex items-baseline gap-1'>
            <span className='text-5xl font-extrabold text-white'>
              {animatedScore}
            </span>
            <span className='text-2xl font-medium text-slate-400'>
              /{maxScore}
            </span>
          </div>
          <span className='mt-1 text-sm font-medium text-slate-400'>
            Overall Score
          </span>
        </div>
      </div>

      {/* Score label */}
      <div
        className='flex items-center gap-2 rounded-full px-4 py-2'
        style={{ backgroundColor: `${scoreColor}20` }}
      >
        <TrendingUp size={16} style={{ color: scoreColor }} />
        <span className='font-semibold' style={{ color: scoreColor }}>
          {score >= 80 && 'Excellent Candidate'}
          {score >= 70 && score < 80 && 'Strong Candidate'}
          {score >= 60 && score < 70 && 'Moderate Candidate'}
          {score >= 50 && score < 60 && 'Fair Candidate'}
          {score < 50 && 'Weak Candidate'}
        </span>
      </div>
    </div>
  );
}
