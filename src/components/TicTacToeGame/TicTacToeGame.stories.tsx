import React from 'react';
import TicTacToeGame from './TicTacToeGame';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { User } from '../../helpers/consts';

export default {
  component: TicTacToeGame,
  title: 'TicTacToe/TicTacToeGame',
} as ComponentMeta<typeof TicTacToeGame>;

const Template: ComponentStory<typeof TicTacToeGame> = (args) => (
  <TicTacToeGame {...args} />
);

const testUser: User = {
  id: 1,
  name: 'StoryBook User',
  email: 'storybook-user@test.ru',
};

export const Default = Template.bind({});
Default.args = {
  user: testUser,
};
