import React, { FC } from 'react';
import {
  TIC_TAC_TOE_FIELD_SIZE,
  TicTacToeFieldValues,
} from '../../helpers/consts';
import TicTacToeCell from '../TicTacToeCell';
import s from './TicTacToeField.module.scss';
import clsx from 'clsx';
import { css } from '@emotion/css';

type TicTacToeFieldProps = {
  values: TicTacToeFieldValues;
  handleCellClick: (index: number) => void;
  className?: string;
};

const TicTacToeField: FC<TicTacToeFieldProps> = ({
  values,
  handleCellClick,
  className,
}) => {
  return (
    <div
      role="tic-tac-toe-field"
      className={clsx(
        s.field,
        css`
          max-width: ${TIC_TAC_TOE_FIELD_SIZE * 100}px;
          grid-template-rows: repeat(${TIC_TAC_TOE_FIELD_SIZE}, 1fr);
          grid-template-columns: repeat(${TIC_TAC_TOE_FIELD_SIZE}, 1fr);
        `,
        className
      )}
    >
      {values.map((item, index) => (
        <TicTacToeCell
          key={index}
          value={item}
          className={s.cell}
          handleClick={() => handleCellClick(index)}
        />
      ))}
    </div>
  );
};

export default TicTacToeField;
