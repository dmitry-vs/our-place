import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStateFromLocalStorage } from '../helpers/utils';

type AuthState = {
  userName: string | null;
};

export const AUTH_INITIAL_STATE: AuthState = {
  userName: null,
};

const initialState: AuthState =
  getStateFromLocalStorage()?.auth || AUTH_INITIAL_STATE;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<string>) => {
      state.userName = payload;
    },
    logout: (state) => {
      state.userName = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
