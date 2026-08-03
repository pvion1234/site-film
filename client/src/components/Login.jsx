import { useState } from 'react';
import api from '../utils/api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErreur('');

    api.post('/api/auth/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        onLogin(response.data.username);
      })
      .catch(error => {
        setErreur('Invalid username or password');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Login</h2>
      {erreur && <p className="erreur-login">{erreur}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;