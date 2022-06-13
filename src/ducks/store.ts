import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import gameReducer from './game';

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      game: gameReducer,
    },
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export default store;
