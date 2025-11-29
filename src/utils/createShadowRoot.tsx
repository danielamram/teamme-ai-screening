import { createRoot } from 'react-dom/client';

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

/**
 * Creates a shadow root with the specified styles and returns a React root in it.
 * @param {string} styles - CSS styles to be applied to the shadow root.
 * @returns {ReactRoot} - React root rendered inside the shadow root.
 */
export default function createShadowRoot(styles: string) {
  const host = document.createElement('div');
  // Ensure host takes full width and height
  host.style.width = '100%';
  host.style.height = '100%';
  host.style.display = 'block';

  const shadow = host.attachShadow({ mode: 'open' });

  // Create an internal mount node to avoid Xray wrapper issues in Firefox
  const mount = document.createElement('div');
  mount.style.width = '100%';
  mount.style.height = '100%';
  shadow.appendChild(mount);

  // Inject Google Fonts into document head (fonts don't work in Shadow DOM)
  injectGoogleFonts();

  // Apply styles: prefer constructable stylesheets, fallback safely
  try {
    const supportsConstructable =
      'adoptedStyleSheets' in shadow &&
      'replaceSync' in
        (CSSStyleSheet.prototype as unknown as { replaceSync?: unknown });
    if (supportsConstructable) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles);
      shadow.adoptedStyleSheets = [sheet];
    } else {
      const styleEl = document.createElement('style');
      styleEl.textContent = styles;
      shadow.appendChild(styleEl);
    }
  } catch {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);
  }

  document.body.appendChild(host);
  return createRoot(mount);
}
