import { type CSSProperties, type JSX } from 'react';

import { COLORS } from '@/constants/design';

interface MicrosoftLoopLogoProps {
  size?: number; // Size in rem units
  className?: string;
}

// eslint-disable-next-line import/prefer-default-export
export function AtsAiLogo({
  size = 24,
  className = '',
}: MicrosoftLoopLogoProps): JSX.Element {
  const holeSize = '6px';
  const clrPurple = COLORS.gray[300] as string;
  const clrCyan = COLORS.primary.indigoLight as string;

  const containerStyle: CSSProperties = {
    position: 'relative',
    height: `${size}px`,
    width: `${size}px`,
    borderRadius: '100% 100% 100% 0',
    overflow: 'hidden',
    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2))',
  };

  const beforeStyle: CSSProperties = {
    content: '""',
    display: 'block',
    position: 'absolute',
    inset: '0',
    background: `conic-gradient(from -135deg, ${clrPurple} 10%, ${clrCyan} 90%)`,
    WebkitMaskImage: `radial-gradient(circle ${holeSize}, transparent calc(${holeSize} - 0.04em), #000 calc(${holeSize} + 0.025em))`,
    maskImage: `radial-gradient(circle ${holeSize}, transparent calc(${holeSize} - 0.04em), #000 calc(${holeSize} + 0.025em))`,
    clipPath: `polygon(
      0 0,
      100% 0,
      100% 100%,
      0 100%,
      0 0,
      calc(50% - ${holeSize}) 50%,
      calc(50% - ${holeSize}) calc(50% + ${holeSize}),
      50% calc(50% + ${holeSize}),
      calc(50% - ${holeSize}) 50%
    )`,
  };

  const afterStyle: CSSProperties = {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: '0',
    bottom: '0',
    height: `calc(50% - ${holeSize})`,
    width: `calc(50% - ${holeSize})`,
    borderRadius: '0 0 1000000em 0',
    background: clrPurple,
    boxShadow: '0 0 2em 0.7em rgba(0, 0, 0, 0.5)',
    clipPath: 'polygon(1px 1px, 150% 1px, 100% 100%, 1px 150%)',
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={beforeStyle} />
      <div style={afterStyle} />
    </div>
  );
}
