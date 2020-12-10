jest.mock('react-snapshot');

import { render } from 'react-snapshot';

import './index.js';

describe('index', () => {
  it('renders the app', () => {
    expect(render).toHaveBeenCalledTimes(1);
  });
});
