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
        left: isOpen ? '400px' : '0px',
        background:
          'linear-gradient(135deg, rgba(79, 70, 229, 0.95) 0%, rgba(67, 56, 202, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        transition:
          'left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms ease-in-out, box-shadow 150ms ease-in-out',
      }}
      aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      <div className='flex flex-col items-center gap-1'>
        <ChevronRight
          size={20}
          className='text-white transition-transform duration-300 ease-in-out'
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
    </button>
  );
}
