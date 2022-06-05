import React, { FC } from 'react';
import TicTacToeGame from '../TicTacToeGame';

const GameScreen: FC = () => (
  <div className="container d-flex justify-content-center py-4">
    <TicTacToeGame user={''} />
  </div>
);

export default GameScreen;
