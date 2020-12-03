import React from 'react';
import { Heading, Image } from 'react-bulma-components';
import CRUDTable, { CreateForm, DeleteForm, Fields, Field, Pagination, UpdateForm } from 'react-crud-table';

import icon from '../../assets/images/front.svg';
import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import { Communities } from '../../Services/';

import './CommunitiesPage.css';

const styles = {
  container: {
    margin: "auto",
    width: "fit-content",
  },
};

const service = {
  fetchItems: async () => {
    const response = await Communities.fetchCommunities(readTokenFromCookie());
    return response.communities;
  },
  fetchTotal: async () => {
    const response = await Communities.fetchCommunities(readTokenFromCookie());
    return response.communities.length;
  },
  create: (community) => Communities.createCommunity(community, readTokenFromCookie()),
  update: (community) => Communities.updateCommunity(community, readTokenFromCookie()),
  delete: (community) => Communities.deleteCommunity(community.id, readTokenFromCookie()),
};


const CommunitiesTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Comunidades"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="name" label="Nombre" placeholder="Nombre" />
        <Field name="slogan" label="Eslogan" />
      </Fields>
      <CreateForm
        title="Crear comunidad"
        message="Crear una nueva comunidad"
        trigger="Crear comunidad"
        onSubmit={task => service.create(task)}
        submitText="Crear"
        validate={(values) => {
          const errors = {};
          
          if (!values.name) {
            errors.name = 'Por favor, provea un nombre';
          }

          if (!values.slogan) {
            errors.slogan = 'Por favor, provea un eslogan';
          }

          return errors;
        }}
      />
      <UpdateForm
        title="Actualizar comunidad"
        message="Actualizar comunidad"
        trigger="Actualizar"
        onSubmit={service.update}
        submitText="Actualizar"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Por favor, provea el id';
          }

          if (!values.name) {
            errors.name = 'Por favor, provea un nombre';
          }

          if (!values.slogan) {
            errors.slogan = 'Por favor, provea un eslogan';
          }

          return errors;
        }}
      />
      <DeleteForm
        title="Eliminar comunidad"
        message="Esta seguro que quiere eliminar la comunidad?"
        trigger="Eliminar"
        onSubmit={service.delete}
        submitText="Eliminar"
        validate={(values) => {
          const errors = {};
          
          if (!values.id) {
            errors.id = 'Por favor, provea el id';
          }

          return errors;
        }}
      />
      <Pagination
        itemsPerPage={100}
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
      /> Comunidades
    </Heading>
    <div className="CommunitiesPage__Content">
      <div>
        <CommunitiesTable />
      </div>
    </div>
  </div>
);

export default CommunitiesPage;
