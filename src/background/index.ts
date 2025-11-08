import type { ExtensionMessage, MessageResponse } from '@/types/messages';
import type { SidebarState } from '@/types/storage';
import browser from 'webextension-polyfill';

import { DEFAULT_SIDEBAR_STATE } from '@/types/storage';
import { getStorageItem, setStorageItem } from '@/utils/storage';

// Initialize default storage on install
browser.runtime.onInstalled.addListener(async () => {
  console.log('ATS Candidate Screening Extension installed');

  // Always reset to default closed state on install/update
  await setStorageItem('sidebarState', DEFAULT_SIDEBAR_STATE);
});

// Handle messages from content scripts and popup
browser.runtime.onMessage.addListener(
  (
    message: unknown,
    _sender: browser.Runtime.MessageSender,
    sendResponse: (response: MessageResponse) => void
  ) => {
    // Handle async messages
    (async () => {
      try {
        const msg = message as ExtensionMessage;
        switch (msg.type) {
          case 'PING': {
            sendResponse({ success: true, data: 'pong' });
            break;
          }

          case 'GET_SIDEBAR_STATE': {
            const state = await getStorageItem('sidebarState');
            sendResponse({
              success: true,
              data: state || DEFAULT_SIDEBAR_STATE,
            });
            break;
          }

          case 'SET_SIDEBAR_STATE': {
            if ('payload' in msg && msg.payload) {
              const currentState =
                (await getStorageItem('sidebarState')) || DEFAULT_SIDEBAR_STATE;
              const newState: SidebarState = {
                ...currentState,
                ...msg.payload,
                lastOpenedAt: msg.payload.isOpen
                  ? Date.now()
                  : currentState.lastOpenedAt,
              };
              await setStorageItem('sidebarState', newState);
              sendResponse({ success: true, data: newState });
            } else {
              sendResponse({
                success: false,
                error: 'Missing payload in SET_SIDEBAR_STATE',
              });
            }
            break;
          }

          case 'TOGGLE_SIDEBAR': {
            const currentState =
              (await getStorageItem('sidebarState')) || DEFAULT_SIDEBAR_STATE;
            const newState: SidebarState = {
              ...currentState,
              isOpen: !currentState.isOpen,
              lastOpenedAt: !currentState.isOpen
                ? Date.now()
                : currentState.lastOpenedAt,
            };
            await setStorageItem('sidebarState', newState);

            // Notify all tabs about the state change
            const tabs = await browser.tabs.query({});
            await Promise.all(
              tabs.map(async (tab) => {
                if (tab.id) {
                  try {
                    await browser.tabs.sendMessage(tab.id, {
                      type: 'SET_SIDEBAR_STATE',
                      payload: { isOpen: newState.isOpen },
                    });
                  } catch (error) {
                    // Tab might not have content script, ignore
                    console.debug(`Could not send message to tab ${tab.id}`);
                  }
                }
              })
            );

            sendResponse({ success: true, data: newState });
            break;
          }

          default: {
            sendResponse({
              success: false,
              error: `Unknown message type: ${String((msg as { type?: string }).type)}`,
            });
          }
        }
      } catch (error) {
        console.error('Error handling message:', error);
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    })();

    // Return true to indicate we'll respond asynchronously
    return true;
  }
);
