import { JSX, useEffect, useState } from 'react';
import { ExternalLink, Settings } from 'lucide-react';
import browser from 'webextension-polyfill';

export default function Popup(): JSX.Element {
  const [enabled, setEnabled] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);

  useEffect(() => {
    // Load settings from storage
    browser.storage.local
      .get(['enabled', 'autoAnalyze'])
      .then((result) => {
        if (typeof result.enabled === 'boolean') setEnabled(result.enabled);
        if (typeof result.autoAnalyze === 'boolean')
          setAutoAnalyze(result.autoAnalyze);
      })
      .catch(() => {
        // Failed to load settings, use defaults
      });
  }, []);

  const handleToggle = async (key: string, value: boolean) => {
    try {
      await browser.storage.local.set({ [key]: value });
      if (key === 'enabled') setEnabled(value);
      if (key === 'autoAnalyze') setAutoAnalyze(value);
    } catch {
      // Failed to save setting
    }
  };

  const openOptions = () => {
    browser.runtime.openOptionsPage().catch(() => {
      // Failed to open options page
    });
  };

  return (
    <div id='my-ext' className='w-[320px] bg-white' data-theme='light'>
      <div className='flex flex-col p-6'>
        {/* Header */}
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-gray-900'>TeamMe AI</h1>
          <button
            type='button'
            onClick={openOptions}
            className='rounded-lg p-2 transition-colors hover:bg-gray-100'
            aria-label='Open settings'
          >
            <Settings size={20} className='text-gray-600' />
          </button>
        </div>

        {/* Status */}
        <div className='mb-6 rounded-lg bg-indigo-50 p-4'>
          <div className='flex items-center gap-2'>
            <div
              className={`h-2 w-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-400'}`}
            />
            <span className='text-sm font-medium text-gray-900'>
              {enabled ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className='mt-1 text-xs text-gray-600'>
            Extension is {enabled ? 'running' : 'paused'}
          </p>
        </div>

        {/* Settings */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Enable Extension
              </p>
              <p className='text-xs text-gray-600'>
                Turn on/off candidate analysis
              </p>
            </div>
            <input
              type='checkbox'
              className='toggle toggle-primary'
              checked={enabled}
              onChange={(e) => handleToggle('enabled', e.target.checked)}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-900'>Auto-Analyze</p>
              <p className='text-xs text-gray-600'>
                Automatically analyze candidates
              </p>
            </div>
            <input
              type='checkbox'
              className='toggle toggle-primary'
              checked={autoAnalyze}
              disabled={!enabled}
              onChange={(e) => handleToggle('autoAnalyze', e.target.checked)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className='mt-6 border-t pt-4'>
          <a
            href='https://teamme.ai'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center gap-2 text-xs text-indigo-600 transition-colors hover:text-indigo-800'
          >
            <span>Learn more about TeamMe AI</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
