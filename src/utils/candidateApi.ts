import type { APICandidateResponse, Candidate } from '@/types/candidate';

const API_BASE_URL = 'https://teamme-acquisition.vercel.app/api/candidates';

/**
 * Fetch candidate data from the API
 */
export async function fetchCandidateData(
  candidateId: string
): Promise<APICandidateResponse> {
  const url = `${API_BASE_URL}/comeet/${candidateId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch candidate data: ${response.status} ${response.statusText}`
      );
    }

    const data: APICandidateResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching candidate data:', error);
    throw error;
  }
}

/**
 * Transform API response to Candidate format
 */
export function transformAPIResponseToCandidate(
  apiResponse: APICandidateResponse
): Candidate {
  const { candidate: apiCandidate, summary } = apiResponse;

  // Extract position from metadata if available
  const position =
    apiCandidate.metadata.current_steps?.[0]?.name || 'Position Not Specified';

  return {
    id: apiCandidate.id,
    name: apiCandidate.name,
    position,
    company: apiCandidate.provider || 'Unknown Company',
    location: apiCandidate.location || 'Location Not Specified',
    score: summary.score,
    overview: summary.overview,
    strengths: summary.strengths,
    recommendationReasoning: summary.recommendation,
    redFlags: summary.potentialConcerns,
  };
}

/**
 * Fetch and transform candidate data
 */
export async function getCandidateFromAPI(
  candidateId: string
): Promise<Candidate> {
  const apiResponse = await fetchCandidateData(candidateId);
  return transformAPIResponseToCandidate(apiResponse);
}
