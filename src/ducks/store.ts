import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth-slice';
import { saveStateToLocalStorage } from './middlewares';
import { gameReducer } from './game-slice';
import { getStateFromLocalStorage } from '../helpers/utils';

const reducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const createStore = async () => {
  const initialState = await getStateFromLocalStorage();

  return configureStore({
    reducer,
    preloadedState: initialState || undefined,
    // TODO disable devTools for production if enabled by default
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saveStateToLocalStorage),
  });
};
