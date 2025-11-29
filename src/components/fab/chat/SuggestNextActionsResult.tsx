import { JSX } from 'react';

import { CHAT_COLORS } from './types';

export interface ActionSuggestion {
  action: string;
  description: string;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SuggestNextActionsOutput {
  suggestions: ActionSuggestion[];
}

interface SuggestNextActionsResultProps {
  output: SuggestNextActionsOutput;
  onSuggestionClick?: (action: string, description: string) => void;
}

export default function SuggestNextActionsResult({
  output,
  onSuggestionClick,
}: SuggestNextActionsResultProps): JSX.Element {
  const handleSuggestionClick = (suggestion: ActionSuggestion) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion.action, suggestion.description);
    }
  };

  return (
    <div className='mt-4 flex flex-col gap-2.5'>
      <p
        className='text-xs font-semibold uppercase tracking-wider'
        style={{ color: CHAT_COLORS.text.muted }}
      >
        Suggested Actions
      </p>
      <div className='flex flex-col gap-2'>
        {output.suggestions.map((suggestion) => (
          <button
            key={suggestion.action}
            type='button'
            onClick={() => handleSuggestionClick(suggestion)}
            className='group w-full rounded-xl px-4 py-3 text-left transition-all duration-200 active:scale-[0.98]'
            style={{
              backgroundColor: '#f8f9fb',
              border: `1px solid ${CHAT_COLORS.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2f5';
              e.currentTarget.style.borderColor = `${CHAT_COLORS.primary}40`;
              e.currentTarget.style.boxShadow = `0 2px 8px ${CHAT_COLORS.primary}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fb';
              e.currentTarget.style.borderColor = CHAT_COLORS.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <p
              className='text-sm font-medium leading-relaxed'
              style={{ color: CHAT_COLORS.text.primary }}
            >
              {suggestion.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
