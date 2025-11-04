import { useCallback, useEffect, useRef, useState } from 'react';
import type { Candidate } from '@/types/candidate';

import {
  candidates,
  getCandidateById,
  getDefaultCandidate,
} from '@/data/mockCandidates';
import { extractCandidateIdFromUrl } from '@/utils/atsDetector';
import { sendMessage } from '@/utils/messaging';

// eslint-disable-next-line import/prefer-default-export
export function useCandidateData() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(
    getDefaultCandidate()
  );
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [candidateFound, setCandidateFound] = useState(false);
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

        if (urlCandidateId) {
          const candidate = getCandidateById(urlCandidateId);
          if (candidate) {
            console.log(
              `Found candidate from URL: ${candidate.name} (${urlCandidateId})`
            );
            setSelectedCandidate(candidate);
            setCandidateFound(true);
            // Update storage with the URL candidate
            await sendMessage({
              type: 'SET_SELECTED_CANDIDATE',
              payload: { candidateId: urlCandidateId },
            });
            return;
          }
          console.warn(
            `Candidate ID ${urlCandidateId} from URL not found in mock data`
          );
        }

        // No candidate found in URL
        setCandidateFound(false);

        // Fall back to stored candidate ID
        const response = await sendMessage<{ candidateId: string }>({
          type: 'GET_CANDIDATE_DATA',
        });

        if (response.success && response.data?.candidateId) {
          const candidate = getCandidateById(response.data.candidateId);
          if (candidate) {
            setSelectedCandidate(candidate);
            setCandidateFound(true);
          }
        }
      } catch (error) {
        console.error('Error loading candidate data:', error);
        setCandidateFound(false);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    loadCandidate();
  }, [currentUrl]);

  const selectCandidate = useCallback(async (candidateId: string) => {
    const candidate = getCandidateById(candidateId);
    if (!candidate) {
      console.error(`Candidate not found: ${candidateId}`);
      return;
    }

    setLoading(true);
    setSelectedCandidate(candidate);

    try {
      await sendMessage({
        type: 'SET_SELECTED_CANDIDATE',
        payload: { candidateId },
      });
    } catch (error) {
      console.error('Error selecting candidate:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    selectedCandidate,
    candidates,
    loading,
    candidateFound,
    selectCandidate,
  };
}
