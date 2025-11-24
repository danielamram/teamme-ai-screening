import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import type { UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { ChatInterfaceProps } from './chat';

import {
  CHAT_COLORS,
  ChatHeader,
  ChatInput,
  ChatLoadingIndicator,
  ChatMessage,
  ChatSuggestions,
} from './chat';

const POSITION_ID = '1D.06B';

export default function ChatInterface({
  isOpen,
  onClose,
  suggestions,
  apiEndpoint,
}: ChatInterfaceProps): JSX.Element | null {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status, stop } = useChat<UIMessage>({
    transport: new DefaultChatTransport({
      api: apiEndpoint,
      body: {
        positionId: POSITION_ID,
      },
    }),
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error('Chat error:', error);
    },
  });
  const isStreaming = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendCurrentMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isStreaming) return;

    // Clear input immediately for better UX
    setInput('');

    try {
      await sendMessage({ text: trimmedInput });
    } catch {
      // Errors surface via the onError callback from useChat.
    }
  }, [input, isStreaming, sendMessage]);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  const handleQuestionClick = async (question: string) => {
    if (isStreaming) return;

    try {
      await sendMessage({ text: question });
    } catch {
      // Errors surface via the onError callback from useChat.
    }
  };

  if (!isOpen) return null;

  const hasMessages = messages.length > 0;

  return (
    <div
      className='fixed flex flex-col overflow-hidden rounded-3xl shadow-2xl backdrop-blur-xl'
      style={{
        zIndex: 2147483646,
        bottom: '96px',
        left: '24px',
        width: '420px',
        height: '640px',
        backgroundColor: CHAT_COLORS.background,
        animation: 'fadeInUp 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <ChatHeader onClose={onClose} />

      {/* Messages Area or Suggested Actions */}
      {hasMessages ? (
        <div
          className='flex-1 overflow-y-auto px-5 py-5'
          style={{ backgroundColor: '#f5f7fa' }}
        >
          <div className='flex flex-col gap-6'>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onQuestionClick={handleQuestionClick}
              />
            ))}
            {isStreaming && <ChatLoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <ChatSuggestions
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      <ChatInput
        input={input}
        isStreaming={isStreaming}
        onInputChange={setInput}
        onSend={sendCurrentMessage}
        onStop={stop}
      />
    </div>
  );
}
