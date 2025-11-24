import { JSX } from 'react';

import FabHelpMenu from '@/components/fab/FabHelpMenu';
import { detectPageType } from '@/utils/atsDetector';

export default function Content(): JSX.Element | null {
  // const { selectedCandidate, loading: candidateLoading } = useCandidateData();
  // const { position, loading: positionLoading } = usePositionData();

  // Detect page type to determine which sidebar to render
  const pageType = detectPageType(window.location.href);

  return (
    <div id='my-ext' data-theme='light'>
      {/* {pageType === 'candidate' && (
        <Sidebar
          selectedCandidate={selectedCandidate}
          loading={candidateLoading}
        />
      )}
      {pageType === 'position' && (
        <PositionSidebar position={position} loading={positionLoading} />
      )} */}

      {pageType === 'candidate' || (pageType === 'position' && <FabHelpMenu />)}
    </div>
  );
}
