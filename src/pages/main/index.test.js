import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';  
import MainPage from './index';  

describe('MainPage Component', () => {
  test('should render MainPage component without crashing', () => {
    const { container } = render(<MainPage />);
    expect(container.querySelector('.main-page-nav')).toBeInTheDocument();
  });

  test('should include NavSection', () => {
    const { container } = render(<MainPage />);
    expect(container.querySelector('.main-page-nav')).toBeInTheDocument();
  });

  test('should contain exactly 6 column items', () => {
    const { container } = render(<MainPage />);
    const columnItems = container.querySelectorAll('.column-item');
    expect(columnItems.length).toBe(6);
  });
});
