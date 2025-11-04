import type { ExtensionMessage, MessageResponse } from '@/types/messages';
import browser from 'webextension-polyfill';

/**
 * Send a message to the background script
 */
export async function sendMessage<T = unknown>(
  message: ExtensionMessage
): Promise<MessageResponse<T>> {
  try {
    const response = await browser.runtime.sendMessage(message);
    return response as MessageResponse<T>;
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send a message to a specific tab
 */
export async function sendMessageToTab<T = unknown>(
  tabId: number,
  message: ExtensionMessage
): Promise<MessageResponse<T>> {
  try {
    const response = await browser.tabs.sendMessage(tabId, message);
    return response as MessageResponse<T>;
  } catch (error) {
    console.error(`Error sending message to tab ${tabId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Add a message listener
 */
export function addMessageListener(
  callback: (
    message: unknown,
    sender: browser.Runtime.MessageSender,
    sendResponse: (response: MessageResponse) => void
  ) => boolean | Promise<void>
): void {
  browser.runtime.onMessage.addListener(
    callback as browser.Runtime.OnMessageListener
  );
}

/**
 * Remove a message listener
 */
export function removeMessageListener(
  callback: (
    message: unknown,
    sender: browser.Runtime.MessageSender,
    sendResponse: (response: MessageResponse) => void
  ) => boolean | Promise<void>
): void {
  browser.runtime.onMessage.removeListener(
    callback as browser.Runtime.OnMessageListener
  );
}

/**
 * Get the current active tab
 */
export async function getActiveTab(): Promise<browser.Tabs.Tab | undefined> {
  try {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  } catch (error) {
    console.error('Error getting active tab:', error);
    return undefined;
  }
}
