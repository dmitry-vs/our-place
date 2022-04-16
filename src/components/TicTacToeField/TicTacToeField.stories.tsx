import React from 'react';
import TicTacToeField from './TicTacToeField';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TicTacToeCellValues } from '../../helpers/consts';

export default {
  component: TicTacToeField,
  title: 'TicTacToe/TicTacToeField',
} as ComponentMeta<typeof TicTacToeField>;

const Template: ComponentStory<typeof TicTacToeField> = (args) => (
  <TicTacToeField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  size: 3,
  values: [
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Cross,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Circle,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Empty,
    TicTacToeCellValues.Cross,
  ],
};