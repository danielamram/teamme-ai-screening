import { JSX } from 'react';
import type { Recommendation } from '@/types/candidate';
import { ThumbsDown, ThumbsUp, TriangleAlert } from 'lucide-react';

import {
  formatRecommendationLevel,
  getRecommendationColor,
} from '@/constants/design';

interface RecommendationSectionProps {
  recommendation: Recommendation;
  score: number;
  maxScore: number;
}

export default function RecommendationSection({
  recommendation,
  score,
  maxScore,
}: RecommendationSectionProps): JSX.Element {
  // const animatedScore = useCountUp(score, 1500);
  const percentage = (score / maxScore) * 100;
  const color = getRecommendationColor(recommendation.level);

  const circumference = 2 * Math.PI * 65; // radius = 65
  const offset = circumference - (percentage / 100) * circumference;

  const getIcon = () => {
    switch (recommendation.level) {
      case 'strong-hire':
        return <ThumbsUp size={20} style={{ color }} />;
      case 'consider':
        return <TriangleAlert size={20} style={{ color }} />;
      case 'pass':
        return <ThumbsDown size={20} style={{ color }} />;
      default:
        return <ThumbsUp size={20} style={{ color }} />;
    }
  };

  return (
    <div className='px-3 py-3'>
      <div className='flex flex-col items-center gap-3 rounded-lg px-4 py-5'>
        <div className='relative'>
          {/* Background circle */}
          <svg width='160' height='160' className='rotate-[-90deg] transform'>
            <circle
              cx='80'
              cy='80'
              r='65'
              fill='none'
              stroke='#F1F2F4'
              strokeWidth='10'
            />
            {/* Animated progress circle */}
            <circle
              cx='80'
              cy='80'
              r='65'
              fill='none'
              stroke={color}
              strokeWidth='10'
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap='round'
              style={{
                transition:
                  'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </svg>

          {/* Score display */}
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center gap-2 rounded-full px-3 py-1.5'>
              {getIcon()}
              <span className='text-sm font-semibold' style={{ color }}>
                {formatRecommendationLevel(recommendation.level)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
