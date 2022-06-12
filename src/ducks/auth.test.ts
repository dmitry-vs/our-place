import authReducer, { AuthState, login, logout } from './auth';

describe('authReducer', () => {
  const testUserName = 'Test User';

  describe('LOGIN action', () => {
    test('set correct user name after user login', () => {
      const state: AuthState = { userName: null };
      const newState = authReducer(state, login(testUserName));

      expect(newState.userName).toBe(testUserName);
    });
  });

  describe('LOGOUT action', () => {
    test('set user name to null after logout', () => {
      const state: AuthState = { userName: testUserName };
      const newState = authReducer(state, logout());

      expect(newState.userName).toBeNull();
    });
  });
});
