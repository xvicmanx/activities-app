import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import Page from '../../components/Page/Page';
import ActivitiesTable from './ActivitiesTable';


const ActivitiesPage = () => (
  <Page
    title="Actividades"
    icon={faUsers}
  >
    <ActivitiesTable />
  </Page>
);

export default ActivitiesPage;
