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

test('remove a task', async () => {
  render(<App initialObjArr={[{ key: 0, name: "Read", isCompleted: false }]}/>);
  await waitFor(() => expect(screen.getByText("Read")).toBeInTheDocument());
  const removeButton = screen.getByLabelText("remove Read");
  fireEvent.click(removeButton);
  await waitFor(() => expect(screen.queryByText("Read")).not.toBeInTheDocument());
})

test('set task completed', async () => {
    const user = userEvent.setup();
    render(<App initialObjArr={[{ key: 0, name: "Eat", isCompleted: false }]}/>);
    const activeListEl = screen.getByTestId('active');
    await waitFor(() => expect(getByText(activeListEl, "Eat")).toBeInTheDocument());
    fireEvent.click(getByText(activeListEl, "Eat"));
    const completedListEl = screen.getByTestId('completed');
    await waitFor(() => expect(getByText(completedListEl, "Eat")).toBeInTheDocument());
})

test.only('set task uncompleted', async () => {
  const user = userEvent.setup();
  render(<App initialObjArr={[{ key: 0, name: "Write test code", isCompleted: true }]}/>);
  const completedListEl = screen.getByTestId('completed');
  await waitFor(() => expect(getByText(completedListEl, "Write test code")).toBeInTheDocument());
  fireEvent.click(getByText(completedListEl, "Write test code"));
  const activeListEl = screen.getByTestId('active');
  await waitFor(() => expect(getByText(activeListEl, "Write test code")).toBeInTheDocument());
})