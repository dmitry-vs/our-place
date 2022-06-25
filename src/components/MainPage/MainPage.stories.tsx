import React from 'react';
import MainPage from './MainPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from '../../ducks/store';

export default {
  component: MainPage,
  title: 'Pages/MainPage',
} as ComponentMeta<typeof MainPage>;

export const Example: ComponentStory<typeof MainPage> = (args) => (
  <BrowserRouter>
    <Provider store={createAppStore({ auth: { userName: 'Test User' } })}>
      <MainPage {...args} />
    </Provider>
  </BrowserRouter>
);
