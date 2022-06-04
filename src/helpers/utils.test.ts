import {
  findTicTacToeEmptyCellIndex,
  getTicTacToeGameResult,
  validateTicTacToeCellSizeStr,
} from './utils';
import {
  TIC_TAC_TOE_DEFAULT_FIELD_VALUES,
  TicTacToeCellValues,
  TicTacToeGameResults,
  ValidationErrors,
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

describe('validateTicTacToeCellSizeStr', () => {
  test('correct error when value is empty or whitespace', () => {
    expect(validateTicTacToeCellSizeStr('')).toBe(ValidationErrors.Required);
    expect(validateTicTacToeCellSizeStr(' ')).toBe(ValidationErrors.Required);
  });

  test('correct error when value is not numeric', () => {
    expect(validateTicTacToeCellSizeStr('test')).toBe(
      ValidationErrors.NumberExpected
    );
    expect(validateTicTacToeCellSizeStr('1234+')).toBe(
      ValidationErrors.NumberExpected
    );
    expect(validateTicTacToeCellSizeStr('1 2')).toBe(
      ValidationErrors.NumberExpected
    );
    expect(validateTicTacToeCellSizeStr('-')).toBe(
      ValidationErrors.NumberExpected
    );
  });

  test('correct error when value is number out of range', () => {
    expect(validateTicTacToeCellSizeStr('49')).toBe(
      ValidationErrors.OutOfRange
    );
    expect(validateTicTacToeCellSizeStr('151')).toBe(
      ValidationErrors.OutOfRange
    );
    expect(validateTicTacToeCellSizeStr('0')).toBe(ValidationErrors.OutOfRange);
    expect(validateTicTacToeCellSizeStr('-10')).toBe(
      ValidationErrors.OutOfRange
    );
  });
});
