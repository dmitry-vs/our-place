import React, { Component, FormEvent } from 'react';
import {
  TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  TIC_TAC_TOE_CELL_MAX_SIZE,
  TIC_TAC_TOE_CELL_MIN_SIZE,
  TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  TicTacToeGameStatuses,
  TicTacToeGameSymbols,
} from '../../helpers/consts';
import TicTacToeField from '../TicTacToeField';
import s from './TicTacToeGame.module.scss';
import {
  findTicTacToeEmptyCellIndex,
  getTicTacToeGameResult,
  validateTicTacToeCellSizeStr,
} from '../../helpers/utils';
import { css } from '@emotion/css';
import clsx from 'clsx';

type TicTacToeGameProps = {
  user: string;
  className?: string;
};

type TicTacToeGameState = {
  status: TicTacToeGameStatuses;
  fieldValues: TicTacToeFieldValues;
  playerSymbol: TicTacToeGameSymbols;
  cellSize: string;
  cellSizeError: string;
  result: TicTacToeGameResults | null;
};

const initialState: TicTacToeGameState = {
  status: TicTacToeGameStatuses.Stopped,
  fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  playerSymbol: TicTacToeGameSymbols.Cross,
  cellSize: TIC_TAC_TOE_CELL_DEFAULT_SIZE.toString(),
  cellSizeError: 'error',
  result: null,
};

class TicTacToeGame extends Component<TicTacToeGameProps, TicTacToeGameState> {
  constructor(props: TicTacToeGameProps) {
    super(props);
    this.state = initialState;
    this.handlePlayerSymbolChange = this.handlePlayerSymbolChange.bind(this);
    this.handleCellSizeChange = this.handleCellSizeChange.bind(this);
    this.handleStartStopButtonClick =
      this.handleStartStopButtonClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<TicTacToeGameProps>) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.setState(initialState);
    }
  }

  handlePlayerSymbolChange(e: FormEvent<HTMLSelectElement>) {
    this.setState({
      playerSymbol: Number(e.currentTarget.value),
      fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
      result: null,
    });
  }

  handleCellSizeChange(e: FormEvent<HTMLInputElement>) {
    this.setState({
      cellSize: e.currentTarget.value,
    });
  }

  handleStartStopButtonClick() {
    const { status } = this.state;
    if (status === TicTacToeGameStatuses.Started) {
      this.setState({
        status: TicTacToeGameStatuses.Stopped,
      });
    } else {
      this.setState({
        status: TicTacToeGameStatuses.Started,
        fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
        result: null,
      });
    }
  }

  handleCellClick(index: number) {
    const { fieldValues, playerSymbol, status } = this.state;
    if (status !== TicTacToeGameStatuses.Started) return;
    const currentValue = fieldValues[index];
    if (currentValue !== TicTacToeCellValues.Empty) return;

    // player turn
    const playerTurnNewValues = [...fieldValues] as TicTacToeFieldValues;
    playerTurnNewValues[index] =
      playerSymbol === TicTacToeGameSymbols.Cross
        ? TicTacToeCellValues.Cross
        : TicTacToeCellValues.Circle;
    this.setState({
      fieldValues: playerTurnNewValues,
    });
    const playerTurnNewResult = getTicTacToeGameResult(playerTurnNewValues);
    if (playerTurnNewResult !== null) {
      this.setState({
        result: playerTurnNewResult,
        status: TicTacToeGameStatuses.Stopped,
      });
      return;
    }

    // computer turn
    const computerTurnNewValues = [
      ...playerTurnNewValues,
    ] as TicTacToeFieldValues;
    const emptyCellIndex = findTicTacToeEmptyCellIndex(computerTurnNewValues);
    if (emptyCellIndex === null) return;
    computerTurnNewValues[emptyCellIndex] =
      playerSymbol === TicTacToeGameSymbols.Cross
        ? TicTacToeCellValues.Circle
        : TicTacToeCellValues.Cross;
    this.setState({
      fieldValues: computerTurnNewValues,
    });
    const computerTurnNewResult = getTicTacToeGameResult(computerTurnNewValues);
    if (computerTurnNewResult !== null) {
      this.setState({
        result: computerTurnNewResult,
        status: TicTacToeGameStatuses.Stopped,
      });
    }
  }

  renderResult() {
    const { result, playerSymbol } = this.state;
    if (result === null) return null;

    let color: string, text: string;
    if (result === TicTacToeGameResults.Draw) {
      color = 'grey';
      text = 'Ничья';
    } else {
      if (
        (result === TicTacToeGameResults.CrossWon &&
          playerSymbol === TicTacToeGameSymbols.Cross) ||
        (result === TicTacToeGameResults.CircleWon &&
          playerSymbol === TicTacToeGameSymbols.Circle)
      ) {
        color = 'green';
        text = 'Пользователь победил';
      } else {
        color = 'red';
        text = 'Пользователь проиграл';
      }
    }

    return (
      <span className={css({ color })} role="tic-tac-toe-game-result-info">
        {text}
      </span>
    );
  }

  renderStatus() {
    const { status, result } = this.state;
    if (status === TicTacToeGameStatuses.Started) {
      return 'начата';
    } else {
      return result !== null ? 'окончена' : 'не начата';
    }
  }

  render() {
    const { user, className } = this.props;
    const { fieldValues, playerSymbol, status, cellSize } = this.state;
    const cellSizeError = validateTicTacToeCellSizeStr(cellSize);

    return (
      <div role="tic-tac-toe-game" className={clsx(s.game, className)}>
        <h1 className="h1 text-center">Игра Tic-Tac-Toe</h1>

        <h4 className="h4 mt-4">Настройки игры</h4>
        <div className="row g-2">
          <div className="col">
            <div className="form-floating">
              <select
                className="form-select"
                onChange={this.handlePlayerSymbolChange}
                value={playerSymbol}
                disabled={status !== TicTacToeGameStatuses.Stopped}
                role="tic-tac-toe-game-symbol-select"
              >
                <option
                  value={TicTacToeGameSymbols.Cross}
                  role="tic-tac-toe-game-symbol-select-option"
                >
                  Крестики
                </option>
                <option
                  value={TicTacToeGameSymbols.Circle}
                  role="tic-tac-toe-game-symbol-select-option"
                >
                  Нолики
                </option>
              </select>
              <label>Символ игрока</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className={clsx('form-control', {
                  'is-invalid': !!cellSizeError,
                })}
                value={cellSize}
                onChange={this.handleCellSizeChange}
              />
              <label>{`Размер ячейки, px (от ${TIC_TAC_TOE_CELL_MIN_SIZE} до ${TIC_TAC_TOE_CELL_MAX_SIZE})`}</label>
            </div>
          </div>
        </div>

        {cellSizeError === null ? (
          <TicTacToeField
            values={fieldValues}
            handleCellClick={this.handleCellClick}
            cellSize={Number(cellSize)}
            className={clsx(
              css`
                margin: 35px auto 0;
              `,
              status === TicTacToeGameStatuses.Started
                ? s.fieldActive
                : s.fieldInactive
            )}
          />
        ) : (
          <div className="alert alert-danger my-5">{cellSizeError}</div>
        )}

        <h4 className="h-4 mt-4">Состояние игры</h4>
        <table className="table table-sm table-bordered">
          <tbody>
            <tr>
              <th scope="row" className="w-50">
                Статус
              </th>
              <td role="tic-tac-toe-game-status-info">
                Игра {this.renderStatus()}
              </td>
            </tr>
            <tr>
              <th scope="row">Игрок</th>
              <td role="tic-tac-toe-game-player-info">{user}</td>
            </tr>
            <tr>
              <th scope="row">Символ игрока</th>
              <td role="tic-tac-toc-game-symbol-info">
                {playerSymbol === TicTacToeGameSymbols.Cross
                  ? 'Крестики'
                  : 'Нолики'}
              </td>
            </tr>
            <tr>
              <th scope="row">Результат</th>
              <td>{this.renderResult()}</td>
            </tr>
          </tbody>
        </table>

        <button
          className={clsx(
            'btn d-block w-100',
            status === TicTacToeGameStatuses.Stopped
              ? 'btn-outline-success'
              : 'btn-outline-danger',
            css`
              margin-top: 35px;
            `
          )}
          onClick={this.handleStartStopButtonClick}
          role="tic-tac-toe-game-start-stop-button"
        >{`${
          status === TicTacToeGameStatuses.Stopped ? 'Начать' : 'Завершить'
        } игру`}</button>
      </div>
    );
  }
}

export default TicTacToeGame;
