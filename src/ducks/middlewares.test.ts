import { createStore } from './store';
import { logout } from './auth';
import { getStateFromLocalStorage } from '../helpers/utils';

describe('saveStateToLocalStorage', () => {
  test('when action is dispatched then new state is saved correctly to localStorage', () => {
    const store = createStore();

    store.dispatch(logout());

    const savedState = getStateFromLocalStorage();
    const newState = store.getState();
    expect(savedState).toEqual(newState);
  });
});
