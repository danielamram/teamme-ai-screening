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
  overview: string;
  strengths: string[];
  recommendationReasoning: string;
  redFlags: string[];
}

export interface SearchCandidate {
  id: string;
  name: string;
  location: string;
  primary_stack: string[];
  summary: string;
}

// API Response Types
export interface DetailedSummary {
  score: number;
  overview: string;
  keySkills: string[];
  strengths: string[];
  recommendation: string;
  educationSummary: string;
  experienceSummary: string;
  potentialConcerns: string[];
  yearsOfExperience: number;
  cultureFitIndicators: string[];
}

export interface APICandidateResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  position_id: string;
  summary: string;
  detailed_summary: DetailedSummary;
  primary_stack: string[];
  languages: string[] | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  github_url: string | null;
  resume_url: string | null;
  status: string | null;
  application_date: string | null;
  applied_position: string | null;
  created_at: string;
  updated_at: string;
}
