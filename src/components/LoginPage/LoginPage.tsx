import React, { ChangeEventHandler, FC, SyntheticEvent, useState } from 'react';
import { css } from '@emotion/css';

type LoginPageProps = {
  handleSubmit: (_: string) => void;
};

const LoginPage: FC<LoginPageProps> = ({ handleSubmit }) => {
  const [name, setName] = useState('');

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const nameTrimmed = name.trim();
    if (!nameTrimmed) return;
    handleSubmit(nameTrimmed);
  };

  return (
    <div
      role="login-page"
      className="h-100 d-flex align-items-center text-center h-100"
    >
      <form
        className={css`
          width: 100%;
          margin: auto;
          max-width: 300px;
        `}
        onSubmit={handleFormSubmit}
      >
        <h1
          role="app-name-text"
          className="display-5 m-0 fw-bold font-monospace"
        >
          Our Place
        </h1>
        <h3 className="h4 fw-normal mt-5">Введите имя пользователя</h3>
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Имя пользователя"
            value={name}
            onChange={handleNameChange}
          />
          <label>Имя пользователя</label>
        </div>
        <button
          className="btn btn-primary btn-lg mt-4 w-100"
          disabled={!name.trim()}
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
