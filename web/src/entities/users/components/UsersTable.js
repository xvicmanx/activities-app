//@flow

import React from 'react';
import CRUDTable, {
  CreateForm,
  UpdateForm,
  DeleteForm,
  Fields,
  Field,
  Pagination,
} from 'react-crud-table';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
  fetchItems: async () => {
    const response = await UsersService.fetchUsers(readTokenFromCookie());
    return response.users;
  },
  fetchTotal: async () => {
    const response = await UsersService.fetchUsers(readTokenFromCookie());
    return response.users.length;
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

const UsersTable = (): React$Element<'div'> => (
  <div style={styles.container}>
    <CRUDTable
      caption="Usuarios"
      fetchItems={() => service.fetchItems()}
      actionsLabel="Acciones"
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
        itemsPerPage={100}
        fetchTotalOfItems={() => service.fetchTotal()}
      />
    </CRUDTable>
  </div>
);

export default UsersTable;
