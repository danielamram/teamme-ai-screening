import { JSX, useState } from 'react';
import type { UIMessage } from 'ai';
import { Check, Copy, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { MARKDOWN_COMPONENTS } from './markdownComponents';
import { CHAT_COLORS } from './types';

interface ChatMessageProps {
  message: UIMessage;
  onQuestionClick?: (question: string) => void;
}

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

const extractMessageText = (message: UIMessage): string =>
  message.parts
    .map((part) => {
      if ('text' in part && typeof part.text === 'string') {
        return part.text;
      }
      return '';
    })
    .filter((text) => text.trim().length > 0)
    .join('\n')
    .trim();

const extractFollowupQuestions = (
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

export default function ChatMessage({
  message,
  onQuestionClick,
}: ChatMessageProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const messageText = extractMessageText(message);
  const followupQuestions = extractFollowupQuestions(message);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuestionClick = (question: string) => {
    if (onQuestionClick) {
      onQuestionClick(question);
    }
  };

  if (message.role === 'user') {
    return (
      <div className='animate-in fade-in slide-in-from-bottom-2 flex justify-end duration-300'>
        <div
          className='max-w-[85%] rounded-2xl px-4 py-3 shadow-sm'
          style={{
            backgroundColor: CHAT_COLORS.primary,
          }}
        >
          <p className='whitespace-pre-wrap text-sm leading-relaxed text-white'>
            {messageText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-2 duration-300'>
      <div className='flex gap-3'>
        <div
          className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm'
          style={{
            background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 100%)`,
          }}
        >
          <Sparkles size={14} color='#FFFFFF' />
        </div>
        <div className='min-w-0 flex-1'>
          {messageText && (
            <div
              className='prose-sm prose max-w-none text-sm leading-relaxed'
              style={{ color: CHAT_COLORS.text.primary }}
            >
              <ReactMarkdown components={MARKDOWN_COMPONENTS}>
                {messageText}
              </ReactMarkdown>
            </div>
          )}

          {followupQuestions && (
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
                    onClick={() => handleQuestionClick(q.question)}
                    className='group w-full rounded-xl border-2 px-4 py-3 text-left transition-all hover:shadow-md'
                    style={{
                      borderColor: CHAT_COLORS.borderLight,
                      backgroundColor: CHAT_COLORS.background,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = CHAT_COLORS.primary;
                      e.currentTarget.style.backgroundColor =
                        CHAT_COLORS.surface;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        CHAT_COLORS.borderLight;
                      e.currentTarget.style.backgroundColor =
                        CHAT_COLORS.background;
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
          )}
        </div>
      </div>
      {messageText && (
        <div className='ml-11 flex gap-1'>
          <button
            type='button'
            onClick={handleCopy}
            className='group rounded-lg p-1.5 transition-all hover:bg-gray-100'
            aria-label='Copy message'
          >
            {copied ? (
              <Check size={14} color={CHAT_COLORS.success} />
            ) : (
              <Copy
                size={14}
                color={CHAT_COLORS.text.muted}
                className='transition-colors group-hover:opacity-80'
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

ChatMessage.defaultProps = {
  onQuestionClick: undefined,
};
