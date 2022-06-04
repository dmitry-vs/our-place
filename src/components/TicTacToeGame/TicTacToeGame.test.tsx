import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  TicTacToeCellValues,
  TicTacToeFieldValues,
  ValidationErrors,
} from '../../helpers/consts';
import TicTacToeGame from './TicTacToeGame';
import userEvent from '@testing-library/user-event';
import { findTicTacToeEmptyCellIndex } from '../../helpers/utils';

describe('TicTacToeGame', () => {
  const gameRole = 'tic-tac-toe-game';
  const fieldRole = 'tic-tac-toe-field';
  const symbolSelectRole = 'tic-tac-toe-game-symbol-select';
  const symbolSelectOptionRole = 'tic-tac-toe-game-symbol-select-option';
  const startStopButtonRole = 'tic-tac-toe-game-start-stop-button';
  const statusInfoRole = 'tic-tac-toe-game-status-info';
  const playerInfoRole = 'tic-tac-toe-game-player-info';
  const symbolInfoRole = 'tic-tac-toc-game-symbol-info';
  const resultInfoRole = 'tic-tac-toe-game-result-info';
  const cellRole = 'tic-tac-toe-cell';
  const cellSizeInputRole = 'tic-tac-toe-game-cell-size-input';
  const invalidInputAlertRole = 'tic-tac-toe-game-invalid-input-alert';
  const user = userEvent.setup();

  const testUser = 'Test User Name';

  beforeEach(() => {
    render(<TicTacToeGame user={testUser} />);
  });

  test('renders TicTacToeGame with correct elements by default', () => {
    expect(screen.getByRole(gameRole)).toBeInTheDocument();
    expect(screen.getByRole(symbolSelectRole)).toBeInTheDocument();
    expect(screen.getByRole(symbolSelectRole)).toBeEnabled();
    const options = screen.getAllByRole(
      symbolSelectOptionRole
    ) as HTMLOptionElement[];
    expect(options[0].selected).toBe(true);
    expect(options[1].selected).toBe(false);
    expect(screen.getByRole(startStopButtonRole)).toHaveTextContent(
      'Начать игру'
    );
    expect(screen.getByRole(fieldRole)).toHaveClass('fieldInactive');
    expect(screen.getByRole(statusInfoRole)).toHaveTextContent(
      'Игра не начата'
    );
    expect(screen.getByRole(playerInfoRole)).toHaveTextContent(testUser);
    expect(screen.getByRole(symbolInfoRole)).toHaveTextContent('Крестики');
    expect(screen.queryByRole(resultInfoRole)).toBeNull();
  });

  test('correct behaviour on symbol change', async () => {
    const options = screen.getAllByRole(
      symbolSelectOptionRole
    ) as HTMLOptionElement[];
    await user.selectOptions(screen.getByRole(symbolSelectRole), options[1]);
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(screen.getByRole(symbolInfoRole)).toHaveTextContent('Нолики');
  });

  test('correct behaviour on start button click', async () => {
    await user.click(screen.getByRole(startStopButtonRole));
    expect(screen.getByRole(symbolSelectRole)).toBeDisabled();
    expect(screen.getByRole(startStopButtonRole)).toHaveTextContent(
      'Завершить игру'
    );
    expect(screen.getByRole(fieldRole)).toHaveClass('fieldActive');
    expect(screen.getByRole(statusInfoRole)).toHaveTextContent('Игра начата');
    expect(screen.queryByRole(resultInfoRole)).toBeNull();
  });

  test('correct behaviour on stop button click', async () => {
    const startStopButton = screen.getByRole(startStopButtonRole);
    await user.click(startStopButton);
    await user.click(startStopButton);
    expect(screen.getByRole(symbolSelectRole)).toBeEnabled();
    expect(startStopButton).toHaveTextContent('Начать игру');
    expect(screen.getByRole(fieldRole)).toHaveClass('fieldInactive');
    expect(screen.getByRole(statusInfoRole)).toHaveTextContent(
      'Игра не начата'
    );
    expect(screen.queryByRole(resultInfoRole)).toBeNull();
  });

  test('correct behaviour on empty cell click', async () => {
    await user.click(screen.getByRole(startStopButtonRole));
    const cells = screen.getAllByRole(cellRole);
    await user.click(cells[0]);
    expect(cells[0].querySelector('img[alt="Крестик"]')).toBeTruthy();
    expect(
      cells.find((item) => !!item.querySelector('img[alt="Нолик"]'))
    ).toBeTruthy();
  });

  test('correct behaviour on non-empty cell click', async () => {
    await user.click(screen.getByRole(startStopButtonRole));
    const cells = screen.getAllByRole(cellRole);
    await user.click(cells[4]);
    await user.click(cells[4]);
    expect(cells[4].querySelector(`img[alt="Крестик"]`)).toBeTruthy();
    expect(
      cells.find((item) => !!item.querySelector('img[alt="Нолик"]'))
    ).toBeTruthy();
  });

  test('correct behaviour if user plays game to end', async () => {
    await user.click(screen.getByRole(startStopButtonRole));

    const makeUserTurn = async () => {
      const cells = screen.getAllByRole(cellRole);
      const currentFieldValues = cells.map((item) => {
        const img = item.querySelector('img');
        if (!img) return TicTacToeCellValues.Empty;
        const alt = img.getAttribute('alt');
        return alt === 'Крестик'
          ? TicTacToeCellValues.Cross
          : TicTacToeCellValues.Circle;
      }) as TicTacToeFieldValues;
      const emptyCellIndex = findTicTacToeEmptyCellIndex(currentFieldValues);
      if (emptyCellIndex !== null) await user.click(cells[emptyCellIndex]);
    };

    // 5 ходов всегда достаточно для завершения игры
    for (let i = 0; i < 5; i++) await makeUserTurn();

    expect(screen.getByRole(symbolSelectRole)).toBeEnabled();
    expect(screen.getByRole(startStopButtonRole)).toHaveTextContent(
      'Начать игру'
    );
    expect(screen.getByRole(fieldRole)).toHaveClass('fieldInactive');
    expect(screen.getByRole(statusInfoRole)).toHaveTextContent('Игра окончена');
    const resultInfo = screen.getByRole(resultInfoRole);
    expect(resultInfo).toBeInTheDocument();
    expect(
      ['Пользователь победил', 'Пользователь проиграл', 'Ничья'].includes(
        resultInfo.textContent as string
      )
    ).toBe(true);
  });

  test('cell size input has correct default value', () => {
    const cellSizeInput = screen.getByRole(cellSizeInputRole);
    expect(cellSizeInput).toHaveValue(TIC_TAC_TOE_CELL_DEFAULT_SIZE.toString());
  });

  test('show game field when cell size value is valid', async () => {
    const cellSizeInput = screen.getByRole(cellSizeInputRole);
    await user.clear(cellSizeInput);
    await user.type(cellSizeInput, '100');
    expect(screen.getByRole(fieldRole)).toBeInTheDocument();
    expect(screen.queryByRole(invalidInputAlertRole)).toBeNull();
  });

  test('show alert with error message when cell size value is invalid', async () => {
    const cellSizeInput = screen.getByRole(cellSizeInputRole);

    // try empty value
    await user.clear(cellSizeInput);
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(screen.getByRole(invalidInputAlertRole)).toHaveTextContent(
      ValidationErrors.Required
    );

    // try value out of range
    await user.type(cellSizeInput, '200');
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(screen.getByRole(invalidInputAlertRole)).toHaveTextContent(
      ValidationErrors.OutOfRange
    );

    // try non-numeric value
    await user.clear(cellSizeInput);
    await user.type(cellSizeInput, 'test');
    expect(screen.queryByRole(fieldRole)).toBeNull();
    expect(screen.getByRole(invalidInputAlertRole)).toHaveTextContent(
      ValidationErrors.NumberExpected
    );
  });
});
