import React, { FC } from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';

type TicTacToeFieldProps = {
  size: number;
  values: Array<TicTacToeCellValues>;
};

const TicTacToeField: FC<TicTacToeFieldProps> = () => {
  return <div>TicTacToeField</div>;
};

export default TicTacToeField;
