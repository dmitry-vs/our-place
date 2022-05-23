import React, { FC } from 'react';
import TicTacToeGame from '../TicTacToeGame';

type MainPageProps = {
  userName: string;
  handleLogout: () => void;
};

const MainPage: FC<MainPageProps> = ({ userName, handleLogout }) => {
  return (
    <div className="h-100 d-flex flex-column">
      <header className="navbar navbar-dark bg-dark">
        <div className="navbar-brand">
          <span className="font-monospace fw-bold ms-3">Our Place</span>
        </div>
        <div className="navbar-nav ms-auto text-white opacity-75">
          {userName}
        </div>
        <div className="navbar-nav ms-auto">
          <div className="nav-item">
            <button
              className="btn btn-outline-light btn-sm me-2"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>
      <main className="container flex-grow-1 py-5 d-flex justify-content-center">
        <TicTacToeGame user={userName} />
      </main>
    </div>
  );
};

export default MainPage;
