import React from 'react';
import CRUDTable, { CreateForm, UpdateForm, DeleteForm, Fields, Field, Pagination } from 'react-crud-table';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import { Users } from '../../Services';


const styles = {
  container: {
    margin: "auto",
    width: "fit-content",
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

const DescriptionRenderer = ({ field }) => <textarea {...field} />;
const PasswordRenderer = ({ field }) => (
  <div>
    <input {...field} type="password" />
    <CopyToClipboard text={field.value}>
      <span style={styles.copy}>Copiar</span>
    </CopyToClipboard>
  </div>
);

const service = {
  fetchItems: async () => {
    const response = await Users.fetchUsers(readTokenFromCookie());
    return response.users;
  },
  fetchTotal: async () => {
    const response = await Users.fetchUsers(readTokenFromCookie());
    return response.users.length;
  },
  create: (user) => Users.createUser(user, readTokenFromCookie()),
  update: (user) => Users.updateUser(user, readTokenFromCookie()),
  delete: (user) => Users.deleteUser(user.id, readTokenFromCookie()),
};


const UsersTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Usuarios"
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
        <Field
          name="name"
          label="Nombre"
          placeholder="Nombre"
        />
        <Field
          name="email"
          label="Correo"
          placeholder="Correo"
        />
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
        onSubmit={task => service.create(task)}
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
        onSubmit={service.update}
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

export default UsersTable;
