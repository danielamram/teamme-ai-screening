/**
 * Design system constants for the ATS Candidate Screening Sidebar
 */

export const COLORS = {
  // Base palette
  white: '#FFFFFF', // Backgrounds, modal surfaces
  gray: {
    50: '#F7F8FA', // Page background
    100: '#F1F2F4', // Cards / soft panels
    200: '#E4E6E8', // Borders / strokes
    300: '#D4D6DA', // Inputs / secondary stroke
    600: '#666B73', // Secondary text, icons
    900: '#1F2024', // Titles, primary text
  },
  black: '#000000', // Deepest shadow (rare)

  // Additional palette
  bgPage: '#F5F5F5', // Page background alternative
  bgBox: '#EDEDED', // Box background
  textBody: '#616161', // Body text
  iconColor: '#9F9F9F', // Icon color

  // Primary brand colors (keeping for accent purposes)
  primary: {
    indigo: '#4f46e5', // Indigo accent
    indigoLight: '#6366f1',
    indigoDark: '#4338ca',
  },

  // Score-based colors
  score: {
    excellent: '#10b981', // Green for 80+
    good: '#22c55e', // Light green for 70-79
    moderate: '#f59e0b', // Amber for 60-69
    fair: '#f97316', // Orange for 50-59
    poor: '#ef4444', // Red for <50
  },

  // Semantic colors
  success: '#4CAF7B',
  warning: '#F29B4B',
  error: '#E2554F',
  info: '#3b82f6',

  // UI colors
  background: {
    primary: '#FFFFFF', // Main background / modal surfaces
    page: '#F5F5F5', // Page background
    card: '#FFFFFF', // Card background
    cardAlt: '#F1F2F4', // Alternative card background
    box: '#EDEDED', // Box background
  },

  text: {
    primary: '#1F2024', // Titles, primary text
    secondary: '#666B73', // Secondary text, icons
    body: '#616161', // Body text
    muted: '#9F9F9F', // Muted text / icons
  },

  border: {
    default: '#E4E6E8', // Borders / strokes
    light: '#F1F2F4', // Light borders
    input: '#D4D6DA', // Inputs / secondary stroke
    focus: 'rgba(79, 70, 229, 0.5)',
  },
} as const;

export const ANIMATIONS = {
  // Duration
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Easing
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Keyframes
  slideInLeft: `
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,

  slideOutLeft: `
    @keyframes slideOutLeft {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(-100%);
        opacity: 0;
      }
    }
  `,

  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,

  shimmer: `
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }
  `,

  pulse: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,

  countUp: `
    @keyframes countUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
} as const;

export const LAYOUT = {
  sidebar: {
    width: '260px',
    maxWidth: '90vw',
    zIndex: 2147483647, // Maximum z-index
  },

  toggle: {
    size: '48px',
    bottom: '24px',
    left: '24px',
    zIndex: 2147483646,
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
} as const;

export const TYPOGRAPHY = {
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  glow: '0 0 20px rgba(79, 70, 229, 0.2)',
} as const;

/**
 * Get color based on score value
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return COLORS.score.excellent;
  if (score >= 70) return COLORS.score.good;
  if (score >= 60) return COLORS.score.moderate;
  if (score >= 50) return COLORS.score.fair;
  return COLORS.score.poor;
}

/**
 * Get recommendation badge color
 */
export function getRecommendationColor(
  level: 'strong-hire' | 'consider' | 'pass'
): string {
  switch (level) {
    case 'strong-hire':
      return COLORS.success;
    case 'consider':
      return COLORS.warning;
    case 'pass':
      return COLORS.error;
    default:
      return COLORS.text.muted;
  }
}

/**
 * Format recommendation level for display
 */
export function formatRecommendationLevel(
  level: 'strong-hire' | 'consider' | 'pass'
): string {
  switch (level) {
    case 'strong-hire':
      return 'Strong Hire';
    case 'consider':
      return 'Consider';
    case 'pass':
      return 'Pass';
    default:
      return 'Unknown';
  }
}
