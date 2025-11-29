import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import type { UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

import {
  CandidateDetailView,
  CHAT_COLORS,
  ChatHeader,
  ChatInput,
  ChatLoadingIndicator,
  ChatMessage,
  ChatSuggestions,
} from './chat';

export interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  apiEndpoint: string;
}

const POSITION_ID = '1D.06B';

export default function ChatInterface({
  isOpen,
  onClose,
  apiEndpoint,
}: ChatInterfaceProps): JSX.Element | null {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const { messages, sendMessage, status, stop, setMessages } =
    useChat<UIMessage>({
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

  const handleReset = useCallback(() => {
    if (isStreaming) {
      stop();
    }
    setMessages([]);
    setInput('');
  }, [isStreaming, stop, setMessages]);

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

  const handleQuestionClick = async (question: string) => {
    if (isStreaming) return;

    try {
      await sendMessage({ text: question });
    } catch {
      // Errors surface via the onError callback from useChat.
    }
  };

  const handleViewCandidate = useCallback((candidateId: string) => {
    setSelectedCandidateId(candidateId);
  }, []);

  const handleBackToChat = useCallback(() => {
    setSelectedCandidateId(null);
  }, []);

  if (!isOpen) return null;

  const hasMessages = messages.length > 0;

  return (
    <div
      className='fixed flex flex-col overflow-hidden rounded-3xl'
      style={{
        zIndex: 2147483646,
        bottom: '96px',
        left: '20px',
        width: '420px',
        height: '640px',
        backgroundColor: CHAT_COLORS.background,
        boxShadow:
          '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03)',
        animation: 'fadeInUp 300ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Show candidate detail view if a candidate is selected */}
      {selectedCandidateId ? (
        <CandidateDetailView
          candidateId={selectedCandidateId}
          onBack={handleBackToChat}
        />
      ) : (
        <>
          <ChatHeader
            onClose={onClose}
            onReset={handleReset}
            isStreaming={isStreaming}
            hasMessages={hasMessages}
          />

          {/* Messages Area or Suggested Actions */}
          {hasMessages ? (
            <div
              className='flex-1 overflow-y-auto px-4 py-5'
              style={{
                background: 'linear-gradient(180deg, #f8f9fb 0%, #f1f3f5 100%)',
                scrollBehavior: 'smooth',
              }}
            >
              <div className='flex flex-col gap-5'>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onQuestionClick={handleQuestionClick}
                    onViewCandidate={handleViewCandidate}
                  />
                ))}
                {isStreaming && <ChatLoadingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>
          ) : (
            <ChatSuggestions />
          )}

          <ChatInput
            input={input}
            isStreaming={isStreaming}
            isOpen={isOpen}
            onInputChange={setInput}
            onSend={sendCurrentMessage}
            onStop={stop}
          />
        </>
      )}
    </div>
  );
}
