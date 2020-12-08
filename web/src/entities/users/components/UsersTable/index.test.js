import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { DEFAULT_OPTIONS } from '../../../../core/helpers';
import UsersTable from './';
import Controller from './controller';

jest.mock('../../../../core/useTableItemsFetch');

import useTableItemsFetch from '../../../../core/useTableItemsFetch';

Enzyme.configure({ adapter: new Adapter() });

describe('UsersTable', () => {
  const users = [
    {
      id: 1,
      name: 'Test User 1',
    },
    {
      id: 2,
      name: 'Test User 2',
    },
  ];
  let itemsResolver;

  beforeEach(() => {
    useTableItemsFetch.mockClear()
      .mockImplementation(() => ({
        total: users.length,
        items: users,
      }));
  });

  it('renders properly', async () => {
    const result = Enzyme.mount(<Router><UsersTable /></Router>);

    expect(useTableItemsFetch).toHaveBeenCalledTimes(1);
    expect(useTableItemsFetch).toHaveBeenCalledWith(
      Controller.fetchItems,
      DEFAULT_OPTIONS,
    );
    expect(result.find('CRUDTable').props()).toMatchSnapshot();
  });

  it('updates the options on change', async () => {
    const result = Enzyme.mount(<Router><UsersTable /></Router>);
    const data = {
      sort: {
        field: 'name',
        direction: 'descending', 
      },
      queryRules: [],
      pagination: {
        activePage: 2,
        itemsPerPage: 15,
      },
    };

    result.find('CRUDTable').prop('onChange')(data);
    result.update();
    expect(result.find('CRUDTable').props()).toMatchSnapshot();
  });
});
