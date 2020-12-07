// @flow

import React, { useState, useEffect } from 'react';
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
  DEFAULT_RESULT,
  throwErrorWhenNotSuccess,
} from '../../../../core/helpers';
import {
  createFormValidator,
  deleteFormValidator,
  updateFormValidator,
} from './validators';
import { DescriptionRenderer } from './renderers';
import Controller from './controller';
import { nameTableValueResolver } from './helpers';

const CommunitiesTable = (): React$Element<any> => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [result, setResult] = useState(DEFAULT_RESULT);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await Controller.fetchItems(options);
      setResult(res);
    };
    fetchItems();
  }, [options]);

  return (
    <CRUDTable
      caption="Comunidades"
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
        <Field
          name="name"
          label="Nombre"
          placeholder="Nombre"
          tableValueResolver={nameTableValueResolver}
        />
        <Field name="slogan" label="Eslogan" render={DescriptionRenderer} />
      </Fields>
      <CreateForm
        title="Crear comunidad"
        message="Crear una nueva comunidad"
        trigger="Crear comunidad"
        onSubmit={throwErrorWhenNotSuccess(Controller.create)}
        submitText="Crear"
        validate={createFormValidator}
      />
      <UpdateForm
        title="Actualizar comunidad"
        message="Actualizar comunidad"
        trigger="Actualizar"
        onSubmit={throwErrorWhenNotSuccess(Controller.update)}
        submitText="Actualizar"
        validate={updateFormValidator}
      />
      <DeleteForm
        title="Eliminar comunidad"
        message="Esta seguro que quiere eliminar la comunidad?"
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

export default CommunitiesTable;
