import { JSX } from 'react';

interface RecommendationProps {
  recommendation: string;
}

export default function Recommendation({
  recommendation,
}: RecommendationProps): JSX.Element {
  return (
    <div
      className='space-y-3 border-b px-3 py-3'
      style={{ borderColor: '#E4E6E8' }}
    >
      <div className='flex items-center gap-2'>
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
          <path
            d='M6 0L7.854 4.146L12 6L7.854 7.854L6 12L4.146 7.854L0 6L4.146 4.146L6 0Z'
            fill='#9F9F9F'
          />
        </svg>
        <h3 className='text-sm font-bold' style={{ color: '#292A2E' }}>
          Recommendation
        </h3>
      </div>

      <div className='space-y-2.5'>
        <div
          className='flex gap-2 rounded-lg px-3 py-2.5'
          style={{ backgroundColor: '#F7F8F9' }}
        >
          <p className='text-xs leading-relaxed' style={{ color: '#292A2E' }}>
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
