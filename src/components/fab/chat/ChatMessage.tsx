import { JSX, useState } from 'react';
import type { UIMessage } from 'ai';
import { Check, Copy, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import FollowupQuestions from './FollowupQuestions';
import { MARKDOWN_COMPONENTS } from './markdownComponents';
import ToolCallDisplay from './ToolCallDisplay';
import { CHAT_COLORS } from './types';

interface ChatMessageProps {
  message: UIMessage;
  onQuestionClick?: (question: string) => void;
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

export default function ChatMessage({
  message,
  onQuestionClick,
}: ChatMessageProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const messageText = extractMessageText(message);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === 'user') {
    return (
      <div className='animate-in fade-in slide-in-from-bottom-2 flex flex-col items-end gap-1 duration-300'>
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
        <span
          className='px-1 text-xs'
          style={{ color: CHAT_COLORS.text.muted }}
        >
          {new Date(
            (message as UIMessage & { createdAt?: Date }).createdAt ||
              Date.now()
          ).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
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
              style={{
                color: CHAT_COLORS.text.primary,
              }}
            >
              <ReactMarkdown components={MARKDOWN_COMPONENTS}>
                {messageText}
              </ReactMarkdown>
            </div>
          )}

          {/* Tool Calls (if any) */}
          <ToolCallDisplay message={message} />

          {/* Followup Questions */}
          {onQuestionClick && (
            <FollowupQuestions
              message={message}
              onQuestionClick={onQuestionClick}
            />
          )}
        </div>
      </div>
      <div className='ml-11 flex items-center gap-2'>
        <span className='text-xs' style={{ color: CHAT_COLORS.text.muted }}>
          {new Date(
            (message as UIMessage & { createdAt?: Date }).createdAt ||
              Date.now()
          ).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        {messageText && (
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
        )}
      </div>
    </div>
  );
}

ChatMessage.defaultProps = {
  onQuestionClick: undefined,
};
