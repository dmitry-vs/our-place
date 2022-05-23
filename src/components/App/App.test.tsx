import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const loginPageRole = 'login-page';
  const appNameTextRole = 'app-name-text';

  test('show login page on initial render', () => {
    render(<App />);
    expect(screen.getByRole(loginPageRole)).toBeInTheDocument();
    expect(screen.getByRole(appNameTextRole)).toHaveTextContent('Our Place');
  });
});
