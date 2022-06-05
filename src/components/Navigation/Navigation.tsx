import React, { FC } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Pages } from '../../helpers/routes';
import MainPage from '../MainPage';
import LoginPage from '../LoginPage';
import { useAuthContext } from '../AuthProvider';

const Navigation: FC = () => {
  const { userName, login, logout } = useAuthContext();
  const location = useLocation();
  const state = location.state as { from?: Location };

  const loginElement = userName ? (
    <Navigate to={state?.from || Pages.Main} replace />
  ) : (
    <LoginPage handleLogin={login} />
  );

  const mainElement = userName ? (
    <MainPage userName={userName} handleLogout={logout} />
  ) : (
    <Navigate to={Pages.Auth} state={{ from: location }} replace />
  );

  return (
    <Routes>
      <Route path={Pages.Auth} element={loginElement} />
      <Route path="*" element={mainElement} />
    </Routes>
  );
};

export default Navigation;
