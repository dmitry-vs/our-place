import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './common/App';
import './common/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createAppStore } from './common/store';
import { getStateFromLocalStorage } from './common/utils';

const renderApp = async () => {
  const state = await getStateFromLocalStorage();
  const store = createAppStore(state || undefined);
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
};

renderApp();
