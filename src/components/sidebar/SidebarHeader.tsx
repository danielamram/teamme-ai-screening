import { JSX } from 'react';
import type { Candidate } from '@/types/candidate';
import type React from 'react';
import { X } from 'lucide-react';

interface SidebarHeaderProps {
  candidate: Candidate | null;
  onClose: () => void;
}

export default function SidebarHeader({
  candidate,
  onClose,
}: SidebarHeaderProps): JSX.Element {
  return (
    // drop shadow
    <div
      className='border-b px-3 pt-6'
      style={{
        borderColor: '#E4E6E8',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex gap-3'>
          {/* Profile image placeholder */}
          <div
            className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-bold'
            style={{ backgroundColor: '#E4E6E8', color: '#6B6D75' }}
          >
            {candidate ? (
              candidate.name.charAt(0)
            ) : (
              <div className='h-6 w-6 animate-pulse rounded-full bg-gray-300' />
            )}
          </div>

          <div className='flex-1'>
            {candidate ? (
              <>
                <h2
                  className='mb-0.5 text-sm font-bold leading-tight'
                  style={{ color: '#292A2E' }}
                >
                  {candidate.name}
                </h2>
                {/*  maximum 2 lines and ellipsis */}
                <p
                  className='mb-1 line-clamp-2 text-xs leading-relaxed'
                  style={{ color: '#6B6D75' }}
                >
                  {candidate.position} @ {candidate.company}
                </p>
                <p className='text-xs' style={{ color: '#9F9F9F' }}>
                  {candidate.location}
                </p>
              </>
            ) : (
              <>
                <div
                  className='mb-2 h-4 w-32 animate-pulse rounded bg-gray-300'
                  style={{ color: '#292A2E' }}
                />
                <div
                  className='mb-2 h-3 w-40 animate-pulse rounded bg-gray-300'
                  style={{ color: '#6B6D75' }}
                />
                <div
                  className='h-3 w-24 animate-pulse rounded bg-gray-300'
                  style={{ color: '#9F9F9F' }}
                />
              </>
            )}
          </div>
        </div>

        <button
          type='button'
          onClick={onClose}
          className='btn btn-ghost btn-sm btn-circle flex-shrink-0'
          style={
            {
              '--btn-color': '#1F2024',
            } as React.CSSProperties
          }
          aria-label='Close sidebar'
        >
          <X size={18} style={{ color: '#9F9F9F' }} />
        </button>
      </div>
    </div>
  );
}
