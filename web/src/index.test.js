jest.mock('react-dom');

import ReactDOM from 'react-dom';

import './index.js';

describe('index', () => {
  it('renders the app', () => {
    expect(ReactDOM.render).toHaveBeenCalledTimes(1);
  });
});
