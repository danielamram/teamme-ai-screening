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
  onViewCandidate?: (candidateId: string) => void;
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

const formatTime = (date: Date | undefined): string =>
  new Date(date || Date.now()).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

export default function ChatMessage({
  message,
  onQuestionClick,
  onViewCandidate,
}: ChatMessageProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const messageText = extractMessageText(message);
  const timestamp = (message as UIMessage & { createdAt?: Date }).createdAt;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === 'user') {
    return (
      <div className='animate-in fade-in slide-in-from-bottom-2 flex flex-col items-end gap-1.5 duration-300'>
        <div
          className='max-w-[85%] rounded-2xl rounded-br-md px-4 py-3'
          style={{
            background: `linear-gradient(135deg, ${CHAT_COLORS.primary} 0%, ${CHAT_COLORS.primaryDark} 100%)`,
            boxShadow: `0 2px 12px ${CHAT_COLORS.primary}25`,
          }}
        >
          <p className='whitespace-pre-wrap text-sm leading-relaxed text-white'>
            {messageText}
          </p>
        </div>
        <span
          className='pr-1 text-[11px] font-medium tracking-wide opacity-60'
          style={{ color: CHAT_COLORS.text.muted }}
        >
          {formatTime(timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div className='animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-2 duration-300'>
      <div className='flex gap-3'>
        {/* Avatar */}
        <div className='relative'>
          <div
            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full'
            style={{
              background: `linear-gradient(145deg, ${CHAT_COLORS.primaryLight} 0%, ${CHAT_COLORS.primary} 50%, ${CHAT_COLORS.primaryDark} 100%)`,
              boxShadow: `0 3px 10px ${CHAT_COLORS.primary}30`,
            }}
          >
            <Sparkles size={14} color='#FFFFFF' strokeWidth={2.5} />
          </div>
        </div>

        {/* Message Content */}
        <div className='min-w-0 flex-1'>
          {messageText && (
            <div
              className='rounded-2xl rounded-tl-md px-4 py-3'
              style={{
                backgroundColor: '#ffffff',
                boxShadow:
                  '0 1px 4px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
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
            </div>
          )}

          {/* Tool Calls (if any) */}
          <ToolCallDisplay message={message} onViewCandidate={onViewCandidate} />

          {/* Followup Questions */}
          {onQuestionClick && (
            <FollowupQuestions
              message={message}
              onQuestionClick={onQuestionClick}
            />
          )}

          {/* Footer: timestamp + actions */}
          <div className='mt-1.5 flex items-center gap-2 pl-1'>
            <span
              className='text-[11px] font-medium tracking-wide opacity-60'
              style={{ color: CHAT_COLORS.text.muted }}
            >
              {formatTime(timestamp)}
            </span>
            {messageText && (
              <button
                type='button'
                onClick={handleCopy}
                className='group flex h-6 w-6 items-center justify-center rounded-md transition-all duration-200 hover:bg-slate-100 active:scale-90'
                aria-label='Copy message'
              >
                {copied ? (
                  <Check
                    size={12}
                    color={CHAT_COLORS.success}
                    strokeWidth={2.5}
                  />
                ) : (
                  <Copy
                    size={12}
                    color={CHAT_COLORS.text.muted}
                    strokeWidth={2}
                    className='opacity-50 transition-opacity group-hover:opacity-100'
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
