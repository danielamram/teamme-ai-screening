import { JSX, useState } from 'react';
import { Check, Copy, MapPin } from 'lucide-react';

import { CHAT_COLORS } from './types';

export interface Candidate {
  id: string;
  name: string;
  location: string;
  primary_stack: string[];
  summary: string;
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

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f43f5e', // rose
    '#f59e0b', // amber
    '#10b981', // emerald
    '#06b6d4', // cyan
    '#3b82f6', // blue
  ];
  const index = name.length % colors.length;
  return colors[index];
}

export default function CandidateCard({
  candidate,
}: {
  candidate: Candidate;
}): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const maxSummaryLength = 150;
  const needsTruncation = candidate.summary.length > maxSummaryLength;
  const displaySummary =
    !expanded && needsTruncation
      ? `${candidate.summary.slice(0, maxSummaryLength)}...`
      : candidate.summary;

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

  return (
    <div
      className='rounded-xl border transition-all hover:shadow-md'
      style={{
        backgroundColor: CHAT_COLORS.background,
        borderColor: CHAT_COLORS.border,
      }}
    >
      {/* Card Content with better padding */}
      <div className='p-5'>
        {/* Header Section */}
        <div className='mb-4 flex items-start gap-3'>
          {/* Avatar with initials */}
          <div
            className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm'
            style={{ backgroundColor: getAvatarColor(candidate.name) }}
          >
            {getInitials(candidate.name)}
          </div>
          <div className='min-w-0 flex-1'>
            <h4
              className='text-base font-semibold leading-tight'
              style={{
                color: CHAT_COLORS.text.primary,

                cursor: 'text',
              }}
            >
              {candidate.name}
            </h4>
            {candidate.location && (
              <div
                className='mt-1.5 flex items-center gap-1.5 text-sm font-medium'
                style={{
                  color: CHAT_COLORS.text.secondary,

                  cursor: 'text',
                }}
              >
                <MapPin size={14} style={{ color: CHAT_COLORS.primary }} />
                {candidate.location}
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {candidate.primary_stack && candidate.primary_stack.length > 0 && (
          <div className='mb-4'>
            <div
              className='mb-2 text-xs font-semibold uppercase tracking-wide'
              style={{ color: CHAT_COLORS.text.muted }}
            >
              Primary Stack
            </div>
            <div className='flex flex-wrap gap-2'>
              {candidate.primary_stack.map((tech) => (
                <span
                  key={tech}
                  className='rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm'
                  style={{
                    backgroundColor: CHAT_COLORS.primary,
                    color: '#FFFFFF',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Summary Section */}
        {candidate.summary && (
          <div className='mb-4'>
            <div
              className='mb-2 text-xs font-semibold uppercase tracking-wide'
              style={{ color: CHAT_COLORS.text.muted }}
            >
              Summary
            </div>
            <p
              className='text-sm leading-relaxed'
              style={{
                color: CHAT_COLORS.text.secondary,

                cursor: 'text',
              }}
            >
              {displaySummary}
            </p>
          </div>
        )}

        {/* Actions Row */}
        <div className='flex items-center gap-3 pt-2'>
          {needsTruncation && (
            <button
              type='button'
              onClick={() => setExpanded(!expanded)}
              className='text-sm font-semibold transition-all hover:underline'
              style={{ color: CHAT_COLORS.primary }}
            >
              {expanded ? '← Show less' : 'Show more →'}
            </button>
          )}
          <button
            type='button'
            onClick={handleCopyDetails}
            className='ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:shadow-sm'
            style={{
              backgroundColor: copied
                ? CHAT_COLORS.success
                : CHAT_COLORS.surface,
              color: copied ? '#FFFFFF' : CHAT_COLORS.text.secondary,
              border: `1px solid ${copied ? CHAT_COLORS.success : CHAT_COLORS.border}`,
            }}
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy details
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
