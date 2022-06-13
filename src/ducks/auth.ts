import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { LocalStorageKeys } from '../helpers/consts';

export type AuthState = {
  userName: string | null;
};

const authInitialState = {
  userName: localStorage.getItem(LocalStorageKeys.UserName),
};

export default function authReducer(
  state: AuthState = authInitialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case LOGIN: {
      return { ...state, userName: action.payload };
    }
    case LOGOUT: {
      return { ...state, userName: null };
    }
    default:
      return state;
  }
}

// actions
const LOGIN = 'our-place/auth/LOGIN';
const LOGOUT = 'our-place/auth/LOGOUT';

type LoginAction = {
  type: typeof LOGIN;
  payload: string;
};

type LogoutAction = {
  type: typeof LOGOUT;
};

type AuthAction = LoginAction | LogoutAction;

// thunks
export function login(
  userName: string
): ThunkAction<void, RootState, undefined, LoginAction> {
  return (dispatch) => {
    localStorage.setItem(LocalStorageKeys.UserName, userName);
    dispatch({ type: LOGIN, payload: userName });
  };
}

export function logout(): ThunkAction<
  void,
  RootState,
  undefined,
  LogoutAction
> {
  return (dispatch) => {
    localStorage.removeItem(LocalStorageKeys.UserName);
    dispatch({ type: LOGOUT });
  };
}
