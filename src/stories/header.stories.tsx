import React, { PropsWithChildren } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from '../components/header';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    title: { type: "string" }
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: PropsWithChildren<{}>) => <Header {...args} />;

export const Main = Template.bind({});
Main.args = {
  children: ["React Todo Header"],
} as PropsWithChildren<{}>;