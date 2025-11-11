import { useMemo, useState } from 'react';
import type { Position, PositionFilters } from '@/types/position';
import { Briefcase, Filter, MapPin, Users, X } from 'lucide-react';

import { COLORS, LAYOUT } from '@/constants/design';
import { useShimmer } from '@/hooks/useAnimations';
import { useEscapeKey } from '@/hooks/useKeyboardShortcut';
import { useSidebarState } from '@/hooks/useSidebarState';

import CollapseToggle from '../sidebar/CollapseToggle';
import CandidateCard from './CandidateCard';

interface PositionSidebarProps {
  position: Position | null;
  loading: boolean;
}

export default function PositionSidebar({
  position,
  loading,
}: PositionSidebarProps) {
  const { isOpen, closeSidebar, openSidebar } = useSidebarState();
  const showShimmer = useShimmer(loading);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<PositionFilters>({
    location: '',
    ageMin: null,
    ageMax: null,
  });

  // Close sidebar on ESC key
  useEscapeKey(closeSidebar, isOpen);

  const shouldShow = position !== null || loading;

  // Get unique locations from candidates
  const uniqueLocations = useMemo(() => {
    if (!position) return [];
    const locations = position.candidates.map((c) => c.location);
    return Array.from(new Set(locations)).sort();
  }, [position]);

  // Filter candidates based on filters
  const filteredCandidates = useMemo(() => {
    if (!position) return [];

    return position.candidates.filter((candidate) => {
      // Location filter
      if (filters.location && candidate.location !== filters.location) {
        return false;
      }

      // Age filter
      if (filters.ageMin !== null && candidate.age < filters.ageMin) {
        return false;
      }
      if (filters.ageMax !== null && candidate.age > filters.ageMax) {
        return false;
      }

      return true;
    });
  }, [position, filters]);

  const resetFilters = () => {
    setFilters({
      location: '',
      ageMin: null,
      ageMax: null,
    });
  };

  const hasActiveFilters =
    filters.location !== '' ||
    filters.ageMin !== null ||
    filters.ageMax !== null;

  return (
    <>
      {shouldShow && (
        <CollapseToggle
          isOpen={isOpen}
          onToggle={isOpen ? closeSidebar : openSidebar}
        />
      )}

      {/* Sidebar */}
      {shouldShow && (
        <div
          className='fixed left-0 top-0 h-full w-[260px] max-w-[90vw]'
          style={{
            zIndex: LAYOUT.sidebar.zIndex - 1,
            background: COLORS.white,
            boxShadow: '4px 0 16px rgba(0, 0, 0, 0.06)',
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          role='complementary'
          aria-label='Job Position Details Sidebar'
        >
          {/* Sidebar content */}
          <div className='flex h-full flex-col'>
            {/* Header */}
            <div
              style={{
                padding: '16px',
                borderBottom: `1px solid ${COLORS.border.default}`,
                backgroundColor: COLORS.gray[50],
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <Briefcase
                      size={16}
                      style={{ color: COLORS.primary.indigo }}
                    />
                    <h2
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: COLORS.text.primary,
                        margin: 0,
                      }}
                    >
                      {position?.title || 'Loading...'}
                    </h2>
                  </div>
                  {position && (
                    <>
                      <div
                        style={{
                          fontSize: '13px',
                          color: COLORS.text.secondary,
                          marginBottom: '4px',
                        }}
                      >
                        {position.company}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: COLORS.text.muted,
                        }}
                      >
                        <MapPin size={12} />
                        <span>{position.location}</span>
                      </div>
                    </>
                  )}
                </div>
                <button
                  type='button'
                  onClick={closeSidebar}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    transition: 'background 0.2s',
                  }}
                  aria-label='Close sidebar'
                >
                  <X size={18} style={{ color: COLORS.text.secondary }} />
                </button>
              </div>
            </div>

            {/* Filter Toggle */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: `1px solid ${COLORS.border.light}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Users size={14} style={{ color: COLORS.text.secondary }} />
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: COLORS.text.primary,
                  }}
                >
                  Top {filteredCandidates.length} Candidates
                </span>
              </div>
              <button
                type='button'
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  background: showFilters
                    ? COLORS.primary.indigo
                    : 'transparent',
                  color: showFilters ? COLORS.white : COLORS.text.secondary,
                  border: `1px solid ${showFilters ? COLORS.primary.indigo : COLORS.border.default}`,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s',
                }}
              >
                <Filter size={12} />
                {hasActiveFilters && (
                  <span
                    style={{
                      backgroundColor: COLORS.white,
                      color: COLORS.primary.indigo,
                      padding: '1px 5px',
                      borderRadius: '50%',
                      fontSize: '9px',
                      fontWeight: '700',
                    }}
                  >
                    •
                  </span>
                )}
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: `1px solid ${COLORS.border.light}`,
                  backgroundColor: COLORS.gray[50],
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor='location-filter'
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: COLORS.text.primary,
                      marginBottom: '6px',
                    }}
                  >
                    Location
                  </label>
                  <select
                    id='location-filter'
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '12px',
                      border: `1px solid ${COLORS.border.default}`,
                      borderRadius: '4px',
                      backgroundColor: COLORS.white,
                      color: COLORS.text.primary,
                    }}
                  >
                    <option value=''>All Locations</option>
                    {uniqueLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: COLORS.text.primary,
                      marginBottom: '6px',
                    }}
                  >
                    Age Range
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type='number'
                      placeholder='Min'
                      min='18'
                      max='99'
                      value={filters.ageMin ?? ''}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          ageMin: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                      aria-label='Minimum age'
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        fontSize: '12px',
                        border: `1px solid ${COLORS.border.default}`,
                        borderRadius: '4px',
                        backgroundColor: COLORS.white,
                        color: COLORS.text.primary,
                      }}
                    />
                    <input
                      type='number'
                      placeholder='Max'
                      min='18'
                      max='99'
                      value={filters.ageMax ?? ''}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          ageMax: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                      aria-label='Maximum age'
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        fontSize: '12px',
                        border: `1px solid ${COLORS.border.default}`,
                        borderRadius: '4px',
                        backgroundColor: COLORS.white,
                        color: COLORS.text.primary,
                      }}
                    />
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    type='button'
                    onClick={resetFilters}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: COLORS.primary.indigo,
                      backgroundColor: 'transparent',
                      border: `1px solid ${COLORS.primary.indigo}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            )}

            {/* Scrollable content */}
            <div
              className='flex-1 overflow-y-auto px-3 py-4 [&::-webkit-scrollbar]:hidden'
              style={{
                scrollbarWidth: 'none',
              }}
            >
              {(() => {
                if (showShimmer || !position) {
                  return (
                    <div className='space-y-3'>
                      <div className='h-28 animate-pulse rounded-lg bg-gray-200' />
                      <div className='h-28 animate-pulse rounded-lg bg-gray-200' />
                      <div className='h-28 animate-pulse rounded-lg bg-gray-200' />
                      <div className='h-28 animate-pulse rounded-lg bg-gray-200' />
                      <div className='h-28 animate-pulse rounded-lg bg-gray-200' />
                    </div>
                  );
                }
                if (filteredCandidates.length > 0) {
                  return filteredCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ));
                }
                return (
                  <div
                    style={{
                      padding: '24px',
                      textAlign: 'center',
                      color: COLORS.text.muted,
                      fontSize: '13px',
                    }}
                  >
                    No candidates match the selected filters
                  </div>
                );
              })()}
            </div>

            {/* Footer */}
            {position && (
              <div
                className='border-t p-3'
                style={{
                  borderColor: COLORS.border.default,
                  background: COLORS.white,
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: COLORS.text.secondary,
                    textAlign: 'center',
                  }}
                >
                  Total Applicants: {position.totalCandidates}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
