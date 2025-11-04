import { JSX } from 'react';

import Sidebar from '@/components/sidebar/Sidebar';

export default function Content(): JSX.Element {
  return (
    <div id='my-ext' data-theme='dark'>
      <Sidebar />
    </div>
  );
}
