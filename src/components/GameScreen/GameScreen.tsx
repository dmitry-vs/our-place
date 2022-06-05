import React, { FC } from 'react';
import TicTacToeGame from '../TicTacToeGame';

type GameScreenProps = {
  userName: string | null;
};

const GameScreen: FC<GameScreenProps> = ({ userName }) => {
  return (
    <div
      role="game-screen"
      className="container d-flex justify-content-center py-4"
    >
      {userName && <TicTacToeGame user={userName} />}
    </div>
  );
};

export default GameScreen;
