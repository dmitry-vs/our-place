import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LocalStorageKeys } from '../../helpers/consts';

export type AuthContextType = {
  userName: string | null;
  login: (_: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userName: null,
  login: () => undefined,
  logout: () => undefined,
});

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(() =>
    localStorage.getItem(LocalStorageKeys.UserName)
  );

  useEffect(() => {
    if (userName) localStorage.setItem(LocalStorageKeys.UserName, userName);
    else localStorage.removeItem(LocalStorageKeys.UserName);
  }, [userName]);

  const login = (userName: string) => setUserName(userName);
  const logout = () => setUserName(null);

  return (
    <AuthContext.Provider value={{ userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
