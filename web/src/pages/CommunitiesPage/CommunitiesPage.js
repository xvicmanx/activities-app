import React from 'react';
import { Heading, Image } from 'react-bulma-components';
import CRUDTable, { Fields, Field, Pagination } from 'react-crud-table';

import icon from '../../assets/images/front.svg';
import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import fetchCommunities from '../../Services/Communities/fetchCommunities';

import './CommunitiesPage.css';

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const service = {
  fetchItems: async () => {
    const response = await fetchCommunities(readTokenFromCookie());
    return response.communities;
  },
  fetchTotal: async () => {
    const response = await fetchCommunities(readTokenFromCookie());
    return response.communities.length;
  },
};


const CommunitiesTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Comunidades"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="name" label="Name" placeholder="Name" />
        <Field name="slogan" label="Slogan" />
      </Fields>
      <Pagination
        itemsPerPage={10}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>
);

const CommunitiesPage = () => (
  <div className="CommunitiesPage">
    <Heading className="CommunitiesPage__Title">
      <Image
        src={icon}
        alt="communities-icon"
        className="Title-Icon"
      /> Communities
    </Heading>
    <div className="CommunitiesPage__Content">
      <div>
        <CommunitiesTable />
      </div>
    </div>
  </div>
);

export default CommunitiesPage;
