import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth-slice';
import { saveStateToLocalStorage } from './middlewares';
import { gameReducer } from './game-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const createAppStore = (initialState?: Partial<RootState>) => {
  return configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saveStateToLocalStorage),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppDispatch = ReturnType<typeof createAppStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
