import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      const token = response.data.token;
      
      localStorage.setItem('token', token); 
      
     if (response.data.role === 'admin'){
      navigate('/admin'); 
      
     }else if (response.data.role === 'client'){
      navigate('/client'); 
      
     }else{
      setError('Please contact your admininstrator!');
     }
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setError('Invalid username or password');

      console.error('Login failed:', error.response.data.message);
      setLoginMessage(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
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
