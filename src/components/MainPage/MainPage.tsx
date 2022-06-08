import React, { Component } from 'react';
import TicTacToeGame from '../TicTacToeGame';
import { APP_NAME } from '../../helpers/consts';

type MainPageProps = {
  userName: string;
  handleLogout: () => void;
};

// TODO pattern (Container Component)
class MainPage extends Component<MainPageProps> {
  // TODO pattern (Layout Component)
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    const { userName, handleLogout } = this.props;

    return (
      <div role="main-page" className="h-100 d-flex flex-column">
        <header className="navbar navbar-dark bg-dark">
          <div role="main-page-brand" className="navbar-brand">
            <span className="font-monospace fw-bold ms-3">{APP_NAME}</span>
          </div>
          <div
            role="main-page-user-name"
            className="navbar-nav ms-auto text-white opacity-75"
          >
            {userName}
          </div>
          <div className="navbar-nav ms-auto">
            <div className="nav-item">
              <button
                role="main-page-logout-button"
                className="btn btn-outline-light btn-sm me-2"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          </div>
        </header>
        <main
          role="main-page-content"
          className="container flex-grow-1 py-4 d-flex justify-content-center"
        >
          <TicTacToeGame user={userName} />
        </main>
      </div>
    );
  }
}

export default MainPage;
