import React from 'react';
import App from './App';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from '../../ducks/store';

export default {
  title: 'General/App',
  component: App,
} as ComponentMeta<typeof App>;

export const Example: ComponentStory<typeof App> = (args) => (
  <BrowserRouter>
    <Provider store={createAppStore()}>
      <App {...args} />
    </Provider>
  </BrowserRouter>
);
