import styles from '@assets/styles/index.css?inline';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';

// Use the existing container div instead of creating a new one
const container = document.getElementById('my-ext-popup-page');
if (!container) throw new Error('Popup container not found');

const shadow = container.attachShadow({ mode: 'open' });

// Create mount node inside shadow root
const mount = document.createElement('div');
mount.style.width = '100%';
mount.style.height = '100%';
shadow.appendChild(mount);

// Apply styles
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

const root = createRoot(mount);
root.render(<Popup />);
