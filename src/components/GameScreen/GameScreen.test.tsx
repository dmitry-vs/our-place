import React from 'react';
import GameScreen from './GameScreen';
import { cleanup, render, screen } from '@testing-library/react';

describe('GameScreen', () => {
  const gameScreeRole = 'game-screen';
  const ticTacToeGameRole = 'tic-tac-toe-game';
  const testUserName = 'Test User';

  afterEach(() => {
    cleanup();
  });

  test('no userName, then renders empty element', () => {
    render(<GameScreen userName={null} />);
    expect(screen.getByRole(gameScreeRole)).toBeEmptyDOMElement();
    expect(screen.queryByRole(ticTacToeGameRole)).toBeNull();
  });

  test('userName from local storage, then renders game', () => {
    render(<GameScreen userName={testUserName} />);
    expect(screen.getByRole(gameScreeRole)).not.toBeEmptyDOMElement();
    expect(screen.getByRole(ticTacToeGameRole)).toBeInTheDocument();
  });
});
