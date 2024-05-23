import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; 
import App from './App';


jest.mock('./pages/landing', () => () => <div>LandingPage</div>);
jest.mock('./pages/main', () => () => <div>MainPage</div>);
jest.mock('./pages/project', () => () => <div>ProjectPage</div>);
jest.mock('./pages/auth', () => () => <div>AuthPage</div>);
jest.mock('./components/router', () => ({
  ProtectAuthRoute: ({ children }) => <div>{children}</div>,
  ProtectMainRoute: ({ children }) => <div>{children}</div>
}));

describe("App Route Tests", () => {
  test("renders LandingPage on route '/'", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('LandingPage')).toBeInTheDocument();
  });

  test("renders AuthPage on route '/auth'", () => {
    window.history.pushState({}, '', '/auth');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('AuthPage')).toBeInTheDocument();
  });

  test("renders ProjectPage on route '/projects'", () => {
    window.history.pushState({}, '', '/projects');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('ProjectPage')).toBeInTheDocument();
  });

  test("renders MainPage on route '/projects/:id'", () => {
    window.history.pushState({}, '', '/projects/123');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });
});
