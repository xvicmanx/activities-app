import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DropDown from './DropDown';

Enzyme.configure({ adapter: new Adapter() })

describe('DropDown', () => {
  const items = [
    {
      id: 1,
      name: 'first',
    },
    {
      id: 2,
      name: 'second',
    },
  ];

  const props = {
    name: 'test-drop',
    value: 1,
    items,
    placeholder: 'Please select',
  };

  it('renders properly', () => {
    const component = renderer.create(<DropDown
      {...props}
      onChange={() => {}}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the onChange handler when dropdown value changes', () => {
    const onChangeMock = jest.fn();
    const event = {
      target: { name: 'test-drop', value: 2 },
    };
    const component = Enzyme.mount(<DropDown {...props} onChange={onChangeMock} />);
    component.find('.dropdown-item').at(4).simulate('click');
    expect(onChangeMock).toBeCalledWith(expect.objectContaining({
      target: event.target,
    }));
  });
});
