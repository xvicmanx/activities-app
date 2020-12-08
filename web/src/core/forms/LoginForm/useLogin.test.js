import useLogin from './useLogin';

jest.mock('react-redux');
jest.mock('../../redux/LoginForm/LoginFormActions');
jest.mock('../../../entities/users/redux/UsersActions');

import { useSelector, useDispatch } from 'react-redux'; 
import { handleChange } from '../../redux/LoginForm/LoginFormActions';
import { loginUser } from '../../../entities/users/redux/UsersActions';

describe('useLogin', () => {
  it('works as expected', () => {
    const dispatch = jest.fn();

    useSelector.mockImplementation((f) => f({
      Users: {
        error: 'test-error',
        loading: true,
      },
      LoginForm: {
        email: 'test-email',
        password: 'test-pass',
      },
    }));
    useDispatch.mockImplementation(() => dispatch);

    const result = useLogin();
    
    expect(result.email).toEqual('test-email');
    expect(result.error).toEqual('test-error');
    expect(result.password).toEqual('test-pass');
    expect(result.loading).toEqual(true);

    const e = {
      preventDefault: jest.fn(),
    };
    result.onChange(e);
    result.onSubmit(e);

    expect(useSelector).toHaveBeenCalledTimes(2);
    expect(useDispatch).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(e);
    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(loginUser).toHaveBeenCalledWith(
      'test-email',
      'test-pass',
    );
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
