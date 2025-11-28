import { JSX, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import TeamMeIcon from '@/components/icons/TeamMeIcon';
import { API_CONFIG } from '@/constants/config';

import { CHAT_COLORS } from './chat';
import ChatInterface from './ChatInterface';

interface SuggestionItem {
  text: string;
  icon: 'search' | 'building' | 'trophy' | 'clock' | 'users' | 'target';
}

const suggestions: SuggestionItem[] = [
  { text: 'Top candidates for this position', icon: 'trophy' },
  { text: 'Candidates from similar companies', icon: 'building' },
  { text: 'Available to start immediately', icon: 'clock' },
  { text: 'Search by skills and location', icon: 'search' },
];

export default function FabHelpMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className='fixed inset-0'
          style={{
            zIndex: 2147483645,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
          role='button'
          tabIndex={0}
          aria-label='Close menu'
        />
      )}

      {/* FAB Button */}
      <button
        type='button'
        onClick={toggleMenu}
        className='fixed flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95'
        style={{
          zIndex: 2147483647,
          bottom: '20px',
          left: '20px',
          width: '56px',
          height: '56px',
          background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 100%)`,
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label={isOpen ? 'Close help menu' : 'Open help menu'}
      >
        <div className='transition-transform duration-200'>
          {isOpen ? (
            <ChevronDown size={24} color='#FFFFFF' />
          ) : (
            <TeamMeIcon size={32} color='#FFFFFF' />
          )}
        </div>
      </button>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        suggestions={suggestions}
        apiEndpoint={API_CONFIG.assistant.endpoint}
      />

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
