import React from 'react';
import { Button } from './Button';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
};
export const Primary = () => (
  <Button type="contained" primary>
    Button
  </Button>
);

export const Secondary = () => (
  <Button type="contained" secondary>
    Button
  </Button>
);

export const Dark = () => (
  <Button type="contained" dark>
    Button
  </Button>
);

export const Light = () => (
  <Button type="contained" light>
    Button
  </Button>
);

export const Warning = () => (
  <Button type="contained" warning>
    Button
  </Button>
);

export const Danger = () => (
  <Button type="contained" danger>
    Button
  </Button>
);

export const Success = () => (
  <Button type="contained" success>
    Button
  </Button>
);
