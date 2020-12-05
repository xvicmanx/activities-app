// @flow

import moment from 'moment';
import React from 'react';
import CRUDTable, {
  CreateForm,
  DeleteForm,
  Fields,
  Field,
  Pagination,
  UpdateForm,
} from 'react-crud-table';

import { readTokenFromCookie } from '../../users/redux/UsersActions';
import ActivitiesService from '../services/ActivitiesService';
import CommunitiesDropdown from '../../communities/components/CommunitiesDropdown';

type RendererProps = {
  field: {
    value: string | number,
    name: string,
    onChange: Function,
  },
};

const DescriptionRenderer = ({ field }: RendererProps) => (
  <textarea {...field} />
);
const CommunitiesSelectRenderer = ({ field }: RendererProps) => (
  <CommunitiesDropdown
    name={field.name}
    value={field.value}
    onChange={field.onChange}
  />
);

const service = {
  fetchItems: async () => {
    const response = await ActivitiesService.fetchActivities(
      readTokenFromCookie()
    );
    return response.activities;
  },
  fetchTotal: async () => {
    const response = await ActivitiesService.fetchActivities(
      readTokenFromCookie()
    );
    return response.activities.length;
  },
  create: (activity) =>
    ActivitiesService.createActivity(activity, readTokenFromCookie()),
  update: (activity) =>
    ActivitiesService.updateActivity(activity, readTokenFromCookie()),
  delete: (activity) =>
    ActivitiesService.deleteActivity(activity.id, readTokenFromCookie()),
};

const ActivitiesTable = (): React$Element<any> => (
  <CRUDTable
    caption="Actividades"
    fetchItems={() => service.fetchItems()}
    actionsLabel="Acciones"
  >
    <Fields>
      <Field name="id" label="Id" hideInCreateForm readOnly />
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
        tableValueResolver={(item) =>
          moment(item.date).format('DD-MM-YYYY HH:mm')
        }
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
      fetchTotalOfItems={() => service.fetchTotal()}
    />
  </CRUDTable>
);

export default ActivitiesTable;
