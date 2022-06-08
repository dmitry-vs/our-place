import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthProvider';
import { LocalStorageKeys } from '../../helpers/consts';

describe('Navigation', () => {
  const loginPageRole = 'login-page';
  const mainPageRole = 'main-page';
  const userNameInputRole = 'login-page-user-name-input';
  const loginButtonRole = 'login-page-submit-button';
  const userNameRole = 'main-page-user-name';
  const logoutButtonRole = 'main-page-logout-button';
  const user = userEvent.setup();
  const testUserName = 'Test User';

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  const customRender = () =>
    render(
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </BrowserRouter>
    );

  test('initial render, show login page', () => {
    customRender();
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameInputRole)).toBeInTheDocument();
    expect(screen.getByRole(loginButtonRole)).toBeInTheDocument();
    expect(screen.queryByRole(mainPageRole)).toBeNull();
  });

  test('login, then show main page and user name is in local storage', async () => {
    customRender();
    await user.type(screen.getByRole(userNameInputRole), testUserName);
    await user.click(screen.getByRole(loginButtonRole));

    expect(screen.getByRole(mainPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameRole)).toHaveTextContent(testUserName);
    expect(localStorage.getItem(LocalStorageKeys.UserName)).toBe(testUserName);
  });

  test('userName in local storage, show main page', () => {
    localStorage.setItem(LocalStorageKeys.UserName, testUserName);
    customRender();

    expect(screen.getByRole(mainPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameRole)).toHaveTextContent(testUserName);
  });

  test('login and logout, then show login page and local storage clear', async () => {
    // login
    customRender();
    await user.type(screen.getByRole(userNameInputRole), testUserName);
    await user.click(screen.getByRole(loginButtonRole));
    // logout
    await user.click(screen.getByRole(logoutButtonRole));

    expect(screen.queryByRole(mainPageRole)).toBeNull();
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
    expect(localStorage.getItem(LocalStorageKeys.UserName)).toBeNull();
  });

  test('login and rerender, then show main page (user name persists in local storage)', async () => {
    // login
    customRender();
    await user.type(screen.getByRole(userNameInputRole), testUserName);
    await user.click(screen.getByRole(loginButtonRole));
    // rerender
    cleanup();
    customRender();

    expect(screen.getByRole(mainPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameRole)).toHaveTextContent(testUserName);
  });

  test('login and logout and rerender, then show login page', async () => {
    // login
    customRender();
    await user.type(screen.getByRole(userNameInputRole), testUserName);
    await user.click(screen.getByRole(loginButtonRole));
    // logout
    await user.click(screen.getByRole(logoutButtonRole));
    // rerender
    cleanup();
    customRender();

    expect(screen.queryByRole(mainPageRole)).toBeNull();
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
    expect(localStorage.getItem(LocalStorageKeys.UserName)).toBeNull();
  });
});
