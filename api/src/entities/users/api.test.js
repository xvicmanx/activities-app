// User API tests

import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import sha1 from 'sha1';

import { getUrl } from '../../test/helpers';
import requester from '../../test/requester';
import User from './model';
import { getUserTokenInfo } from './service';


const getAuthHeaders = async (user) => {
  const { token } = await getUserTokenInfo(user);
  return { authorization: `Bearer ${token}` };
};

const mapItem = (x) => ({
  name: x.name,
  description: x.description,
  email: x.email,
});

describe('User API', () => {
  describe('Login', () => {
    const login = async (username, password) => {
      const payload = { username, password };
      return requester.post(getUrl('/users/login'), payload);
    };

    let user;

    const password = '123456';
    const email = 'email@test.com';

    before(async () => {
      user = await User.create({
        name: 'test user',
        email: 'email@test.com',
        description: 'Hello world',
        password: sha1(password),
      });
    });

    it('fails if the username is wrong', async () => {
      const response = await login('another-username@test.com', password);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: Invalid user or password');
    });

    it('fails if the password is wrong', async () => {
      const response = await login(email, 'another-pass');
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: Invalid user or password');
    });

    it('logins successfully if provided the correct username and password', async () => {
      const response = await login(email, password);
      expect(response.success).to.be.equal(true);
      expect(response.message).to.be.equal(undefined);
      expect(response.token).to.not.be.equal(undefined);
      expect(mapItem(response.user)).to.eql(mapItem(user));
      expect(response.user.password).to.be.equal(undefined);
    });
  });

  describe('Find an user by id', () => {
    const findById = async (id, logInUser) => {
      let headers = {};

      if (logInUser) {
        headers = await getAuthHeaders(logInUser);
      }

      return requester.get(getUrl(`/users/find/${id}`), headers);
    };

    let userId;
    let expectedUser;

    before(async () => {
      userId = 2;
      expectedUser = await User.findOne({ where: { id: userId } });
    });

    it('fails if the user is not logged in', async () => {
      const response = await findById(userId);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('returns item successfully if the user is logged in', async () => {
      const loggedInUser = await User.findOne();
      const response = await findById(userId, loggedInUser);
      expect(response.success).to.be.equal(true);
      expect(mapItem(response.user)).to.eql(mapItem(expectedUser));
    });
  });
});
