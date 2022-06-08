import React, { FC } from 'react';
import { AuthProvider, useAuthContext } from './AuthProvider';
import { storiesOf } from '@storybook/react';

const AuthConsumer: FC = () => {
  const { userName, login, logout } = useAuthContext();
  const testUserName = 'Test User';

  return (
    <div>
      {userName ? (
        <>
          Logged in as: {userName}
          <button className="ms-2" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => login(testUserName)}>
          Login as {testUserName}
        </button>
      )}
    </div>
  );
};

storiesOf('General/AuthProvider', module)
  .addDecorator((story) => <AuthProvider>{story()}</AuthProvider>)
  .add('Example', () => <AuthConsumer />);
