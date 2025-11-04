import { JSX } from 'react';
import type { Recommendation } from '@/types/candidate';
import type React from 'react';
import { Minus, ThumbsDown, ThumbsUp, TrendingUp } from 'lucide-react';

import {
  formatRecommendationLevel,
  getRecommendationColor,
} from '@/constants/design';

interface RecommendationSectionProps {
  recommendation: Recommendation;
}

export default function RecommendationSection({
  recommendation,
}: RecommendationSectionProps): JSX.Element {
  const color = getRecommendationColor(recommendation.level);

  const getIcon = () => {
    switch (recommendation.level) {
      case 'strong-hire':
        return <ThumbsUp size={20} />;
      case 'consider':
        return <Minus size={20} />;
      case 'pass':
        return <ThumbsDown size={20} />;
      default:
        return <TrendingUp size={20} />;
    }
  };

  return (
    <div className='space-y-4 p-4'>
      <h3 className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400'>
        Final Recommendation
      </h3>

      {/* Recommendation badge */}
      <div
        className='flex items-center justify-between rounded-lg p-4'
        style={{
          backgroundColor: `${color}15`,
          borderLeft: `4px solid ${color}`,
        }}
      >
        <div className='flex items-center gap-3'>
          <div
            className='rounded-lg p-2'
            style={{ backgroundColor: `${color}30` }}
          >
            {getIcon()}
          </div>
          <div>
            <div className='text-lg font-bold' style={{ color }}>
              {formatRecommendationLevel(recommendation.level)}
            </div>
            <div className='text-xs text-slate-400'>
              Confidence: {recommendation.confidenceScore}%
            </div>
          </div>
        </div>

        {/* Confidence indicator */}
        <div
          className='radial-progress text-sm'
          style={
            {
              '--value': recommendation.confidenceScore,
              '--size': '3rem',
              '--thickness': '4px',
              color,
            } as React.CSSProperties
          }
        >
          <span className='text-xs font-bold'>
            {recommendation.confidenceScore}%
          </span>
        </div>
      </div>

      {/* Reasoning */}
      <div className='rounded-lg border border-slate-700 bg-slate-800/30 p-4'>
        <h4 className='mb-2 text-sm font-semibold text-slate-300'>
          Analysis Summary
        </h4>
        <p className='text-sm leading-relaxed text-slate-300'>
          {recommendation.reasoning}
        </p>
      </div>

      {/* Action buttons */}
      <div className='flex gap-2'>
        <button type='button' className='btn btn-primary btn-sm flex-1'>
          View Full Report
        </button>
        <button type='button' className='btn btn-outline btn-sm flex-1'>
          Share Analysis
        </button>
      </div>
    </div>
  );
}
