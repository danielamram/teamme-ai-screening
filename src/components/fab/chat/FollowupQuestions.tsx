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
    <div className='mt-4 flex flex-col gap-3'>
      {followupQuestions.message && (
        <p
          className='text-sm font-medium'
          style={{ color: CHAT_COLORS.text.secondary }}
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
            className='group w-full rounded-xl border-2 px-4 py-3 text-left transition-all hover:shadow-md'
            style={{
              borderColor: CHAT_COLORS.borderLight,
              backgroundColor: CHAT_COLORS.background,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = CHAT_COLORS.primary;
              e.currentTarget.style.backgroundColor = CHAT_COLORS.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = CHAT_COLORS.borderLight;
              e.currentTarget.style.backgroundColor = CHAT_COLORS.background;
            }}
          >
            <p
              className='text-sm font-medium leading-relaxed'
              style={{
                color: CHAT_COLORS.text.primary,

                cursor: 'text',
              }}
            >
              {q.question}
            </p>
            {q.description && (
              <p
                className='mt-1 text-xs'
                style={{
                  color: CHAT_COLORS.text.muted,

                  cursor: 'text',
                }}
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
