import authReducer, { AuthAction, AuthState, login, logout } from './auth';

describe('authReducer', () => {
  const testUserName = 'Test User';

  test('given user is not logged in when login then correct user name and new state', () => {
    const state: AuthState = { userName: null };

    const newState = authReducer(state, login(testUserName));

    expect(newState.userName).toBe(testUserName);
    expect(newState).not.toBe(state);
  });

  test('given user is logged in when logout then user name is null and new state', () => {
    const state: AuthState = { userName: testUserName };

    const newState = authReducer(state, logout());

    expect(newState.userName).toBeNull();
    expect(newState).not.toBe(state);
  });

  test('when action type is unknown then state remains the same', () => {
    const state: AuthState = { userName: null };

    const newState = authReducer(state, {} as AuthAction);

    expect(newState).toBe(state);
  });
});
