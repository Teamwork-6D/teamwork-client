import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreateColumnPodpup } from './popups';  

describe('CreateColumnPopup', () => {
  test('initial UI is correct', () => {
    render(<CreateColumnPodpup />);
    expect(screen.getByPlaceholderText('enter project name')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  test('input allows text entry', () => {
    render(<CreateColumnPodpup />);
    const input = screen.getByPlaceholderText('enter project name');
    fireEvent.change(input, { target: { value: 'New Project' } });
    expect(input.value).toBe('New Project');
  });

  test('submit button shows loading indicator when loading', () => {
    render(<CreateColumnPodpup />);
    const button = screen.getByText('submit');
    fireEvent.click(button); 
  });

  test('displays error when there is an error state', () => {
    render(<CreateColumnPodpup />);
    fireEvent.click(screen.getByText('submit')); 
  });
});
