import { JSX } from 'react';
import type { Candidate } from '@/types/candidate';

import { useShimmer } from '@/hooks/useAnimations';
import { useEscapeKey } from '@/hooks/useKeyboardShortcut';
import { useSidebarState } from '@/hooks/useSidebarState';

import CollapseToggle from './CollapseToggle';
import Recommendation from './Recommendation';
import RecommendationSection from './RecommendationSection';
import SidebarHeader from './SidebarHeader';
import WhyFitSection from './WhyFitSection';

interface SidebarProps {
  selectedCandidate: Candidate;
  loading: boolean;
  candidateFound: boolean;
}

export default function Sidebar({
  selectedCandidate,
  loading,
  candidateFound,
}: SidebarProps): JSX.Element {
  const { isOpen, closeSidebar, openSidebar } = useSidebarState();
  const showShimmer = useShimmer(loading);

  // Close sidebar on ESC key
  useEscapeKey(closeSidebar, isOpen);

  return (
    <>
      {candidateFound && (
        <CollapseToggle
          isOpen={isOpen}
          onToggle={isOpen ? closeSidebar : openSidebar}
        />
      )}

      {/* Sidebar */}
      {candidateFound && (
        <div
          className='fixed left-0 top-0 h-full w-[260px] max-w-[90vw]'
          style={{
            zIndex: 2147483646,
            background: '#FFFFFF',
            boxShadow: '4px 0 16px rgba(0, 0, 0, 0.06)',
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          role='complementary'
          aria-label='AI Candidate Screening Sidebar'
        >
          {/* Sidebar content */}
          <div className='flex h-full flex-col'>
            {/* Header */}
            <SidebarHeader
              candidate={selectedCandidate}
              onClose={closeSidebar}
            />

            {/* Scrollable content */}
            <div
              className='flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden'
              style={{
                scrollbarWidth: 'none',
              }}
            >
              {showShimmer ? (
                // Loading shimmer effect
                <div className='space-y-3 p-3'>
                  <div className='h-40 animate-pulse rounded-lg bg-gray-200' />
                  <div className='h-28 animate-pulse rounded-lg bg-gray-200' />
                  <div className='h-24 animate-pulse rounded-lg bg-gray-200' />
                  <div className='h-24 animate-pulse rounded-lg bg-gray-200' />
                </div>
              ) : (
                <>
                  {/* Recommendation */}
                  <RecommendationSection
                    recommendation={selectedCandidate.recommendation}
                    score={selectedCandidate.score}
                    maxScore={100}
                  />

                  <Recommendation
                    recommendation={selectedCandidate.recommendationReasoning}
                  />

                  {/* Why Fit Section */}
                  <WhyFitSection
                    title='Summary'
                    items={selectedCandidate.whyFit}
                  />
                  <WhyFitSection
                    title='Red Flags'
                    items={selectedCandidate.redFlags}
                  />
                  <WhyFitSection
                    title='Gaps to Clarify'
                    items={selectedCandidate.gapsToClarify}
                  />
                </>
              )}
            </div>

            {/* Footer */}
            <div
              className='border-t p-3'
              style={{
                borderColor: '#E8EAED',
                background: '#FFFFFF',
              }}
            >
              <button
                type='button'
                className='btn btn-primary btn-sm w-full gap-2'
                onClick={() => {}}
                disabled={showShimmer}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-4 w-4'
                >
                  <path d='M15.75 5.25a3 3 0 1 1 3 3h-.15L13.5 11.4a2.985 2.985 0 0 1 0 1.2l5.1 3.15h.15a3 3 0 1 1-1.034 2.318l-5.1-3.15a3 3 0 1 1 0-4.634l5.1-3.15a2.995 2.995 0 0 1-.966-2.168Z' />
                </svg>
                Share Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
