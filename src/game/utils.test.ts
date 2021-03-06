import {
  findTicTacToeEmptyCellIndex,
  getFieldRandomCellIndexes,
  getFieldRandomCellsCount,
  getRandomFieldValues,
  getTicTacToeGameResult,
} from './utils';
import {
  TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  TicTacToeCellValues,
  TicTacToeGameResults,
} from './consts';

describe('getTicTacToeGameResult', () => {
  it('should return null for default field', () => {
    expect(getTicTacToeGameResult(TIC_TAC_TOE_DEFAULT_FIELD_VALUES)).toBeNull();
  });

  it('should return CrossWon for three crosses in a row', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
  });

  it('should return CircleWon for three circles in a row', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Circle,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
  });

  it('should return CrossWon for three crosses in a column', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
  });

  it('should return CircleWon for three circles in a column', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
  });

  it('should return CrossWon for three crosses in a diagonal', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CrossWon);
  });

  it('should return CircleWon for three circles in a diagonal', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Empty,
      ])
    ).toBe(TicTacToeGameResults.CircleWon);
  });

  it('should return Draw when all fields are filled and there is no winner', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
      ])
    ).toBe(TicTacToeGameResults.Draw);
  });

  it('should return null when there is one empty field and there is no winner', () => {
    expect(
      getTicTacToeGameResult([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Empty,
      ])
    ).toBeNull();
  });
});

describe('findTicTacToeEmptyCellIndex', () => {
  it('should return null when there are no empty cells', () => {
    expect(
      findTicTacToeEmptyCellIndex([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
      ])
    ).toBeNull();
  });

  it('should return correct index when there is one empty cell', () => {
    expect(
      findTicTacToeEmptyCellIndex([
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Empty,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
        TicTacToeCellValues.Cross,
        TicTacToeCellValues.Circle,
      ])
    ).toBe(4);
  });

  it('should return correct index when there are several empty cells', () => {
    const actual = findTicTacToeEmptyCellIndex([
      TicTacToeCellValues.Empty,
      TicTacToeCellValues.Circle,
      TicTacToeCellValues.Cross,
      TicTacToeCellValues.Circle,
      TicTacToeCellValues.Empty,
      TicTacToeCellValues.Cross,
      TicTacToeCellValues.Circle,
      TicTacToeCellValues.Empty,
      TicTacToeCellValues.Circle,
    ]);
    expect([0, 4, 7].includes(actual as number)).toBe(true);
  });
});

describe('getFieldRandomCellsCount', () => {
  test('input 100, returns 9', () => {
    expect(getFieldRandomCellsCount(100)).toBe(9);
  });

  test('input 1, returns 0', () => {
    expect(getFieldRandomCellsCount(1)).toBe(0);
  });

  test('input 10, returns 1', () => {
    expect(getFieldRandomCellsCount(10)).toBe(1);
  });

  test('input 50, returns 5', () => {
    expect(getFieldRandomCellsCount(50)).toBe(5);
  });
});

describe('getFieldRandomCellIndexes', () => {
  test('input 0, returns empty array', () => {
    expect(getFieldRandomCellIndexes(0)).toEqual([]);
  });

  test('input lte 9, result length equals to input', () => {
    expect(getFieldRandomCellIndexes(1).length).toEqual(1);
    expect(getFieldRandomCellIndexes(5).length).toEqual(5);
    expect(getFieldRandomCellIndexes(9).length).toEqual(9);
  });

  test('input gt 9, result length is 9', () => {
    expect(getFieldRandomCellIndexes(10).length).toEqual(9);
  });

  test('result has no duplicates', () => {
    const actual = getFieldRandomCellIndexes(9);
    expect(actual.length === new Set(actual).size).toBeTruthy();
  });

  test('result contains correct values', () => {
    const actual = getFieldRandomCellIndexes(9);
    actual.forEach((item) => {
      expect(item >= 0 && item <= 9).toBeTruthy();
    });
  });
});

describe('getRandomFieldValues', () => {
  test('result length is 9', () => {
    expect(getRandomFieldValues(0).length).toBe(9);
    expect(getRandomFieldValues(50).length).toBe(9);
    expect(getRandomFieldValues(100).length).toBe(9);
  });

  test('input is 1, then all cells are empty', () => {
    const actual = getRandomFieldValues(1);
    actual.forEach((item) => {
      expect(item).toEqual(TicTacToeCellValues.Empty);
    });
  });

  test('input is 100, then all cells are not empty', () => {
    const actual = getRandomFieldValues(100);
    actual.forEach((item) => {
      expect(item).not.toEqual(TicTacToeCellValues.Empty);
    });
  });

  test('input is 50, then some cells are not empty', () => {
    const actual = getRandomFieldValues(100);
    expect(
      actual.some((item) => item !== TicTacToeCellValues.Empty)
    ).toBeTruthy();
  });
});
