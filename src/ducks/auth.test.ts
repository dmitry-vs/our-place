import authReducer, {
  AuthAction,
  AUTH_INITIAL_STATE,
  login,
  logout,
} from './auth';

describe('authReducer', () => {
  const testUserName = 'Test User';

  describe('LOGIN action', () => {
    test('set correct user name', () => {
      const newState = authReducer(AUTH_INITIAL_STATE, login(testUserName));

      expect(newState.userName).toBe(testUserName);
    });
  });

  describe('LOGOUT action', () => {
    test('set user name to null', () => {
      const newState = authReducer({ userName: testUserName }, logout());

      expect(newState.userName).toBeNull();
    });
  });

  test('when action is unknown then state is unchanged', () => {
    const newState = authReducer(AUTH_INITIAL_STATE, {} as AuthAction);

    expect(newState).toBe(AUTH_INITIAL_STATE);
  });
});
