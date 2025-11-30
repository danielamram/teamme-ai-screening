// Extended color palette for candidate detail views
export const EXTENDED_COLORS = {
  slate: {
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  red: {
    50: '#fef2f2',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    300: '#a5b4fc',
    600: '#4f46e5',
    900: '#312e81',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    300: '#93c5fd',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    600: '#059669',
    700: '#047857',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    600: '#d97706',
    700: '#b45309',
  },
};

// Skill badge colors
export const SKILL_COLORS = [
  { bg: '#ede9fe', text: '#6d28d9', border: '#ddd6fe' }, // violet
  { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' }, // sky
  { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8' }, // pink
  { bg: '#d1fae5', text: '#047857', border: '#a7f3d0' }, // emerald
  { bg: '#fef3c7', text: '#b45309', border: '#fde68a' }, // amber
  { bg: '#e0e7ff', text: '#4338ca', border: '#c7d2fe' }, // indigo
  { bg: '#ccfbf1', text: '#0f766e', border: '#99f6e4' }, // teal
  { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' }, // red
];

// Analysis section colors
export const ANALYSIS_COLORS = {
  strengths: {
    icon: '#059669', // emerald-600
    iconBg: '#d1fae5', // emerald-100
    title: '#047857', // emerald-700
    border: '#a7f3d099', // emerald-200/60
    background: 'linear-gradient(to bottom right, #ecfdf580, #ffffff)', // emerald-50/80 to white
  },
  concerns: {
    icon: '#d97706', // amber-600
    iconBg: '#fef3c7', // amber-100
    title: '#b45309', // amber-700
    border: '#fde68a99', // amber-200/60
    background: 'linear-gradient(to bottom right, #fffbeb80, #ffffff)', // amber-50/80 to white
  },
  cultureFit: {
    icon: '#4f46e5', // indigo-600
    iconBg: '#e0e7ff', // indigo-100
    title: '#4338ca', // indigo-700
    border: '#c7d2fe99', // indigo-200/60
    background: 'linear-gradient(to bottom right, #eef2ff80, #ffffff)', // indigo-50/80 to white
  },
};
