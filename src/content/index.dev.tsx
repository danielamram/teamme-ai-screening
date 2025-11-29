/**
 * Initializes the application with Hot Module Replacement (HMR) support for CSS changes.
 * This module addresses issues with HMR when using inline CSS stylesheets during development.
 * When changes are made to Tailwind CSS or other CSS classes, the dev server typically needs
 * to be stopped and restarted to apply the new styles. This module intercepts CSS changes and
 * applies them dynamically without requiring a full dev server restart, thereby improving
 * development efficiency by providing smoother HMR for CSS changes.
 *
 * @module index.dev
 */

import { createRoot } from 'react-dom/client';

import Content from './Content';

import '@assets/styles/index.css';

/**
 * Injects Google Fonts link into the document head.
 * This is necessary because fonts don't work inside Shadow DOM.
 */
function injectGoogleFonts(): void {
  if (document.getElementById('ats-ai-fonts')) return;

  const link = document.createElement('link');
  link.id = 'ats-ai-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap';
  document.head.appendChild(link);
}

const container = document.createElement('div');

// Get the style element corresponding to the CSS file
const styleElement = document.querySelector(
  'style[data-vite-dev-id]'
) as HTMLStyleElement | null;

if (!styleElement) {
  throw new Error('Style element with attribute data-vite-dev-id not found.');
}

// Inject Google Fonts into document head (fonts don't work in Shadow DOM)
injectGoogleFonts();

// Attach the style element to the shadow root
const shadowRoot = container.attachShadow({ mode: 'open' });
shadowRoot.appendChild(styleElement);

document.body.appendChild(container);

// Render the application inside the shadow root
const root = createRoot(shadowRoot);
root.render(<Content />);
