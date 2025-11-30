import { JSX, ReactNode } from 'react';

import { CHAT_COLORS } from '../types';

interface SectionContainerProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  titleColor?: string;
}

export default function SectionContainer({
  icon,
  title,
  children,
  iconBgColor = CHAT_COLORS.borderLight,
  iconColor = CHAT_COLORS.text.secondary,
  titleColor = CHAT_COLORS.text.muted,
}: SectionContainerProps): JSX.Element {
  return (
    <section className='space-y-3'>
      <h4
        className='flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide'
        style={{ color: titleColor }}
      >
        <div
          className='flex h-7 w-7 items-center justify-center rounded-lg'
          style={{
            backgroundColor: iconBgColor,
            color: iconColor,
          }}
        >
          {icon}
        </div>
        {title}
      </h4>
      <div
        className='rounded-2xl border p-6 shadow-md transition-shadow hover:shadow-lg'
        style={{
          borderColor: CHAT_COLORS.border,
          backgroundColor: CHAT_COLORS.background,
        }}
      >
        {children}
      </div>
    </section>
  );
}
