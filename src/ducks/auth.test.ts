import { login, logout } from './auth';
import { createStore } from './store';
import { LocalStorageKeys } from '../helpers/consts';

describe('authReducer', () => {
  const testUserName = 'Test User';

  describe('LOGIN thunk action', () => {
    test('set correct user name after user login', () => {
      const store = createStore();

      store.dispatch(login(testUserName));

      const newState = store.getState();
      expect(newState.auth.userName).toBe(testUserName);
      expect(localStorage.getItem(LocalStorageKeys.UserName)).toBe(
        testUserName
      );
    });
  });

  describe('LOGOUT thunk action', () => {
    test('set user name to null after logout', () => {
      const store = createStore();
      store.dispatch(login(testUserName));

      store.dispatch(logout());

      const newState = store.getState();
      expect(newState.auth.userName).toBeNull();
      expect(localStorage.getItem(LocalStorageKeys.UserName)).toBeNull();
    });
  });
});
