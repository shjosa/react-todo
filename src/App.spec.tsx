import React from 'react';
import { fireEvent, render, screen, waitFor, getByText } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders title', () => {
  render(<App />);
  const headingElement = screen.getByText('React Todo');
  expect(headingElement).toBeInTheDocument();
});

test('adding a task', async () => {
    const user = userEvent.setup();
    render(<App />);
    const addTaskButton = screen.getByLabelText('add a to-do');
    fireEvent.click(addTaskButton);
    expect(screen.getByText('Add a task')).toBeInTheDocument();
    const taskNameInput = screen.getByLabelText("task name");
    await user.type(taskNameInput, 'Play Elden Ring');
    const inputTaskButton = screen.getByText("Add Task");
    fireEvent.click(inputTaskButton);
    await waitFor(() => expect(screen.getByText('Play Elden Ring')).toBeInTheDocument());
})

test.skip('set task completed', async () => {
    const user = userEvent.setup();
    render(<App initialObjArr={[{ key: 0, name: "Eat", isCompleted: false }]}/>);
    const activeListEl = screen.getByTestId('active');
    await waitFor(() => expect(getByText(activeListEl, "Eat")).toBeInTheDocument());
    fireEvent.click(getByText(activeListEl, "Eat"));
    const completedListEl = screen.getByTestId('completed');
    await waitFor(() => expect(getByText(completedListEl, "Eat")).toBeInTheDocument());
})

test.todo('remove a task');
test.todo('set task uncompleted');