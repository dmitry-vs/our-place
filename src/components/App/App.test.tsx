import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import axios, { AxiosResponse } from 'axios';
import { User } from '../../helpers/consts';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  const headingTextRole = 'app-heading-text';
  const userSettingsRole = 'app-user-settings';
  const userSelectRole = 'app-user-select';
  const userSelectOptionRole = 'app-user-select-option';
  const chooseUserTextRole = 'app-choose-user-text';
  const gameRole = 'tic-tac-toe-game';
  const user = userEvent.setup();

  const testUsers: User[] = [
    {
      id: 1,
      name: 'Test User Name 1',
      email: 'test-user-email-1@test.ru',
    },
    {
      id: 2,
      name: 'Test User Name 2',
      email: 'test-user-email-2@test.ru',
    },
  ];

  const testResponse: AxiosResponse = {
    data: testUsers,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('correct initial render with loading message', async () => {
    const promise = Promise.resolve(testResponse);
    mockedAxios.get.mockImplementationOnce(() => promise);
    render(<App />);

    expect(screen.getByRole(headingTextRole)).toBeInTheDocument();
    expect(screen.getByRole(userSettingsRole)).toHaveTextContent(
      'Загрузка пользователей...'
    );
    expect(screen.queryByRole(userSelectRole)).toBeNull();
    expect(screen.getByRole(chooseUserTextRole)).toHaveTextContent(
      'необходимо выбрать пользователя'
    );

    await act(async () => {
      promise;
    });
  });

  test('show users select when users list loaded successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce(testResponse);
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByRole(userSettingsRole)).toHaveTextContent(
      'Выбор пользователя:'
    );
    expect(screen.getByRole(userSelectRole)).toBeInTheDocument();
    const options = screen.getAllByRole(
      userSelectOptionRole
    ) as HTMLOptionElement[];
    expect(options[0].selected).toBe(true);
  });

  test('show error message when users list failed to load', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Request failed'));
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByRole(userSettingsRole)).toHaveTextContent(
      'Ошибка при загрузке пользователей'
    );
    expect(screen.queryByRole(userSelectRole)).toBeNull();
    expect(screen.getByRole(chooseUserTextRole)).toBeInTheDocument();
  });

  test('show game when some user is selected', async () => {
    mockedAxios.get.mockResolvedValueOnce(testResponse);
    await act(async () => {
      render(<App />);
    });
    const options = screen.getAllByRole(
      userSelectOptionRole
    ) as HTMLOptionElement[];
    await user.selectOptions(screen.getByRole(userSelectRole), options[1]);

    expect(options[1].selected).toBe(true);
    expect(screen.queryByRole(chooseUserTextRole)).toBeNull();
    expect(screen.getByRole(gameRole)).toBeInTheDocument();
  });
});
