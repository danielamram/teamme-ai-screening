import { JSX } from 'react';
import { ChevronRight } from 'lucide-react';

interface CollapseToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function CollapseToggle({
  isOpen,
  onToggle,
}: CollapseToggleProps): JSX.Element {
  return (
    <button
      type='button'
      onClick={onToggle}
      className='fixed top-1/2 flex h-24 w-10 -translate-y-1/2 items-center justify-center rounded-r-lg shadow-lg hover:w-12 hover:shadow-xl'
      style={{
        zIndex: 2147483647,
        left: isOpen ? '260px' : '0px',
        background: '#FFFFFF',
        border: '1px solid #E4E6E8',
        transition:
          'left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms ease-in-out, box-shadow 150ms ease-in-out',
        pointerEvents: 'auto',
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      }}
      aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      <div className='flex flex-col items-center gap-1'>
        <ChevronRight
          size={20}
          className='transition-transform duration-300 ease-in-out'
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: '#1F2024',
          }}
        />
      </div>
    </button>
  );
}
