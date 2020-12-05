// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import CRUDTable, {
  CreateForm,
  DeleteForm,
  Fields,
  Field,
  Pagination,
  UpdateForm,
} from 'react-crud-table';

import { readTokenFromCookie } from '../../users/redux/UsersActions';
import CommunitiesService from '../services/CommunitiesService';


type RendererProps = {
  field: Object,
};

const DescriptionRenderer = ({ field }: RendererProps) => (
  <textarea {...field} />
);

const service = {
  fetchItems: async () => {
    const response = await CommunitiesService.fetchCommunities(
      readTokenFromCookie()
    );
    return response.communities;
  },
  fetchTotal: async () => {
    const response = await CommunitiesService.fetchCommunities(
      readTokenFromCookie()
    );
    return response.communities.length;
  },
  create: (community) =>
    CommunitiesService.createCommunity(community, readTokenFromCookie()),
  update: (community) =>
    CommunitiesService.updateCommunity(community, readTokenFromCookie()),
  delete: (community) =>
    CommunitiesService.deleteCommunity(community.id, readTokenFromCookie()),
};

const CommunitiesTable = (): React$Element<any> => (
  <CRUDTable
    caption="Comunidades"
    fetchItems={() => service.fetchItems()}
    actionsLabel="Acciones"
  >
    <Fields>
      <Field name="id" label="Id" hideInCreateForm readOnly />
      <Field
        name="name"
        label="Nombre"
        placeholder="Nombre"
        tableValueResolver={(item) => (
          <Link to={`/communities/${item.id}`}>{item.name}</Link>
        )}
      />
      <Field name="slogan" label="Eslogan" render={DescriptionRenderer} />
    </Fields>
    <CreateForm
      title="Crear comunidad"
      message="Crear una nueva comunidad"
      trigger="Crear comunidad"
      onSubmit={(task) => service.create(task)}
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
      fetchTotalOfItems={() => service.fetchTotal()}
    />
  </CRUDTable>
);

export default CommunitiesTable;
