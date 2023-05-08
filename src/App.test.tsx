import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserForm } from './App';

test('page should render "User Form" as title ', () => {
  render(<UserForm />);
  const linkElement = screen.getByText(/User Form/i);
  expect(linkElement).toBeInTheDocument();
});

test('first name field should include entered value', () => {
  render(<UserForm />);
  const input = screen.getByTestId("first-name") as HTMLInputElement;
  fireEvent.change(input, {target: {value: 'Anıl'}})
  expect(input.value).toBe('Anıl');
});

test('last name field should include entered value', () => {
  render(<UserForm />);
  const input = screen.getByTestId("last-name") as HTMLInputElement;
  fireEvent.change(input, {target: {value: 'Bozkus'}})
  expect(input.value).toBe('Bozkus');
});

test('first name field should show error message when it is empty', async () => {
  render(<UserForm />);
  const input = screen.getByTestId("first-name") as HTMLInputElement;
  fireEvent.change(input, {target: {value: ''}})
  fireEvent.click(screen.getByTestId("submit-button"))
  const errorMessage = await screen.findByTestId("first-name-error") ;
  expect(errorMessage.innerHTML).toBe('*Required');
});

test('first name field should show error message when it is empty', async () => {
  render(<UserForm />);
  const input = screen.getByTestId("first-name") as HTMLInputElement;
  fireEvent.change(input, {target: {value: ''}})
  fireEvent.click(screen.getByTestId("submit-button"))
  const errorMessage = await screen.findByTestId("first-name-error") ;
  expect(errorMessage.innerHTML).toBe('*Required');
});  

test('gender field should show error message when it is empty', async () => {
  render(<UserForm />);
  const input = screen.getByTestId("gender") as HTMLInputElement;
  fireEvent.change(input, {target: {value: ''}})
  fireEvent.click(screen.getByTestId("submit-button"))
  const errorMessage = await screen.findByTestId("gender-error") ;
  expect(errorMessage.innerHTML).toBe('*Required');
});

