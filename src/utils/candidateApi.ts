import type {
  APICandidateResponse,
  Candidate,
  Recommendation,
} from '@/types/candidate';

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
 * Parse recommendation string to determine level
 */
function parseRecommendationLevel(
  recommendation: string
): Recommendation['level'] {
  const lowerRec = recommendation.toLowerCase();

  if (
    lowerRec.includes('strong') ||
    lowerRec.includes('highly recommend') ||
    lowerRec.includes('excellent')
  ) {
    return 'strong-hire';
  }

  if (
    lowerRec.includes('pass') ||
    lowerRec.includes('not recommend') ||
    lowerRec.includes('reject') ||
    lowerRec.includes('caution')
  ) {
    return 'pass';
  }

  return 'consider';
}

/**
 * Calculate a score based on the recommendation and years of experience
 */
function calculateScore(
  recommendation: string,
  yearsOfExperience: number
): number {
  let baseScore = 50;

  // Adjust score based on recommendation
  const lowerRec = recommendation.toLowerCase();
  if (
    lowerRec.includes('strong') ||
    lowerRec.includes('highly recommend') ||
    lowerRec.includes('excellent')
  ) {
    baseScore = 85;
  } else if (lowerRec.includes('consider') || lowerRec.includes('proceed')) {
    baseScore = 65;
  } else if (
    lowerRec.includes('pass') ||
    lowerRec.includes('not recommend') ||
    lowerRec.includes('caution')
  ) {
    baseScore = 35;
  }

  // Adjust slightly based on years of experience (up to +15 points)
  const experienceBonus = Math.min(15, yearsOfExperience * 1.5);

  return Math.min(100, Math.round(baseScore + experienceBonus));
}

/**
 * Transform API response to Candidate format
 */
export function transformAPIResponseToCandidate(
  apiResponse: APICandidateResponse
): Candidate {
  const { candidate: apiCandidate, summary } = apiResponse;

  const recommendationLevel = parseRecommendationLevel(summary.recommendation);
  const score = calculateScore(
    summary.recommendation,
    summary.yearsOfExperience
  );

  // Extract position from metadata if available
  const position =
    apiCandidate.metadata.current_steps?.[0]?.name || 'Position Not Specified';

  return {
    id: apiCandidate.id,
    name: apiCandidate.name,
    position,
    company: apiCandidate.provider || 'Unknown Company',
    location: apiCandidate.location || 'Location Not Specified',
    score,
    whyFit: [
      ...summary.strengths,
      ...summary.cultureFitIndicators,
      summary.overview,
    ].slice(0, 8), // Limit to 8 items
    recommendation: {
      level: recommendationLevel,
    },
    recommendationReasoning: summary.recommendation,
    redFlags: summary.potentialConcerns,
    gapsToClarify: [
      summary.experienceSummary,
      summary.educationSummary,
      `Key Skills: ${summary.keySkills.join(', ')}`,
    ].filter((item) => item && item.trim().length > 0),
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
