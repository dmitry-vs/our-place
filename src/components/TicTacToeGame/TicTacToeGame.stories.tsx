import React from 'react';
import TicTacToeGame from './TicTacToeGame';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: TicTacToeGame,
  title: 'TicTacToe/TicTacToeGame',
  decorators: [
    (story) => (
      <main className="container d-flex justify-content-center pt-3 pb-5">
        {story()}
      </main>
    ),
  ],
} as ComponentMeta<typeof TicTacToeGame>;

const Template: ComponentStory<typeof TicTacToeGame> = (args) => (
  <TicTacToeGame {...args} />
);

const testUser = 'Test User Name';

export const Default = Template.bind({});
Default.args = {
  user: testUser,
};
