import { useEffect, useState } from 'react';

import { detectATSPlatform } from '@/utils/atsDetector';

/**
 * Hook to detect if the current page is on any ATS platform.
 * Automatically updates when the URL changes via:
 * - Browser navigation (back/forward)
 * - SPA navigation (pushState/replaceState)
 * - Fallback polling for other navigation methods
 *
 * @returns true if on any supported ATS platform, false otherwise
 */
export function useIsOnATS(): boolean {
  const [isOnATS, setIsOnATS] = useState<boolean>(() => {
    const platform = detectATSPlatform(window.location.href);
    return platform !== null;
  });

  useEffect(() => {
    let previousUrl = window.location.href;

    // Check URL and update ATS detection
    const checkUrlAndUpdate = () => {
      const currentUrl = window.location.href;
      if (currentUrl !== previousUrl) {
        previousUrl = currentUrl;
        const platform = detectATSPlatform(currentUrl);
        setIsOnATS(platform !== null);
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

  return isOnATS;
}
