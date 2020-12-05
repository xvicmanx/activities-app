import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CRUDTable, { CreateForm, DeleteForm, Fields, Field } from 'react-crud-table';

import { readTokenFromCookie } from '../../redux/Users/UsersActions';
import { addMember } from '../../redux/Communities/CommunitiesActions';
import UsersDropdown from './UsersDropdown';
import BooleanDropdown from './BooleanDropdown';

const styles = {
  container: {
    margin: "auto",
    width: "fit-content",
  },
};

const MembersSelectRenderer = ({ field }) => (
  <UsersDropdown {...field}/>
);

const CoordinatesSelectRenderer = ({ field }) => (
  <BooleanDropdown {...field} />
);


const CommunityMembersTable = ({ communityId, members }) => {
  const dispatch = useDispatch();
  const token = readTokenFromCookie();
  return (
    <CRUDTable
      caption="Miembros"
      items={members}
    >
      <Fields>
        <Field
          name="memberId"
          label="Miembro"
          hideFromTable
          render={MembersSelectRenderer}
        />
        <Field
          name="name"
          label="Nombre"
          placeholder="Nombre"
          hideInCreateForm
        />
        <Field
          name="coordinates"
          label="Coordinador?"
          tableValueResolver={item => item.coordinates ? 'Si' : 'No'}
          render={CoordinatesSelectRenderer}
        />
      </Fields>
      <CreateForm
        title="Agregar miembro"
        message="Agregar miembro"
        trigger="Agregar miembro"
        onSubmit={item => {
          dispatch(addMember(
            token,
            communityId,
            item.memberId,
            item.coordinates,
          ));
          return Promise.resolve();
        }}
        submitText="Agregar"
        validate={(values) => {
          const errors = {};
          
          if (!values.memberId) {
            errors.name = 'Por favor, seleccione miembro';
          }
  
          return errors;
        }}
      />
    </CRUDTable>
  );
};

export default CommunityMembersTable;
