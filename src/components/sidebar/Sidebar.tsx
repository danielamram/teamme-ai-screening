import { JSX } from 'react';

import { useShimmer } from '@/hooks/useAnimations';
import { useCandidateData } from '@/hooks/useCandidateData';
import { useEscapeKey } from '@/hooks/useKeyboardShortcut';
import { useSidebarState } from '@/hooks/useSidebarState';

import CollapseToggle from './CollapseToggle';
import MetricsCards from './MetricsCards';
import OverallScore from './OverallScore';
import RecommendationSection from './RecommendationSection';
import SidebarHeader from './SidebarHeader';
import StrengthsSection from './StrengthsSection';
import WeaknessesSection from './WeaknessesSection';

export default function Sidebar(): JSX.Element {
  const { isOpen, closeSidebar, openSidebar } = useSidebarState();
  const { selectedCandidate, loading } = useCandidateData();
  const showShimmer = useShimmer(loading);

  // Close sidebar on ESC key
  useEscapeKey(closeSidebar, isOpen);

  return (
    <>
      <CollapseToggle
        isOpen={isOpen}
        onToggle={isOpen ? closeSidebar : openSidebar}
      />

      {/* Sidebar */}
      <div
        className='fixed left-0 top-0 h-full w-[400px] max-w-[90vw]'
        style={{
          zIndex: 2147483646,
          backgroundColor: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        role='complementary'
        aria-label='AI Candidate Screening Sidebar'
      >
        {/* Sidebar content */}
        <div className='flex h-full flex-col'>
          {/* Header */}
          <SidebarHeader candidate={selectedCandidate} onClose={closeSidebar} />

          {/* Scrollable content */}
          <div
            className='flex-1 overflow-y-auto'
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #1e293b',
            }}
          >
            {showShimmer ? (
              // Loading shimmer effect
              <div className='space-y-4 p-4'>
                <div className='h-48 animate-pulse rounded-lg bg-slate-700/50' />
                <div className='h-32 animate-pulse rounded-lg bg-slate-700/50' />
                <div className='h-32 animate-pulse rounded-lg bg-slate-700/50' />
                <div className='h-32 animate-pulse rounded-lg bg-slate-700/50' />
              </div>
            ) : (
              <>
                {/* Overall Score */}
                <OverallScore
                  score={selectedCandidate.score.overall}
                  maxScore={100}
                />

                {/* Metrics Cards */}
                <MetricsCards
                  skills={selectedCandidate.metrics.skills}
                  experience={selectedCandidate.metrics.experience}
                  education={selectedCandidate.metrics.education}
                />

                {/* Strengths */}
                <StrengthsSection strengths={selectedCandidate.strengths} />

                {/* Weaknesses */}
                <WeaknessesSection weaknesses={selectedCandidate.weaknesses} />

                {/* Recommendation */}
                <RecommendationSection
                  recommendation={selectedCandidate.recommendation}
                />

                {/* Footer info */}
                <div className='border-t border-slate-700 p-4'>
                  <div className='flex items-center justify-between text-xs text-slate-500'>
                    <span>Applied: {selectedCandidate.appliedDate}</span>
                    <span>AI Analysis v1.0</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
