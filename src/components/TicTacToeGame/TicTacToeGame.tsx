import React, { Component, FormEvent } from 'react';
import {
  TIC_TAC_TOE_FIELD_SIZE,
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  TicTacToeGameStatuses,
  TicTacToeGameSymbols,
} from '../../helpers/consts';
import TicTacToeField from '../TicTacToeField';
import s from './TicTacToeGame.module.scss';

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
  fieldValues: Array(TIC_TAC_TOE_FIELD_SIZE ** 2).fill(
    TicTacToeCellValues.Empty
  ) as TicTacToeFieldValues,
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
    });
  }

  handleStartStopButtonClick() {
    const { status } = this.state;
    const newStatus =
      status === TicTacToeGameStatuses.Started
        ? TicTacToeGameStatuses.Stopped
        : TicTacToeGameStatuses.Started;
    this.setState({
      status: newStatus,
    });
  }

  handleCellClick(index: number) {
    // eslint-disable-next-line no-console
    console.log(index);
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
            <option value={TicTacToeCellValues.Cross}>Крестики</option>
            <option value={TicTacToeCellValues.Circle}>Нолики</option>
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
            {`Статус: игра ${
              status === TicTacToeGameStatuses.Started ? 'начата' : 'не начата'
            }`}
          </li>
          <li className={s.gameParamsListItem}>
            {`Символ игрока: ${
              playerSymbol === TicTacToeGameSymbols.Cross
                ? 'крестики'
                : 'нолики'
            }`}
          </li>
          {result !== null && (
            <li className={s.gameParamsListItem}>Результат:</li>
          )}
        </ul>
      </div>
    );
  }
}

export default TicTacToeGame;
