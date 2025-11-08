import { JSX } from 'react';

import Sidebar from '@/components/sidebar/Sidebar';
import { useCandidateData } from '@/hooks/useCandidateData';

export default function Content(): JSX.Element | null {
  const { selectedCandidate, loading } = useCandidateData();

  return (
    <div id='my-ext' data-theme='light'>
      <Sidebar selectedCandidate={selectedCandidate} loading={loading} />
    </div>
  );
}
