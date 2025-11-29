import type { APICandidateResponse, Candidate } from '@/types/candidate';

import { API_CONFIG } from '@/constants/config';

const API_BASE_URL = API_CONFIG.candidate.baseUrl;

const ORG_ID = `43056006-5003-4871-bc5b-95a0a93a39be`;

/**
 * Fetch candidate data from the API
 */
export async function fetchCandidateData(
  candidateId: string
): Promise<APICandidateResponse> {
  const url = `${API_BASE_URL}/organizations/${ORG_ID}/candidates/${candidateId}`;

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
  // Destructure and rename snake_case fields to camelCase
  const {
    detailed_summary: detailedSummary,
    applied_position: appliedPosition,
  } = apiResponse;

  // Use applied_position if available, otherwise fall back to a generic label
  const position = appliedPosition || 'Position Not Specified';

  return {
    id: apiResponse.id,
    name: apiResponse.name,
    position,
    company: 'TeamMe', // Company info not in API response, using default
    location: apiResponse.location || 'Location Not Specified',
    score: detailedSummary.score,
    overview: detailedSummary.overview,
    strengths: detailedSummary.strengths,
    recommendationReasoning: detailedSummary.recommendation,
    redFlags: detailedSummary.potentialConcerns,
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
