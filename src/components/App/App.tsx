import React, { Component } from 'react';
import LoginPage from '../LoginPage';
import MainPage from '../MainPage';

type AppState = {
  userName: string | null;
};

class App extends Component<{}, AppState> {
  state: AppState = {
    userName: 'Test',
  };

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

  handleLoginSubmit = (userName: string) => {
    this.setState({ userName });
  };

  handleLogoutClick = () => {
    this.setState({ userName: null });
  };

  render() {
    const { userName } = this.state;

    return userName ? (
      <MainPage userName={userName} handleLogout={this.handleLogoutClick} />
    ) : (
      <LoginPage handleSubmit={this.handleLoginSubmit} />
    );
  }
}

export default App;
