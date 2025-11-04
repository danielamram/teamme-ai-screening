import { JSX, useEffect, useState } from 'react';
import type { SidebarState } from '@/types/storage';
import { Eye, EyeOff, Settings, Sparkles, Users } from 'lucide-react';

import { DEFAULT_SIDEBAR_STATE } from '@/types/storage';
import { sendMessage } from '@/utils/messaging';

export default function Popup(): JSX.Element {
  const [sidebarState, setSidebarState] = useState<SidebarState>(
    DEFAULT_SIDEBAR_STATE
  );
  const [loading, setLoading] = useState(false);

  // Load sidebar state on mount
  useEffect(() => {
    const loadState = async () => {
      const response = await sendMessage<SidebarState>({
        type: 'GET_SIDEBAR_STATE',
      });
      if (response.success && response.data) {
        setSidebarState(response.data);
      }
    };

    loadState();
  }, []);

  const handleToggleSidebar = async () => {
    setLoading(true);
    try {
      const response = await sendMessage<SidebarState>({
        type: 'TOGGLE_SIDEBAR',
      });
      if (response.success && response.data) {
        setSidebarState(response.data);
      }
    } catch (error) {
      console.error('Error toggling sidebar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='my-ext' className='w-[320px] bg-slate-900 p-4' data-theme='dark'>
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex items-center gap-3 border-b border-slate-700 pb-4'>
          <div className='rounded-lg bg-indigo-600 p-2'>
            <Sparkles size={24} className='text-white' />
          </div>
          <div>
            <h1 className='text-lg font-bold text-white'>ATS Screening AI</h1>
            <p className='text-xs text-slate-400'>Candidate Analysis Tool</p>
          </div>
        </div>

        {/* Status card */}
        <div className='rounded-lg border border-slate-700 bg-slate-800/50 p-4'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm font-medium text-slate-300'>
              Sidebar Status
            </span>
            <div
              className={`rounded-full px-2 py-1 text-xs font-semibold ${
                sidebarState.isOpen
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {sidebarState.isOpen ? 'Open' : 'Closed'}
            </div>
          </div>
          {sidebarState.lastOpenedAt && (
            <p className='text-xs text-slate-500'>
              Last opened:{' '}
              {new Date(sidebarState.lastOpenedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Toggle button */}
        <button
          type='button'
          onClick={handleToggleSidebar}
          disabled={loading}
          className='btn btn-primary w-full'
        >
          {loading ? (
            <span className='loading loading-spinner loading-sm' />
          ) : (
            <>
              {sidebarState.isOpen ? <EyeOff size={18} /> : <Eye size={18} />}
              {sidebarState.isOpen ? 'Hide' : 'Show'} Sidebar
            </>
          )}
        </button>

        {/* Quick actions */}
        <div className='space-y-2 border-t border-slate-700 pt-4'>
          <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
            Quick Actions
          </p>
          <button
            type='button'
            className='btn btn-outline btn-sm w-full justify-start'
          >
            <Users size={16} />
            View All Candidates
          </button>
          <button
            type='button'
            className='btn btn-outline btn-sm w-full justify-start'
          >
            <Settings size={16} />
            Settings
          </button>
        </div>

        {/* Footer */}
        <div className='border-t border-slate-700 pt-4 text-center'>
          <p className='text-xs text-slate-500'>
            AI-powered candidate screening for ATS platforms
          </p>
        </div>
      </div>
    </div>
  );
}
