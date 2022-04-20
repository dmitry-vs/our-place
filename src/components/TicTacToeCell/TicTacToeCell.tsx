import React, { FC, MouseEventHandler } from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';

type TicTacToeCellProps = {
  value: TicTacToeCellValues;
  handleClick?: MouseEventHandler;
  className?: string;
};

const TicTacToeCell: FC<TicTacToeCellProps> = ({
  value,
  handleClick,
  className,
}) => {
  const cellContentMapping = {
    [TicTacToeCellValues.Empty]: '',
    [TicTacToeCellValues.Cross]: 'X',
    [TicTacToeCellValues.Circle]: 'O',
  };

  return (
    <div role="tic-tac-toe-cell" onClick={handleClick} className={className}>
      {cellContentMapping[value]}
    </div>
  );
};

export default TicTacToeCell;
