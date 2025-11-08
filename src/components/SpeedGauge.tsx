import { useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp, TriangleAlert } from 'lucide-react';

import {
  formatRecommendationLevel,
  getRecommendationColor,
} from '@/constants/design';

interface SpeedGaugeProps {
  speed: number;
}

const MAX_SPEED = 100;

const getIcon = (level: 'strong-hire' | 'consider' | 'pass') => {
  const color = getRecommendationColor(level);
  switch (level) {
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

const getRecommendationLevel = (
  speed: number
): 'strong-hire' | 'consider' | 'pass' => {
  if (speed >= 80) return 'strong-hire';
  if (speed >= 55) return 'consider';
  return 'pass';
};

export default function SpeedGauge({ speed }: SpeedGaugeProps) {
  console.log('speed', speed);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  useEffect(() => {
    const increment = speed > currentSpeed ? 0.5 : -0.5;
    const timer = setInterval(() => {
      setCurrentSpeed((prev) => {
        if (Math.abs(speed - prev) < Math.abs(increment)) {
          return speed;
        }
        return prev + increment;
      });
    }, 2);

    return () => clearInterval(timer);
  }, [speed, currentSpeed]);

  const level = getRecommendationLevel(speed);
  const color = getRecommendationColor(level);

  // Clamp speed to 1-10 range
  const clampedSpeed = Math.min(Math.max(currentSpeed, 1), MAX_SPEED);

  const angle = -135 + ((clampedSpeed - 1) / (MAX_SPEED - 1)) * 270;

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      <div className='h-50 w-50 relative'>
        {/* Gauge background circle */}
        <svg className='h-full w-full' viewBox='0 0 200 200'>
          <defs>
            <linearGradient id='redToOrange' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='rgb(220 38 38)' />
              <stop offset='100%' stopColor='rgb(249 115 22)' />
            </linearGradient>
            <linearGradient
              id='orangeToGreen'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='rgb(249 115 22)' />
              <stop offset='100%' stopColor='rgb(34 197 94)' />
            </linearGradient>
            <linearGradient
              id='redToOrangeToGreen'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='rgb(220 38 38)' />
              <stop offset='33%' stopColor='rgb(249 115 22)' />
              <stop offset='100%' stopColor='rgb(34 197 94)' />
            </linearGradient>
          </defs>

          {/* Full gauge arc (1-10) with gradient from red to orange to green */}
          <path
            d='M 30 155 A 85 85 0 1 1 170 155'
            fill='none'
            stroke='url(#redToOrangeToGreen)'
            strokeWidth='24'
            strokeLinecap='butt'
            opacity='0.9'
          />

          {/* Center circle */}
          <circle
            cx='100'
            cy='100'
            r='8'
            fill='currentColor'
            className='text-foreground'
          />

          {/* Needle */}
          <line
            x1='100'
            y1='100'
            x2='100'
            y2='30'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinecap='round'
            className='text-foreground'
            style={{
              transformOrigin: '100px 100px',
              transform: `rotate(${angle}deg)`,
              transition: 'transform 1.2s ease-in-out',
            }}
          />
        </svg>

        <div className='absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center gap-2 rounded-full px-3 py-1.5'>
            {getIcon(level)}
            <span className='text-sm font-semibold' style={{ color }}>
              {formatRecommendationLevel(level)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
