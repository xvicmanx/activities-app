import React from 'react';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import { Page } from '../../../core/components';
import CommunitiesTable from '../components/CommunitiesTable';

const CommunitiesPage = () => (
  <Page title="Comunidades" icon={faBuilding}>
    <CommunitiesTable />
  </Page>
);

export default CommunitiesPage;
