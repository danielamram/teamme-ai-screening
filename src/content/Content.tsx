import { JSX } from 'react';

import FabHelpMenu from '@/components/fab/FabHelpMenu';
import PositionSidebar from '@/components/position/PositionSidebar';
import Sidebar from '@/components/sidebar/Sidebar';
import { useCandidateData } from '@/hooks/useCandidateData';
import { usePositionData } from '@/hooks/usePositionData';
import { detectPageType } from '@/utils/atsDetector';

export default function Content(): JSX.Element | null {
  const { selectedCandidate, loading: candidateLoading } = useCandidateData();
  const { position, loading: positionLoading } = usePositionData();

  // Detect page type to determine which sidebar to render
  const pageType = detectPageType(window.location.href);

  return (
    <div id='my-ext' data-theme='light'>
      {pageType === 'candidate' && (
        <Sidebar
          selectedCandidate={selectedCandidate}
          loading={candidateLoading}
        />
      )}
      {pageType === 'position' && (
        <PositionSidebar position={position} loading={positionLoading} />
      )}
      <FabHelpMenu />
    </div>
  );
}
