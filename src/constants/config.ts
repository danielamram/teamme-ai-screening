/**
 * Application configuration constants
 */

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, fallback: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    // eslint-disable-next-line no-console
    console.warn(
      `Environment variable ${key} is not set, using fallback: ${fallback}`
    );
    return fallback;
  }
  return value;
};

/**
 * API Configuration
 */
export const API_CONFIG = {
  assistant: {
    endpoint: getEnvVar(
      'VITE_ASSISTANT_API_URL',
      'https://teamme-acquisition.vercel.app/api/assistant'
    ),
  },
  candidate: {
    baseUrl: getEnvVar(
      'VITE_CANDIDATE_API_URL',
      'https://teamme-acquisition.vercel.app/api/candidates'
    ),
  },
  apiKey: import.meta.env.VITE_API_KEY,
} as const;

/**
 * Environment
 */
export const ENV = {
  isDevelopment: getEnvVar('VITE_ENV', 'development') === 'development',
  isProduction: getEnvVar('VITE_ENV', 'development') === 'production',
} as const;
