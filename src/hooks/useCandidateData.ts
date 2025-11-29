import type { APICandidateResponse } from '@/types/candidate';
import { useEffect, useRef, useState } from 'react';

import { fetchCandidateData } from '@/utils/candidateApi';

interface UseCandidateDataProps {
  candidateId: string | null;
}

// eslint-disable-next-line import/prefer-default-export
export function useCandidateData({ candidateId }: UseCandidateDataProps) {
  const [candidate, setCandidate] = useState<APICandidateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  // Load candidate when candidateId changes
  useEffect(() => {
    const loadCandidate = async () => {
      // Prevent concurrent loads
      if (loadingRef.current) {
        return;
      }

      // If no candidateId, clear selection
      if (!candidateId) {
        setCandidate(null);
        return;
      }

      loadingRef.current = true;
      setLoading(true);

      try {
        const candidateData = await fetchCandidateData(candidateId);
        setCandidate(candidateData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading candidate data:', error);
        setCandidate(null);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    loadCandidate();
  }, [candidateId]);

  return {
    candidate,
    loading,
  };
}
