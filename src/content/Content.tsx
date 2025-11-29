import { JSX } from 'react';

import FabHelpMenu from '@/components/fab/FabHelpMenu';
import { useIsOnATS } from '@/hooks/useIsOnATS';

export default function Content(): JSX.Element | null {
  const isOnATS = useIsOnATS();

  return (
    <div id='my-ext' data-theme='light'>
      {isOnATS && (
        <>
          <FabHelpMenu />
          {/* <CandidateListTooltips /> */}
        </>
      )}
    </div>
  );
}
