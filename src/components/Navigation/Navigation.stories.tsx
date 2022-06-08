import React from 'react';
import { storiesOf } from '@storybook/react';
import { AuthProvider } from '../AuthProvider';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';

storiesOf('General/Navigation', module)
  .addDecorator((story) => (
    <BrowserRouter>
      <AuthProvider>{story()}</AuthProvider>
    </BrowserRouter>
  ))
  .add('Example', () => <Navigation />);
