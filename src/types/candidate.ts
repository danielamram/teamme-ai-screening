export interface Recommendation {
  level: 'strong-hire' | 'consider' | 'pass';
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  company: string;
  location: string;
  score: number;
  whyFit: string[];
  recommendation: Recommendation;
  recommendationReasoning: string;
  redFlags: string[];
  gapsToClarify: string[];
}
