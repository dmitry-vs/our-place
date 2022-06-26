import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../auth/auth-slice';
import { gameReducer } from '../game/game-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { localStorageSaga } from './sagas';

export const createAppReducer = () => {
  return combineReducers({
    auth: authReducer,
    game: gameReducer,
  });
};

const reducer = createAppReducer();
export type RootState = ReturnType<typeof reducer>;

export const createAppStore = (initialState?: Partial<RootState>) => {
  const sagaMiddleWare = createSagaMiddleware();
  const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [sagaMiddleWare],
    devTools: process.env.NODE_ENV !== 'production',
  });
  sagaMiddleWare.run(localStorageSaga);
  return store;
};

export type AppDispatch = ReturnType<typeof createAppStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
