import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth-slice';
import { saveStateToLocalStorage } from './middlewares';
import { gameReducer } from './game-slice';

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      game: gameReducer,
    },
    // TODO disable devTools for production if enabled by default
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saveStateToLocalStorage),
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export default store;
