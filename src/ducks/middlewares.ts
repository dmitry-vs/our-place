import { Middleware } from '@reduxjs/toolkit';
import { LocalStorageKeys } from '../helpers/consts';

export const saveStateToLocalStorage: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    next(action);
    localStorage.setItem(LocalStorageKeys.State, JSON.stringify(getState()));
  };
