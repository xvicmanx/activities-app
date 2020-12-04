import React from 'react';
import CRUDTable, { CreateForm, DeleteForm, Fields, Field, Pagination, UpdateForm } from 'react-crud-table';

import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import { Activities } from '../../Services';
import CommunitiesDropdown from './CommunitiesDropdown';

const styles = {
  container: {
    margin: "auto",
    width: "fit-content",
  },
};

const DescriptionRenderer = ({ field }) => <textarea {...field} />;
const CommunitiesSelectRenderer = ({ field }) => (
  <CommunitiesDropdown
    name={field.name}
    value={field.value}
    onChange={field.onChange}
  />
);

const service = {
  fetchItems: async () => {
    const response = await Activities.fetchActivities(readTokenFromCookie());
    return response.activities;
  },
  fetchTotal: async () => {
    const response = await Activities.fetchActivities(readTokenFromCookie());
    return response.activities.length;
  },
  create: (activity) => Activities.createActivity(activity, readTokenFromCookie()),
  update: (activity) => Activities.updateActivity(activity, readTokenFromCookie()),
  delete: (activity) => Activities.deleteActivity(activity.id, readTokenFromCookie()),
};


const ActivitiesTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Actividades"
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
        <Field name="title" label="Título" placeholder="Título" />
        <Field
          name="description"
          label="Descripción"
          render={DescriptionRenderer}
        />
        <Field
          name="date"
          type="date"
          label="Fecha"
        />
        <Field
          name="communityId"
          label="Comunidad"
          render={CommunitiesSelectRenderer}
          hideInUpdateForm
          hideFromTable
        />
      </Fields>
      <CreateForm
        title="Crear actividad"
        message="Crear una nueva actividad"
        trigger="Crear actividad"
        onSubmit={service.create}
        submitText="Crear"
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = 'Por favor, provea un título';
          }

          if (!values.description) {
            errors.description = 'Por favor, provea una Descripción';
          }

          if (!values.date) {
            errors.date = 'Por favor, provea una fecha';
          }

          if (!values.communityId) {
            errors.communityId = 'Por favor, seleccione una comunidad';
          }

          return errors;
        }}
      />
      <UpdateForm
        title="Actualizar actividad"
        message="Actualizar actividad"
        trigger="Actualizar"
        onSubmit={service.update}
        submitText="Actualizar"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Por favor, provea el id';
          }

          if (!values.title) {
            errors.title = 'Por favor, provea un título';
          }

          if (!values.description) {
            errors.description = 'Por favor, provea una Descripción';
          }

          if (!values.date) {
            errors.date = 'Por favor, provea una fecha';
          }

          return errors;
        }}
      />
      <DeleteForm
        title="Eliminar actividad"
        message="Esta seguro que quiere eliminar la actividad?"
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
        itemsPerPage={10}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>
);

export default ActivitiesTable;
