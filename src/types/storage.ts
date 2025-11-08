import { Candidate } from './candidate';

export interface SidebarState {
  isOpen: boolean;
  selectedCandidateId: string | null;
  lastOpenedAt?: number;
}

export interface CandidatesCache {
  [candidateId: string]: {
    data: Candidate;
    timestamp: number;
  };
}

export interface StorageSchema {
  sidebarState: SidebarState;
  selectedCandidateId: string | null;
  sidebarWidth: number;
  theme: 'light' | 'dark';
  candidatesCache: CandidatesCache;
}

export type StorageKey = keyof StorageSchema;

export const DEFAULT_SIDEBAR_STATE: SidebarState = {
  isOpen: false,
  selectedCandidateId: null,
};

export const DEFAULT_SIDEBAR_WIDTH = 400;
export const MIN_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 800;
