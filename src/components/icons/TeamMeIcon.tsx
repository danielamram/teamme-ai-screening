import { JSX } from 'react';

interface TeamMeIconProps {
  // eslint-disable-next-line react/require-default-props
  size?: number;
  // eslint-disable-next-line react/require-default-props
  color?: string;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

export default function TeamMeIcon({
  size = 24,
  color = 'currentColor',
  className = '',
}: TeamMeIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={{ color }}
    >
      {/* Message bubble */}
      <path
        d='M20 11.5C20 15.6421 16.4183 19 12 19C10.8583 19 9.77417 18.7717 8.79167 18.3617L4 20L5.50833 15.9383C4.56333 14.8442 4 13.4367 4 11.9167C4 7.77458 7.58167 4.41667 12 4.41667C16.4183 4.41667 20 7.77458 20 11.5Z'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* AI Sparkle - Top Right */}
      <path
        d='M19 3V4.5M19 4.5V6M19 4.5H20.5M19 4.5H17.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />

      {/* AI Sparkle - Top Left */}
      <path
        d='M6.5 6V7M6.5 7V8M6.5 7H7.5M6.5 7H5.5'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
      />

      {/* AI Dots inside message (representing AI processing) */}
      <circle cx='9' cy='11.5' r='1' fill='currentColor' />
      <circle cx='12' cy='11.5' r='1' fill='currentColor' />
      <circle cx='15' cy='11.5' r='1' fill='currentColor' />
    </svg>
  );
}
