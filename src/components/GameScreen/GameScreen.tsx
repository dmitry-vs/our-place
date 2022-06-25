import React, { FC } from 'react';
import TicTacToeGame from '../TicTacToeGame';
import { useAppSelector } from '../../ducks/store';
import { selectUserName } from '../../ducks/auth-slice';

const GameScreen: FC = () => {
  const userName = useAppSelector(selectUserName);

  return (
    <div
      role="game-screen"
      className="container d-flex justify-content-center py-4"
    >
      {userName && <TicTacToeGame />}
    </div>
  );
};

export default GameScreen;
