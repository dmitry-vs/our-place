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

export type GameState = {
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

// reducer
export default function gameReducer(
  state: GameState = initialState,
  action: GameAction
): GameState {
  switch (action.type) {
    case SET_PLAYER_SYMBOL: {
      return {
        ...state,
        playerSymbol: action.payload,
      };
    }
    case SET_CELL_SIZE: {
      return {
        ...state,
        cellSize: action.payload,
      };
    }
    case SET_RANDOM_FILL: {
      const { randomFill } = state;
      return {
        ...state,
        randomFill: { ...randomFill, ...action.payload },
      };
    }
    case SET_FIELD_VALUES: {
      const newFieldValues = action.payload;
      const result = getTicTacToeGameResult(newFieldValues);
      return {
        ...state,
        fieldValues: [...newFieldValues],
        result,
        status: result !== null ? TicTacToeGameStatuses.Stopped : state.status,
      };
    }
    case START_GAME: {
      return {
        ...state,
        status: TicTacToeGameStatuses.Started,
        result: null,
      };
    }
    case STOP_GAME: {
      return {
        ...state,
        status: TicTacToeGameStatuses.Stopped,
      };
    }
    default:
      return state;
  }
}

// actions
const SET_PLAYER_SYMBOL = 'our-place/game/SET_PLAYER_SYMBOL';
const SET_CELL_SIZE = 'our-place/game/SET_CELL_SIZE';
const SET_RANDOM_FILL = 'our-place/game/SET_RANDOM_FILL';
const SET_FIELD_VALUES = 'our-place/game/SET_FIELD_VALUES';
const START_GAME = 'our-place/game/START_GAME';
const STOP_GAME = 'our-place/game/STOP_GAME';

// action types
type SetPlayerSymbolAction = {
  type: typeof SET_PLAYER_SYMBOL;
  payload: TicTacToeGameSymbols;
};

type SetCellSizeAction = {
  type: typeof SET_CELL_SIZE;
  payload: string;
};

type SetRandomFillAction = {
  type: typeof SET_RANDOM_FILL;
  payload: Partial<RandomFill>;
};

type SetFieldValuesAction = {
  type: typeof SET_FIELD_VALUES;
  payload: TicTacToeFieldValues;
};

type StartGameAction = {
  type: typeof START_GAME;
};

type StopGameAction = {
  type: typeof STOP_GAME;
};

export type GameAction =
  | SetPlayerSymbolAction
  | SetCellSizeAction
  | SetRandomFillAction
  | SetFieldValuesAction
  | StartGameAction
  | StopGameAction;

// action creators
export const setPlayerSymbol = (
  newSymbol: TicTacToeGameSymbols
): SetPlayerSymbolAction => ({
  type: SET_PLAYER_SYMBOL,
  payload: newSymbol,
});

export const setCellSize = (newCellSize: string): SetCellSizeAction => ({
  type: SET_CELL_SIZE,
  payload: newCellSize,
});

export const setRandomFill = (
  randomFill: Partial<RandomFill>
): SetRandomFillAction => ({
  type: SET_RANDOM_FILL,
  payload: randomFill,
});

export const setFieldValues = (
  newValues: TicTacToeFieldValues
): SetFieldValuesAction => ({
  type: SET_FIELD_VALUES,
  payload: newValues,
});

export const startGame = (): StartGameAction => ({
  type: START_GAME,
});

export const stopGame = (): StopGameAction => ({
  type: STOP_GAME,
});
