import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@mui/material';

import { NewTodoProps, NewTodoDialog } from '../components/new-todo-dialog';

export default {
  title: 'New Todo Dialog',
  component: NewTodoDialog,
  argTypes: {
    title: { type: "string" }
  },
} as ComponentMeta<typeof NewTodoDialog>;

const Template: ComponentStory<typeof NewTodoDialog> = (args: NewTodoProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create new task</Button>
      <NewTodoDialog {...args} open={open} handleClose={() => setOpen(false)} />
    </div>
  )
};

export const Main = Template.bind({});
Main.args = {
  addToArray: () => {},
  dialogTitle: "Add a task",
  buttonText: "Add task",
  inputLabel: "",
} as Partial<NewTodoProps>;