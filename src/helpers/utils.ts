import { sample } from 'lodash';

import {
  TIC_TAC_TOE_CELL_MAX_SIZE,
  TIC_TAC_TOE_CELL_MIN_SIZE,
  TIC_TAC_TOE_FIELD_SIZE,
  TicTacToeCellValues,
  TicTacToeFieldValues,
  TicTacToeGameResults,
  ValidationErrors,
} from './consts';

export const getTicTacToeGameResult = (
  fieldValues: TicTacToeFieldValues
): TicTacToeGameResults | null => {
  // check rows
  for (let i = 0; i < TIC_TAC_TOE_FIELD_SIZE ** 2; i += 3) {
    const value = fieldValues[i];
    if (value === TicTacToeCellValues.Empty) continue;
    if (value !== fieldValues[i + 1] || value !== fieldValues[i + 2]) continue;
    return value === TicTacToeCellValues.Cross
      ? TicTacToeGameResults.CrossWon
      : TicTacToeGameResults.CircleWon;
  }

  // check cols
  for (let i = 0; i < 3; i++) {
    const value = fieldValues[i];
    if (value === TicTacToeCellValues.Empty) continue;
    if (value !== fieldValues[i + 3] || value !== fieldValues[i + 6]) continue;
    return value === TicTacToeCellValues.Cross
      ? TicTacToeGameResults.CrossWon
      : TicTacToeGameResults.CircleWon;
  }

  // check diagonals
  const centerElement = fieldValues[4];
  if (centerElement !== TicTacToeCellValues.Empty) {
    if (
      (centerElement === fieldValues[0] && centerElement === fieldValues[8]) ||
      (centerElement === fieldValues[2] && centerElement === fieldValues[6])
    ) {
      return centerElement === TicTacToeCellValues.Cross
        ? TicTacToeGameResults.CrossWon
        : TicTacToeGameResults.CircleWon;
    }
  }

  return fieldValues.includes(TicTacToeCellValues.Empty)
    ? null
    : TicTacToeGameResults.Draw;
};

export const findTicTacToeEmptyCellIndex = (
  fieldValues: TicTacToeFieldValues
) => {
  const emptyCellsIndexes: number[] = [];
  fieldValues.forEach((item, index) => {
    if (item === TicTacToeCellValues.Empty) emptyCellsIndexes.push(index);
  });
  const result = sample(emptyCellsIndexes);
  return result !== undefined ? result : null;
};

export const validateTicTacToeCellSizeStr = (value: string) => {
  const valueTrimmed = value.trim();
  if (!valueTrimmed) return ValidationErrors.Required;
  if (!/^-?\d+$/.test(valueTrimmed)) return ValidationErrors.NumberExpected;

  const valueNum = Number(valueTrimmed);
  if (
    valueNum < TIC_TAC_TOE_CELL_MIN_SIZE ||
    valueNum > TIC_TAC_TOE_CELL_MAX_SIZE
  ) {
    return ValidationErrors.OutOfRange;
  }

  return null;
};
