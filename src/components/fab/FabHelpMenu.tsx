import { JSX, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

import ChatInterface from './ChatInterface';

interface SuggestionItem {
  text: string;
}

const suggestions: SuggestionItem[] = [
  { text: 'Get top candidates for a position' },
  { text: 'Find candidates for a position who worked in a similar company' },
];

const API_ENDPOINT = 'https://teamme-acquisition.vercel.app/api/chat';

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
        className='fixed flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:shadow-xl'
        style={{
          zIndex: 2147483647,
          bottom: '24px',
          left: '24px',
          width: '56px',
          height: '56px',
          backgroundColor: '#1e1b4b',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label={isOpen ? 'Close help menu' : 'Open help menu'}
      >
        {isOpen ? (
          <ChevronDown size={24} color='#FFFFFF' />
        ) : (
          <MessageCircle size={24} color='#FFFFFF' fill='#FFFFFF' />
        )}
      </button>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        suggestions={suggestions}
        apiEndpoint={API_ENDPOINT}
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
