import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIC_TAC_TOE_CELL_DEFAULT_SIZE,
  TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  TicTacToeGameStatuses,
  TicTacToeGameSymbols,
} from '../helpers/consts';
import {
  getStateFromLocalStorage,
  getTicTacToeGameResult,
} from '../helpers/utils';

type GameState = {
  status: TicTacToeGameStatuses;
  fieldValues: TicTacToeFieldValues;
  playerSymbol: TicTacToeGameSymbols;
  result: TicTacToeGameResults | null;
  cellSize: string;
  randomFill: RandomFill;
};

type RandomFill = {
  enabled: boolean;
  value: string;
};

export const GAME_INITIAL_STATE: GameState = {
  status: TicTacToeGameStatuses.Stopped,
  fieldValues: TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  playerSymbol: TicTacToeGameSymbols.Cross,
  result: null,
  cellSize: TIC_TAC_TOE_CELL_DEFAULT_SIZE.toString(),
  randomFill: {
    enabled: false,
    value: TIC_TAC_TOE_FIELD_DEFAULT_RANDOM_FILL.toString(),
  },
};

const initialState: GameState =
  getStateFromLocalStorage()?.game || GAME_INITIAL_STATE;

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerSymbol: (
      state,
      { payload }: PayloadAction<TicTacToeGameSymbols>
    ) => {
      state.playerSymbol = payload;
    },
    setCellSize: (state, { payload }: PayloadAction<string>) => {
      state.cellSize = payload;
    },
    setRandomFill: (state, { payload }: PayloadAction<Partial<RandomFill>>) => {
      state.randomFill = { ...state.randomFill, ...payload };
    },
    setFieldValues: (
      state,
      { payload }: PayloadAction<TicTacToeFieldValues>
    ) => {
      const result = getTicTacToeGameResult(payload);
      state.fieldValues = payload;
      state.result = result;
      if (result !== null) state.status = TicTacToeGameStatuses.Stopped;
    },
    start: (state) => {
      state.status = TicTacToeGameStatuses.Started;
      state.result = null;
    },
    stop: (state) => {
      state.status = TicTacToeGameStatuses.Stopped;
    },
  },
});

export const {
  setPlayerSymbol,
  setCellSize,
  setRandomFill,
  setFieldValues,
  start,
  stop,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
