// @flow

import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CRUDTable, { CreateForm, Fields, Field } from 'react-crud-table';

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
  return (
    <CRUDTable
      caption="Miembros"
      items={members}
      key={`${communityId}${members.length}`}
    >
      <Fields>
        <Field
          name="id"
          label="Id"
          hideInCreateForm
          hideInUpdateForm
          sortable={false}
        />
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
        onSubmit={(item) => {
          toast.success('Miembro agregado de manera exitosa!');

          return dispatch(
            addMember(communityId, item.memberId, item.coordinates)
          );
        }}
        submitText="Agregar"
        validate={addMemberFormValidator(members)}
      />
    </CRUDTable>
  );
};

export default CommunityMembersTable;
