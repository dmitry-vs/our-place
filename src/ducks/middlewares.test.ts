import { createStore } from './store';
import { getStateFromLocalStorage } from '../helpers/utils';
import { logout } from './auth-slice';

describe('saveStateToLocalStorage', () => {
  test('when action is dispatched then new state is saved correctly to localStorage', async () => {
    const store = await createStore();

    store.dispatch(logout()); // action должен быть обработан middleware: saveStateToLocalStorage

    const savedState = await getStateFromLocalStorage();
    const newState = store.getState();
    expect(savedState).toEqual(newState);
  });
});
