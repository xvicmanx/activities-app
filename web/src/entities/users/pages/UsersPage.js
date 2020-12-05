import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import { Page } from '../../../core/components';
import UsersTable from '../components/UsersTable';


const UsersPage = () => (
  <Page
    title="Usuarios"
    icon={faUsers}
  >
    <UsersTable />
  </Page>
);

export default UsersPage;