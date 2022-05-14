import React, { FC, MouseEventHandler } from 'react';
import {
  TicTacToeCellValues,
  TIC_TAC_TOE_CELL_CONTENT_MAPPING,
} from '../../helpers/consts';

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
  return (
    <div role="tic-tac-toe-cell" onClick={handleClick} className={className}>
      {TIC_TAC_TOE_CELL_CONTENT_MAPPING[value]}
    </div>
  );
};

export default TicTacToeCell;
