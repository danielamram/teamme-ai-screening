import React from 'react';

interface MorphingBlobProps {
  size?: number;
}

// eslint-disable-next-line import/prefer-default-export
export function MorphingBlob({ size = 300 }: MorphingBlobProps) {
  return (
    <div className='blob-container'>
      <div
        className='blob'
        style={{ '--size': `${size}px` } as React.CSSProperties}
      >
        <span />
        <span />
      </div>
    </div>
  );
}
