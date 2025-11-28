import { JSX, useState } from 'react';
import type { UIMessage } from 'ai';
import { Check, Copy, Loader2, MapPin, Sparkles } from 'lucide-react';
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

const hasToolParts = (message: UIMessage): boolean =>
  message.parts.some(
    (part) => part.type !== 'text' && part.type.startsWith('tool-')
  );

interface Candidate {
  id: string;
  name: string;
  location: string;
  primary_stack: string[];
  summary: string;
}

interface SearchCandidatesOutput {
  candidates: Candidate[];
  totalFound: number;
}

// Generate initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f43f5e', // rose
    '#f59e0b', // amber
    '#10b981', // emerald
    '#06b6d4', // cyan
    '#3b82f6', // blue
  ];
  const index = name.length % colors.length;
  return colors[index];
}

function CandidateCard({ candidate }: { candidate: Candidate }): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const maxSummaryLength = 150;
  const needsTruncation = candidate.summary.length > maxSummaryLength;
  const displaySummary =
    !expanded && needsTruncation
      ? `${candidate.summary.slice(0, maxSummaryLength)}...`
      : candidate.summary;

  const handleCopyDetails = async () => {
    const details = [
      `Name: ${candidate.name}`,
      `Location: ${candidate.location}`,
      `Primary Stack: ${candidate.primary_stack.join(', ')}`,
      `Summary: ${candidate.summary}`,
    ].join('\n');

    await navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className='rounded-xl border transition-all hover:shadow-md'
      style={{
        backgroundColor: CHAT_COLORS.background,
        borderColor: CHAT_COLORS.border,
      }}
    >
      {/* Card Content with better padding */}
      <div className='p-5'>
        {/* Header Section */}
        <div className='mb-4 flex items-start gap-3'>
          {/* Avatar with initials */}
          <div
            className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm'
            style={{ backgroundColor: getAvatarColor(candidate.name) }}
          >
            {getInitials(candidate.name)}
          </div>
          <div className='min-w-0 flex-1'>
            <h4
              className='text-base font-semibold leading-tight'
              style={{
                color: CHAT_COLORS.text.primary,
                userSelect: 'text',
                cursor: 'text',
              }}
            >
              {candidate.name}
            </h4>
            {candidate.location && (
              <div
                className='mt-1.5 flex items-center gap-1.5 text-sm font-medium'
                style={{
                  color: CHAT_COLORS.text.secondary,
                  userSelect: 'text',
                  cursor: 'text',
                }}
              >
                <MapPin size={14} style={{ color: CHAT_COLORS.primary }} />
                {candidate.location}
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {candidate.primary_stack && candidate.primary_stack.length > 0 && (
          <div className='mb-4'>
            <div
              className='mb-2 text-xs font-semibold uppercase tracking-wide'
              style={{ color: CHAT_COLORS.text.muted }}
            >
              Primary Stack
            </div>
            <div className='flex flex-wrap gap-2'>
              {candidate.primary_stack.map((tech) => (
                <span
                  key={tech}
                  className='rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm'
                  style={{
                    backgroundColor: CHAT_COLORS.primary,
                    color: '#FFFFFF',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Summary Section */}
        {candidate.summary && (
          <div className='mb-4'>
            <div
              className='mb-2 text-xs font-semibold uppercase tracking-wide'
              style={{ color: CHAT_COLORS.text.muted }}
            >
              Summary
            </div>
            <p
              className='text-sm leading-relaxed'
              style={{
                color: CHAT_COLORS.text.secondary,
                userSelect: 'text',
                cursor: 'text',
              }}
            >
              {displaySummary}
            </p>
          </div>
        )}

        {/* Actions Row */}
        <div className='flex items-center gap-3 pt-2'>
          {needsTruncation && (
            <button
              type='button'
              onClick={() => setExpanded(!expanded)}
              className='text-sm font-semibold transition-all hover:underline'
              style={{ color: CHAT_COLORS.primary }}
            >
              {expanded ? '← Show less' : 'Show more →'}
            </button>
          )}
          <button
            type='button'
            onClick={handleCopyDetails}
            className='ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:shadow-sm'
            style={{
              backgroundColor: copied
                ? CHAT_COLORS.success
                : CHAT_COLORS.surface,
              color: copied ? '#FFFFFF' : CHAT_COLORS.text.secondary,
              border: `1px solid ${copied ? CHAT_COLORS.success : CHAT_COLORS.border}`,
            }}
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy details
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchCandidatesResult({
  output,
}: {
  output: SearchCandidatesOutput;
}): JSX.Element {
  return (
    <div className='space-y-4'>
      {/* Subtle success indicator */}
      <div
        className='flex items-center gap-2 rounded-lg border px-3 py-2'
        style={{
          backgroundColor: `${CHAT_COLORS.success}08`,
          borderColor: `${CHAT_COLORS.success}30`,
        }}
      >
        <Check
          size={16}
          style={{ color: CHAT_COLORS.success }}
          className='shrink-0'
        />
        <span
          className='text-sm font-medium'
          style={{ color: CHAT_COLORS.text.primary }}
        >
          Found {output.totalFound} candidate
          {output.totalFound !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Candidate Cards */}
      <div className='space-y-3'>
        {output.candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}

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
      <div className='animate-in fade-in slide-in-from-bottom-2 flex flex-col items-end gap-1 duration-300'>
        <div
          className='max-w-[85%] rounded-2xl px-4 py-3 shadow-sm'
          style={{
            backgroundColor: CHAT_COLORS.primary,
          }}
        >
          <p
            className='whitespace-pre-wrap text-sm leading-relaxed text-white'
            style={{
              userSelect: 'text',
              cursor: 'text',
            }}
          >
            {messageText}
          </p>
        </div>
        <span
          className='px-1 text-xs'
          style={{ color: CHAT_COLORS.text.muted }}
        >
          {new Date(message.createdAt || Date.now()).toLocaleTimeString(
            'en-US',
            { hour: '2-digit', minute: '2-digit' }
          )}
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
                userSelect: 'text',
                cursor: 'text',
              }}
            >
              <ReactMarkdown components={MARKDOWN_COMPONENTS}>
                {messageText}
              </ReactMarkdown>
            </div>
          )}

          {/* Tool Calls (if any) */}
          {hasToolParts(message) && (
            <div className='mt-3 flex flex-col gap-2'>
              {message.parts.map((part, idx) => {
                // Only render tool parts (not text, reasoning, etc.)
                if (!part.type.startsWith('tool-')) return null;

                // Extract tool name from type (e.g., "tool-search_candidates" -> "search_candidates")
                const toolName = part.type.slice(5);

                // Cast part as any since the library doesn't provide proper types for tool parts
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const typedPart = part as any;

                // Type guard for parts with state property
                const hasState = 'state' in typedPart;
                const hasInput = 'input' in typedPart;
                const hasOutput = 'output' in typedPart;
                const hasErrorText = 'errorText' in typedPart;

                // Use toolCallId if available, otherwise fallback to a composite key
                const toolKey =
                  'toolCallId' in typedPart && typedPart.toolCallId
                    ? typedPart.toolCallId
                    : `${message.id}-${toolName}-${idx}`;

                return (
                  <div
                    key={toolKey}
                    className='rounded-lg border p-4 text-xs'
                    style={{
                      backgroundColor: CHAT_COLORS.surface,
                      borderColor: CHAT_COLORS.border,
                    }}
                  >
                    {/* Tool Header */}
                    <div className='mb-3 flex items-center gap-2'>
                      <div
                        className='font-mono text-xs font-semibold'
                        style={{ color: CHAT_COLORS.primary }}
                      >
                        🔧 {toolName}
                      </div>
                      {hasState && (
                        <div className='ml-auto flex items-center gap-2 text-xs'>
                          {typedPart.state === 'input-streaming' && (
                            <span
                              className='flex items-center gap-1.5 rounded-full px-2 py-1'
                              style={{
                                backgroundColor: `${CHAT_COLORS.primary}10`,
                                color: CHAT_COLORS.primary,
                              }}
                            >
                              <Loader2 size={12} className='animate-spin' />
                              <span className='font-medium'>Streaming...</span>
                            </span>
                          )}
                          {typedPart.state === 'input-available' && (
                            <span
                              className='flex items-center gap-1.5 rounded-full px-2 py-1'
                              style={{
                                backgroundColor: `${CHAT_COLORS.warning}10`,
                                color: CHAT_COLORS.warning,
                              }}
                            >
                              <Loader2 size={12} className='animate-spin' />
                              <span className='font-medium'>Executing...</span>
                            </span>
                          )}
                          {typedPart.state === 'output-available' && (
                            <span
                              className='flex items-center gap-1.5 rounded-full px-2 py-1'
                              style={{
                                backgroundColor: `${CHAT_COLORS.success}10`,
                                color: CHAT_COLORS.success,
                              }}
                            >
                              <Check size={12} />
                              <span className='font-medium'>Completed</span>
                            </span>
                          )}
                          {typedPart.state === 'output-error' && (
                            <span
                              className='flex items-center gap-1.5 rounded-full px-2 py-1'
                              style={{
                                backgroundColor: `${CHAT_COLORS.error}10`,
                                color: CHAT_COLORS.error,
                              }}
                            >
                              <span className='font-medium'>✗ Error</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tool Input */}
                    {hasInput &&
                      typedPart.input &&
                      (typedPart.state === 'input-streaming' ||
                        typedPart.state === 'input-available') && (
                        <div className='mb-2'>
                          <div
                            className='mb-1 font-semibold'
                            style={{ color: CHAT_COLORS.text.secondary }}
                          >
                            Input:
                          </div>
                          <pre
                            className='overflow-x-auto rounded p-2 text-xs'
                            style={{
                              backgroundColor: CHAT_COLORS.surface,
                              color: CHAT_COLORS.text.primary,
                              userSelect: 'text',
                              cursor: 'text',
                            }}
                          >
                            {JSON.stringify(typedPart.input, null, 2)}
                          </pre>
                        </div>
                      )}

                    {/* Tool Output */}
                    {hasState &&
                      typedPart.state === 'output-available' &&
                      hasOutput && (
                        <div>
                          <div
                            className='mb-2 font-semibold'
                            style={{ color: CHAT_COLORS.text.secondary }}
                          >
                            Output:
                          </div>
                          {toolName === 'search_candidates' &&
                          typedPart.output?.candidates ? (
                            <SearchCandidatesResult
                              output={
                                typedPart.output as SearchCandidatesOutput
                              }
                            />
                          ) : (
                            <pre
                              className='overflow-x-auto rounded p-2 text-xs'
                              style={{
                                backgroundColor: CHAT_COLORS.surface,
                                color: CHAT_COLORS.text.primary,
                                userSelect: 'text',
                                cursor: 'text',
                              }}
                            >
                              {JSON.stringify(typedPart.output, null, 2)}
                            </pre>
                          )}
                        </div>
                      )}

                    {/* Tool Error */}
                    {hasState &&
                      typedPart.state === 'output-error' &&
                      hasErrorText && (
                        <div
                          className='rounded p-2'
                          style={{
                            backgroundColor: '#fee',
                            color: CHAT_COLORS.error,
                            userSelect: 'text',
                            cursor: 'text',
                          }}
                        >
                          {typedPart.errorText}
                        </div>
                      )}
                  </div>
                );
              })}
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
                      style={{
                        color: CHAT_COLORS.text.primary,
                        userSelect: 'text',
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
                          userSelect: 'text',
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
          )}
        </div>
      </div>
      <div className='ml-11 flex items-center gap-2'>
        <span className='text-xs' style={{ color: CHAT_COLORS.text.muted }}>
          {new Date(message.createdAt || Date.now()).toLocaleTimeString(
            'en-US',
            { hour: '2-digit', minute: '2-digit' }
          )}
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
