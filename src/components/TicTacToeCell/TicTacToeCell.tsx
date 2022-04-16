import React, { FC } from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';

type TicTacToeCellProps = {
  value: TicTacToeCellValues;
};

const TicTacToeCell: FC<TicTacToeCellProps> = ({ value }) => {
  const cellContentMapping = {
    [TicTacToeCellValues.Empty]: '',
    [TicTacToeCellValues.Cross]: 'X',
    [TicTacToeCellValues.Circle]: 'O',
  };

  return <div role="tic-tac-toe-cell">{cellContentMapping[value]}</div>;
};

export default TicTacToeCell;
