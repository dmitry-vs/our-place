import React from 'react';
import MainPage from './MainPage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export default {
  component: MainPage,
  title: 'Pages/MainPage',
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) => (
  <MainPage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userName: 'Test User Name',
  handleLogout: () => alert('Logout'),
};
