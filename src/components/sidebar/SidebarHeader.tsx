import { JSX } from 'react';
import type { Candidate } from '@/types/candidate';
import { X } from 'lucide-react';

interface SidebarHeaderProps {
  candidate: Candidate;
  onClose: () => void;
}

export default function SidebarHeader({
  candidate,
  onClose,
}: SidebarHeaderProps): JSX.Element {
  return (
    <div className='flex items-center justify-between border-b border-slate-700 p-4'>
      <div className='flex-1'>
        <h2 className='mb-1 text-sm font-medium text-slate-400'>
          AI Screening Analysis
        </h2>
        <h3 className='text-lg font-semibold text-white'>{candidate.name}</h3>
        <p className='text-sm text-slate-400'>{candidate.position}</p>
      </div>

      <button
        type='button'
        onClick={onClose}
        className='btn btn-ghost btn-sm btn-circle'
        aria-label='Close sidebar'
      >
        <X size={20} className='text-slate-300' />
      </button>
    </div>
  );
}
