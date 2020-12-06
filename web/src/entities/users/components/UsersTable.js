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
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { DEFAULT_OPTIONS, DEFAULT_RESULT, encode } from '../../../core/helpers';
import type { Options } from '../../../core/helpers';
import { readTokenFromCookie } from '../redux/UsersActions';
import UsersService from '../services/UsersService';

const styles = {
  container: {
    margin: 'auto',
    width: 'fit-content',
  },
  copy: {
    backgroundColor: '#5caaf6',
    cursor: 'pointer',
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    color: '#fff',
  },
};

type RendererProps = {
  field: {
    value: string,
  },
};

const DescriptionRenderer = ({ field }: RendererProps) => (
  <textarea {...field} />
);
const PasswordRenderer = ({ field }: RendererProps) => (
  <div>
    <input {...field} type="password" />
    <CopyToClipboard text={field.value}>
      <span style={styles.copy}>Copiar</span>
    </CopyToClipboard>
  </div>
);

const service = {
  fetchItems: async (options: Options) => {
    const response = await UsersService.fetchUsers(
      readTokenFromCookie(),
      encode(options),
    );
    return {
      items: response.users,
      total: response.total,
    };
  },
  create: async (user) => {
    try {
      const result = await UsersService.createUser(user, readTokenFromCookie());
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  update: async (user) => {
    try {
      const result = await UsersService.updateUser(user, readTokenFromCookie());
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  delete: async (user) => {
    try {
      const result = await UsersService.deleteUser(user.id, readTokenFromCookie());
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};



const UsersTable = (): React$Element<any> => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [result, setResult] = useState(DEFAULT_RESULT);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await service.fetchItems(options);
      setResult(res);
    };
    fetchItems();
  }, [options]);

  return (
    <CRUDTable
      caption="Usuarios"
      items={result.items}
      actionsLabel="Acciones"
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
        onSubmit={async (user) => {
          const result = await service.create(user);

          if (!result.success) {
            throw new Error(result.message);
          }

          return result;
        }}
        submitText="Crear"
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = 'Por favor, provea un nombre';
          }

          if (!values.email) {
            errors.email = 'Por favor, provea un correo';
          }

          if (!values.description) {
            errors.description = 'Por favor, provea un Descripción';
          }

          return errors;
        }}
      />
      <UpdateForm
        title="Actualizar usuario"
        message="Actualizar usuario"
        trigger="Actualizar"
        onSubmit={async (user) => {
          const result = await service.update(user);

          if (!result.success) {
            throw new Error(result.message);
          }

          return result;
        }}
        submitText="Actualizar"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Por favor, provea el id';
          }

          if (!values.email) {
            errors.email = 'Por favor, provea un correo';
          }

          if (!values.name) {
            errors.name = 'Por favor, provea un nombre';
          }

          if (!values.description) {
            errors.description = 'Por favor, provea un Descripción';
          }

          return errors;
        }}
      />
      <DeleteForm
        title="Eliminar usuario"
        message="Esta seguro que quiere eliminar la usuario?"
        trigger="Eliminar"
        onSubmit={async (user) => {
          const result = await service.delete(user);

          if (!result.success) {
            throw new Error(result.message);
          }

          return result;
        }}
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
        defaultActivePage={1}
        itemsPerPage={options.itemsPerPage}
        totalOfItems={result.total}
      />
    </CRUDTable>
  );
};

export default UsersTable;
