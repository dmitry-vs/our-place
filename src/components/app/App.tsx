import React from 'react';
import './App.css';
import stylesCss from './App.module.css';
import stylesScss from './App.module.scss';
import stylesSass from './App.module.sass';
import styled from '@emotion/styled';
import { css } from '@emotion/css';

const Div = styled.div`
  color: blueviolet;
`;

const App = () => (
  <>
    <h1>My React App</h1>
    <div className="header">Styled with css (plain)</div>
    <div className={stylesCss.text}>Styled with css (modules)</div>
    <div className={stylesScss.text}>Styled with scss (modules)</div>
    <div className={stylesSass.text}>Styled with sass (modules)</div>
    <Div>Styled with @emotion/styled</Div>
    <div
      className={css`
        font-family: monospace;
      `}
    >
      Styled with @emotion/css
    </div>
  </>
);

export default App;
