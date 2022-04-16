import React, { FC } from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';
import TicTacToeCell from '../TicTacToeCell';

type TicTacToeFieldProps = {
  size: number;
  values: Array<TicTacToeCellValues>;
};

const TicTacToeField: FC<TicTacToeFieldProps> = ({ values, size }) => {
  if (size <= 0 || values.length !== size ** 2) return null;

  return (
    <div role="tic-tac-toe-field">
      {values.map((item, index) => (
        <TicTacToeCell key={index} value={item} />
      ))}
    </div>
  );
};

export default TicTacToeField;
