import { useCallback, useEffect, useRef, useState } from 'react';
import type { Candidate } from '@/types/candidate';

import { candidates, getCandidateById } from '@/data/mockCandidates';
import { extractCandidateIdFromUrl } from '@/utils/atsDetector';
import { getCandidateFromAPI } from '@/utils/candidateApi';
import { sendMessage } from '@/utils/messaging';

// eslint-disable-next-line import/prefer-default-export
export function useCandidateData() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const loadingRef = useRef(false);

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

        try {
          // Try to fetch from API first
          const candidate = await getCandidateFromAPI(urlCandidateId);
          console.log(
            `Fetched candidate from API: ${candidate.name} (${urlCandidateId})`
          );
          setSelectedCandidate(candidate);

          // Update storage with the URL candidate
          await sendMessage({
            type: 'SET_SELECTED_CANDIDATE',
            payload: { candidateId: urlCandidateId },
          });
          return;
        } catch (apiError) {
          console.warn(
            `Failed to fetch candidate ${urlCandidateId} from API, falling back to mock data:`,
            apiError
          );

          // Fall back to mock data
          const candidate = getCandidateById(urlCandidateId);
          if (candidate) {
            console.log(
              `Found candidate in mock data: ${candidate.name} (${urlCandidateId})`
            );
            setSelectedCandidate(candidate);
            await sendMessage({
              type: 'SET_SELECTED_CANDIDATE',
              payload: { candidateId: urlCandidateId },
            });
            return;
          }

          console.warn(
            `Candidate ID ${urlCandidateId} not found in API or mock data`
          );
        }

        // Fall back to stored candidate ID
        const response = await sendMessage<{ candidateId: string }>({
          type: 'GET_CANDIDATE_DATA',
        });

        if (response.success && response.data?.candidateId) {
          try {
            // Try API first
            const candidate = await getCandidateFromAPI(
              response.data.candidateId
            );
            setSelectedCandidate(candidate);
          } catch (apiError) {
            // Fall back to mock data
            const candidate = getCandidateById(response.data.candidateId);
            if (candidate) {
              setSelectedCandidate(candidate);
            }
          }
        }
      } catch (error) {
        console.error('Error loading candidate data:', error);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    loadCandidate();
  }, [currentUrl]);

  const selectCandidate = useCallback(async (candidateId: string) => {
    setLoading(true);

    try {
      // Try to fetch from API first
      const candidate = await getCandidateFromAPI(candidateId);
      setSelectedCandidate(candidate);

      await sendMessage({
        type: 'SET_SELECTED_CANDIDATE',
        payload: { candidateId },
      });
    } catch (apiError) {
      console.warn(
        `Failed to fetch candidate ${candidateId} from API, falling back to mock data:`,
        apiError
      );

      // Fall back to mock data
      const candidate = getCandidateById(candidateId);
      if (!candidate) {
        console.error(
          `Candidate not found in API or mock data: ${candidateId}`
        );
        return;
      }

      setSelectedCandidate(candidate);

      try {
        await sendMessage({
          type: 'SET_SELECTED_CANDIDATE',
          payload: { candidateId },
        });
      } catch (error) {
        console.error('Error selecting candidate:', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    selectedCandidate,
    candidates,
    loading,
    selectCandidate,
  };
}
