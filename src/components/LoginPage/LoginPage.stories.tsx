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
  handleSubmit: (name) => alert(`User name: ${name}`),
};
