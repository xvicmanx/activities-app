import React from 'react';
import CRUDTable, { CreateForm, DeleteForm, Fields, Field, Pagination, UpdateForm } from 'react-crud-table';

import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import { Communities } from '../../Services/';

const styles = {
  container: {
    margin: "auto",
    width: "fit-content",
  },
};

const DescriptionRenderer = ({ field }) => <textarea {...field} />;


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
      actionsLabel="Acciones"
    >
      <Fields>
        <Field
          name="id"
          label="Id"
          hideInCreateForm
          readOnly
        />
        <Field name="name" label="Nombre" placeholder="Nombre" />
        <Field
          name="slogan"
          label="Eslogan"
          render={DescriptionRenderer}
        />
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

export default CommunitiesTable;
