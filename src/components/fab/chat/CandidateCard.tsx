import { SearchCandidate } from '@/types/candidate';
import { Check, ChevronDown, ChevronUp, Copy, MapPin } from 'lucide-react';
import React, { JSX, useState } from 'react';
import { CHAT_COLORS } from './types';

// Generate initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Curated gradient pairs for avatars
const AVATAR_GRADIENTS = [
  ['#8b5cf6', '#d946ef'], // violet → fuchsia
  ['#ec4899', '#f43f5e'], // pink → rose
  ['#f59e0b', '#f97316'], // amber → orange
  ['#10b981', '#14b8a6'], // emerald → teal
  ['#06b6d4', '#0ea5e9'], // cyan → sky
  ['#3b82f6', '#6366f1'], // blue → indigo
  ['#d946ef', '#ec4899'], // fuchsia → pink
];

// Get gradient based on name for consistent avatar colors
function getAvatarGradient(name: string): [string, string] {
  const index =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index] as [string, string];
}

// Skill badge colors - softer, more refined palette
const SKILL_COLORS = [
  { bg: '#ede9fe', text: '#6d28d9', border: '#ddd6fe' }, // violet
  { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' }, // sky
  { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8' }, // pink
  { bg: '#d1fae5', text: '#047857', border: '#a7f3d0' }, // emerald
  { bg: '#fef3c7', text: '#b45309', border: '#fde68a' }, // amber
  { bg: '#e0e7ff', text: '#4338ca', border: '#c7d2fe' }, // indigo
  { bg: '#ccfbf1', text: '#0f766e', border: '#99f6e4' }, // teal
  { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' }, // red
];

function getSkillColor(index: number) {
  return SKILL_COLORS[index % SKILL_COLORS.length];
}

export default function CandidateCard({
  candidate,
  selectable = false,
  selected = false,
  isHovered = false,
  onSelectionChange,
  onViewCandidate,
  onHoverChange,
}: {
  candidate: SearchCandidate;
  selectable?: boolean;
  selected?: boolean;
  isHovered?: boolean;
  onSelectionChange?: (id: string, selected: boolean) => void;
  onViewCandidate?: (candidateId: string) => void;
  onHoverChange?: (hovered: boolean) => void;
}): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const maxSummaryLength = 150;
  const needsTruncation = candidate.summary.length > maxSummaryLength;
  const displaySummary =
    !expanded && needsTruncation
      ? `${candidate.summary.slice(0, maxSummaryLength)}...`
      : candidate.summary;

  const [gradientStart, gradientEnd] = getAvatarGradient(candidate.name);

  const handleCopyDetails = async () => {
    const details = [
      `Name: ${candidate.name}`,
      `Location: ${candidate.location}`,
      `Primary Stack: ${candidate.primary_stack.join(', ')}`,
      `Summary: ${candidate.summary}`,
    ].join('\n');

    await navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = () => {
    if (onViewCandidate) {
      onViewCandidate(candidate.id);
    }
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectable && onSelectionChange) {
      onSelectionChange(candidate.id, !selected);
    }
  };

  const getBorderColor = () => {
    if (selected) return CHAT_COLORS.primary;
    if (isHovered) return CHAT_COLORS.primaryLight;
    return CHAT_COLORS.border;
  };

  const isClickable = !!onViewCandidate;

  return (
    <div
      className='group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300'
      style={{
        backgroundColor: selected
          ? `${CHAT_COLORS.primary}08`
          : CHAT_COLORS.background,
        borderColor: getBorderColor(),
        boxShadow: isHovered
          ? `0 8px 30px -12px ${CHAT_COLORS.primary}30, 0 4px 12px -4px rgba(0,0,0,0.08)`
          : '0 2px 8px -2px rgba(0,0,0,0.06)',
        cursor: isClickable ? 'pointer' : 'default',
      }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onClick={handleCardClick}
    >
      {/* Subtle gradient accent at top */}
      <div
        className='absolute left-0 right-0 top-0 h-1 opacity-80 transition-opacity duration-300'
        style={{
          background: selected
            ? CHAT_COLORS.primary
            : `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
          opacity: isHovered || selected ? 1 : 0.6,
        }}
      />

      {/* Full card click overlay */}
      {isClickable && (
        <button
          type='button'
          aria-label={`View ${candidate.name}`}
          className='absolute inset-0 z-0'
          onClick={handleCardClick}
        />
      )}

      <div className='relative z-10 p-5 pt-6'>
        {/* Header Section */}
        <div className='mb-4 flex items-start gap-4'>
          {/* Flipping Avatar for selection */}
          <button
            type='button'
            aria-label={`${selected ? 'Deselect' : 'Select'} ${candidate.name}`}
            className='relative shrink-0'
            style={{
              perspective: '600px',
              cursor: selectable ? 'pointer' : 'default',
            }}
            onClick={selectable ? handleAvatarClick : undefined}
            disabled={!selectable}
          >
            {/* Gradient ring */}
            <div
              className='absolute -inset-0.5 rounded-full transition-all duration-500'
              style={{
                background: selected
                  ? CHAT_COLORS.primary
                  : `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                opacity: selected ? 1 : 0.8,
              }}
            />
            {/* Flip container */}
            <div
              className='relative h-12 w-12'
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: selected ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front - Avatar with initials */}
              <div
                className='absolute inset-0 flex items-center justify-center rounded-full text-sm font-bold tracking-wide text-white'
                style={{
                  background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                  backfaceVisibility: 'hidden',
                }}
              >
                {getInitials(candidate.name)}
              </div>
              {/* Back - Checkmark */}
              <div
                className='absolute inset-0 flex items-center justify-center rounded-full'
                style={{
                  background: CHAT_COLORS.primary,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <Check size={24} strokeWidth={3} className='text-white' />
              </div>
            </div>
          </button>

          <div className='min-w-0 flex-1'>
            <h4
              className='text-base font-semibold leading-tight tracking-tight'
              style={{ color: CHAT_COLORS.text.primary }}
            >
              {candidate.name}
            </h4>
            {candidate.location && (
              <div
                className='mt-1.5 flex items-center gap-1.5 text-xs'
                style={{ color: CHAT_COLORS.text.secondary }}
              >
                <MapPin
                  size={13}
                  style={{ color: CHAT_COLORS.text.muted }}
                  strokeWidth={2.5}
                />
                <span className='font-medium'>{candidate.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {candidate.primary_stack && candidate.primary_stack.length > 0 && (
          <div className='mb-4'>
            <div
              className='mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider'
              style={{ color: CHAT_COLORS.text.muted }}
            >
              <span
                className='h-px flex-1'
                style={{ backgroundColor: CHAT_COLORS.border }}
              />
              <span>Skills</span>
              <span
                className='h-px flex-1'
                style={{ backgroundColor: CHAT_COLORS.border }}
              />
            </div>
            <div className='flex flex-wrap gap-1.5'>
              {candidate.primary_stack.map((tech, index) => {
                const colors = getSkillColor(index);
                return (
                  <span
                    key={tech}
                    className='rounded-full border px-2.5 py-1 text-xs font-semibold transition-transform duration-200 hover:scale-105'
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary Section */}
        {candidate.summary && (
          <div className='mb-3'>
            <p
              className='text-sm leading-relaxed'
              style={{ color: CHAT_COLORS.text.secondary }}
            >
              {displaySummary}
            </p>
          </div>
        )}

        {/* Actions Row */}
        <div
          className='flex items-center gap-2 border-t pt-3'
          style={{ borderColor: CHAT_COLORS.borderLight }}
        >
          {needsTruncation && (
            <button
              type='button'
              onClick={() => setExpanded(!expanded)}
              className='flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 hover:bg-opacity-10'
              style={{
                color: CHAT_COLORS.primary,
                backgroundColor: `${CHAT_COLORS.primary}08`,
              }}
            >
              {expanded ? (
                <>
                  <ChevronUp size={14} strokeWidth={2.5} />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown size={14} strokeWidth={2.5} />
                  Show more
                </>
              )}
            </button>
          )}
          <button
            type='button'
            onClick={handleCopyDetails}
            className='ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200'
            style={{
              backgroundColor: copied ? CHAT_COLORS.success : 'transparent',
              color: copied ? '#FFFFFF' : CHAT_COLORS.text.muted,
              border: `1px solid ${copied ? CHAT_COLORS.success : CHAT_COLORS.border}`,
            }}
          >
            {copied ? (
              <>
                <Check size={13} strokeWidth={2.5} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={13} strokeWidth={2} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
