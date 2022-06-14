import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import gameReducer from './game';
import { saveStateToLocalStorage } from './middlewares';

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      game: gameReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(saveStateToLocalStorage),
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export default store;
