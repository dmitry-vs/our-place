import { select, takeEvery } from 'redux-saga/effects';
import { RootState } from './store';
import localforage from 'localforage';
import { LocalStorageKeys } from '../helpers/consts';

export function* localStorageSaga() {
  yield takeEvery('*', function* () {
    const state: RootState = yield select();
    localforage.setItem<RootState>(LocalStorageKeys.State, state);
  });
}
