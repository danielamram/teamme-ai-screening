import { JSX, useState } from 'react';
import { ArrowRight, Plus, Send } from 'lucide-react';

export default function Popup(): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  const prompts = [
    'What can TeamMe AI do for recruiting?',
    'Summarize top candidates for this position',
    'Compare candidates by skills and experience',
  ];

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // Handle submission
      console.log('Submitted:', inputValue);
      setInputValue('');
    }
  };

  return (
    <div id='my-ext' className='w-[380px] bg-white' data-theme='light'>
      <div className='flex min-h-[500px] flex-col p-6'>
        {/* Main content area */}
        <div className='flex flex-1 flex-col items-center justify-center'>
          {/* Headline */}
          <h1 className='mb-32 text-center text-2xl font-normal text-indigo-500'>
            Ask about your candidates
          </h1>

          {/* Prompts */}
          <div className='w-full space-y-3'>
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type='button'
                onClick={() => handlePromptClick(prompt)}
                className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100'
                style={{ color: '#1F2024' }}
              >
                <ArrowRight size={16} className='shrink-0 text-gray-400' />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className='mt-6'>
          <div
            className='rounded-2xl border px-4 py-3'
            style={{ borderColor: '#E4E6E8' }}
          >
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder='Try @candidate name'
              className='w-full bg-transparent text-sm outline-none'
              style={{ color: '#1F2024' }}
            />
            <div className='mt-2 flex items-center justify-between'>
              <button
                type='button'
                className='rounded-full p-1 transition-colors hover:bg-gray-100'
              >
                <Plus size={20} className='text-gray-500' />
              </button>
              <button
                type='button'
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className={`rounded-full p-2 ${
                  inputValue.trim()
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className='mt-3 text-center text-xs text-gray-500'>
            TeamMe AI can make mistakes, so double-check responses.{' '}
            <a href='#' className='underline'>
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
