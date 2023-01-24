import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
const LoginForm = ({ show, setToken, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('token', token);
    }
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
    login({ variables: { userName: username, password } });
  };

  if (!show) {
    return null;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
