import { Target } from 'lucide-react';
import { JSX } from 'react';

import { CHAT_COLORS } from '../types';

import { SKILL_COLORS } from './colors';

interface SkillsSectionProps {
  skills: string[];
}

function getSkillColor(index: number) {
  return SKILL_COLORS[index % SKILL_COLORS.length];
}

export default function SkillsSection({
  skills,
}: SkillsSectionProps): JSX.Element {
  return (
    <section className='space-y-3'>
      <h4
        className='flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide'
        style={{ color: CHAT_COLORS.text.muted }}
      >
        <div
          className='flex h-7 w-7 items-center justify-center rounded-lg'
          style={{
            backgroundColor: CHAT_COLORS.borderLight,
            color: CHAT_COLORS.text.secondary,
          }}
        >
          <Target size={14} />
        </div>
        Key Competencies
      </h4>
      <div
        className='rounded-2xl border p-6 shadow-md transition-shadow hover:shadow-lg'
        style={{
          borderColor: CHAT_COLORS.border,
          backgroundColor: CHAT_COLORS.background,
        }}
      >
        <div className='flex flex-wrap gap-2.5'>
          {skills.map((skill, index) => {
            const colors = getSkillColor(index);
            return (
              <span
                key={skill}
                className='inline-flex cursor-default items-center rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-sm transition-all hover:scale-105 hover:shadow-md'
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
    </section>
  );
}
