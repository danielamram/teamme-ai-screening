import { useEffect } from 'react';

type KeyboardHandler = (event: KeyboardEvent) => void;

interface UseKeyboardShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
}

/**
 * Hook for keyboard shortcuts
 */
export function useKeyboardShortcut(
  key: string,
  handler: KeyboardHandler,
  options: UseKeyboardShortcutOptions = {}
): void {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        if (preventDefault) {
          event.preventDefault();
        }
        handler(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, handler, enabled, preventDefault]);
}

/**
 * Hook for ESC key specifically
 */
export function useEscapeKey(
  handler: () => void,
  enabled: boolean = true
): void {
  useKeyboardShortcut('Escape', handler, { enabled });
}
