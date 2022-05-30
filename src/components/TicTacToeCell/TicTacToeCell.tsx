import React, { FC, MouseEventHandler } from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';
import { getTicTacToeCellContent } from '../../helpers/utils';

type TicTacToeCellProps = {
  value: TicTacToeCellValues;
  handleClick?: MouseEventHandler;
  className?: string;
};

const TicTacToeCell: FC<TicTacToeCellProps> = ({
  handleClick,
  className,
  value,
}) => (
  <div role="tic-tac-toe-cell" onClick={handleClick} className={className}>
    {getTicTacToeCellContent(value)}
  </div>
);

export default TicTacToeCell;
