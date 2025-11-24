import { JSX, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

import ChatInterface, { Message } from './ChatInterface';

interface SuggestionItem {
  text: string;
}

const suggestions: SuggestionItem[] = [
  { text: 'What can TeamMe help me with?' },
  { text: 'Summarize my recent activity' },
  { text: 'Help me get started' },
];

export default function FabHelpMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
  };

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: inputValue.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: `Thanks for your message! I'm here to help you with TeamMe. You asked: "${userMessage.content}"\n\nThis is a demo response. In production, this would connect to an AI service to provide helpful answers about your work, team activities, and more.`,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleStop = () => {
    setIsLoading(false);
  };

  const unreadCount = messages.filter((m) => m.role === 'assistant').length || (messages.length === 0 ? 1 : 0);

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
          <>
            <MessageCircle size={24} color='#FFFFFF' fill='#FFFFFF' />
            {unreadCount > 0 && (
              <span
                className='absolute flex items-center justify-center rounded-full text-xs font-semibold'
                style={{
                  top: '-4px',
                  right: '-4px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#ef4444',
                  color: '#FFFFFF',
                }}
              >
                {unreadCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
        onSuggestionClick={handleSuggestionClick}
        suggestions={suggestions}
        messages={messages}
        isLoading={isLoading}
        onStop={handleStop}
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
