import React, { Component, FormEvent } from 'react';
import TicTacToeGame from '../TicTacToeGame';
import ErrorBoundary from '../ErrorBoundary';
import { User } from '../../helpers/consts';
import { css } from '@emotion/css';
import axios from 'axios';

type AppState = {
  users: User[];
  currentUserIndex: number | '';
  fetchUsersInProgress: boolean;
  fetchUsersError: Error | null;
};

class App extends Component<{}, AppState> {
  state: AppState = {
    users: [],
    currentUserIndex: '',
    fetchUsersInProgress: false,
    fetchUsersError: null,
  };

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
    return this.fetchUsers();
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.handlePromiseRejection
    );
  }

  handlePromiseRejection = (e: PromiseRejectionEvent) => {
    // eslint-disable-next-line no-console
    console.log('Promise rejection error:', e);
  };

  async fetchUsers() {
    try {
      this.setState({ fetchUsersInProgress: true });
      const { data } = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      this.setState({ users: data });
    } catch (e) {
      this.setState({ fetchUsersError: e as Error });
    } finally {
      this.setState({ fetchUsersInProgress: false });
    }
  }

  getCurrentUser() {
    const { currentUserIndex, users } = this.state;
    if (currentUserIndex === '') return null;
    return users[currentUserIndex];
  }

  handleUserSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const newValueStr = e.currentTarget.value;
    this.setState({
      currentUserIndex: newValueStr !== '' ? Number(newValueStr) : '',
    });
  };

  renderUserSelection() {
    const { currentUserIndex, users, fetchUsersInProgress, fetchUsersError } =
      this.state;

    if (fetchUsersInProgress) return 'Загрузка пользователей...';
    if (fetchUsersError !== null) return 'Ошибка при загрузке пользователей';

    return (
      <>
        <label
          className={css`
            margin-right: 10px;
          `}
        >
          Выбор пользователя:
        </label>
        <select
          role="app-user-select"
          value={currentUserIndex}
          onChange={this.handleUserSelectChange}
        >
          <option role="app-user-select-option" value="">
            Не выбран
          </option>
          {users.map(({ id, name, email }, index) => (
            <option
              role="app-user-select-option"
              key={id}
              value={index}
            >{`${name} (${email})`}</option>
          ))}
        </select>
      </>
    );
  }

  render() {
    const user = this.getCurrentUser();

    return (
      <main role="app">
        <h1 role="app-heading-text">Приложение Our Place</h1>
        <div
          role="app-user-settings"
          className={css`
            margin-bottom: 25px;
          `}
        >
          {this.renderUserSelection()}
        </div>
        {user !== null ? (
          <ErrorBoundary>
            <TicTacToeGame user={user} />
          </ErrorBoundary>
        ) : (
          <div role="app-choose-user-text">
            Для работы с приложением необходимо выбрать пользователя
          </div>
        )}
      </main>
    );
  }
}

export default App;
