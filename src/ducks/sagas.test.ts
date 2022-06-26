import { expectSaga } from 'redux-saga-test-plan';
import { createAppReducer } from './store';
import { login } from './auth-slice';
import { localStorageSaga } from './sagas';
import { getStateFromLocalStorage } from '../helpers/utils';
import localforage from 'localforage';

describe('localStorageSaga', () => {
  const reducer = createAppReducer();
  const testUserName = 'Test User Name';

  afterEach(async () => {
    await localforage.clear();
  });

  test('when action is dispatched, then sage saves state to local storage correctly', async () => {
    await expectSaga(localStorageSaga)
      .withReducer(reducer)
      .dispatch(login(testUserName))
      .run();

    const savedState = await getStateFromLocalStorage();
    expect(savedState?.auth.userName).toBe(testUserName);
  });

  test('when action is not dispatched, then state is not saved to local storage', async () => {
    await expectSaga(localStorageSaga).withReducer(reducer).run();

    const savedState = await getStateFromLocalStorage();
    expect(savedState).toBeNull();
  });
});
