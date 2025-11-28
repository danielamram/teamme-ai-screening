import { JSX } from 'react';
import type { UIMessage } from 'ai';
import { Check, Loader2 } from 'lucide-react';
import type { SearchCandidatesOutput } from './SearchCandidatesResult';

import SearchCandidatesResult from './SearchCandidatesResult';
import { CHAT_COLORS } from './types';

interface ToolCallDisplayProps {
  message: UIMessage;
}

export const hasToolParts = (message: UIMessage): boolean =>
  message.parts.some(
    (part) => part.type !== 'text' && part.type.startsWith('tool-')
  );

export default function ToolCallDisplay({
  message,
}: ToolCallDisplayProps): JSX.Element | null {
  if (!hasToolParts(message)) {
    return null;
  }

  return (
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
                typedPart.state === 'input-available') &&
              (() => {
                // Log input to console
                // eslint-disable-next-line no-console
                console.log(`Tool "${toolName}" input:`, typedPart.input);
                return (
                  <div className='mb-2 flex items-center justify-center py-2'>
                    <Loader2
                      size={16}
                      className='animate-spin'
                      style={{ color: CHAT_COLORS.primary }}
                    />
                  </div>
                );
              })()}

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
                      output={typedPart.output as SearchCandidatesOutput}
                    />
                  ) : (
                    <pre
                      className='overflow-x-auto rounded p-2 text-xs'
                      style={{
                        backgroundColor: CHAT_COLORS.surface,
                        color: CHAT_COLORS.text.primary,

                        cursor: 'text',
                      }}
                    >
                      {JSON.stringify(typedPart.output, null, 2)}
                    </pre>
                  )}
                </div>
              )}

            {/* Tool Error */}
            {hasState && typedPart.state === 'output-error' && hasErrorText && (
              <div
                className='rounded p-2'
                style={{
                  backgroundColor: '#fee',
                  color: CHAT_COLORS.error,

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
  );
}
