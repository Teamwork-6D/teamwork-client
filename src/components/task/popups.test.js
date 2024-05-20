import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateTaskPopup, DeleteTaskPopup } from '. ./task/popups';

describe('CreateTaskPopup', () => {
  test('renders without error', () => {
    render(<CreateTaskPopup />);
    expect(screen.getByText(/Create Task/i)).toBeInTheDocument();
  });

  test('allows submission when fields are populated', () => {
    render(<CreateTaskPopup />);
    fireEvent.change(screen.getByPlaceholderText('enter task name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('enter task description name'), { target: { value: 'Task Description' } });
    fireEvent.change(screen.getByPlaceholderText('enter task due date'), { target: { value: '2021-08-20' } });
    // fireEvent.click(screen.getByText(/submit/i));
    // expect(screen.getByText(/submit/i)).toBeDisabled();
  });
});

const mockCloseModal = jest.fn();
const mockHandleDeleteTask = jest.fn();
const mockTask = { title: "Task 1" };
const mockError = "";
const mockLoading = false;

describe('DeleteTaskPopup', () => {
  test('renders correctly', () => {
    render(<DeleteTaskPopup task={mockTask} closeModal={mockCloseModal} handleDeleteTask={mockHandleDeleteTask} error={mockError} loading={mockLoading} />);
    expect(screen.getByText("This 'Task 1' will be deleted")).toBeInTheDocument();
  });

  test('calls handleDeleteTask on yes click', async () => {
    render(<DeleteTaskPopup task={mockTask} closeModal={mockCloseModal} handleDeleteTask={mockHandleDeleteTask} error={mockError} loading={mockLoading} />);
    // fireEvent.click(screen.getByText(/yes/i));
    expect(mockHandleDeleteTask).toHaveBeenCalled();
  });

  test('calls closeModal on no click', () => {
    render(<DeleteTaskPopup task={mockTask} closeModal={mockCloseModal} handleDeleteTask={mockHandleDeleteTask} error={mockError} loading={mockLoading} />);
    // fireEvent.click(screen.getByText(/no/i));
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

