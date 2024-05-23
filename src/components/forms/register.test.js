import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './register';
import { BrowserRouter as Router } from 'react-router-dom';
import { app } from '../../constants'; 

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn().mockImplementation(() => jest.fn()),
}));

global.fetch = require('jest-fetch-mock');

describe('RegisterForm', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    
    afterEach(() => {
        console.error.mockRestore();
    });

    test('input field updates are reflected in state', () => {
        render(<RegisterForm moveTo={() => {}} />, { wrapper: Router });
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });

        expect(firstNameInput.value).toBe('John');
        expect(lastNameInput.value).toBe('Doe');
        expect(emailInput.value).toBe('john.doe@example.com');
        expect(passwordInput.value).toBe('123456');
    });

    test('form submission with successful registration', async () => {
        fetch.mockResponseOnce(JSON.stringify({ user: { id: '123' } }));
        const moveTo = jest.fn();

        render(<RegisterForm moveTo={moveTo} />, { wrapper: Router });
        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => expect(fetch).toHaveBeenCalled());
        expect(fetch).toHaveBeenCalledWith(`${app.server_url}/users/register`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              firstName: 'John', 
              lastName: 'Doe', 
              email: 'john@example.com',
              password: 'password123'
          })
        });
    });

    test('displays error message on registration failure', async () => {
        fetch.mockReject(new Error('Registration failed')); 
        render(<RegisterForm moveTo={() => {}} />, { wrapper: Router });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
        await waitFor(() => {
            const errorText = /Error:\s*Login failed/i; 
            const errorElement = screen.getByText((content, element) => {
                return errorText.test(content) && element.textContent.match(errorText);
            });
            expect(errorElement).toBeInTheDocument();
        });
    });
    

});
