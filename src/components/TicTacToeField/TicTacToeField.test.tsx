import React from 'react';
import TicTacToeField from './TicTacToeField';
import { render, screen } from '@testing-library/react';
import {
  TIC_TAC_TOE_CELL_CONTENT_MAPPING,
  TIC_TAC_TOE_FIELD_SIZE,
  TicTacToeCellValues,
  TicTacToeFieldValues,
} from '../../helpers/consts';

describe('TicTacToeField', () => {
  const values: TicTacToeFieldValues = [
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

  const handleCellClick = () => undefined;

  it('renders correct number of cells', () => {
    render(
      <TicTacToeField values={values} handleCellClick={handleCellClick} />
    );
    expect(screen.getAllByRole('tic-tac-toe-cell').length).toBe(
      TIC_TAC_TOE_FIELD_SIZE ** 2
    );
  });

  it('renders correct cell values', () => {
    render(
      <TicTacToeField values={values} handleCellClick={handleCellClick} />
    );
    const cells = screen.getAllByRole('tic-tac-toe-cell');
    cells.forEach((item, index) => {
      expect(item.textContent).toBe(
        TIC_TAC_TOE_CELL_CONTENT_MAPPING[values[index]]
      );
    });
  });
});
