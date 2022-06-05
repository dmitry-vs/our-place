import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

export type AuthContextType = {
  userName: string;
  login: (_: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userName: '',
  login: () => undefined,
  logout: () => undefined,
});

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userName, setUserName] = useState('');

  const login = (userName: string) => setUserName(userName);
  const logout = () => setUserName('');

  return (
    <AuthContext.Provider value={{ userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
