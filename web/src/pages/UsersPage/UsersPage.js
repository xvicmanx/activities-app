import React from 'react';
import { Heading, Image } from 'react-bulma-components';
import CRUDTable, { Fields, Field, Pagination } from 'react-crud-table';

import icon from '../../assets/images/front.svg';
import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import fetchUsers from '../../Services/Users/fetchUsers';

import './UsersPage.css';

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const service = {
  fetchItems: async () => {
    const response = await fetchUsers(readTokenFromCookie());
    return response.users;
  },
  fetchTotal: async () => {
    const response = await fetchUsers(readTokenFromCookie());
    return response.users.length;
  },
};


const UsersTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Usuarios"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="name" label="Name" placeholder="Name" />
      </Fields>
      <Pagination
        itemsPerPage={10}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>
);

const UsersPage = () => (
  <div className="UsersPage">
    <Heading className="UsersPage__Title">
      <Image
        src={icon}
        alt="users-icon"
        className="Title-Icon"
      /> Users
    </Heading>
    <div className="UsersPage__Content">
      <div>
        <UsersTable />
      </div>
    </div>
  </div>
);

export default UsersPage;
