import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';

import CommunityMembersTable from './';

jest.mock('react-redux');
jest.mock('react-toastify');
jest.mock('../../redux/CommunitiesActions');
jest.mock('./renderers', () => ({
  CoordinatesSelectRenderer: () => 'CoordinatesSelectRenderer',
  MembersSelectRenderer: () => 'MembersSelectRenderer',
}));

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addMember } from '../../redux/CommunitiesActions';

Enzyme.configure({ adapter: new Adapter() });

describe('CommunityMembersTable', () => {
  const members = [
    {
      id: 1,
      name: 'Test member 1',
    },
    {
      id: 2,
      name: 'Test member 2',
    },
  ];
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockClear().mockImplementation(() => dispatch);
    addMember.mockClear().mockImplementation(() => ({ addMemberResult: true }));
    dispatch.mockClear();
  });

  it('renders properly', async () => {
    const result = Enzyme.mount(
      <CommunityMembersTable members={members} communityId={1} />
    );
    expect(result.find('CRUDTable').props()).toMatchSnapshot();
  });

  it('adds member on create form submit', async () => {
    const result = Enzyme.shallow(
      <CommunityMembersTable members={members} communityId={1} />
    );

    // Access create form
    result.childAt(1).props().onSubmit({
      memberId: 3,
      coordinates: true,
    });
    result.update();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ addMemberResult: true });

    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      'Miembro agregado de manera exitosa!'
    );
  });
});
