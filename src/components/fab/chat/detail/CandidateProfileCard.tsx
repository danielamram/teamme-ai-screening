import { Calendar, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { JSX } from 'react';

import { CHAT_COLORS } from '../types';

import { EXTENDED_COLORS } from './colors';

interface CandidateProfileCardProps {
  candidateName: string;
  location?: string;
  applicationDate?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  gradientStart: string;
  gradientEnd: string;
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

export default function CandidateProfileCard({
  candidateName,
  location,
  applicationDate,
  email,
  phone,
  linkedinUrl,
  gradientStart,
  gradientEnd,
}: CandidateProfileCardProps): JSX.Element {
  return (
    <div
      className='overflow-hidden rounded-3xl border shadow-lg transition-shadow hover:shadow-xl'
      style={{
        borderColor: CHAT_COLORS.border,
        backgroundColor: CHAT_COLORS.background,
      }}
    >
      <div
        className='p-6 pb-5'
        style={{
          background: `linear-gradient(to bottom right, ${CHAT_COLORS.surface}, ${CHAT_COLORS.background})`,
        }}
      >
        <div className='flex items-start gap-5'>
          <div
            className='relative flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl text-2xl font-bold shadow-lg ring-4 ring-white/50'
            style={{
              background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
              color: CHAT_COLORS.background,
            }}
          >
            {getInitials(candidateName)}
          </div>

          <div className='min-w-0 flex-1 pt-1'>
            <h2
              className='mb-2 text-2xl font-bold leading-tight'
              style={{ color: CHAT_COLORS.text.primary }}
            >
              {candidateName}
            </h2>
            <div
              className='flex flex-wrap gap-4 text-sm'
              style={{ color: EXTENDED_COLORS.slate[600] }}
            >
              {location && (
                <div className='flex items-center gap-2'>
                  <MapPin size={15} style={{ color: CHAT_COLORS.text.muted }} />
                  <span className='truncate font-medium'>{location}</span>
                </div>
              )}
              {applicationDate && (
                <div className='flex items-center gap-2'>
                  <Calendar
                    size={15}
                    style={{ color: CHAT_COLORS.text.muted }}
                  />
                  <span className='truncate font-medium'>
                    Applied {new Date(applicationDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className='border-t p-5'
        style={{
          borderColor: CHAT_COLORS.borderLight,
          backgroundColor: CHAT_COLORS.background,
        }}
      >
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {email && (
            <a
              href={`mailto:${email}`}
              className='group flex items-center gap-3 rounded-xl border p-3.5 transition-all hover:shadow-md'
              style={{
                borderColor: CHAT_COLORS.borderLight,
                backgroundColor: CHAT_COLORS.background,
              }}
              onMouseEnter={(e) => {
                const indigo300 = EXTENDED_COLORS.indigo[300];
                const indigo50 = EXTENDED_COLORS.indigo[50];
                e.currentTarget.style.borderColor = indigo300;
                e.currentTarget.style.backgroundColor = `${indigo50}b3`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = CHAT_COLORS.borderLight;
                e.currentTarget.style.backgroundColor = CHAT_COLORS.background;
              }}
            >
              <div
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all'
                style={{
                  background: `linear-gradient(to bottom right, ${CHAT_COLORS.borderLight}, ${CHAT_COLORS.surface})`,
                  color: EXTENDED_COLORS.slate[600],
                }}
              >
                <Mail size={18} />
              </div>
              <div className='min-w-0 flex-1'>
                <div
                  className='mb-0.5 text-xs font-semibold uppercase tracking-wide'
                  style={{ color: CHAT_COLORS.text.muted }}
                >
                  Email
                </div>
                <div
                  className='truncate text-sm font-semibold'
                  style={{ color: EXTENDED_COLORS.slate[900] }}
                >
                  {email}
                </div>
              </div>
            </a>
          )}

          {phone && (
            <div
              className='flex items-center gap-3 rounded-xl border p-3.5'
              style={{
                borderColor: CHAT_COLORS.borderLight,
                backgroundColor: CHAT_COLORS.background,
              }}
            >
              <div
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl'
                style={{
                  background: `linear-gradient(to bottom right, ${CHAT_COLORS.borderLight}, ${CHAT_COLORS.surface})`,
                  color: EXTENDED_COLORS.slate[600],
                }}
              >
                <Phone size={18} />
              </div>
              <div className='min-w-0 flex-1'>
                <div
                  className='mb-0.5 text-xs font-semibold uppercase tracking-wide'
                  style={{ color: CHAT_COLORS.text.muted }}
                >
                  Phone
                </div>
                <div
                  className='truncate text-sm font-semibold'
                  style={{ color: EXTENDED_COLORS.slate[900] }}
                >
                  {phone}
                </div>
              </div>
            </div>
          )}

          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-3 rounded-xl border p-3.5 transition-all hover:shadow-md sm:col-span-2'
              style={{
                borderColor: `${EXTENDED_COLORS.blue[500]}4d`,
                background: `linear-gradient(to bottom right, ${EXTENDED_COLORS.blue[50]}, ${CHAT_COLORS.background})`,
              }}
              onMouseEnter={(e) => {
                const blue300 = EXTENDED_COLORS.blue[300];
                const blue100 = EXTENDED_COLORS.blue[100];
                e.currentTarget.style.borderColor = blue300;
                e.currentTarget.style.background = `linear-gradient(to bottom right, ${blue100}, ${CHAT_COLORS.background})`;
              }}
              onMouseLeave={(e) => {
                const blue500 = EXTENDED_COLORS.blue[500];
                const blue50 = EXTENDED_COLORS.blue[50];
                e.currentTarget.style.borderColor = `${blue500}4d`;
                e.currentTarget.style.background = `linear-gradient(to bottom right, ${blue50}, ${CHAT_COLORS.background})`;
              }}
            >
              <div
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm'
                style={{
                  background: `linear-gradient(to bottom right, ${EXTENDED_COLORS.blue[500]}, ${EXTENDED_COLORS.blue[600]})`,
                  color: CHAT_COLORS.background,
                }}
              >
                <ExternalLink size={18} />
              </div>
              <div className='min-w-0 flex-1'>
                <div
                  className='mb-0.5 text-xs font-semibold uppercase tracking-wide'
                  style={{ color: EXTENDED_COLORS.blue[600] }}
                >
                  Professional Profile
                </div>
                <div
                  className='truncate text-sm font-semibold'
                  style={{ color: EXTENDED_COLORS.blue[700] }}
                >
                  LinkedIn Profile
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
