import { useCallback } from 'react';

import { DEFAULT_SIDEBAR_STATE } from '@/types/storage';

import { useLocalStorage } from './useLocalStorage';

// eslint-disable-next-line import/prefer-default-export
export function useSidebarState() {
  const [sidebarState, setSidebarState, loading] = useLocalStorage(
    'sidebarState',
    DEFAULT_SIDEBAR_STATE
  );

  const toggleSidebar = useCallback(async () => {
    const newIsOpen = !sidebarState.isOpen;
    await setSidebarState({
      ...sidebarState,
      isOpen: newIsOpen,
      lastOpenedAt: newIsOpen ? Date.now() : sidebarState.lastOpenedAt,
    });
  }, [sidebarState, setSidebarState]);

  const openSidebar = useCallback(async () => {
    if (!sidebarState.isOpen) {
      await setSidebarState({
        ...sidebarState,
        isOpen: true,
        lastOpenedAt: Date.now(),
      });
    }
  }, [sidebarState, setSidebarState]);

  const closeSidebar = useCallback(async () => {
    if (sidebarState.isOpen) {
      await setSidebarState({
        ...sidebarState,
        isOpen: false,
      });
    }
  }, [sidebarState, setSidebarState]);

  return {
    isOpen: sidebarState.isOpen,
    selectedCandidateId: sidebarState.selectedCandidateId,
    loading,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  };
}
