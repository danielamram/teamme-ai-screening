export interface SuggestionItem {
  text: string;
  icon: 'search' | 'building' | 'trophy' | 'clock' | 'users' | 'target';
}

export interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: SuggestionItem[];
  apiEndpoint: string;
}

// Color palette
export const CHAT_COLORS = {
  primary: '#6366f1', // Indigo
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  background: '#FFFFFF',
  surface: '#f8fafc',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#94a3b8',
  },
  user: {
    bg: '#f1f5f9',
    text: '#1e293b',
  },
  assistant: {
    bg: '#f8fafc',
    text: '#0f172a',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  hover: '#f1f5f9',
} as const;
