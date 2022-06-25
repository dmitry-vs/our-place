import { Middleware } from '@reduxjs/toolkit';
import { LocalStorageKeys } from '../helpers/consts';
import localforage from 'localforage';
import { RootState } from './store';

export const saveStateToLocalStorage: Middleware =
  ({ getState }) =>
  (next) =>
  async (action) => {
    next(action);
    await localforage.setItem<RootState>(LocalStorageKeys.State, getState());
  };
