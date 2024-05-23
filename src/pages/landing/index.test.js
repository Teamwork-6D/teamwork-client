import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './index'; 
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn() 
}));

describe('LandingPage Component Tests', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('renders all sub-components of LandingPage', () => {
    renderWithRouter(<LandingPage />);
    expect(screen.getByText('Project Management Tool')).toBeInTheDocument();
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Collaborators')).toBeInTheDocument();
    expect(screen.getByText(/2024 Project Management Tool. All rights reserved./)).toBeInTheDocument();
  });

  it('navigates to /auth when Login or Sign Up buttons are clicked', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate); 

    renderWithRouter(<LandingPage />);
    fireEvent.click(screen.getByText('Login'));
    fireEvent.click(screen.getByText('Sign Up'));
    expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toHaveBeenCalledWith('/auth');
  });
});
