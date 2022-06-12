import gameReducer, {
  gameInitialState,
  resetGame,
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
  describe('RESET action', () => {
    test('if state equals initial then state remains the same', () => {
      const newState = gameReducer(gameInitialState, resetGame());

      expect(newState).toBe(gameInitialState);
    });

    test('if state not equals initial then new state equals initial', () => {
      const state = {
        ...gameInitialState,
        playerSymbol: TicTacToeGameSymbols.Circle,
      };

      const newState = gameReducer(state, resetGame());

      expect(newState).toEqual(gameInitialState);
    });
  });

  describe('SET_PLAYER_SYMBOL action', () => {
    test('sets correct `playerSymbol` value', () => {
      const newSymbol = TicTacToeGameSymbols.Circle;
      const newState = gameReducer(
        gameInitialState,
        setPlayerSymbol(newSymbol)
      );

      expect(newState.playerSymbol).toBe(newSymbol);
    });
  });

  describe('SET_CELL_SIZE action', () => {
    test('sets correct `cellSize` value', () => {
      const newCellSize = '100';
      const newState = gameReducer(gameInitialState, setCellSize(newCellSize));

      expect(newState.cellSize).toBe(newCellSize);
    });
  });

  describe('SET_RANDOM_FILL action', () => {
    test('sets correct `randomFill` params', () => {
      const newRandomFill = { enabled: true, value: '75' };
      const newState = gameReducer(
        gameInitialState,
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
      const newState = gameReducer(gameInitialState, setFieldValues(newValues));

      const { fieldValues, status, result } = newState;
      expect(fieldValues).toEqual(newValues);
      expect(status).toBe(gameInitialState.status);
      expect(result).toBe(gameInitialState.result);
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
        gameInitialState,
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
        gameInitialState,
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
        gameInitialState,
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
      const newState = gameReducer(gameInitialState, startGame());

      const { status, result } = newState;
      expect(status).toBe(TicTacToeGameStatuses.Started);
      expect(result).toBeNull();
    });
  });

  describe('STOP_GAME action', () => {
    test('correct status', () => {
      const newState = gameReducer(
        { ...gameInitialState, status: TicTacToeGameStatuses.Started },
        stopGame()
      );

      expect(newState.status).toBe(TicTacToeGameStatuses.Stopped);
    });
  });
});
