// @flow

import React, { useState } from 'react';
import CRUDTable, {
  CreateForm,
  DeleteForm,
  Fields,
  Field,
  Pagination,
  UpdateForm,
} from 'react-crud-table';

import {
  DEFAULT_OPTIONS,
  throwErrorWhenNotSuccess,
} from '../../../../core/helpers';
import useTableItemsFetch from '../../../../core/useTableItemsFetch';

import {
  createFormValidator,
  deleteFormValidator,
  updateFormValidator,
} from './validators';
import { CommunitiesSelectRenderer, DescriptionRenderer } from './renderers';
import Controller from './controller';
import { dateValueTableValueResolver } from './helpers';

const ActivitiesTable = (): React$Element<any> => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const result = useTableItemsFetch(
    Controller.fetchItems,
    options,
  );

  return (
    <CRUDTable
      caption="Actividades"
      items={result.items}
      actionsLabel="Acciones"
      showQueryBuilder
      onChange={(data) => {
        setOptions({
          sort: data.sort,
          queryRules: data.queryRules,
          activePage: data.pagination.activePage,
          itemsPerPage: data.pagination.itemsPerPage,
        });
      }}
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
          tableValueResolver={dateValueTableValueResolver}
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
        onSubmit={throwErrorWhenNotSuccess(Controller.create)}
        submitText="Crear"
        validate={createFormValidator}
      />
      <UpdateForm
        title="Actualizar actividad"
        message="Actualizar actividad"
        trigger="Actualizar"
        onSubmit={throwErrorWhenNotSuccess(Controller.update)}
        submitText="Actualizar"
        validate={updateFormValidator}
      />
      <DeleteForm
        title="Eliminar actividad"
        message="Esta seguro que quiere eliminar la actividad?"
        trigger="Eliminar"
        onSubmit={throwErrorWhenNotSuccess(Controller.delete)}
        submitText="Eliminar"
        validate={deleteFormValidator}
      />
      <Pagination
        defaultActivePage={1}
        itemsPerPage={options.itemsPerPage}
        totalOfItems={result.total}
      />
    </CRUDTable>
  );
};

export default ActivitiesTable;
