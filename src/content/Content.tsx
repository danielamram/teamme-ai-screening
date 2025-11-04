import { JSX } from 'react';

import Sidebar from '@/components/sidebar/Sidebar';
import { useCandidateData } from '@/hooks/useCandidateData';

export default function Content(): JSX.Element | null {
  const { selectedCandidate, loading, candidateFound } = useCandidateData();

  // Don't render the extension if no candidate is found
  if (!candidateFound) {
    return null;
  }

  return (
    <div id='my-ext' data-theme='light'>
      <Sidebar
        selectedCandidate={selectedCandidate}
        loading={loading}
        candidateFound={candidateFound}
      />
    </div>
  );
}
