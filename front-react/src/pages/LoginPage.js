import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { Username: username, Password: password });
      const { token, user_id, role } = response.data;
      
      localStorage.setItem('token', token); 
      localStorage.setItem('user_id', user_id); // Store user_id in localStorage

      if (role === 'admin') {
        navigate('/admin'); 
      } else if (role === 'client') {
        navigate('/client'); 
      } else {
        setError('Please contact your administrator!');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setError('Invalid username or password');
      setLoginMessage(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id'); // Remove user_id from localStorage
    navigate('/login'); 
  };

  return (
    <div>
      <h1>Login Page</h1>
      {loginMessage && <p>{loginMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginPage;