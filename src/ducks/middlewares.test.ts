import { createStore } from './store';
import { logout } from './auth';
import { LocalStorageKeys } from '../helpers/consts';

describe('saveStateToLocalStorage', () => {
  test('when action is dispatched then new state is saved correctly to localStorage', () => {
    const store = createStore();

    store.dispatch(logout());

    const savedState = JSON.parse(
      localStorage.getItem(LocalStorageKeys.State) as string
    );
    const newState = store.getState();
    expect(savedState).toEqual(newState);
  });
});
