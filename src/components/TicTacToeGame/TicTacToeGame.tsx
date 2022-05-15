import React, { Component, FormEvent } from 'react';
import {
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
} from '../../helpers/utils';
import { css } from '@emotion/css';

type TicTacToeGameProps = Record<string, never>;

type TicTacToeGameState = {
  status: TicTacToeGameStatuses;
  fieldValues: TicTacToeFieldValues;
  playerSymbol: TicTacToeGameSymbols;
  currentTurn: TicTacToeGameSymbols | null;
  result: TicTacToeGameResults | null;
};

const initialState: TicTacToeGameState = {
  status: TicTacToeGameStatuses.Stopped,
  fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  playerSymbol: TicTacToeGameSymbols.Cross,
  currentTurn: null,
  result: null,
};

class TicTacToeGame extends Component<TicTacToeGameProps, TicTacToeGameState> {
  constructor(props: TicTacToeGameProps) {
    super(props);
    this.state = initialState;
    this.handlePlayerSymbolChange = this.handlePlayerSymbolChange.bind(this);
    this.handleStartStopButtonClick =
      this.handleStartStopButtonClick.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handlePlayerSymbolChange(e: FormEvent<HTMLSelectElement>) {
    this.setState({
      playerSymbol: Number(e.currentTarget.value),
      fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
      result: null,
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
      text = 'ничья';
    } else {
      if (
        (result === TicTacToeGameResults.CrossWon &&
          playerSymbol === TicTacToeGameSymbols.Cross) ||
        (result === TicTacToeGameResults.CircleWon &&
          playerSymbol === TicTacToeGameSymbols.Circle)
      ) {
        color = 'green';
        text = 'пользователь победил';
      } else {
        color = 'red';
        text = 'пользователь проиграл';
      }
    }

    return (
      <span
        className={css`
          color: ${color};
        `}
      >
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
    const { fieldValues, playerSymbol, status, result } = this.state;

    return (
      <div>
        <h1>Игра Tic-Tac-Toe</h1>

        <h2>Настройки игры</h2>
        <div className={s.gameSettings}>
          <label>Символ игрока: </label>
          <select
            onChange={this.handlePlayerSymbolChange}
            value={playerSymbol}
            disabled={status !== TicTacToeGameStatuses.Stopped}
          >
            <option value={TicTacToeGameSymbols.Cross}>Крестики</option>
            <option value={TicTacToeGameSymbols.Circle}>Нолики</option>
          </select>
          <button
            className={s.gameStartStopButton}
            onClick={this.handleStartStopButtonClick}
          >{`${
            status === TicTacToeGameStatuses.Stopped ? 'Начать' : 'Завершить'
          } игру`}</button>
        </div>

        <TicTacToeField
          values={fieldValues}
          handleCellClick={this.handleCellClick}
          className={
            status === TicTacToeGameStatuses.Started
              ? s.fieldActive
              : s.fieldInactive
          }
        />

        <h2>Состояние игры</h2>
        <ul className={s.gameParams}>
          <li className={s.gameParamsListItem}>
            Статус: игра {this.renderStatus()}
          </li>
          <li className={s.gameParamsListItem}>
            {`Символ игрока: ${
              playerSymbol === TicTacToeGameSymbols.Cross
                ? 'крестики'
                : 'нолики'
            }`}
          </li>
          {result !== null && (
            <li className={s.gameParamsListItem}>
              Результат: {this.renderResult()}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default TicTacToeGame;
