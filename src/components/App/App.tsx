import React from 'react';
import TicTacToeGame from '../TicTacToeGame';
import ErrorBoundary from '../ErrorBoundary';

const App = () => (
  <main>
    <ErrorBoundary>
      <TicTacToeGame />
    </ErrorBoundary>
  </main>
);

export default App;
