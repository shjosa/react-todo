import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders title', () => {
  render(<App />);
  const headingElement = screen.getByText('React Todo');
  expect(headingElement).toBeInTheDocument();
});

test('adding a task', () => {
    const user = userEvent.setup();
    render(<App />);
    const addTaskButton = screen.getByLabelText('add a to-do');
    fireEvent.click(addTaskButton);
    expect(screen.getByText('Add a task')).toBeInTheDocument();
    const taskNameInput = screen.getByLabelText("task name");
    user.type(taskNameInput, 'Play Elden Ring');
    const inputTaskButton = screen.getByText("Add Task");
    fireEvent.click(inputTaskButton);
    waitFor(() => expect(screen.getByText('Play Elden Ring')).toBeInTheDocument());
})

test.todo('remove a task');
test.todo('set task completed');
test.todo('set task uncompleted');
test.todo('tasks persist after reload');