import { JSX, useEffect, useState } from 'react';
import type { APISettings, ExtensionSettings } from '@/types/storage';
import { AlertCircle, Check, Eye, EyeOff, RotateCcw, Save } from 'lucide-react';
import browser from 'webextension-polyfill';

import { API_CONFIG, ENV } from '@/constants/config';
import {
  DEFAULT_API_SETTINGS,
  DEFAULT_EXTENSION_SETTINGS,
} from '@/types/storage';
import { ATS_PLATFORMS } from '@/utils/atsDetector';

interface SaveStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export default function Options(): JSX.Element {
  // Extension Settings
  const [extensionSettings, setExtensionSettings] = useState<ExtensionSettings>(
    DEFAULT_EXTENSION_SETTINGS
  );

  // API Settings
  const [apiSettings, setApiSettings] = useState<APISettings>({
    ...DEFAULT_API_SETTINGS,
    assistantApiUrl: API_CONFIG.assistant.endpoint,
    candidateApiUrl: API_CONFIG.candidate.baseUrl,
    apiKey: API_CONFIG.apiKey || '',
    environment: ENV.isDevelopment ? 'development' : 'production',
  });

  // UI State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({
    type: null,
    message: '',
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setSaveStatus({ type, message });
    setTimeout(() => {
      setSaveStatus({ type: null, message: '' });
    }, 3000);
  };

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await browser.storage.local.get([
          'extensionSettings',
          'apiSettings',
          'theme',
          'enabled',
          'autoAnalyze',
        ]);

        if (
          result.extensionSettings &&
          typeof result.extensionSettings === 'object'
        ) {
          setExtensionSettings(result.extensionSettings as ExtensionSettings);
        } else if (
          typeof result.enabled === 'boolean' ||
          typeof result.autoAnalyze === 'boolean'
        ) {
          // Migrate legacy settings
          setExtensionSettings({
            ...DEFAULT_EXTENSION_SETTINGS,
            enabled:
              typeof result.enabled === 'boolean' ? result.enabled : true,
            autoAnalyze:
              typeof result.autoAnalyze === 'boolean'
                ? result.autoAnalyze
                : true,
          });
        }

        if (result.apiSettings && typeof result.apiSettings === 'object') {
          setApiSettings(result.apiSettings as APISettings);
        }

        if (
          result.theme &&
          (result.theme === 'light' || result.theme === 'dark')
        ) {
          setTheme(result.theme);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load settings:', error);
        showNotification('error', 'Failed to load settings');
      }
    };

    loadSettings().catch(() => {
      // Error already handled
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle save settings
  const handleSave = async () => {
    try {
      await browser.storage.local.set({
        extensionSettings,
        apiSettings,
        theme,
        // Also save to legacy keys for backward compatibility with popup
        enabled: extensionSettings.enabled,
        autoAnalyze: extensionSettings.autoAnalyze,
      });

      setHasUnsavedChanges(false);
      showNotification('success', 'Settings saved successfully!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save settings:', error);
      showNotification('error', 'Failed to save settings');
    }
  };

  // Handle reset to defaults
  const handleReset = () => {
    // eslint-disable-next-line no-alert
    if (
      window.confirm('Are you sure you want to reset all settings to defaults?')
    ) {
      setExtensionSettings(DEFAULT_EXTENSION_SETTINGS);
      setApiSettings({
        ...DEFAULT_API_SETTINGS,
        assistantApiUrl: API_CONFIG.assistant.endpoint,
        candidateApiUrl: API_CONFIG.candidate.baseUrl,
        apiKey: API_CONFIG.apiKey || '',
        environment: ENV.isDevelopment ? 'development' : 'production',
      });
      setTheme('light');
      setHasUnsavedChanges(true);
      showNotification('success', 'Settings reset to defaults');
    }
  };

  // Handle platform toggle
  const handlePlatformToggle = (platformName: string) => {
    setExtensionSettings((prev) => {
      const isEnabled = prev.enabledPlatforms.includes(platformName);
      return {
        ...prev,
        enabledPlatforms: isEnabled
          ? prev.enabledPlatforms.filter((p) => p !== platformName)
          : [...prev.enabledPlatforms, platformName],
        enableAllPlatforms: false,
      };
    });
    setHasUnsavedChanges(true);
  };

  // Handle enable all platforms
  const handleEnableAllPlatforms = (enabled: boolean) => {
    setExtensionSettings((prev) => ({
      ...prev,
      enableAllPlatforms: enabled,
      enabledPlatforms: enabled ? [] : prev.enabledPlatforms,
    }));
    setHasUnsavedChanges(true);
  };

  return (
    <div id='my-ext' className='min-h-screen bg-gray-50' data-theme={theme}>
      <div className='mx-auto max-w-4xl px-6 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Settings</h1>
          <p className='mt-2 text-gray-600'>
            Configure your TeamMe AI Screening extension
          </p>
        </div>

        {/* Save Status Notification */}
        {saveStatus.type && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-lg p-4 ${
              saveStatus.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {saveStatus.type === 'success' ? (
              <Check size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className='text-sm font-medium'>{saveStatus.message}</span>
          </div>
        )}

        {/* Extension Settings Section */}
        <section className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold text-gray-900'>
            Extension Settings
          </h2>

          <div className='space-y-4'>
            <div className='flex items-center justify-between border-b pb-4'>
              <div>
                <p className='font-medium text-gray-900'>Enable Extension</p>
                <p className='text-sm text-gray-600'>
                  Turn on/off the extension globally
                </p>
              </div>
              <input
                type='checkbox'
                className='toggle toggle-primary'
                checked={extensionSettings.enabled}
                onChange={(e) => {
                  setExtensionSettings((prev) => ({
                    ...prev,
                    enabled: e.target.checked,
                  }));
                  setHasUnsavedChanges(true);
                }}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-gray-900'>Auto-Analyze</p>
                <p className='text-sm text-gray-600'>
                  Automatically analyze candidates when viewing their profiles
                </p>
              </div>
              <input
                type='checkbox'
                className='toggle toggle-primary'
                checked={extensionSettings.autoAnalyze}
                disabled={!extensionSettings.enabled}
                onChange={(e) => {
                  setExtensionSettings((prev) => ({
                    ...prev,
                    autoAnalyze: e.target.checked,
                  }));
                  setHasUnsavedChanges(true);
                }}
              />
            </div>
          </div>
        </section>

        {/* API Configuration Section */}
        <section className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold text-gray-900'>
            API Configuration
          </h2>

          <div className='space-y-4'>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor='environment'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Environment
              </label>
              <select
                id='environment'
                className='select-bordered select w-full'
                value={apiSettings.environment}
                onChange={(e) => {
                  setApiSettings((prev) => ({
                    ...prev,
                    environment: e.target.value as 'development' | 'production',
                  }));
                  setHasUnsavedChanges(true);
                }}
              >
                <option value='development'>Development</option>
                <option value='production'>Production</option>
              </select>
              <p className='mt-1 text-xs text-gray-600'>
                Select the environment for API endpoints
              </p>
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor='assistantApiUrl'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Assistant API URL
              </label>
              <input
                id='assistantApiUrl'
                type='url'
                className='input-bordered input w-full'
                placeholder='http://localhost:3000/api/assistant'
                value={apiSettings.assistantApiUrl}
                onChange={(e) => {
                  setApiSettings((prev) => ({
                    ...prev,
                    assistantApiUrl: e.target.value,
                  }));
                  setHasUnsavedChanges(true);
                }}
              />
              <p className='mt-1 text-xs text-gray-600'>
                API endpoint for chat functionality
              </p>
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor='candidateApiUrl'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Candidate API URL
              </label>
              <input
                id='candidateApiUrl'
                type='url'
                className='input-bordered input w-full'
                placeholder='https://api.teamme.ai/candidates'
                value={apiSettings.candidateApiUrl}
                onChange={(e) => {
                  setApiSettings((prev) => ({
                    ...prev,
                    candidateApiUrl: e.target.value,
                  }));
                  setHasUnsavedChanges(true);
                }}
              />
              <p className='mt-1 text-xs text-gray-600'>
                API endpoint for fetching candidate data
              </p>
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor='apiKey'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                API Key (Optional)
              </label>
              <div className='relative'>
                <input
                  id='apiKey'
                  type={showApiKey ? 'text' : 'password'}
                  className='input-bordered input w-full pr-12'
                  placeholder='Enter your API key'
                  value={apiSettings.apiKey}
                  onChange={(e) => {
                    setApiSettings((prev) => ({
                      ...prev,
                      apiKey: e.target.value,
                    }));
                    setHasUnsavedChanges(true);
                  }}
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900'
                  onClick={() => setShowApiKey(!showApiKey)}
                  aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                >
                  {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className='mt-1 text-xs text-gray-600'>
                API key for authentication (if required by your backend)
              </p>
            </div>
          </div>
        </section>

        {/* ATS Platform Selection Section */}
        <section className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold text-gray-900'>
            ATS Platforms
          </h2>

          <div className='mb-4 rounded-lg bg-blue-50 p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-gray-900'>
                  Enable on All Platforms
                </p>
                <p className='text-sm text-gray-600'>
                  Extension will work on all supported ATS platforms
                </p>
              </div>
              <input
                type='checkbox'
                className='toggle toggle-primary'
                checked={extensionSettings.enableAllPlatforms}
                onChange={(e) => handleEnableAllPlatforms(e.target.checked)}
              />
            </div>
          </div>

          {!extensionSettings.enableAllPlatforms && (
            <div className='space-y-2'>
              <p className='mb-3 text-sm text-gray-600'>
                Select which ATS platforms to enable the extension on:
              </p>
              <div className='grid grid-cols-2 gap-3'>
                {ATS_PLATFORMS.map((platform) => {
                  const isEnabled = extensionSettings.enabledPlatforms.includes(
                    platform.name
                  );
                  return (
                    // eslint-disable-next-line jsx-a11y/label-has-associated-control
                    <label
                      key={platform.name}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors ${
                        isEnabled
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        type='checkbox'
                        className='checkbox checkbox-primary'
                        checked={isEnabled}
                        onChange={() => handlePlatformToggle(platform.name)}
                      />
                      <div>
                        <p className='font-medium text-gray-900'>
                          {platform.name}
                        </p>
                        <p className='text-xs text-gray-600'>
                          {platform.domains[0]}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Appearance Section */}
        <section className='mb-6 rounded-lg bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold text-gray-900'>
            Appearance
          </h2>

          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor='theme'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Theme
            </label>
            <select
              id='theme'
              className='select-bordered select w-full max-w-xs'
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value as 'light' | 'dark');
                setHasUnsavedChanges(true);
              }}
            >
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
            </select>
            <p className='mt-1 text-xs text-gray-600'>
              Choose your preferred theme
            </p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className='flex items-center justify-between rounded-lg bg-white p-6 shadow-sm'>
          <button
            type='button'
            className='btn btn-outline gap-2'
            onClick={handleReset}
          >
            <RotateCcw size={18} />
            Reset to Defaults
          </button>

          <button
            type='button'
            className={`btn gap-2 ${hasUnsavedChanges ? 'btn-primary' : 'btn-disabled'}`}
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>

        {/* Footer */}
        <div className='mt-8 text-center text-sm text-gray-600'>
          <p>
            TeamMe AI Screening Extension v1.0.0
            <br />
            For support, visit{' '}
            <a
              href='https://teamme.ai'
              target='_blank'
              rel='noopener noreferrer'
              className='text-indigo-600 hover:text-indigo-800'
            >
              teamme.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
