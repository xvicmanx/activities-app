import React from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import Page from '../../components/Page/Page';
import CommunitiesTable from './CommunitiesTable';

const CommunitiesPage = () => (
  <Page
    title="Comunidades"
    icon={faBuilding}
  >
    <CommunitiesTable />
  </Page>
);

export default CommunitiesPage;
