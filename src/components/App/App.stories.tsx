import React from 'react';
import App from './App';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  component: App,
  title: 'General/App',
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const Default = Template.bind({});
