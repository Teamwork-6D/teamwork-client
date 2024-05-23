import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './login';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn().mockImplementation(() => ({}))
}));

global.fetch = require('jest-fetch-mock');

describe('LoginForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
      console.error.mockRestore();
  });


  test('allows entering an email and password', () => {
    render(<LoginForm moveTo={() => {}} />, { wrapper: Router });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
    expect(screen.getByPlaceholderText(/email/i).value).toBe('test@example.com');
    expect(screen.getByPlaceholderText(/password/i).value).toBe('password');
  });

  test('submits the form and navigates on successful login', async () => {
    const moveTo = jest.fn();
    fetch.mockResponseOnce(JSON.stringify({ user: { id: '123' } }));

    render(<LoginForm moveTo={moveTo} />, { wrapper: Router });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(fetch).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    }));
  });

  test('displays error message on failed login', async () => {
    fetch.mockReject(new Error('login failed')); 
    render(<LoginForm moveTo={() => {}} />, { wrapper: Router });
  
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    await waitFor(() => {
      const errorElement = screen.queryByText(/Error: Login failed/);
      expect(errorElement).toBeInTheDocument();
    });
  });
});
