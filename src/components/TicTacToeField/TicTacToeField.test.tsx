import React from 'react';
import TicTacToeField from './TicTacToeField';
import { render, screen } from '@testing-library/react';
import { TicTacToeCellValues } from '../../helpers/consts';

describe('TicTacToeField', () => {
  const size = 3;
  const values: Array<TicTacToeCellValues> = [
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

  it('renders correct number of cells', () => {
    render(<TicTacToeField size={size} values={values} />);
    expect(screen.getAllByRole('tic-tac-toe-cell').length).toBe(size ** 2);
  });

  it('returns null if size and values are incompatible', () => {
    render(<TicTacToeField size={3} values={[]} />);
    expect(screen.queryByRole('tic-tac-toe-field')).toBeNull();
  });

  it('returns null if size is zero and values are empty', () => {
    render(<TicTacToeField size={0} values={[]} />);
    expect(screen.queryByRole('tic-tac-toe-field')).toBeNull();
  });

  it('returns null if size is negative', () => {
    render(<TicTacToeField size={-3} values={values} />);
    expect(screen.queryByRole('tic-tac-toe-field')).toBeNull();
  });

  it('returns null if size is NaN', () => {
    render(<TicTacToeField size={NaN} values={values} />);
    expect(screen.queryByRole('tic-tac-toe-field')).toBeNull();
  });

  it('returns null if size is Infinity', () => {
    render(<TicTacToeField size={Infinity} values={values} />);
    expect(screen.queryByRole('tic-tac-toe-field')).toBeNull();
  });
});
