import React, { FC } from 'react';
import { TicTacToeCellValues } from '../../helpers/consts';
import TicTacToeCell from '../TicTacToeCell';
import s from './TicTacToeField.module.scss';
import clsx from 'clsx';
import { css } from '@emotion/css';

type TicTacToeFieldProps = {
  size: number;
  values: Array<TicTacToeCellValues>;
};

const TicTacToeField: FC<TicTacToeFieldProps> = ({ values, size }) => {
  if (size <= 0 || values.length !== size ** 2) return null;

  return (
    <div
      role="tic-tac-toe-field"
      className={clsx(
        s.field,
        css`
          max-width: ${size * 100}px;
          grid-template-rows: repeat(${size}, 1fr);
          grid-template-columns: repeat(${size}, 1fr);
        `
      )}
    >
      {values.map((item, index) => (
        <TicTacToeCell
          key={index}
          value={item}
          className={s.cell}
          handleClick={() => console.log(index)}
        />
      ))}
    </div>
  );
};

export default TicTacToeField;
