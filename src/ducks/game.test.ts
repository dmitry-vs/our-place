import gameReducer, {
  GAME_INITIAL_STATE,
  GameAction,
  setCellSize,
  setFieldValues,
  setPlayerSymbol,
  setRandomFill,
  startGame,
  stopGame,
} from './game';
import {
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  TicTacToeGameStatuses,
  TicTacToeGameSymbols,
} from '../helpers/consts';

describe('gameReducer', () => {
  describe('SET_PLAYER_SYMBOL action', () => {
    test('sets correct `playerSymbol` value', () => {
      const newSymbol = TicTacToeGameSymbols.Circle;
      const newState = gameReducer(
        GAME_INITIAL_STATE,
        setPlayerSymbol(newSymbol)
      );

      expect(newState.playerSymbol).toBe(newSymbol);
    });
  });

  describe('SET_CELL_SIZE action', () => {
    test('sets correct `cellSize` value', () => {
      const newCellSize = '100';
      const newState = gameReducer(
        GAME_INITIAL_STATE,
        setCellSize(newCellSize)
      );

      expect(newState.cellSize).toBe(newCellSize);
    });
  });

  describe('SET_RANDOM_FILL action', () => {
    test('sets correct `randomFill` params', () => {
      const newRandomFill = { enabled: true, value: '75' };
      const newState = gameReducer(
        GAME_INITIAL_STATE,
        setRandomFill(newRandomFill)
      );

      expect(newState.randomFill).toEqual(newRandomFill);
    });
  });

  describe('SET_FIELD_VALUES action', () => {
    test('sets correct field values when game is not over', () => {
      const newValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
      ];
      const newState = gameReducer(
        GAME_INITIAL_STATE,
        setFieldValues(newValues)
      );

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(newValues);
      expect(status).toBe(GAME_INITIAL_STATE.status);
      expect(result).toBe(GAME_INITIAL_STATE.result);
    });

    test('end game correctly when cross wins', () => {
      const crossWinValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ];
      const newState = gameReducer(
        GAME_INITIAL_STATE,
        setFieldValues(crossWinValues)
      );

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(crossWinValues);
      expect(status).toBe(TicTacToeGameStatuses.Stopped);
      expect(result).toBe(TicTacToeGameResults.CrossWon);
    });

    test('end game correctly when circle wins', () => {
      const circleWinValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
      ];
      const newState = gameReducer(
        GAME_INITIAL_STATE,
        setFieldValues(circleWinValues)
      );

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(circleWinValues);
      expect(status).toBe(TicTacToeGameStatuses.Stopped);
      expect(result).toBe(TicTacToeGameResults.CircleWon);
    });

    test('end game correctly when draw', () => {
      const drawValues: TicTacToeFieldValues = [
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
      ];
      const newState = gameReducer(
        GAME_INITIAL_STATE,
        setFieldValues(drawValues)
      );

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(drawValues);
      expect(status).toBe(TicTacToeGameStatuses.Stopped);
      expect(result).toBe(TicTacToeGameResults.Draw);
    });
  });

  describe('START_GAME action', () => {
    test('correct status and result is null', () => {
      const newState = gameReducer(GAME_INITIAL_STATE, startGame());

      const { status, result } = newState;
      expect(status).toBe(TicTacToeGameStatuses.Started);
      expect(result).toBeNull();
    });
  });

  describe('STOP_GAME action', () => {
    test('correct status', () => {
      const newState = gameReducer(
        { ...GAME_INITIAL_STATE, status: TicTacToeGameStatuses.Started },
        stopGame()
      );

      expect(newState.status).toBe(TicTacToeGameStatuses.Stopped);
    });
  });

  test('when action is unknown then state is unchanged', () => {
    const newState = gameReducer(GAME_INITIAL_STATE, {} as GameAction);

    expect(newState).toBe(GAME_INITIAL_STATE);
  });
});
