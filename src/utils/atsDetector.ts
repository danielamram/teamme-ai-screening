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
