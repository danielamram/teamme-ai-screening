import { useCallback, useEffect, useState } from 'react';
import type { SidebarState } from '@/types/storage';

import { sendMessage } from '@/utils/messaging';

// eslint-disable-next-line import/prefer-default-export
export function useSidebarState() {
  // Always start with closed state to avoid flashing
  const [state, setState] = useState<SidebarState>({
    isOpen: false,
    selectedCandidateId: null,
  });
  const [loading, setLoading] = useState(true);

  // Load initial state
  useEffect(() => {
    const loadState = async () => {
      try {
        const response = await sendMessage<SidebarState>({
          type: 'GET_SIDEBAR_STATE',
        });
        if (response.success && response.data) {
          // Only update if we got valid data, and force isOpen to false initially
          setState({
            ...response.data,
            isOpen: false, // Always start closed
          });
        }
      } catch (error) {
        console.error('Error loading sidebar state:', error);
      } finally {
        setLoading(false);
      }
    };

    loadState();
  }, []);

  const toggleSidebar = useCallback(async () => {
    const newIsOpen = !state.isOpen;
    setState((prev) => ({ ...prev, isOpen: newIsOpen }));

    try {
      await sendMessage({
        type: 'SET_SIDEBAR_STATE',
        payload: { isOpen: newIsOpen },
      });
    } catch (error) {
      console.error('Error toggling sidebar:', error);
      // Revert on error
      setState((prev) => ({ ...prev, isOpen: !newIsOpen }));
    }
  }, [state.isOpen]);

  const openSidebar = useCallback(async () => {
    if (!state.isOpen) {
      setState((prev) => ({ ...prev, isOpen: true }));
      try {
        await sendMessage({
          type: 'SET_SIDEBAR_STATE',
          payload: { isOpen: true },
        });
      } catch (error) {
        console.error('Error opening sidebar:', error);
        setState((prev) => ({ ...prev, isOpen: false }));
      }
    }
  }, [state.isOpen]);

  const closeSidebar = useCallback(async () => {
    if (state.isOpen) {
      setState((prev) => ({ ...prev, isOpen: false }));
      try {
        await sendMessage({
          type: 'SET_SIDEBAR_STATE',
          payload: { isOpen: false },
        });
      } catch (error) {
        console.error('Error closing sidebar:', error);
        setState((prev) => ({ ...prev, isOpen: true }));
      }
    }
  }, [state.isOpen]);

  return {
    isOpen: state.isOpen,
    selectedCandidateId: state.selectedCandidateId,
    loading,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  };
}
