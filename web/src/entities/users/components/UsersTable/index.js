//@flow

import React, { useState, useEffect } from 'react';
import CRUDTable, {
  CreateForm,
  UpdateForm,
  DeleteForm,
  Fields,
  Field,
  Pagination,
} from 'react-crud-table';

import { DEFAULT_OPTIONS, DEFAULT_RESULT } from '../../../../core/helpers';
import { DescriptionRenderer, PasswordRenderer } from './renderers';
import { createFormValidator, deleteFormValidator, updateFormValidator } from './validators';
import Controller from './controller';
import { throwErrorWhenNotSuccess } from './helpers';


const UsersTable = (): React$Element<any> => {
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
      caption="Usuarios"
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
        <Field name="name" label="Nombre" placeholder="Nombre" />
        <Field name="email" label="Correo" placeholder="Correo" />
        <Field
          name="description"
          label="Descripción"
          render={DescriptionRenderer}
        />
        <Field
          name="password"
          label="Contraseña"
          render={PasswordRenderer}
          hideInUpdateForm
          hideFromTable
        />
      </Fields>
      <CreateForm
        title="Crear usuario"
        message="Crear una nueva usuario"
        trigger="Crear usuario"
        onSubmit={throwErrorWhenNotSuccess(Controller.create)}
        submitText="Crear"
        validate={createFormValidator}
      />
      <UpdateForm
        title="Actualizar usuario"
        message="Actualizar usuario"
        trigger="Actualizar"
        onSubmit={throwErrorWhenNotSuccess(Controller.update)}
        submitText="Actualizar"
        validate={updateFormValidator}
      />
      <DeleteForm
        title="Eliminar usuario"
        message="Esta seguro que quiere eliminar la usuario?"
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

export default UsersTable;
