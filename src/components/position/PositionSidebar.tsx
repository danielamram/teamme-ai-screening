import { useCallback, useMemo, useState } from 'react';
import type {
  Position,
  PositionCandidate,
  PositionFilters,
  ScoringField,
} from '@/types/position';
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

  const [filters, setFilters] = useState<PositionFilters>({});

  // Close sidebar on ESC key
  useEscapeKey(closeSidebar, isOpen);

  const shouldShow = position !== null || loading;

  // Get unique values for select fields from candidates
  const getFieldOptions = useMemo(
    () =>
      (fieldId: string): string[] => {
        if (!position) return [];
        const values = position.candidates
          .map((c) => c.scoringValues?.[fieldId])
          .filter((v): v is string => typeof v === 'string' && v !== '');
        return Array.from(new Set(values)).sort();
      },
    [position]
  );

  // Helper to check if a candidate matches a filter
  const candidateMatchesFilter = useCallback(
    (candidate: PositionCandidate, field: ScoringField): boolean => {
      const filterValue = filters[field.id];
      const candidateValue = candidate.scoringValues?.[field.id];

      // No filter applied for this field
      if (
        filterValue === undefined ||
        filterValue === null ||
        filterValue === ''
      ) {
        return true;
      }

      // Handle different field types
      switch (field.type) {
        case 'range': {
          if (
            Array.isArray(filterValue) &&
            typeof candidateValue === 'number'
          ) {
            const [min, max] = filterValue;
            if (typeof min === 'number' && min !== null && candidateValue < min)
              return false;
            if (typeof max === 'number' && max !== null && candidateValue > max)
              return false;
          }
          return true;
        }
        case 'select': {
          return candidateValue === filterValue;
        }
        case 'multiselect': {
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            if (Array.isArray(candidateValue)) {
              return filterValue.some(
                (v) =>
                  typeof v === 'string' &&
                  (candidateValue as string[]).includes(v)
              );
            }
            if (typeof candidateValue === 'string') {
              return filterValue.some(
                (v) => typeof v === 'string' && v === candidateValue
              );
            }
          }
          return true;
        }
        case 'boolean': {
          return candidateValue === filterValue;
        }
        default:
          return true;
      }
    },
    [filters]
  );

  // Filter candidates based on filters
  const filteredCandidates = useMemo(
    () =>
      position?.candidates.filter((candidate) =>
        position.scoringFields?.every((field) =>
          candidateMatchesFilter(candidate, field)
        )
      ) ?? [],
    [position, candidateMatchesFilter]
  );

  const resetFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key];
    if (Array.isArray(value)) {
      return value.length > 0 && value.some((v) => v !== null && v !== '');
    }
    return value !== null && value !== '' && value !== undefined;
  });

  // Helper function to render filter inputs based on field type
  const renderFilterField = (
    field: ScoringField,
    currentFilters: PositionFilters,
    updateFilters: (filters: PositionFilters) => void,
    getOptions: (fieldId: string) => string[]
  ) => {
    const inputStyle = {
      width: '100%',
      padding: '6px 8px',
      fontSize: '12px',
      border: `1px solid ${COLORS.border.default}`,
      borderRadius: '4px',
      backgroundColor: COLORS.white,
      color: COLORS.text.primary,
    };

    switch (field.type) {
      case 'range': {
        const rangeValue = currentFilters[field.id] as
          | [number, number]
          | undefined;
        const min = rangeValue?.[0] ?? null;
        const max = rangeValue?.[1] ?? null;

        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type='number'
              placeholder='Min'
              min={field.min}
              max={field.max}
              value={min ?? ''}
              onChange={(e) => {
                const newMin = e.target.value ? Number(e.target.value) : null;
                updateFilters({
                  ...currentFilters,
                  [field.id]: [newMin, max],
                });
              }}
              aria-label={`Minimum ${field.label}`}
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              type='number'
              placeholder='Max'
              min={field.min}
              max={field.max}
              value={max ?? ''}
              onChange={(e) => {
                const newMax = e.target.value ? Number(e.target.value) : null;
                updateFilters({
                  ...currentFilters,
                  [field.id]: [min, newMax],
                });
              }}
              aria-label={`Maximum ${field.label}`}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
        );
      }

      case 'select': {
        const options = field.options ?? getOptions(field.id);
        return (
          <select
            id={`filter-${field.id}`}
            value={(currentFilters[field.id] as string) ?? ''}
            onChange={(e) =>
              updateFilters({ ...currentFilters, [field.id]: e.target.value })
            }
            style={inputStyle}
          >
            <option value=''>All</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }

      case 'multiselect': {
        const options = field.options ?? getOptions(field.id);
        const selectedValues =
          (currentFilters[field.id] as string[]) ?? ([] as string[]);

        return (
          <div
            style={{
              maxHeight: '120px',
              overflowY: 'auto',
              border: `1px solid ${COLORS.border.default}`,
              borderRadius: '4px',
              padding: '4px',
              backgroundColor: COLORS.white,
            }}
          >
            {options.map((option) => {
              const checkboxId = `filter-${field.id}-${option}`;
              return (
                <label
                  key={option}
                  htmlFor={checkboxId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: COLORS.text.primary,
                  }}
                >
                  <input
                    id={checkboxId}
                    type='checkbox'
                    checked={selectedValues.includes(option)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...selectedValues, option]
                        : selectedValues.filter((v) => v !== option);
                      updateFilters({
                        ...currentFilters,
                        [field.id]: newValues,
                      });
                    }}
                    style={{ marginRight: '6px' }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        );
      }

      case 'boolean': {
        return (
          <select
            id={`filter-${field.id}`}
            value={
              currentFilters[field.id] === undefined
                ? ''
                : String(currentFilters[field.id])
            }
            onChange={(e) => {
              const value =
                e.target.value === '' ? undefined : e.target.value === 'true';
              updateFilters({ ...currentFilters, [field.id]: value });
            }}
            style={inputStyle}
          >
            <option value=''>All</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        );
      }

      default:
        return null;
    }
  };

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
                {position?.scoringFields &&
                position.scoringFields.length > 0 ? (
                  <>
                    {position.scoringFields.map((field) => (
                      <div key={field.id} style={{ marginBottom: '12px' }}>
                        <label
                          htmlFor={`filter-${field.id}`}
                          style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: COLORS.text.primary,
                            marginBottom: '6px',
                          }}
                        >
                          {field.label}
                          {field.weight > 70 && (
                            <span
                              style={{
                                marginLeft: '4px',
                                fontSize: '10px',
                                color: COLORS.primary.indigo,
                                fontWeight: '500',
                              }}
                            >
                              (High Priority)
                            </span>
                          )}
                        </label>
                        {renderFilterField(
                          field,
                          filters,
                          setFilters,
                          getFieldOptions
                        )}
                      </div>
                    ))}

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
                  </>
                ) : (
                  <div
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: COLORS.text.muted,
                    }}
                  >
                    No filters configured for this position
                  </div>
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
