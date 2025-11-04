export interface CandidateScore {
  overall: number;
  skills: number;
  experience: number;
  education: number;
}

export interface CandidateMetric {
  label: string;
  value: number;
  maxValue: number;
  description: string;
}

export interface Strength {
  id: string;
  text: string;
  icon?: string;
}

export interface Weakness {
  id: string;
  text: string;
  icon?: string;
}

export type RecommendationLevel = 'strong-hire' | 'consider' | 'pass';

export interface Recommendation {
  level: RecommendationLevel;
  reasoning: string;
  confidenceScore: number;
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  appliedDate: string;
  resumeUrl?: string;
  score: CandidateScore;
  strengths: Strength[];
  weaknesses: Weakness[];
  recommendation: Recommendation;
  metrics: {
    skills: CandidateMetric;
    experience: CandidateMetric;
    education: CandidateMetric;
  };
}

export interface CandidateProfile {
  candidate: Candidate;
  analysisDate: string;
  version: string;
}
