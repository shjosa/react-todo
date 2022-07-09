import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodoListProps, TodoListCard } from '../components/todo-list-card';

export default {
  title: 'Todo List Card',
  component: TodoListCard,
  argTypes: {
    title: { type: "string" }
  },
} as ComponentMeta<typeof TodoListCard>;

const Template: ComponentStory<typeof TodoListCard> = (args: TodoListProps) => <TodoListCard {...args} />;

export const Main = Template.bind({});
Main.args = {
  title: "Todo List Card",
  taskList: [{ key: 0, name: "Play Minecraft", isCompleted: false }, { key: 1, name: "Sleep", isCompleted: false }],
  toggleCompleted: () => {},
  removeFromArray: () => {},
  testid: "",
} as TodoListProps;