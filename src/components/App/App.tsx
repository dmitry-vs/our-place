import React from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';
import TicTacToeField from '../TicTacToeField';

const FIELD_SIZE = 3;
const FIELD_DATA: Array<TicTacToeCellValues> = [
  TicTacToeCellValues.Empty,
  TicTacToeCellValues.Cross,
  TicTacToeCellValues.Empty,
  TicTacToeCellValues.Empty,
  TicTacToeCellValues.Circle,
  TicTacToeCellValues.Empty,
  TicTacToeCellValues.Empty,
  TicTacToeCellValues.Empty,
  TicTacToeCellValues.Cross,
];

const App = () => (
  <main>
    <h1>Игра Крестики-Нолики</h1>
    <TicTacToeField size={FIELD_SIZE} values={FIELD_DATA} />
  </main>
);

export default App;
