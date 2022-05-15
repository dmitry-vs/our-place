import React, { Component, MouseEventHandler } from 'react';
import {
  TicTacToeCellValues,
  TIC_TAC_TOE_CELL_CONTENT_MAPPING,
} from '../../helpers/consts';

type TicTacToeCellProps = {
  value: TicTacToeCellValues;
  handleClick?: MouseEventHandler;
  className?: string;
};

class TicTacToeCell extends Component<TicTacToeCellProps> {
  shouldComponentUpdate(nextProps: Readonly<TicTacToeCellProps>): boolean {
    const { value, handleClick, className } = this.props;

    if (value !== nextProps.value || handleClick !== nextProps.handleClick) {
      return true;
    }

    return (
      (!className && !!nextProps.className) ||
      (!!className && !nextProps.className)
    );
  }

  render() {
    const { value, handleClick, className } = this.props;

    return (
      <div role="tic-tac-toe-cell" onClick={handleClick} className={className}>
        {TIC_TAC_TOE_CELL_CONTENT_MAPPING[value]}
      </div>
    );
  }
}

export default TicTacToeCell;
