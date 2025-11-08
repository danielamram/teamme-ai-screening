import { useCallback, useEffect, useRef, useState } from 'react';
import type { Candidate } from '@/types/candidate';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { extractCandidateIdFromUrl } from '@/utils/atsDetector';
import { getCandidateFromAPI } from '@/utils/candidateApi';

// Cache expiration time: 5 minutes
const CACHE_EXPIRATION_MS = 5 * 60 * 1000;

// eslint-disable-next-line import/prefer-default-export
export function useCandidateData() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const loadingRef = useRef(false);

  // Use localStorage to cache candidate data
  const [candidatesCache, setCandidatesCache] = useLocalStorage(
    'candidatesCache',
    {}
  );

  // Helper function to fetch candidate with caching
  const fetchCandidateWithCache = useCallback(
    async (candidateId: string): Promise<Candidate> => {
      // Check if candidate exists in cache and is not expired
      const cachedEntry = candidatesCache[candidateId];
      const now = Date.now();

      if (cachedEntry && now - cachedEntry.timestamp < CACHE_EXPIRATION_MS) {
        console.log(`Using cached candidate data for: ${candidateId}`);
        return cachedEntry.data;
      }

      // Cache miss or expired - fetch from API
      console.log(`Fetching candidate from API: ${candidateId}`);
      const candidate = await getCandidateFromAPI(candidateId);

      // Update cache
      await setCandidatesCache({
        ...candidatesCache,
        [candidateId]: {
          data: candidate,
          timestamp: now,
        },
      });

      return candidate;
    },
    [candidatesCache, setCandidatesCache]
  );

  // Poll for URL changes (handles all SPA navigation patterns)
  useEffect(() => {
    const checkUrlChange = () => {
      if (window.location.href !== currentUrl) {
        setCurrentUrl(window.location.href);
      }
    };

    // Check every 500ms for URL changes
    const intervalId = setInterval(checkUrlChange, 500);

    // Also listen for navigation events
    window.addEventListener('popstate', checkUrlChange);
    window.addEventListener('hashchange', checkUrlChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('popstate', checkUrlChange);
      window.removeEventListener('hashchange', checkUrlChange);
    };
  }, [currentUrl]);

  // Load selected candidate when URL changes
  useEffect(() => {
    const loadCandidate = async () => {
      // Prevent concurrent loads
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;
      setLoading(true);

      try {
        // First, try to extract candidate ID from URL
        const urlCandidateId = extractCandidateIdFromUrl(currentUrl);

        if (!urlCandidateId) {
          setSelectedCandidate(null);
          return;
        }

        console.log(`Extracted candidate ID from URL: ${urlCandidateId}`);

        // Use cached fetch helper
        const candidate = await fetchCandidateWithCache(urlCandidateId);
        console.log(candidate);
        console.log(`Loaded candidate: ${candidate.name} (${urlCandidateId})`);
        setSelectedCandidate(candidate);
      } catch (error) {
        console.error('Error loading candidate data:', error);
        setSelectedCandidate(null);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    loadCandidate();
  }, [currentUrl, fetchCandidateWithCache]);

  const selectCandidate = useCallback(
    async (candidateId: string) => {
      setLoading(true);

      try {
        // Try to fetch from cache or API
        const candidate = await fetchCandidateWithCache(candidateId);
        setSelectedCandidate(candidate);
      } catch (apiError) {
        console.warn(
          `Failed to fetch candidate ${candidateId} from API, falling back to mock data:`,
          apiError
        );
        setSelectedCandidate(null);
      } finally {
        setLoading(false);
      }
    },
    [fetchCandidateWithCache]
  );

  return {
    selectedCandidate,
    loading,
    selectCandidate,
  };
}
