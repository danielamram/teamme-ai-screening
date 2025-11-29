import type { APICandidateResponse } from './candidate';

export interface SidebarState {
  isOpen: boolean;
  selectedCandidateId: string | null;
  lastOpenedAt?: number;
}

export interface CandidatesCache {
  [candidateId: string]: {
    data: APICandidateResponse;
    timestamp: number;
  };
}

export interface ExtensionSettings {
  enabled: boolean;
  autoAnalyze: boolean;
  enabledPlatforms: string[]; // List of enabled ATS platform names
  enableAllPlatforms: boolean;
}

export interface APISettings {
  assistantApiUrl: string;
  candidateApiUrl: string;
  apiKey?: string;
  environment: 'development' | 'production';
}

export interface StorageSchema {
  sidebarState: SidebarState;
  selectedCandidateId: string | null;
  sidebarWidth: number;
  theme: 'light' | 'dark';
  candidatesCache: CandidatesCache;
  extensionSettings: ExtensionSettings;
  apiSettings: APISettings;
  enabled: boolean; // Legacy support for popup
  autoAnalyze: boolean; // Legacy support for popup
}

export type StorageKey = keyof StorageSchema;

export const DEFAULT_SIDEBAR_STATE: SidebarState = {
  isOpen: false,
  selectedCandidateId: null,
};

export const DEFAULT_SIDEBAR_WIDTH = 400;
export const MIN_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 800;

export const DEFAULT_EXTENSION_SETTINGS: ExtensionSettings = {
  enabled: true,
  autoAnalyze: true,
  enabledPlatforms: [], // Empty array means all platforms
  enableAllPlatforms: true,
};

export const DEFAULT_API_SETTINGS: APISettings = {
  assistantApiUrl: '',
  candidateApiUrl: '',
  apiKey: '',
  environment: 'development',
};
