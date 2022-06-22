import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  userName: string | null;
};

export const AUTH_INITIAL_STATE: AuthState = {
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_INITIAL_STATE,
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
