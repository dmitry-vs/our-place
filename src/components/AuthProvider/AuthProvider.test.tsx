import React, { FC } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuthContext } from './AuthProvider';
import { LocalStorageKeys } from '../../helpers/consts';

describe('AuthProvider', () => {
  const user = userEvent.setup();
  const testUserName = 'Test User Name';
  const userNameRole = 'user-name';
  const loginButtonRole = 'login';
  const logoutButtonRole = 'logout';

  const AuthConsumer: FC = () => {
    const { userName, login, logout } = useAuthContext();
    return (
      <>
        <div role={userNameRole}>{userName}</div>
        <button
          role={loginButtonRole}
          onClick={() => login(testUserName)}
        ></button>
        <button role={logoutButtonRole} onClick={logout} />
      </>
    );
  };

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  const customRender = () =>
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

  test('initial render and no userName in local storage, then userName is null', () => {
    customRender();
    expect(screen.getByRole(userNameRole)).toBeEmptyDOMElement();
  });

  test('userName correctly loads from local storage', () => {
    localStorage.setItem(LocalStorageKeys.UserName, testUserName);
    customRender();
    expect(screen.getByRole(userNameRole)).toHaveTextContent(testUserName);
  });

  test('login, then user name is correct and saved to local storage', async () => {
    customRender();
    await user.click(screen.getByRole(loginButtonRole));
    expect(screen.getByRole(userNameRole)).toHaveTextContent(testUserName);
    expect(localStorage.getItem(LocalStorageKeys.UserName)).toBe(testUserName);
  });

  test('login and logout, then user name is null and local storage is cleared', async () => {
    customRender();
    await user.click(screen.getByRole(loginButtonRole));
    await user.click(screen.getByRole(logoutButtonRole));
    expect(screen.getByRole(userNameRole)).toBeEmptyDOMElement();
    expect(localStorage.getItem(LocalStorageKeys.UserName)).toBeNull();
  });
});
