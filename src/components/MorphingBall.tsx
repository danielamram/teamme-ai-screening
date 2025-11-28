interface MorphingBlobProps {
  size?: number;
}

// eslint-disable-next-line import/prefer-default-export
export function MorphingBlob({ size = 180 }: MorphingBlobProps) {
  return (
    <div className='relative' style={{ width: size, height: size }}>
      <div
        className='blob-glow-outer absolute inset-[-30%] rounded-full blur-3xl'
        style={{
          background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)',
        }}
      />
      <div
        className='blob-glow-inner absolute inset-[-15%] rounded-full blur-2xl'
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 60%)',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox='0 0 200 200'
        className='relative drop-shadow-[0_0_40px_rgba(99,102,241,0.6)]'
      >
        <defs>
          <radialGradient id='blobGrad' cx='40%' cy='40%' r='60%'>
            <stop offset='0%' stopColor='#ffffff' />
            <stop offset='15%' stopColor='#f8fafc' />
            <stop offset='40%' stopColor='#c7d2fe' />
            <stop offset='65%' stopColor='#818cf8' />
            <stop offset='85%' stopColor='#6366f1' />
            <stop offset='100%' stopColor='#4f46e5' />
          </radialGradient>

          <radialGradient id='innerGlow' cx='35%' cy='35%' r='50%'>
            <stop offset='10%' stopColor='#ffffff' stopOpacity='0.9' />
            <stop offset='30%' stopColor='#ffffff' stopOpacity='0.3' />
            <stop offset='80%' stopColor='#ffffff' stopOpacity='0' />
          </radialGradient>

          <filter id='softGlow'>
            <feGaussianBlur stdDeviation='1.5' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        <g className='float-container'>
          <path
            className='blob-main'
            fill='url(#blobGrad)'
            filter='url(#softGlow)'
            d='M100,25 C130,20 155,35 170,60 C185,85 185,115 170,140 C155,165 130,180 100,180 C70,180 45,165 30,140 C15,115 15,85 30,60 C45,35 70,20 100,25'
          />
          <path
            className='blob-inner'
            fill='url(#innerGlow)'
            d='M100,45 C120,42 138,52 150,70 C162,88 162,108 150,126 C138,144 120,154 100,154 C80,154 62,144 50,126 C38,108 38,88 50,70 C62,52 80,42 100,45'
          />
        </g>
      </svg>
    </div>
  );
}
