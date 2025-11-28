import type { APICandidateResponse, Candidate } from '@/types/candidate';

import { API_CONFIG } from '@/constants/config';

const API_BASE_URL = API_CONFIG.candidate.baseUrl;

/**
 * Fetch candidate data from the API
 */
export async function fetchCandidateData(
  candidateId: string
): Promise<APICandidateResponse> {
  const url = `${API_BASE_URL}/comeet/${candidateId}`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add API key if configured
    if (API_CONFIG.apiKey) {
      headers.Authorization = `Bearer ${API_CONFIG.apiKey}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch candidate data: ${response.status} ${response.statusText}`
      );
    }

    const data: APICandidateResponse = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
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
