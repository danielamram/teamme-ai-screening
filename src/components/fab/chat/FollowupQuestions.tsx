import { JSX } from 'react';
import type { UIMessage } from 'ai';

import { CHAT_COLORS } from './types';

interface FollowupQuestion {
  question: string;
  description?: string;
}

interface FollowupQuestionsResult {
  showUI?: boolean;
  uiType?: string;
  message?: string;
  questions?: FollowupQuestion[];
}

interface FollowupQuestionsProps {
  message: UIMessage;
  onQuestionClick: (question: string) => void;
}

export const extractFollowupQuestions = (
  message: UIMessage
): FollowupQuestionsResult | null => {
  const toolPart = message.parts.find(
    (part) =>
      'toolResult' in part &&
      part.toolResult &&
      typeof part.toolResult === 'object'
  );

  if (toolPart && 'toolResult' in toolPart) {
    const result = toolPart.toolResult as FollowupQuestionsResult;
    if (result.showUI && result.uiType === 'followupQuestions') {
      return result;
    }
  }

  return null;
};

export default function FollowupQuestions({
  message,
  onQuestionClick,
}: FollowupQuestionsProps): JSX.Element | null {
  const followupQuestions = extractFollowupQuestions(message);

  if (!followupQuestions) {
    return null;
  }

  return (
    <div className='mt-4 flex flex-col gap-2.5'>
      {followupQuestions.message && (
        <p
          className='text-xs font-semibold uppercase tracking-wider'
          style={{ color: CHAT_COLORS.text.muted }}
        >
          {followupQuestions.message}
        </p>
      )}
      <div className='flex flex-col gap-2'>
        {followupQuestions.questions?.map((q) => (
          <button
            key={q.question}
            type='button'
            onClick={() => onQuestionClick(q.question)}
            className='group w-full rounded-xl px-4 py-3 text-left transition-all duration-200 active:scale-[0.98]'
            style={{
              backgroundColor: '#f8f9fb',
              border: `1px solid ${CHAT_COLORS.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2f5';
              e.currentTarget.style.borderColor = `${CHAT_COLORS.primary  }40`;
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
              {q.question}
            </p>
            {q.description && (
              <p
                className='mt-1 text-xs'
                style={{ color: CHAT_COLORS.text.muted }}
              >
                {q.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
