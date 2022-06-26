import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Pages } from '../routes';
import LoginPage from '../LoginPage';
import { selectUserName } from '../../auth/auth-slice';
import MainPage from '../MainPage';
import { useAppSelector } from '../store';

const App: FC = () => {
  const userName = useAppSelector(selectUserName);
  const location = useLocation();
  const routingState = location.state as { from?: Location };

  useEffect(() => {
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  const handlePromiseRejection = (e: PromiseRejectionEvent) => {
    // eslint-disable-next-line no-console
    console.log('Promise rejection error:', e);
  };

  const loginElement = userName ? (
    <Navigate to={routingState?.from || Pages.Main} replace />
  ) : (
    <LoginPage />
  );

  const mainElement = userName ? (
    <MainPage />
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

export default App;
