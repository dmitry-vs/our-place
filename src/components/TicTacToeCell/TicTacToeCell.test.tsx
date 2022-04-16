import React from 'react';
import TicTacToeCell from './TicTacToeCell';
import { render, screen } from '@testing-library/react';
import { TicTacToeCellValues } from '../../helpers/consts';
import userEvent from '@testing-library/user-event';

describe('TicTacToeCell', () => {
  const role = 'tic-tac-toe-cell';

  it('renders empty div if value is empty', () => {
    render(<TicTacToeCell value={TicTacToeCellValues.Empty} />);
    expect(screen.getByRole(role)).toBeEmptyDOMElement();
  });

  it('renders cross sign if value is cross', () => {
    render(<TicTacToeCell value={TicTacToeCellValues.Cross} />);
    expect(screen.getByRole(role)).toHaveTextContent('X');
  });

  it('renders circle sign if value is circle', () => {
    render(<TicTacToeCell value={TicTacToeCellValues.Circle} />);
    expect(screen.getByRole(role)).toHaveTextContent('O');
  });

  it('calls handleClick function when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(
      <TicTacToeCell
        value={TicTacToeCellValues.Empty}
        handleClick={handleClick}
      />
    );

    const cell = screen.getByRole(role);
    await user.click(cell);

    expect(handleClick).toHaveBeenCalled();
  });
});
