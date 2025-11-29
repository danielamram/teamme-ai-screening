import { JSX, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { AtsAiLogo } from '@/components/icons/AtsAiLogo';
import { API_CONFIG } from '@/constants/config';
import { useFadeIn } from '@/hooks/useAnimations';

import { CHAT_COLORS } from './chat';
import ChatInterface from './ChatInterface';

export default function FabHelpMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = useFadeIn(300);

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
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          animation: isVisible
            ? 'fabEnter 400ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
        }}
        aria-label={isOpen ? 'Close help menu' : 'Open help menu'}
      >
        <div className='transition-transform duration-200'>
          {isOpen ? <ChevronDown size={24} color='#FFFFFF' /> : <AtsAiLogo />}
        </div>
      </button>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
        
        @keyframes fabEnter {
          from {
            opacity: 0;
            transform: scale(0.6) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
