export type AuthState = {
  userName: string | null;
};

export default function authReducer(
  state: AuthState,
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

// action types
type LoginAction = {
  type: typeof LOGIN;
  payload: string;
};

type LogoutAction = {
  type: typeof LOGOUT;
};

export type AuthAction = LoginAction | LogoutAction;

// action creators
export const login = (userName: string): LoginAction => ({
  type: LOGIN,
  payload: userName,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});
