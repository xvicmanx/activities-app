import React from 'react';
import renderer from 'react-test-renderer';
import { faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'

import AppLayout from './';

const mockStore = configureMockStore()
const store = mockStore({
  Users: { data: {} },
});

describe('AppLayout', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <Router>
        <Provider store={store}>
          <AppLayout
            user={{ name: 'John', profileURL: 'test.com' }}
            navigationLinks={[
              {
                path: '/test',
                label: 'Test',
                icon: faHome,
              },
              {
                path: '/another',
                label: 'Another',
                icon: faUsers,
              },
            ]}
          >
            Test
          </AppLayout>
        </Provider>
      </Router>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});