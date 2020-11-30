// User API tests

import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import sha1 from 'sha1';

import { getUrl } from '../../test/helpers';
import requester from '../../test/requester';
import User from './model';
import { getUserTokenInfo } from './service';
import createTestUser from './test-entity-factory';

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
    const login = async (email, password) => {
      const payload = { email, password };
      return requester.post(getUrl('/users/login'), payload);
    };

    let user;

    const password = '123456';
    const email = 'email@test.com';

    before(async () => {
      user = await User.create({
        name: 'test user',
        email,
        description: 'Hello world',
        password: sha1(password),
      });
    });

    it('fails if the email is wrong', async () => {
      const response = await login('anotheruser@test.com', password);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: Invalid email or password');
    });

    it('fails if the password is wrong', async () => {
      const response = await login(email, 'another-pass');
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: Invalid email or password');
    });

    it('logins successfully if provided the correct email and password', async () => {
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

  describe('Change Password', () => {
    const changePassword = async (previousPassword, password, confirmPassword, user = null) => {
      let headers = {};

      if (user) {
        headers = await getAuthHeaders(user);
      }

      const payload = {
        previousPassword,
        password,
        confirmPassword,
      };

      return requester.put(getUrl('/users/change-password'), payload, headers);
    };

    let user;

    before(async () => {
      user = await createTestUser();
    });

    it('fails if the user is not logged in', async () => {
      const response = await changePassword(
        '123456',
        'new-pass!',
        'new-pass!',
        null,
      );

      expect(response.success).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('fails if the previousPassword is missing', async () => {
      const response = await changePassword(
        '',
        'new-pass!',
        'new-pass!',
        user,
      );

      expect(response.success).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: The "previousPassword" param is missing');
    });

    it('fails if the password is missing', async () => {
      const response = await changePassword(
        '123456',
        '',
        'new-pass!',
        user,
      );

      expect(response.success).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: The "password" param is missing');
    });

    it('fails if the confirmPassword is missing', async () => {
      const response = await changePassword(
        '123456',
        'new-pass!',
        '',
        user,
      );

      expect(response.success).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: The "confirmPassword" param is missing');
    });

    it('fails if the password and confirmPassword do not match', async () => {
      const response = await changePassword(
        '123456',
        'new-pass!',
        'another-new-pass!',
        user,
      );

      expect(response.success).to.be.equal(undefined);
      expect(response.message).to.be.equal('Invalid parameters: The confirm and new password do not match');
    });

    it('changes the password successfully', async () => {
      const response = await changePassword(
        '123456',
        'new-pass!',
        'new-pass!',
        user,
      );
      expect(response.success).to.be.equal(true);
    });
  });

  describe('Update Information', () => {
    const updateInformation = async (data, user = null) => {
      let headers = {};

      if (user) {
        headers = await getAuthHeaders(user);
      }

      return requester.put(getUrl('/users/update-information'), data, headers);
    };

    let user;
    let data;

    before(async () => {
      user = await createTestUser();
      data = {
        description: 'Test description',
      };
    });

    it('fails if the user is not logged in', async () => {
      const response = await updateInformation(
        data,
        null,
      );

      expect(response.success).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('updates the information successfully', async () => {
      const response = await updateInformation(
        data,
        user,
      );
      expect(response.success).to.be.equal(true);
    });
  });
});
