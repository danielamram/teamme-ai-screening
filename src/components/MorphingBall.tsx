import React, { JSX } from 'react';

interface MorphingBlobProps {
  size?: number;
}

// eslint-disable-next-line import/prefer-default-export
export function MorphingBlob({ size = 300 }: MorphingBlobProps): JSX.Element {
  return (
    <div
      className='fluid-blob-stage'
      style={{ '--blob-size': `${size}px` } as React.CSSProperties}
    >
      {/* Background Glow / Aura */}
      {/* <div className='fluid-blob-aura' /> */}

      {/* Main Fluid Entity */}
      <div className='fluid-blob'>
        {/* Noise texture overlay */}
        <div className='fluid-blob-noise' />
      </div>
    </div>
  );
}
