/**
 * Utility to detect if the current page is an ATS (Applicant Tracking System) platform
 */

export interface ATSPlatform {
  name: string;
  domains: string[];
  patterns: RegExp[];
}

export const ATS_PLATFORMS: ATSPlatform[] = [
  {
    name: 'Greenhouse',
    domains: ['greenhouse.io'],
    patterns: [/greenhouse\.io/i],
  },
  {
    name: 'Lever',
    domains: ['lever.co'],
    patterns: [/lever\.co/i],
  },
  {
    name: 'Workday',
    domains: ['myworkday.com', 'workday.com'],
    patterns: [/workday\.com/i, /myworkday\.com/i],
  },
  {
    name: 'Taleo',
    domains: ['taleo.net'],
    patterns: [/taleo\.net/i],
  },
  {
    name: 'iCIMS',
    domains: ['icims.com'],
    patterns: [/icims\.com/i],
  },
  {
    name: 'BambooHR',
    domains: ['bamboohr.com'],
    patterns: [/bamboohr\.com/i],
  },
  {
    name: 'ADP',
    domains: ['adp.com'],
    patterns: [/adp\.com/i],
  },
  {
    name: 'SmartRecruiters',
    domains: ['smartrecruiters.com'],
    patterns: [/smartrecruiters\.com/i],
  },
  {
    name: 'JazzHR',
    domains: ['jazzhr.com'],
    patterns: [/jazzhr\.com/i],
  },
  {
    name: 'Recruiterbox',
    domains: ['recruiterbox.com'],
    patterns: [/recruiterbox\.com/i],
  },
  {
    name: 'Comeet',
    domains: ['app.comeet.co'],
    patterns: [/app\.comeet\.co/i],
  },
];

/**
 * Check if the current URL matches any ATS platform
 */
export function detectATSPlatform(url: string): ATSPlatform | null {
  const normalizedUrl = url.toLowerCase();

  const platform = ATS_PLATFORMS.find(
    (p) =>
      p.domains.some((domain) => normalizedUrl.includes(domain)) ||
      p.patterns.some((pattern) => pattern.test(url))
  );

  return platform || null;
}

/**
 * Check if we're currently on an ATS platform
 */
export function isOnATSPlatform(): boolean {
  return detectATSPlatform(window.location.href) !== null;
}

/**
 * Get the current ATS platform name
 */
export function getCurrentATSPlatform(): string | null {
  const platform = detectATSPlatform(window.location.href);
  return platform ? platform.name : null;
}

/**
 * Get all ATS domain patterns for manifest content_scripts
 */
export function getATSMatchPatterns(): string[] {
  return ATS_PLATFORMS.flatMap((platform) =>
    platform.domains.map((domain) => `*://*.${domain}/*`)
  );
}

/**
 * Extract candidate ID from Comeet URL
 * Formats:
 * - https://app.comeet.co/app/req/358701/can/51042831?reqStatus=1 (numeric)
 * - https://app.comeet.co/app/?goto_url=/can/52483175 (numeric)
 * - Any URL with person_uid parameter like 64.D0237
 * Note: Returns the person_uid format (e.g., 64.D0237) when available,
 * otherwise returns numeric ID as-is
 */
export function extractComeetCandidateId(url: string): string | null {
  // First, try to extract person_uid from URL parameters
  const urlObj = new URL(url);
  const personUid = urlObj.searchParams.get('person_uid');
  if (personUid) {
    return personUid;
  }

  // Try to extract from goto_url parameter
  const gotoUrl = urlObj.searchParams.get('goto_url');
  if (gotoUrl) {
    const match = gotoUrl.match(/\/can\/([A-Za-z0-9.]+)/);
    if (match) {
      return match[1];
    }
  }

  // Fall back to extracting from the main URL path
  // This pattern matches both numeric IDs and alphanumeric IDs like 64.D0237
  const pathMatch = url.match(/\/can\/([A-Za-z0-9.]+)/);
  return pathMatch ? pathMatch[1] : null;
}

/**
 * Extract candidate ID from the current URL based on the ATS platform
 */
export function extractCandidateIdFromUrl(url: string): string | null {
  const platform = detectATSPlatform(url);

  if (!platform) {
    return null;
  }

  switch (platform.name) {
    case 'Comeet':
      return extractComeetCandidateId(url);
    // Add more ATS platforms as needed
    default:
      return null;
  }
}

/**
 * Extract position/job ID from Comeet URL
 * Format: https://app.comeet.co/app/req/391432?reqStatus=1
 */
export function extractComeetPositionId(url: string): string | null {
  // Pattern matches /req/{positionId} in URL path
  const match = url.match(/\/req\/([0-9]+)/);
  return match ? match[1] : null;
}

/**
 * Extract position ID from the current URL based on the ATS platform
 */
export function extractPositionIdFromUrl(url: string): string | null {
  const platform = detectATSPlatform(url);

  if (!platform) {
    return null;
  }

  switch (platform.name) {
    case 'Comeet':
      return extractComeetPositionId(url);
    // Add more ATS platforms as needed
    default:
      return null;
  }
}

/**
 * Page type detection for the extension
 */
export type PageType = 'candidate' | 'position' | null;

/**
 * Detect the type of page (candidate, position, or neither)
 */
export function detectPageType(url: string): PageType {
  // Check if it's a candidate page
  const candidateId = extractCandidateIdFromUrl(url);
  if (candidateId) return 'candidate';

  // Check if it's a position page (must not have /can/ in URL)
  const positionId = extractPositionIdFromUrl(url);
  if (positionId && !url.includes('/can/')) {
    return 'position';
  }

  return null;
}
