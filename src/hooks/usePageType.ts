import { useEffect, useState } from 'react';
import type { PageType } from '@/utils/atsDetector';

import { detectPageType } from '@/utils/atsDetector';

/**
 * Hook to detect and track the current page type based on URL changes.
 * Automatically updates when the URL changes via:
 * - Browser navigation (back/forward)
 * - SPA navigation (pushState/replaceState)
 * - Fallback polling for other navigation methods
 *
 * @returns The current page type ('candidate', 'position', or null)
 */
export function usePageType(): PageType {
  const [pageType, setPageType] = useState<PageType>(() =>
    detectPageType(window.location.href)
  );

  useEffect(() => {
    let previousUrl = window.location.href;

    // Check URL and update page type
    const checkUrlAndUpdate = () => {
      const currentUrl = window.location.href;
      if (currentUrl !== previousUrl) {
        previousUrl = currentUrl;
        const newPageType = detectPageType(currentUrl);
        setPageType(newPageType);
      }
    };

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      checkUrlAndUpdate();
    };

    // Listen for SPA navigation (pushState/replaceState)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function pushStateWrapper(...args) {
      originalPushState.apply(window.history, args);
      checkUrlAndUpdate();
    };

    window.history.replaceState = function replaceStateWrapper(...args) {
      originalReplaceState.apply(window.history, args);
      checkUrlAndUpdate();
    };

    // Also poll for URL changes as fallback (some SPAs use other methods)
    const intervalId = setInterval(checkUrlAndUpdate, 1000);

    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearInterval(intervalId);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  return pageType;
}
