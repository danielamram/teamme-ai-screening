import { Lightbulb } from 'lucide-react';
import { JSX } from 'react';

import { CHAT_COLORS } from '../types';

import { EXTENDED_COLORS } from './colors';

interface RecommendationBannerProps {
  recommendation: string;
}

export default function RecommendationBanner({
  recommendation,
}: RecommendationBannerProps): JSX.Element {
  return (
    <div
      className='overflow-hidden rounded-3xl border shadow-lg transition-shadow hover:shadow-xl'
      style={{
        borderColor: `${CHAT_COLORS.primary}40`,
        background: `linear-gradient(to bottom right, ${EXTENDED_COLORS.indigo[50]}, ${EXTENDED_COLORS.indigo[50]}80, ${CHAT_COLORS.background})`,
      }}
    >
      <div
        className='border-b px-5 py-4'
        style={{
          borderColor: `${EXTENDED_COLORS.indigo[100]}99`,
          background: `linear-gradient(to right, ${EXTENDED_COLORS.indigo[50]}, transparent)`,
        }}
      >
        <div className='flex items-center gap-3'>
          <div
            className='flex h-9 w-9 items-center justify-center rounded-xl shadow-md'
            style={{
              background: `linear-gradient(to bottom right, ${CHAT_COLORS.primary}, ${CHAT_COLORS.primaryDark})`,
              color: CHAT_COLORS.background,
            }}
          >
            <Lightbulb size={18} style={{ fill: CHAT_COLORS.background }} />
          </div>
          <div>
            <span
              className='text-sm font-bold'
              style={{ color: EXTENDED_COLORS.indigo[900] }}
            >
              AI Recommendation
            </span>
            <p
              className='text-xs'
              style={{ color: `${EXTENDED_COLORS.indigo[600]}b3` }}
            >
              Powered by advanced analysis
            </p>
          </div>
        </div>
      </div>
      <div className='p-5'>
        <p
          className='text-sm leading-relaxed'
          style={{ color: EXTENDED_COLORS.slate[700] }}
        >
          {recommendation}
        </p>
      </div>
    </div>
  );
}
