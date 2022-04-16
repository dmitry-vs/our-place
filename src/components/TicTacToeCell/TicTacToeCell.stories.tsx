import React from 'react';
import TicTacToeCell from './TicTacToeCell';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TicTacToeCellValues } from '../../helpers/consts';

export default {
  component: TicTacToeCell,
  title: 'TicTacToe/TicTacToeCell',
} as ComponentMeta<typeof TicTacToeCell>;

const Template: ComponentStory<typeof TicTacToeCell> = (args) => (
  <TicTacToeCell {...args} />
);

export const Empty = Template.bind({});
Empty.args = { value: TicTacToeCellValues.Empty };

export const Cross = Template.bind({});
Cross.args = { value: TicTacToeCellValues.Cross };

export const Circle = Template.bind({});
Circle.args = { value: TicTacToeCellValues.Circle };

export const Clickable = Template.bind({});
Clickable.args = {
  value: TicTacToeCellValues.Cross,
  handleClick: () => {
    console.log('cell clicked');
  },
};
