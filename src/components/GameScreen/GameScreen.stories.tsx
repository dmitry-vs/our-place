import React from 'react';
import GameScreen from './GameScreen';
import { storiesOf } from '@storybook/react';

storiesOf('Screens/GameScreen', module).add('Example', () => (
  <GameScreen userName="Test User" />
));
