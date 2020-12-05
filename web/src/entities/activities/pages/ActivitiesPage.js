import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { Page } from '../../../core/components';
import ActivitiesTable from '../components/ActivitiesTable';

const ActivitiesPage = () => (
  <Page title="Actividades" icon={faUsers}>
    <ActivitiesTable />
  </Page>
);

export default ActivitiesPage;
