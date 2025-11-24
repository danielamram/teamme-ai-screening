import React from 'react';

import { CHAT_COLORS } from './types';

// Markdown component overrides - defined outside to prevent recreation on each render
// eslint-disable-next-line import/prefer-default-export
export const MARKDOWN_COMPONENTS = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className='mb-3 leading-relaxed last:mb-0'>{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className='mb-3 ml-1 list-disc space-y-1 pl-4 last:mb-0'>{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className='mb-3 ml-1 list-decimal space-y-1 pl-4 last:mb-0'>
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className='leading-relaxed'>{children}</li>
  ),
  code: ({
    className,
    children,
  }: {
    className?: string;
    children?: React.ReactNode;
  }) => {
    const isInline = !className;
    return isInline ? (
      <code
        className='rounded px-1.5 py-0.5 text-xs font-medium'
        style={{
          backgroundColor: '#f1f5f9',
          color: '#e11d48',
        }}
      >
        {children}
      </code>
    ) : (
      <code
        className={`block overflow-x-auto rounded-lg p-3 font-mono text-xs ${className}`}
        style={{
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
        }}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className='mb-3 overflow-x-auto rounded-lg last:mb-0'>{children}</pre>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className='font-medium transition-colors hover:underline'
      style={{ color: CHAT_COLORS.primary }}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong
      className='font-semibold'
      style={{ color: CHAT_COLORS.text.primary }}
    >
      {children}
    </strong>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1
      className='mb-3 text-lg font-bold'
      style={{ color: CHAT_COLORS.text.primary }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2
      className='mb-2 text-base font-bold'
      style={{ color: CHAT_COLORS.text.primary }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3
      className='mb-2 text-sm font-semibold'
      style={{ color: CHAT_COLORS.text.primary }}
    >
      {children}
    </h3>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote
      className='mb-3 border-l-4 pl-4 italic last:mb-0'
      style={{
        borderColor: CHAT_COLORS.primary,
        color: CHAT_COLORS.text.secondary,
      }}
    >
      {children}
    </blockquote>
  ),
};
