import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { JSX } from 'react';

import { useCandidateData } from '@/hooks/useCandidateData';
import { CHAT_COLORS } from './types';

interface CandidateDetailViewProps {
  candidateId: string;
  onBack: () => void;
}

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

// Skill badge colors
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

// Get score color
function getScoreColor(score: number): string {
  if (score >= 80) return CHAT_COLORS.success;
  if (score >= 60) return CHAT_COLORS.warning;
  return CHAT_COLORS.error;
}

export default function CandidateDetailView({
  candidateId,
  onBack,
}: CandidateDetailViewProps): JSX.Element {
  const { candidate, loading } = useCandidateData({ candidateId });

  if (loading) {
    return (
      <div className='flex h-full flex-col'>
        {/* Header with Back Button */}
        <div
          className='flex items-center gap-3 border-b px-4 py-3'
          style={{ borderColor: CHAT_COLORS.border }}
        >
          <button
            type='button'
            aria-label='Back to chat'
            onClick={onBack}
            className='flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-opacity-10'
            style={{
              backgroundColor: `${CHAT_COLORS.primary}08`,
            }}
          >
            <ArrowLeft size={18} style={{ color: CHAT_COLORS.primary }} />
          </button>
          <h3
            className='text-base font-semibold'
            style={{ color: CHAT_COLORS.text.primary }}
          >
            Candidate Details
          </h3>
        </div>

        {/* Loading State */}
        <div className='flex flex-1 items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
            <Loader2
              size={32}
              className='animate-spin'
              style={{ color: CHAT_COLORS.primary }}
            />
            <p
              className='text-sm'
              style={{ color: CHAT_COLORS.text.secondary }}
            >
              Loading candidate details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className='flex h-full flex-col'>
        {/* Header with Back Button */}
        <div
          className='flex items-center gap-3 border-b px-4 py-3'
          style={{ borderColor: CHAT_COLORS.border }}
        >
          <button
            aria-label='Back to chat'
            type='button'
            onClick={onBack}
            className='flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-opacity-10'
            style={{
              backgroundColor: `${CHAT_COLORS.primary}08`,
            }}
          >
            <ArrowLeft size={18} style={{ color: CHAT_COLORS.primary }} />
          </button>
          <h3
            className='text-base font-semibold'
            style={{ color: CHAT_COLORS.text.primary }}
          >
            Candidate Details
          </h3>
        </div>

        {/* Error State */}
        <div className='flex flex-1 items-center justify-center'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <p
              className='text-sm font-medium'
              style={{ color: CHAT_COLORS.error }}
            >
              Candidate not found
            </p>
            <button
              type='button'
              aria-label='Back to chat'
              onClick={onBack}
              className='rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90'
              style={{ backgroundColor: CHAT_COLORS.primary }}
            >
              Back to Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  const candidateName = candidate.name;
  const [gradientStart, gradientEnd] = getAvatarGradient(candidateName);
  const scoreColor = getScoreColor(candidate.detailed_summary.score);

  return (
    <div className='flex h-full flex-col'>
      {/* Header with Back Button */}
      <div
        className='flex items-center gap-3 border-b px-4 py-3'
        style={{ borderColor: CHAT_COLORS.border }}
      >
        <button
          aria-label='Back to chat'
          type='button'
          onClick={onBack}
          className='flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-opacity-10'
          style={{
            backgroundColor: `${CHAT_COLORS.primary}08`,
          }}
        >
          <ArrowLeft size={18} style={{ color: CHAT_COLORS.primary }} />
        </button>
        <h3
          className='text-base font-semibold'
          style={{ color: CHAT_COLORS.text.primary }}
        >
          Candidate Details
        </h3>
      </div>

      {/* Scrollable Content */}
      <div
        className='flex-1 overflow-y-auto px-4 py-5'
        style={{
          background: 'linear-gradient(180deg, #f8f9fb 0%, #f1f3f5 100%)',
        }}
      >
        <div className='flex flex-col gap-4'>
          {/* Profile Header */}
          <div
            className='rounded-2xl border p-5'
            style={{
              backgroundColor: CHAT_COLORS.background,
              borderColor: CHAT_COLORS.border,
            }}
          >
            <div className='flex items-start gap-4'>
              {/* Avatar */}
              <div
                className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-bold tracking-wide text-white'
                style={{
                  background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                }}
              >
                {getInitials(candidateName)}
              </div>

              {/* Name & Basic Info */}
              <div className='min-w-0 flex-1'>
                <h2
                  className='text-lg font-bold leading-tight'
                  style={{ color: CHAT_COLORS.text.primary }}
                >
                  {candidateName}
                </h2>

                {/* Score Badge */}
                <div className='mt-2 flex items-center gap-2'>
                  <div
                    className='rounded-full px-3 py-1 text-xs font-bold'
                    style={{
                      backgroundColor: `${scoreColor}15`,
                      color: scoreColor,
                    }}
                  >
                    Score: {candidate.detailed_summary.score}/100
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Location Info */}
            <div className='mt-4 space-y-2'>
              {candidate.location && (
                <div className='flex items-center gap-2 text-sm'>
                  <MapPin size={16} style={{ color: CHAT_COLORS.text.muted }} />
                  <span style={{ color: CHAT_COLORS.text.secondary }}>
                    {candidate.location}
                  </span>
                </div>
              )}
              {candidate.email && (
                <div className='flex items-center gap-2 text-sm'>
                  <Mail size={16} style={{ color: CHAT_COLORS.text.muted }} />
                  <a
                    href={`mailto:${candidate.email}`}
                    aria-label={`Email ${candidate.email}`}
                    className='hover:underline'
                    style={{ color: CHAT_COLORS.primary }}
                  >
                    {candidate.email}
                  </a>
                </div>
              )}
              {candidate.phone && (
                <div className='flex items-center gap-2 text-sm'>
                  <Phone size={16} style={{ color: CHAT_COLORS.text.muted }} />
                  <span style={{ color: CHAT_COLORS.text.secondary }}>
                    {candidate.phone}
                  </span>
                </div>
              )}
              {candidate.application_date && (
                <div className='flex items-center gap-2 text-sm'>
                  <Calendar
                    size={16}
                    style={{ color: CHAT_COLORS.text.muted }}
                  />
                  <span style={{ color: CHAT_COLORS.text.secondary }}>
                    Applied:{' '}
                    {new Date(candidate.application_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              {candidate.linkedin_url && (
                <div className='flex items-center gap-2 text-sm'>
                  <ExternalLink
                    size={16}
                    style={{ color: CHAT_COLORS.text.muted }}
                  />
                  <a
                    href={candidate.linkedin_url}
                    aria-label={`LinkedIn Profile ${candidate.linkedin_url}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline'
                    style={{ color: CHAT_COLORS.primary }}
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Overview */}
          {candidate.detailed_summary.overview && (
            <div
              className='rounded-2xl border p-4'
              style={{
                backgroundColor: CHAT_COLORS.background,
                borderColor: CHAT_COLORS.border,
              }}
            >
              <h4
                className='mb-2 text-sm font-semibold uppercase tracking-wide'
                style={{ color: CHAT_COLORS.text.muted }}
              >
                Overview
              </h4>
              <p
                className='text-sm leading-relaxed'
                style={{ color: CHAT_COLORS.text.secondary }}
              >
                {candidate.detailed_summary.overview}
              </p>
            </div>
          )}

          {/* Skills */}
          {candidate.detailed_summary.keySkills &&
            candidate.detailed_summary.keySkills.length > 0 && (
              <div
                className='rounded-2xl border p-4'
                style={{
                  backgroundColor: CHAT_COLORS.background,
                  borderColor: CHAT_COLORS.border,
                }}
              >
                <h4
                  className='mb-3 text-sm font-semibold uppercase tracking-wide'
                  style={{ color: CHAT_COLORS.text.muted }}
                >
                  Skills
                </h4>
                <div className='flex flex-wrap gap-1.5'>
                  {candidate.detailed_summary.keySkills.map((skill, index) => {
                    const colors = getSkillColor(index);
                    return (
                      <span
                        key={skill}
                        className='rounded-full border px-2.5 py-1 text-xs font-semibold'
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                          borderColor: colors.border,
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

          {/* Experience Summary */}
          {candidate.detailed_summary.experienceSummary && (
            <div
              className='rounded-2xl border p-4'
              style={{
                backgroundColor: CHAT_COLORS.background,
                borderColor: CHAT_COLORS.border,
              }}
            >
              <div className='mb-2 flex items-center gap-2'>
                <Briefcase
                  size={16}
                  style={{ color: CHAT_COLORS.text.muted }}
                />
                <h4
                  className='text-sm font-semibold uppercase tracking-wide'
                  style={{ color: CHAT_COLORS.text.muted }}
                >
                  Experience ({candidate.detailed_summary.yearsOfExperience}{' '}
                  years)
                </h4>
              </div>
              <p
                className='text-sm leading-relaxed'
                style={{ color: CHAT_COLORS.text.secondary }}
              >
                {candidate.detailed_summary.experienceSummary}
              </p>
            </div>
          )}

          {/* Education */}
          {candidate.detailed_summary.educationSummary && (
            <div
              className='rounded-2xl border p-4'
              style={{
                backgroundColor: CHAT_COLORS.background,
                borderColor: CHAT_COLORS.border,
              }}
            >
              <h4
                className='mb-2 text-sm font-semibold uppercase tracking-wide'
                style={{ color: CHAT_COLORS.text.muted }}
              >
                Education
              </h4>
              <p
                className='text-sm leading-relaxed'
                style={{ color: CHAT_COLORS.text.secondary }}
              >
                {candidate.detailed_summary.educationSummary}
              </p>
            </div>
          )}

          {/* Strengths */}
          {candidate.detailed_summary.strengths &&
            candidate.detailed_summary.strengths.length > 0 && (
              <div
                className='rounded-2xl border p-4'
                style={{
                  backgroundColor: CHAT_COLORS.background,
                  borderColor: CHAT_COLORS.border,
                }}
              >
                <h4
                  className='mb-2 text-sm font-semibold uppercase tracking-wide'
                  style={{ color: CHAT_COLORS.success }}
                >
                  Strengths
                </h4>
                <ul className='space-y-1.5'>
                  {candidate.detailed_summary.strengths.map((strength) => (
                    <li
                      key={strength}
                      className='flex items-start gap-2 text-sm'
                      style={{ color: CHAT_COLORS.text.secondary }}
                    >
                      <span style={{ color: CHAT_COLORS.success }}>✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Potential Concerns */}
          {candidate.detailed_summary.potentialConcerns &&
            candidate.detailed_summary.potentialConcerns.length > 0 && (
              <div
                className='rounded-2xl border p-4'
                style={{
                  backgroundColor: CHAT_COLORS.background,
                  borderColor: CHAT_COLORS.border,
                }}
              >
                <h4
                  className='mb-2 text-sm font-semibold uppercase tracking-wide'
                  style={{ color: CHAT_COLORS.warning }}
                >
                  Potential Concerns
                </h4>
                <ul className='space-y-1.5'>
                  {candidate.detailed_summary.potentialConcerns.map(
                    (concern) => (
                      <li
                        key={concern}
                        className='flex items-start gap-2 text-sm'
                        style={{ color: CHAT_COLORS.text.secondary }}
                      >
                        <span style={{ color: CHAT_COLORS.warning }}>⚠</span>
                        <span>{concern}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          {/* Recommendation */}
          {candidate.detailed_summary.recommendation && (
            <div
              className='rounded-2xl border p-4'
              style={{
                backgroundColor: CHAT_COLORS.background,
                borderColor: CHAT_COLORS.border,
              }}
            >
              <h4
                className='mb-2 text-sm font-semibold uppercase tracking-wide'
                style={{ color: CHAT_COLORS.text.muted }}
              >
                Recommendation
              </h4>
              <p
                className='text-sm leading-relaxed'
                style={{ color: CHAT_COLORS.text.secondary }}
              >
                {candidate.detailed_summary.recommendation}
              </p>
            </div>
          )}

          {/* Culture Fit */}
          {candidate.detailed_summary.cultureFitIndicators &&
            candidate.detailed_summary.cultureFitIndicators.length > 0 && (
              <div
                className='rounded-2xl border p-4'
                style={{
                  backgroundColor: CHAT_COLORS.background,
                  borderColor: CHAT_COLORS.border,
                }}
              >
                <h4
                  className='mb-2 text-sm font-semibold uppercase tracking-wide'
                  style={{ color: CHAT_COLORS.text.muted }}
                >
                  Culture Fit Indicators
                </h4>
                <ul className='space-y-1.5'>
                  {candidate.detailed_summary.cultureFitIndicators.map(
                    (indicator) => (
                      <li
                        key={indicator}
                        className='flex items-start gap-2 text-sm'
                        style={{ color: CHAT_COLORS.text.secondary }}
                      >
                        <span style={{ color: CHAT_COLORS.primary }}>•</span>
                        <span>{indicator}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
