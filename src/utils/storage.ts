import type { StorageKey, StorageSchema } from '@/types/storage';
import browser from 'webextension-polyfill';

/**
 * Get a value from chrome.storage.local
 */
export async function getStorageItem<K extends StorageKey>(
  key: K
): Promise<StorageSchema[K] | undefined> {
  try {
    const result = await browser.storage.local.get(key);
    return result[key] as StorageSchema[K] | undefined;
  } catch (error) {
    console.error(`Error getting storage item "${key}":`, error);
    return undefined;
  }
}

/**
 * Set a value in chrome.storage.local
 */
export async function setStorageItem<K extends StorageKey>(
  key: K,
  value: StorageSchema[K]
): Promise<boolean> {
  try {
    await browser.storage.local.set({ [key]: value });
    return true;
  } catch (error) {
    console.error(`Error setting storage item "${key}":`, error);
    return false;
  }
}

/**
 * Remove a value from chrome.storage.local
 */
export async function removeStorageItem(key: StorageKey): Promise<boolean> {
  try {
    await browser.storage.local.remove(key);
    return true;
  } catch (error) {
    console.error(`Error removing storage item "${key}":`, error);
    return false;
  }
}

/**
 * Clear all storage
 */
export async function clearStorage(): Promise<boolean> {
  try {
    await browser.storage.local.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

/**
 * Listen to storage changes
 */
export function onStorageChange(
  callback: (
    changes: { [key: string]: browser.Storage.StorageChange },
    areaName: string
  ) => void
): void {
  browser.storage.onChanged.addListener(callback);
}

/**
 * Remove storage change listener
 */
export function removeStorageChangeListener(
  callback: (
    changes: { [key: string]: browser.Storage.StorageChange },
    areaName: string
  ) => void
): void {
  browser.storage.onChanged.removeListener(callback);
}
