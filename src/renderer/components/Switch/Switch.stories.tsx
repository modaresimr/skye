import React from 'react';
import SwitchComponent from '.';
import { ComponentStory } from '@storybook/react';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Switch',
  component: SwitchComponent,
};
export const Switch: ComponentStory<typeof SwitchComponent> = (args) => (
  <SwitchComponent {...args} />
);
