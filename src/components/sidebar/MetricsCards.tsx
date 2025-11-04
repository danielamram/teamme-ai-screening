import { JSX } from 'react';
import type { CandidateMetric } from '@/types/candidate';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

import { getScoreColor } from '@/constants/design';

interface MetricsCardsProps {
  skills: CandidateMetric;
  experience: CandidateMetric;
  education: CandidateMetric;
}

interface MetricCardProps {
  icon: JSX.Element;
  metric: CandidateMetric;
}

function MetricCard({ icon, metric }: MetricCardProps): JSX.Element {
  const percentage = (metric.value / metric.maxValue) * 100;
  const color = getScoreColor(metric.value);

  return (
    <div className='rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800/70'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div
            className='rounded-lg p-2'
            style={{ backgroundColor: `${color}20` }}
          >
            {icon}
          </div>
          <span className='font-semibold text-white'>{metric.label}</span>
        </div>
        <span className='text-2xl font-bold' style={{ color }}>
          {metric.value}
        </span>
      </div>

      {/* Progress bar */}
      <div className='mb-2 h-2 overflow-hidden rounded-full bg-slate-700'>
        <div
          className='h-full rounded-full transition-all duration-1000'
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <p className='text-xs text-slate-400'>{metric.description}</p>
    </div>
  );
}

export default function MetricsCards({
  skills,
  experience,
  education,
}: MetricsCardsProps): JSX.Element {
  return (
    <div className='space-y-3 p-4'>
      <h3 className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400'>
        Key Metrics
      </h3>

      <MetricCard
        icon={
          <Award size={20} style={{ color: getScoreColor(skills.value) }} />
        }
        metric={skills}
      />

      <MetricCard
        icon={
          <Briefcase
            size={20}
            style={{ color: getScoreColor(experience.value) }}
          />
        }
        metric={experience}
      />

      <MetricCard
        icon={
          <GraduationCap
            size={20}
            style={{ color: getScoreColor(education.value) }}
          />
        }
        metric={education}
      />
    </div>
  );
}
