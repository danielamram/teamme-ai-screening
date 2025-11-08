import { useEffect, useState } from 'react';

interface SpeedGaugeProps {
  speed: number;
}

const MAX_SPEED = 100;

export default function SpeedGauge({ speed }: SpeedGaugeProps) {
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
    }, 30);

    return () => clearInterval(timer);
  }, [speed, currentSpeed]);

  // Clamp speed to 1-100 range
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

          {/* Full gauge arc (1-100) with gradient from red to orange to green */}
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
      </div>
    </div>
  );
}
