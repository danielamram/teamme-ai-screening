import { useCallback, useEffect, useState } from 'react';
import type { StorageKey, StorageSchema } from '@/types/storage';
import browser from 'webextension-polyfill';

import { getStorageItem, setStorageItem } from '@/utils/storage';

/**
 * Custom hook to manage Chrome extension storage with React state
 * @param key - The storage key from StorageSchema
 * @param initialValue - The initial value to use if no stored value exists
 * @returns A tuple of [value, setValue, loading, error]
 */
// eslint-disable-next-line import/prefer-default-export
export function useLocalStorage<K extends StorageKey>(
  key: K,
  initialValue: StorageSchema[K]
): [
  StorageSchema[K],
  (value: StorageSchema[K]) => Promise<void>,
  boolean,
  Error | null,
] {
  const [storedValue, setStoredValue] =
    useState<StorageSchema[K]>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial value from storage
  useEffect(() => {
    const loadStorageValue = async () => {
      try {
        setLoading(true);
        setError(null);
        const value = await getStorageItem(key);
        if (value !== undefined) {
          setStoredValue(value);
        }
      } catch (err) {
        console.error(`Error loading storage item "${key}":`, err);
        setError(
          err instanceof Error ? err : new Error('Failed to load storage item')
        );
      } finally {
        setLoading(false);
      }
    };

    loadStorageValue();
  }, [key]);

  // Listen for storage changes from other contexts (popup, background, etc.)
  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: browser.Storage.StorageChange },
      areaName: string
    ) => {
      // Only handle changes to chrome.storage.local
      if (areaName !== 'local') {
        return;
      }

      // Check if our key changed
      if (changes[key]) {
        const { newValue } = changes[key];
        if (newValue !== undefined) {
          setStoredValue(newValue as StorageSchema[K]);
        }
      }
    };

    browser.storage.onChanged.addListener(handleStorageChange);

    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [key]);

  // Update storage and local state
  const setValue = useCallback(
    async (value: StorageSchema[K]) => {
      try {
        setError(null);
        // Optimistically update local state
        setStoredValue(value);

        // Persist to storage
        const success = await setStorageItem(key, value);

        if (!success) {
          throw new Error(`Failed to save storage item "${key}"`);
        }
      } catch (err) {
        console.error(`Error setting storage item "${key}":`, err);
        setError(
          err instanceof Error ? err : new Error('Failed to save storage item')
        );

        // Revert optimistic update on error
        const currentValue = await getStorageItem(key);
        if (currentValue !== undefined) {
          setStoredValue(currentValue);
        }
      }
    },
    [key]
  );

  return [storedValue, setValue, loading, error];
}
