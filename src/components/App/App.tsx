import React, { Component } from 'react';
import { AuthProvider } from '../AuthProvider';
import Navigation from '../Navigation';

class App extends Component<{}> {
  componentDidMount() {
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.handlePromiseRejection
    );
  }

  handlePromiseRejection = (e: PromiseRejectionEvent) => {
    // eslint-disable-next-line no-console
    console.log('Promise rejection error:', e);
  };

  render() {
    return (
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    );
  }
}

export default App;
