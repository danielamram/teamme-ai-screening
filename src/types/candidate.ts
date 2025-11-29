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
export interface APICandidateMetadata {
  person_uid: string;
  position_uid: string;
  prospect_status: string | null;
  time_last_status_changed: string;
  comeet_url: string;
  current_steps: Array<{
    name: string;
    type: string;
    time_scheduled: string | null;
    position_step_uid: string;
  }>;
  completed_steps: unknown[];
  experience_summary: string;
  deleted: boolean;
}

export interface APICandidateInfo {
  id: string;
  provider: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  skills: string[];
  status: string;
  applicationDate: string;
  linkedinUrl: string;
  metadata: APICandidateMetadata;
}

export interface APICandidateSummary {
  overview: string;
  keySkills: string[];
  experienceSummary: string;
  educationSummary: string;
  strengths: string[];
  potentialConcerns: string[];
  score: number;
  cultureFitIndicators: string[];
  recommendation: string;
  yearsOfExperience: number;
}

export interface APICandidateResponse {
  candidate: APICandidateInfo;
  summary: APICandidateSummary;
  generatedAt: string;
}
