import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthPage from '../../pages/auth/index'; 
import RegisterForm from '../../components/forms/register';
import LoginForm from '../../components/forms/login';

jest.mock('../../components/forms/register', () => ({
  __esModule: true,
  default: ({ moveTo }) => (
    <div>
      <button onClick={() => moveTo('LOGIN')}>Switch to Login</button>
      RegisterForm
    </div>
  )
}));

jest.mock('../../components/forms/login', () => ({
  __esModule: true,
  default: ({ moveTo }) => (
    <div>
      <button onClick={() => moveTo('REGISTER')}>Switch to Register</button>
      LoginForm
    </div>
  )
}));

describe('AuthPage Component Tests', () => {
  it('renders RegisterForm by default', () => {
    render(<AuthPage />);
    expect(screen.getByText('RegisterForm')).toBeInTheDocument();
    expect(screen.queryByText('LoginForm')).toBeNull();
  });

  it('switches to LoginForm when moveTo is invoked with "LOGIN"', () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText('Switch to Login'));
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
    expect(screen.queryByText('RegisterForm')).toBeNull();
  });

  it('switches back to RegisterForm from LoginForm', () => {
    render(<AuthPage />);
    fireEvent.click(screen.getByText('Switch to Login'));
    fireEvent.click(screen.getByText('Switch to Register'));
    expect(screen.getByText('RegisterForm')).toBeInTheDocument();
    expect(screen.queryByText('LoginForm')).toBeNull();
  });
});
