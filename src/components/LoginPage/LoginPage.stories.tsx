import React from 'react';
import LoginPage from './LoginPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: LoginPage,
  title: 'Pages/LoginPage',
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => (
  <LoginPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handleLogin: (userName) => alert(`Login, user name: ${userName}`),
};
