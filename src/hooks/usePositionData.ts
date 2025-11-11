import { useCallback, useEffect, useRef, useState } from 'react';
import type { Position, PositionCandidate } from '@/types/position';

import { extractPositionIdFromUrl } from '@/utils/atsDetector';

// Mock data generator for position candidates
function generateMockCandidates(positionId: string): PositionCandidate[] {
  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Austin, TX',
    'Seattle, WA',
    'Boston, MA',
    'Denver, CO',
    'Los Angeles, CA',
    'Chicago, IL',
  ];

  const positions = [
    'Senior Software Engineer',
    'Frontend Developer',
    'Full Stack Engineer',
    'Backend Developer',
    'Software Engineer',
  ];

  const firstNames = [
    'Sarah',
    'Michael',
    'Jessica',
    'David',
    'Emily',
    'James',
    'Amanda',
    'Robert',
    'Lisa',
    'William',
  ];
  const lastNames = [
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Anderson',
  ];

  const statuses: Array<'active' | 'reviewing' | 'shortlisted' | 'rejected'> = [
    'active',
    'reviewing',
    'shortlisted',
  ];

  // Generate 8 candidates, but we'll show top 5 by score
  const candidates: PositionCandidate[] = [];
  for (let i = 0; i < 8; i += 1) {
    const score = Math.floor(Math.random() * 30) + 70; // 70-99
    candidates.push({
      id: `${positionId}-candidate-${i + 1}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      position: positions[i % positions.length],
      location: locations[i % locations.length],
      age: Math.floor(Math.random() * 15) + 25, // 25-39
      score,
      email: `candidate${i + 1}@example.com`,
      phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`,
      appliedDate: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: statuses[i % statuses.length],
    });
  }

  // Sort by score (highest first) and return top 5
  return candidates.sort((a, b) => b.score - a.score).slice(0, 5);
}

// Mock data generator for position
function generateMockPosition(positionId: string): Position {
  const positions = [
    'Senior Software Engineer',
    'Product Manager',
    'Frontend Developer',
    'Data Scientist',
    'UX Designer',
  ];

  const departments = [
    'Engineering',
    'Product',
    'Design',
    'Data Science',
    'Marketing',
  ];

  const locations = [
    'San Francisco, CA',
    'Remote',
    'New York, NY',
    'Hybrid - Bay Area',
  ];

  const candidates = generateMockCandidates(positionId);

  return {
    id: positionId,
    title: positions[parseInt(positionId, 10) % positions.length],
    company: 'Acme Corporation',
    location: locations[parseInt(positionId, 10) % locations.length],
    department: departments[parseInt(positionId, 10) % departments.length],
    description: 'We are looking for talented individuals to join our team.',
    status: 'open',
    totalCandidates: Math.floor(Math.random() * 50) + 20,
    candidates,
  };
}

// eslint-disable-next-line import/prefer-default-export
export function usePositionData() {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const loadingRef = useRef(false);

  // Poll for URL changes (handles all SPA navigation patterns)
  useEffect(() => {
    const checkUrlChange = () => {
      if (window.location.href !== currentUrl) {
        setCurrentUrl(window.location.href);
      }
    };

    // Check every 500ms for URL changes
    const intervalId = setInterval(checkUrlChange, 500);

    // Also listen for navigation events
    window.addEventListener('popstate', checkUrlChange);
    window.addEventListener('hashchange', checkUrlChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('popstate', checkUrlChange);
      window.removeEventListener('hashchange', checkUrlChange);
    };
  }, [currentUrl]);

  // Load position data when URL changes
  useEffect(() => {
    const loadPosition = async () => {
      // Prevent concurrent loads
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;
      setLoading(true);

      try {
        // Extract position ID from URL
        const positionId = extractPositionIdFromUrl(currentUrl);

        if (!positionId) {
          setPosition(null);
          return;
        }

        // Generate mock data for the position
        const mockPosition = generateMockPosition(positionId);
        setPosition(mockPosition);
      } catch (error) {
        setPosition(null);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    loadPosition();
  }, [currentUrl]);

  const selectPosition = useCallback(async (positionId: string) => {
    setLoading(true);

    try {
      const mockPosition = generateMockPosition(positionId);
      setPosition(mockPosition);
    } catch (error) {
      setPosition(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    position,
    loading,
    selectPosition,
  };
}
