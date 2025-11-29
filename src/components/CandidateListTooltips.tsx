import { JSX, useCallback, useEffect, useRef, useState } from 'react';

import { getScoreColor } from '@/constants/design';
import { getCandidateFromAPI } from '@/utils/candidateApi';

import { CHAT_COLORS } from './fab/chat/types';

// Cache for candidate scores to avoid re-fetching
interface CandidateCache {
  [id: string]: {
    score: number;
    loading: boolean;
    error: boolean;
    timestamp: number;
  };
}

// Cache expiration: 5 minutes
const CACHE_EXPIRATION_MS = 5 * 60 * 1000;

// Extract candidate ID from href like /app/int/todo/50935460 or /app/req/358701/can/51042831
function extractCandidateIdFromHref(href: string): string | null {
  // Match /todo/{id} pattern
  const todoMatch = href.match(/\/todo\/(\d+)/);
  if (todoMatch) return todoMatch[1];

  // Match /can/{id} pattern
  const canMatch = href.match(/\/can\/(\d+)/);
  if (canMatch) return canMatch[1];

  return null;
}

// Get recommendation level from score
function getRecommendationLevel(
  score: number
): 'strong-hire' | 'consider' | 'pass' {
  if (score >= 80) return 'strong-hire';
  if (score >= 55) return 'consider';
  return 'pass';
}

// Get label for recommendation
function getRecommendationLabel(
  level: 'strong-hire' | 'consider' | 'pass'
): string {
  switch (level) {
    case 'strong-hire':
      return 'Strong';
    case 'consider':
      return 'Consider';
    case 'pass':
    default:
      return 'Pass';
  }
}

interface HoveredCandidate {
  candidateId: string;
  rect: DOMRect;
}

export default function CandidateListTooltips(): JSX.Element | null {
  const [hoveredCandidate, setHoveredCandidate] =
    useState<HoveredCandidate | null>(null);
  const [candidateCache, setCandidateCache] = useState<CandidateCache>({});
  const observerRef = useRef<MutationObserver | null>(null);
  const pendingFetchesRef = useRef<Set<string>>(new Set());
  const eventListenersRef = useRef<Map<HTMLElement, () => void>>(new Map());

  // Fetch candidate score with caching
  const fetchCandidateScore = useCallback(
    async (candidateId: string) => {
      // Check if already fetching
      if (pendingFetchesRef.current.has(candidateId)) return;

      // Check cache
      const cached = candidateCache[candidateId];
      const now = Date.now();
      if (cached && now - cached.timestamp < CACHE_EXPIRATION_MS) {
        return;
      }

      // Mark as loading
      pendingFetchesRef.current.add(candidateId);
      setCandidateCache((prev) => ({
        ...prev,
        [candidateId]: {
          score: 0,
          loading: true,
          error: false,
          timestamp: now,
        },
      }));

      try {
        const candidate = await getCandidateFromAPI(candidateId);
        setCandidateCache((prev) => ({
          ...prev,
          [candidateId]: {
            score: candidate.score,
            loading: false,
            error: false,
            timestamp: Date.now(),
          },
        }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to fetch candidate ${candidateId}:`, error);
        setCandidateCache((prev) => ({
          ...prev,
          [candidateId]: {
            score: 0,
            loading: false,
            error: true,
            timestamp: Date.now(),
          },
        }));
      } finally {
        pendingFetchesRef.current.delete(candidateId);
      }
    },
    [candidateCache]
  );

  // Handle hover on candidate item
  const handleMouseEnter = useCallback(
    (candidateId: string, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      setHoveredCandidate({ candidateId, rect });
      // Fetch data on hover
      fetchCandidateScore(candidateId);
    },
    [fetchCandidateScore]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredCandidate(null);
  }, []);

  // Attach event listeners to candidate list items
  const attachEventListeners = useCallback(() => {
    const candidateItems = document.querySelectorAll<HTMLElement>(
      '[data-qa="candidateListItem"]'
    );

    // Clean up old listeners that are no longer in DOM
    eventListenersRef.current.forEach((cleanup, element) => {
      if (!document.contains(element)) {
        cleanup();
        eventListenersRef.current.delete(element);
      }
    });

    candidateItems.forEach((item) => {
      // Skip if already has listeners
      if (eventListenersRef.current.has(item)) return;

      // Find the parent <a> tag to get the href
      const parentLink = item.closest('a');
      if (!parentLink) return;

      const href = parentLink.getAttribute('href');
      if (!href) return;

      const candidateId = extractCandidateIdFromHref(href);
      if (!candidateId) return;

      // Create event handlers
      const onEnter = () => handleMouseEnter(candidateId, item);
      const onLeave = () => handleMouseLeave();

      // Attach listeners
      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);

      // Store cleanup function
      eventListenersRef.current.set(item, () => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
    });
  }, [handleMouseEnter, handleMouseLeave]);

  // Set up observers
  useEffect(() => {
    // Initial attachment
    attachEventListeners();

    // Mutation observer for DOM changes
    observerRef.current = new MutationObserver(() => {
      // Debounce the attachment
      setTimeout(attachEventListeners, 100);
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const eventListeners = eventListenersRef.current;

    return () => {
      observerRef.current?.disconnect();
      // Clean up all event listeners
      eventListeners.forEach((cleanup) => cleanup());
      eventListeners.clear();
    };
  }, [attachEventListeners]);

  // Update tooltip position on scroll
  useEffect(() => {
    if (!hoveredCandidate) return undefined;

    const updatePosition = () => {
      const candidateItems = document.querySelectorAll<HTMLElement>(
        '[data-qa="candidateListItem"]'
      );

      const items = Array.from(candidateItems);
      const matchingItem = items.find((item) => {
        const parentLink = item.closest('a');
        if (!parentLink) return false;

        const href = parentLink.getAttribute('href');
        if (!href) return false;

        const candidateId = extractCandidateIdFromHref(href);
        return candidateId === hoveredCandidate.candidateId;
      });

      if (matchingItem) {
        const rect = matchingItem.getBoundingClientRect();
        setHoveredCandidate({
          candidateId: hoveredCandidate.candidateId,
          rect,
        });
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    return () => window.removeEventListener('scroll', updatePosition, true);
  }, [hoveredCandidate]);

  // Don't render if nothing is hovered
  if (!hoveredCandidate) return null;

  const { candidateId, rect } = hoveredCandidate;
  const cached = candidateCache[candidateId];

  // Show loading state
  if (!cached || cached.loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: rect.top + rect.height / 2 - 14,
          left: rect.left - 54,
          width: 44,
          height: 28,
          backgroundColor: CHAT_COLORS.surface,
          borderRadius: 8,
          zIndex: 2147483640,
          animation: 'pulse 1.5s ease-in-out infinite',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  }

  // Don't show on error
  if (cached.error) return null;

  const level = getRecommendationLevel(cached.score);
  const color = getScoreColor(cached.score);
  const label = getRecommendationLabel(level);

  return (
    <div
      style={{
        position: 'fixed',
        top: rect.top + rect.height / 2 - 18,
        left: rect.left - 72,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        zIndex: 2147483640,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)',
        border: `2px solid ${color}`,
        minWidth: 52,
        transition: 'all 0.2s ease',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          color,
          lineHeight: 1.1,
        }}
      >
        {cached.score}
      </span>
      <span
        style={{
          fontSize: 9,
          fontWeight: 600,
          color,
          textTransform: 'uppercase',
          letterSpacing: 0.3,
          lineHeight: 1,
          marginTop: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
