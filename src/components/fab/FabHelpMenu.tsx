import { JSX, useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  Headphones,
  Home,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Target,
  X,
} from 'lucide-react';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <Headphones size={16} />,
    label: 'Contact support',
    href: '#support',
  },
  {
    icon: <BookOpen size={16} />,
    label: 'View our help center',
    href: '#help',
  },
  {
    icon: <Sparkles size={16} />,
    label: "What's new on TeamMe?",
    href: '#whats-new',
  },
  {
    icon: <Target size={16} />,
    label: 'See our roadmap',
    href: '#roadmap',
  },
];

export default function FabHelpMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'messages'>('home');
  const [messageCount] = useState(1);

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
          <>
            <MessageCircle size={24} color='#FFFFFF' fill='#FFFFFF' />
            {messageCount > 0 && (
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
                {messageCount}
              </span>
            )}
          </>
        )}
      </button>

      {/* Menu Popup */}
      {isOpen && (
        <div
          className='fixed overflow-hidden rounded-2xl shadow-2xl'
          style={{
            zIndex: 2147483646,
            bottom: '96px',
            left: '24px',
            width: '360px',
            backgroundColor: '#FFFFFF',
            animation: 'fadeInUp 200ms ease-out',
          }}
        >
          {/* Header */}
          <div
            className='relative px-6 pb-8 pt-6'
            style={{
              background: 'linear-gradient(135deg, #312e81 0%, #4f46e5 100%)',
            }}
          >
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-white/20'
              aria-label='Close menu'
            >
              <X size={20} color='#FFFFFF' />
            </button>

            {/* Avatar */}
            <div
              className='mb-6 flex h-12 w-12 items-center justify-center rounded-full'
              style={{
                backgroundColor: '#e0e7ff',
                border: '2px solid #FFFFFF',
              }}
            >
              <span className='text-lg'>👤</span>
            </div>

            {/* Greeting */}
            <h2 className='mb-1 text-xl font-semibold text-white'>
              Hi there 👋
            </h2>
            <p className='text-lg text-white'>How can we help?</p>
          </div>

          {/* Menu Items */}
          <div className='p-4'>
            <div className='overflow-hidden rounded-xl border border-gray-100 bg-white'>
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className='flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50'
                  style={{
                    borderBottom:
                      index < menuItems.length - 1
                        ? '1px solid #f1f5f9'
                        : 'none',
                    color: '#1f2937',
                    textDecoration: 'none',
                  }}
                >
                  <div className='flex items-center gap-3'>
                    <span style={{ color: '#6b7280' }}>{item.icon}</span>
                    <span className='text-sm font-medium'>{item.label}</span>
                  </div>
                  <ExternalLink size={14} color='#9ca3af' />
                </a>
              ))}
            </div>

            {/* Status */}
            <div
              className='mt-4 rounded-xl p-4'
              style={{ backgroundColor: '#f8fafc' }}
            >
              <div className='flex items-center gap-3'>
                <CheckCircle size={24} color='#10b981' fill='#10b981' />
                <div>
                  <p className='text-sm font-semibold text-gray-900'>
                    Status: All Systems Operational
                  </p>
                  <p className='text-xs text-gray-500'>
                    Updated Nov 24, 09:10 UTC
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className='flex border-t' style={{ borderColor: '#e5e7eb' }}>
            <button
              type='button'
              onClick={() => setActiveTab('home')}
              className='flex flex-1 flex-col items-center py-3 transition-colors'
              style={{
                backgroundColor: activeTab === 'home' ? '#f8fafc' : '#FFFFFF',
                color: activeTab === 'home' ? '#1e1b4b' : '#9ca3af',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Home size={20} />
              <span className='mt-1 text-xs font-medium'>Home</span>
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('messages')}
              className='relative flex flex-1 flex-col items-center py-3 transition-colors'
              style={{
                backgroundColor:
                  activeTab === 'messages' ? '#f8fafc' : '#FFFFFF',
                color: activeTab === 'messages' ? '#1e1b4b' : '#9ca3af',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div className='relative'>
                <MessageSquare size={20} />
                {messageCount > 0 && (
                  <span
                    className='absolute -right-2 -top-1 flex items-center justify-center rounded-full text-xs font-semibold'
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#ef4444',
                      color: '#FFFFFF',
                      fontSize: '10px',
                    }}
                  >
                    {messageCount}
                  </span>
                )}
              </div>
              <span className='mt-1 text-xs font-medium'>Messages</span>
            </button>
          </div>
        </div>
      )}

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
