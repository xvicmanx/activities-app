import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import useTableItemsFetch from './useTableItemsFetch';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line react/prop-types
const TestCmp = ({ cb }) => {
  const result = useTableItemsFetch(cb);
  return <div>{JSON.stringify(result)}</div>;
};

describe('useTableItemsFetch', () => {
  it('works as expected', () => {
    const items = [
      {
        id: 1,
        name: 'test',
      },
    ];
    const promiseResult = { items, total: items.total };
    const cb = jest.fn(() => Promise.resolve(promiseResult));

    jest.spyOn(React, 'useEffect');
    jest.spyOn(React, 'useState');

    const component = Enzyme.mount(<TestCmp cb={cb} />);

    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(React.useState).toHaveBeenCalledTimes(1);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(component.html()).toMatchSnapshot();
  });
});
