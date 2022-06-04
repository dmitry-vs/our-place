import React, { Component, FormEvent } from 'react';
import {
  TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  TIC_TAC_TOE_CELL_MAX_SIZE,
  TIC_TAC_TOE_CELL_MIN_SIZE,
  TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL,
  TIC_TAC_TOE_FIELD_MAX_RANDOM_FILL,
  TIC_TAC_TOE_FIELD_MIN_RANDOM_FILL,
  TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT,
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
  getRandomFieldValues,
  getTicTacToeGameResult,
  validateNumericInputValue,
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
  randomFillEnabled: boolean;
  randomFillValue: string;
  result: TicTacToeGameResults | null;
};

const initialState: TicTacToeGameState = {
  status: TicTacToeGameStatuses.Stopped,
  fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  playerSymbol: TicTacToeGameSymbols.Cross,
  cellSize: TIC_TAC_TOE_CELL_DEFAULT_SIZE.toString(),
  randomFillEnabled: false,
  randomFillValue: TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL.toString(),
  result: null,
};

class TicTacToeGame extends Component<TicTacToeGameProps, TicTacToeGameState> {
  constructor(props: TicTacToeGameProps) {
    super(props);
    this.state = initialState;
    this.handlePlayerSymbolChange = this.handlePlayerSymbolChange.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleRandomFillEnabledChange =
      this.handleRandomFillEnabledChange.bind(this);
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

  handleRandomFillEnabledChange(e: FormEvent<HTMLInputElement>) {
    this.setState({ randomFillEnabled: e.currentTarget.checked });
  }

  handleTextInputChange(e: FormEvent<HTMLInputElement>) {
    // TODO pattern (Switch Event)
    const { name, value } = e.currentTarget;
    if (name === 'cell-size') {
      this.setState({ cellSize: value });
    } else if (name === 'random-fill') {
      this.setState({ randomFillValue: value });
    }
  }

  handleStartStopButtonClick() {
    const { status, randomFillEnabled, randomFillValue } = this.state;

    if (status === TicTacToeGameStatuses.Started) {
      this.setState({ status: TicTacToeGameStatuses.Stopped });
      return;
    }

    const fieldValues = randomFillEnabled
      ? getRandomFieldValues(parseInt(randomFillValue))
      : TIC_TAC_TOE_DEFAULT_FIELD_VALUES;
    const result = randomFillEnabled
      ? getTicTacToeGameResult(fieldValues)
      : null;
    const gameStatus =
      result !== null
        ? TicTacToeGameStatuses.Stopped
        : TicTacToeGameStatuses.Started;
    this.setState({
      status: gameStatus,
      fieldValues,
      result,
    });
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
    const {
      fieldValues,
      playerSymbol,
      status,
      cellSize,
      randomFillEnabled,
      randomFillValue,
    } = this.state;

    const cellSizeError = validateNumericInputValue({
      value: cellSize,
      minValue: TIC_TAC_TOE_CELL_MIN_SIZE,
      maxValue: TIC_TAC_TOE_CELL_MAX_SIZE,
    });
    const randomFillValueError = validateNumericInputValue({
      value: randomFillValue,
      minValue: TIC_TAC_TOE_FIELD_MIN_RANDOM_FILL,
      maxValue: TIC_TAC_TOE_FIELD_MAX_RANDOM_FILL,
    });

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
                // TODO pattern (Controlled Input)
                role="tic-tac-toe-game-cell-size-input"
                type="text"
                name="cell-size"
                className={clsx(
                  'form-control',
                  !!cellSizeError && 'is-invalid'
                )}
                value={cellSize}
                onChange={this.handleTextInputChange}
              />
              <label>{`Размер ячейки, px (от ${TIC_TAC_TOE_CELL_MIN_SIZE} до ${TIC_TAC_TOE_CELL_MAX_SIZE})`}</label>
              <div
                role="tic-tac-toe-game-cell-size-error"
                className="invalid-feedback"
              >
                {cellSizeError}
              </div>
            </div>
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col d-flex flex-column justify-content-evenly">
            <div className="form-check form-switch">
              <input
                // TODO pattern (Controlled Input)
                role="tic-tac-toe-game-random-fill-switch"
                className="form-check-input"
                type="checkbox"
                checked={randomFillEnabled}
                onChange={this.handleRandomFillEnabledChange}
                disabled={status === TicTacToeGameStatuses.Started}
              />
              <label className="form-check-label ms-1">
                Случайное заполнение
              </label>
            </div>
            <div className="small text-muted">
              (игра может сразу завершиться)
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                // TODO pattern (Controlled Input)
                role="tic-tac-toe-game-random-fill-input"
                type="text"
                name="random-fill"
                className={clsx(
                  'form-control',
                  !!randomFillValueError && randomFillEnabled && 'is-invalid'
                )}
                value={randomFillValue}
                onChange={this.handleTextInputChange}
                disabled={
                  !randomFillEnabled || status === TicTacToeGameStatuses.Started
                }
              />
              <label>{`Процент заполнения (от ${TIC_TAC_TOE_FIELD_MIN_RANDOM_FILL} до ${TIC_TAC_TOE_FIELD_MAX_RANDOM_FILL})`}</label>
              <div
                role="tic-tac-toe-game-random-fill-error"
                className="invalid-feedback"
              >
                {randomFillValueError}
              </div>
            </div>
          </div>
        </div>

        {/* TODO pattern (Conditional Rendering) */}
        {!!cellSizeError || (randomFillEnabled && !!randomFillValueError) ? (
          <div
            role="tic-tac-toe-game-invalid-input-alert"
            className="alert alert-danger my-5"
          >
            {TIC_TAC_TOE_GAME_ALERT_ERROR_TEXT}
          </div>
        ) : (
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
          disabled={randomFillEnabled && !!randomFillValueError}
          onClick={this.handleStartStopButtonClick}
          role="tic-tac-toe-game-start-stop-button"
        >
          {(function () {
            if (status === TicTacToeGameStatuses.Started)
              return 'Завершить игру';
            return randomFillEnabled
              ? `Начать игру (случайное заполнение)`
              : 'Начать игру';
          })()}
        </button>
      </div>
    );
  }
}

export default TicTacToeGame;
