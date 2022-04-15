import React from 'react';
import clsx from 'clsx';
import './App.css';
import s1 from './App.module.css';
import s2 from './App.module.scss';
import s3 from './App.module.sass';

const App = () => (
  <h1 className={clsx('App', s1.App, s2.App, s3.App)}>My React App</h1>
);

export default App;
