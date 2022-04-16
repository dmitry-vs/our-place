import React, { FC, MouseEventHandler } from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';

type TicTacToeCellProps = {
  value: TicTacToeCellValues;
  handleClick?: MouseEventHandler;
};

const TicTacToeCell: FC<TicTacToeCellProps> = ({ value, handleClick }) => {
  const cellContentMapping = {
    [TicTacToeCellValues.Empty]: '',
    [TicTacToeCellValues.Cross]: 'X',
    [TicTacToeCellValues.Circle]: 'O',
  };

  return (
    <div role="tic-tac-toe-cell" onClick={handleClick}>
      {cellContentMapping[value]}
    </div>
  );
};

export default TicTacToeCell;
