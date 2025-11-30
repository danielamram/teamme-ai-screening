// Curated gradient pairs for avatars
const AVATAR_GRADIENTS = [
  ['#8b5cf6', '#d946ef'], // violet → fuchsia
  ['#ec4899', '#f43f5e'], // pink → rose
  ['#f59e0b', '#f97316'], // amber → orange
  ['#10b981', '#14b8a6'], // emerald → teal
  ['#06b6d4', '#0ea5e9'], // cyan → sky
  ['#3b82f6', '#6366f1'], // blue → indigo
  ['#d946ef', '#ec4899'], // fuchsia → pink
];

// Get gradient based on name for consistent avatar colors
export function getAvatarGradient(name: string): [string, string] {
  const index =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index] as [string, string];
}

// Get score color
export function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981'; // success
  if (score >= 60) return '#f59e0b'; // warning
  return '#ef4444'; // error
}
