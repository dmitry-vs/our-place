import React from 'react';
import GameScreen from './GameScreen';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../../ducks/store';

export default {
  title: 'Screens/GameScreen',
  component: GameScreen,
} as ComponentMeta<typeof GameScreen>;

export const Example: ComponentStory<typeof GameScreen> = (args) => (
  <Provider store={createAppStore({ auth: { userName: 'Test User' } })}>
    <GameScreen {...args} />
  </Provider>
);
