// @flow

import React from 'react';
import { useDispatch } from 'react-redux';
import CRUDTable, { CreateForm, Fields, Field } from 'react-crud-table';

import { readTokenFromCookie } from '../../../users/redux/UsersActions';
import { addMember } from '../../redux/CommunitiesActions';
import { CoordinatesSelectRenderer, MembersSelectRenderer } from './renderers';
import { addMemberFormValidator } from './validators';
import { coordinatesTableValueResolver } from './helpers';


type Props = {
  communityId: number,
  members: Array<{ id: number | string }>,
};

const CommunityMembersTable = ({
  communityId,
  members,
}: Props): React$Element<any> => {
  const dispatch = useDispatch();
  const token = readTokenFromCookie();
  return (
    <CRUDTable caption="Miembros" items={members}>
      <Fields>
        <Field
          name="memberId"
          label="Miembro"
          hideFromTable
          render={MembersSelectRenderer}
          sortable={false}
        />
        <Field
          name="name"
          label="Nombre"
          placeholder="Nombre"
          hideInCreateForm
          sortable={false}
        />
        <Field
          name="coordinates"
          label="Coordinador?"
          tableValueResolver={coordinatesTableValueResolver}
          render={CoordinatesSelectRenderer}
          sortable={false}
        />
      </Fields>
      <CreateForm
        title="Agregar miembro"
        message="Agregar miembro"
        trigger="Agregar miembro"
        onSubmit={(item) =>
          dispatch(
            addMember(token, communityId, item.memberId, item.coordinates)
          )
        }
        submitText="Agregar"
        validate={addMemberFormValidator}
      />
    </CRUDTable>
  );
};

export default CommunityMembersTable;
