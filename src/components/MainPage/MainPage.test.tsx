import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from './MainPage';
import { APP_NAME } from '../../helpers/consts';
import { BrowserRouter } from 'react-router-dom';

describe('MainPage', () => {
  const user = userEvent.setup();
  const testUserName = 'TestUserName';
  let handleLogoutMock: jest.Mock;
  let page: HTMLElement,
    brand: HTMLElement,
    userName: HTMLElement,
    logoutButton: HTMLElement,
    content: HTMLElement;

  beforeEach(() => {
    handleLogoutMock = jest.fn();
    render(
      <MainPage userName={testUserName} handleLogout={handleLogoutMock} />,
      { wrapper: BrowserRouter }
    );
    page = screen.getByRole('main-page');
    brand = screen.getByRole('main-page-brand');
    userName = screen.getByRole('main-page-user-name');
    logoutButton = screen.getByRole('main-page-logout-button');
    content = screen.getByRole('main-page-content');
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  test('correct initial render and logout button enabled', () => {
    expect(page).toBeInTheDocument();
    expect(brand).toHaveTextContent(APP_NAME);
    expect(userName).toHaveTextContent(testUserName);
    expect(logoutButton).toBeEnabled();
    expect(content).toBeInTheDocument();
  });

  test('logout callback called after click on logout button', async () => {
    await user.click(logoutButton);
    expect(handleLogoutMock).toBeCalledTimes(1);
  });
});
