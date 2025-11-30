import { JSX, ReactNode } from 'react';

import { EXTENDED_COLORS } from './colors';

interface AnalysisListSectionProps {
  title: string;
  items: string[];
  icon: ReactNode;
  iconColor: string;
  iconBgColor: string;
  titleColor: string;
  borderColor: string;
  backgroundColor: string;
}

export default function AnalysisListSection({
  title,
  items,
  icon,
  iconColor,
  iconBgColor,
  titleColor,
  borderColor,
  backgroundColor,
}: AnalysisListSectionProps): JSX.Element {
  return (
    <section className='space-y-3'>
      <h4
        className='flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide'
        style={{ color: titleColor }}
      >
        <div
          className='flex h-7 w-7 items-center justify-center rounded-lg'
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          {icon}
        </div>
        {title}
      </h4>
      <div
        className='overflow-hidden rounded-2xl border p-5 shadow-md transition-shadow hover:shadow-lg'
        style={{
          borderColor,
          background: backgroundColor,
        }}
      >
        <ul className='space-y-3.5'>
          {items.map((item) => (
            <li
              key={item}
              className='flex items-start gap-3.5 text-sm'
              style={{ color: EXTENDED_COLORS.slate[800] }}
            >
              <div
                className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg shadow-sm'
                style={{ backgroundColor: iconBgColor, color: iconColor }}
              >
                {icon}
              </div>
              <span className='font-medium leading-relaxed'>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
