import React from 'react';
import { Heading, Image } from 'react-bulma-components';
import CRUDTable, { Fields, Field, Pagination } from 'react-crud-table';

import icon from '../../assets/images/front.svg';
import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import fetchActivities from '../../Services/Activities/fetchActivities';

import './ActivitiesPage.css';

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const service = {
  fetchItems: async () => {
    const response = await fetchActivities(readTokenFromCookie());
    return response.activities;
  },
  fetchTotal: async () => {
    const response = await fetchActivities(readTokenFromCookie());
    return response.activities.length;
  },
};


const ActivitiesTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Actividades"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="title" label="Title" placeholder="Title" />
        <Field name="description" label="Description" />
      </Fields>
      <Pagination
        itemsPerPage={10}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>
);

const ActivitiesPage = () => (
  <div className="ActivitiesPage">
    <Heading className="ActivitiesPage__Title">
      <Image
        src={icon}
        alt="activities-icon"
        className="Title-Icon"
      /> Activities
    </Heading>
    <div className="ActivitiesPage__Content">
      <div>
        <ActivitiesTable />
      </div>
    </div>
  </div>
);

export default ActivitiesPage;
