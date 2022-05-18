import React from 'react';
import App from './App';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
mock.onGet('https://jsonplaceholder.typicode.com/users').reply(200, [
  {
    id: 1,
    name: 'Test User Name 1',
    email: 'test-user-email-1@test.ru',
  },
  {
    id: 2,
    name: 'Test User Name 2',
    email: 'test-user-email-2@test.ru',
  },
  {
    id: 3,
    name: 'Test User Name 3',
    email: 'test-user-email-3@test.ru',
  },
]);

export default {
  component: App,
  title: 'General/App',
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const Default = Template.bind({});
