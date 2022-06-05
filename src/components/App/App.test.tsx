import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  const loginPageRole = 'login-page';
  const mainPageRole = 'main-page';
  const userNameInputRole = 'login-page-user-name-input';
  const loginButtonRole = 'login-page-submit-button';
  const userNameRole = 'main-page-user-name';
  const logoutButtonRole = 'main-page-logout-button';
  const user = userEvent.setup();
  const testUserName = 'Test User';

  beforeEach(() => {
    render(<App />, { wrapper: BrowserRouter });
  });

  test('show login page on initial render', () => {
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameInputRole)).toBeInTheDocument();
    expect(screen.getByRole(loginButtonRole)).toBeInTheDocument();
    expect(screen.queryByRole(mainPageRole)).toBeNull();
  });

  test('show main page after login', async () => {
    const input = screen.getByRole(userNameInputRole);
    await user.type(input, testUserName);
    await user.click(screen.getByRole(loginButtonRole));

    expect(screen.getByRole(mainPageRole)).toBeInTheDocument();
    expect(screen.getByRole(userNameRole)).toHaveTextContent(testUserName);
    screen.debug();
  });

  test('show login page after logout', async () => {
    // login
    const input = screen.getByRole(userNameInputRole);
    await user.type(input, testUserName);
    await user.click(screen.getByRole(loginButtonRole));
    // logout
    await user.click(screen.getByRole(logoutButtonRole));

    expect(screen.queryByRole(mainPageRole)).toBeNull();
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
  });

  test('cannot login with empty or whitespace user name', async () => {
    const input = screen.getByRole(userNameInputRole);
    const loginButton = screen.getByRole(loginButtonRole);

    // try empty name
    expect(loginButton).toBeDisabled();
    await user.click(loginButton);
    expect(screen.queryByRole(mainPageRole)).toBeNull();

    // try whitespace name
    await user.type(input, ' ');
    expect(loginButton).toBeDisabled();
    await user.click(loginButton);
    expect(screen.queryByRole(mainPageRole)).toBeNull();
  });
});
