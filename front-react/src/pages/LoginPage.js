import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../pages/pages_css/Loginpage.css'

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      
      if (response.data.role === 'admin') {
        navigate('/admin/user',{replace:true});

        localStorage.setItem("adminToken", JSON.stringify({
          role: "admin",
          token: response.data.token,
          User: response.data.ID
        }));
        window.location.reload();
      
      } else if (response.data.role === 'client') {
        navigate('/user/book', {replace:true});

        localStorage.setItem("userToken", JSON.stringify({
          role: "client",
          token: response.data.token,
          User: response.data.ID
        }));
        window.location.reload();
      
      } else {
        setError('Please contact your administrator!');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="page-container">
      <div className="container_cl">
        <div className="login-title">
          <h1>Login to Your Account</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="user_login">
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="pass_login">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="log-submit">
            <button type="submit">Login</button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
      <div className="register-link">
        <h1>New Here?</h1>
        <p>Ready to dive into the world of books? Discover new stories, share your thoughts, and connect with fellow book lovers. Embark on your bookish adventure!</p>
        <div className="reg-button">
          <button><Link to="/register">Register</Link></button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
