import { USERS } from '../fakeDB/users';

const TIME_TO_RESPOND = 2000;

class AuthService {
  constructor() {
    this.users = USERS;

    this.loggedStatus = {
      status: false,
      id: null,
    };
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, TIME_TO_RESPOND);
    });
  }

  isUserLogged() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { status, id } = this.loggedStatus;

        if (status) {
          const user = this.users.find((user) => user.id === id);

          resolve({
            status,
            data: user,
          });
        } else {
          resolve({
            status,
            data: null,
          });
        }
      }, TIME_TO_RESPOND);
    });
  }

  loginUser(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((user) => {
          return user.email === email && user.password === password;
        });

        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      }, TIME_TO_RESPOND);
    });
  }
}

export const Auth = new AuthService();
