import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByTestId('new-item-input');
  fireEvent.change(inputTask, { target: { value: 'Task 1' } });
  const addButton = screen.getByTestId('new-item-button');
  fireEvent.click(addButton);

  fireEvent.change(inputTask, { target: { value: 'Task 1' } });
  fireEvent.click(addButton);

  const tasks = screen.getAllByText('Task 1');
  expect(tasks.length).toBe(1);
});

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const addButton = screen.getByTestId('new-item-button');
  fireEvent.click(addButton);

  const tasks = screen.queryAllByTestId(/task/i);
  expect(tasks.length).toBe(0);
});

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByTestId('new-item-input');
  fireEvent.change(inputTask, { target: { value: 'Task without due date' } });
  const addButton = screen.getByTestId('new-item-button');
  fireEvent.click(addButton);

  const tasks = screen.queryAllByText('Task without due date');
  expect(tasks.length).toBe(0);
});

test('test that App component can be deleted through checkbox', () => {
  render(<App />);
  const inputTask = screen.getByTestId('new-item-input');
  fireEvent.change(inputTask, { target: { value: 'Task to delete' } });
  const inputDate = screen.getByPlaceholderText('mm/dd/yyyy');
  fireEvent.change(inputDate, { target: { value: '06/30/2023' } });
  const addButton = screen.getByTestId('new-item-button');
  fireEvent.click(addButton);

  const deleteCheckbox = screen.getByRole('checkbox');
  fireEvent.click(deleteCheckbox);

  const deletedTask = screen.queryByText('Task to delete');
  expect(deletedTask).toBeNull();
});

test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByTestId('new-item-input');
  fireEvent.change(inputTask, { target: { value: 'Late Task' } });

  const inputDate = screen.getByPlaceholderText('mm/dd/yyyy');
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() - 1);
  fireEvent.change(inputDate, { target: { value: dueDate.toLocaleDateString('en-US') } });

  const addButton = screen.getByTestId('new-item-button');
  fireEvent.click(addButton);

  const lateTaskElement = screen.getByText('Late Task');
  const computedStyle = window.getComputedStyle(lateTaskElement);
  const backgroundColor = computedStyle.backgroundColor;

  expect(backgroundColor).toBe('rgb(255, 204, 204)');
});
