import React from 'react';
import { Heading, Image } from 'react-bulma-components';
import CRUDTable, { CreateForm, DeleteForm, Fields, Field, Pagination, UpdateForm } from 'react-crud-table';

import icon from '../../assets/images/front.svg';
import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import { Activities } from '../../Services';

import './ActivitiesPage.css';

const styles = {
  container: {
    margin: "auto",
    width: "fit-content",
  },
};

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

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
    >
      <Fields>
        <Field
          name="id"
          label="Id"
          hideInCreateForm
          readOnly
        />
        <Field name="title" label="Titulo" placeholder="Titulo" />
        <Field
          name="description"
          label="Descripcion"
          render={DescriptionRenderer}
        />
        <Field name="date" type="date" label="Fecha" />
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
            errors.title = 'Por favor, provea un titulo';
          }

          if (!values.description) {
            errors.description = 'Por favor, provea una descripcion';
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
            errors.title = 'Por favor, provea un titulo';
          }

          if (!values.description) {
            errors.description = 'Por favor, provea una descripcion';
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

const ActivitiesPage = () => (
  <div className="ActivitiesPage">
    <Heading className="ActivitiesPage__Title">
      <Image
        src={icon}
        alt="activities-icon"
        className="Title-Icon"
      /> Actividades
    </Heading>
    <div className="ActivitiesPage__Content">
      <div>
        <ActivitiesTable />
      </div>
    </div>
  </div>
);

export default ActivitiesPage;
