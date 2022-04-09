import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <h1>My React App</h1>;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
