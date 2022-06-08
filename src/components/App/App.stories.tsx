import React from 'react';
import App from './App';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export default {
  component: App,
  title: 'General/App',
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const Example = Template.bind({});
