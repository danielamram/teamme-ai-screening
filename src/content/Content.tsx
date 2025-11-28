import { JSX } from 'react';

import FabHelpMenu from '@/components/fab/FabHelpMenu';
import { useIsOnATS } from '@/hooks/useIsOnATS';

export default function Content(): JSX.Element | null {
  // const { selectedCandidate, loading: candidateLoading } = useCandidateData();
  // const { position, loading: positionLoading } = usePositionData();

  // Detect if we're on any ATS platform and listen for URL changes
  const isOnATS = useIsOnATS();

  return (
    <div id='my-ext' data-theme='light'>
      {isOnATS && <FabHelpMenu />}
    </div>
  );
}
