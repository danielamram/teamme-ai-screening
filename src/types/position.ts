/**
 * Types for job position and candidate data
 */

export type ScoringFieldType = 'range' | 'select' | 'multiselect' | 'boolean';

export interface ScoringField {
  id: string;
  label: string;
  type: ScoringFieldType;
  weight: number; // 0-100, how important this field is in scoring
  options?: string[]; // For select/multiselect types
  min?: number; // For range type
  max?: number; // For range type
}

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
  // Dynamic scoring field values
  scoringValues?: Record<string, string | number | boolean | string[]>;
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
  // Scoring configuration for this position
  scoringFields?: ScoringField[];
}

export interface PositionFilters {
  [fieldId: string]:
    | string
    | number
    | boolean
    | string[]
    | null
    | undefined
    | [number | null, number | null];
}
