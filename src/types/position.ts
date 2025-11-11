/**
 * Types for job position and candidate data
 */

export interface PositionCandidate {
  id: string;
  name: string;
  position: string;
  location: string;
  age: number;
  score: number;
  email: string;
  phone?: string;
  appliedDate: string;
  status: 'active' | 'reviewing' | 'shortlisted' | 'rejected';
}

export interface Position {
  id: string;
  title: string;
  company: string;
  location: string;
  department?: string;
  description?: string;
  status: 'open' | 'closed' | 'draft';
  totalCandidates: number;
  candidates: PositionCandidate[];
}

export interface PositionFilters {
  location: string;
  ageMin: number | null;
  ageMax: number | null;
}
