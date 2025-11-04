import { useCallback, useEffect, useState } from 'react';
import type { Candidate } from '@/types/candidate';

import {
  getCandidateById,
  getDefaultCandidate,
  mockCandidates,
} from '@/data/mockCandidates';
import { sendMessage } from '@/utils/messaging';

// eslint-disable-next-line import/prefer-default-export
export function useCandidateData() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(
    getDefaultCandidate()
  );
  const [loading, setLoading] = useState(false);

  // Load selected candidate from storage
  useEffect(() => {
    const loadCandidate = async () => {
      setLoading(true);
      try {
        const response = await sendMessage<{ candidateId: string }>({
          type: 'GET_CANDIDATE_DATA',
        });

        if (response.success && response.data?.candidateId) {
          const candidate = getCandidateById(response.data.candidateId);
          if (candidate) {
            setSelectedCandidate(candidate);
          }
        }
      } catch (error) {
        console.error('Error loading candidate data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCandidate();
  }, []);

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
    candidates: mockCandidates,
    loading,
    selectCandidate,
  };
}
