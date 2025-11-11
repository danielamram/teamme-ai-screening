import type { PositionCandidate } from '@/types/position';
import { Calendar, MapPin, User } from 'lucide-react';

import { COLORS, getScoreColor } from '@/constants/design';

interface CandidateCardProps {
  candidate: PositionCandidate;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const scoreColor = getScoreColor(candidate.score);

  return (
    <div
      style={{
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.border.default}`,
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      className='hover:shadow-md'
    >
      {/* Header: Name and Score */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: COLORS.text.primary,
              marginBottom: '4px',
            }}
          >
            {candidate.name}
          </h3>
          <div
            style={{
              fontSize: '12px',
              color: COLORS.text.secondary,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <User size={12} />
            <span>{candidate.position}</span>
          </div>
        </div>

        {/* Score Badge */}
        <div
          style={{
            backgroundColor: scoreColor,
            color: COLORS.white,
            fontSize: '14px',
            fontWeight: '700',
            padding: '4px 8px',
            borderRadius: '6px',
            minWidth: '42px',
            textAlign: 'center',
          }}
        >
          {candidate.score}
        </div>
      </div>

      {/* Details */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {/* Location */}
        <div
          style={{
            fontSize: '12px',
            color: COLORS.text.secondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <MapPin size={12} />
          <span>{candidate.location}</span>
          <span style={{ color: COLORS.text.muted }}>•</span>
          <span>{candidate.age} years old</span>
        </div>

        {/* Applied Date */}
        <div
          style={{
            fontSize: '12px',
            color: COLORS.text.muted,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Calendar size={12} />
          <span>
            Applied {new Date(candidate.appliedDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div style={{ marginTop: '8px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '500',
            padding: '3px 8px',
            borderRadius: '4px',
            backgroundColor: (() => {
              if (candidate.status === 'shortlisted') return '#dcfce7';
              if (candidate.status === 'reviewing') return '#fef3c7';
              return '#f3f4f6';
            })(),
            color: (() => {
              if (candidate.status === 'shortlisted') return '#16a34a';
              if (candidate.status === 'reviewing') return '#ca8a04';
              return '#6b7280';
            })(),
          }}
        >
          {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
        </span>
      </div>
    </div>
  );
}
