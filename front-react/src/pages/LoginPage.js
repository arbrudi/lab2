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
      
      if (response.data.role === 'admin') {
        // Redirect to user dashboard
        navigate('/admin',{replace:true})

        localStorage.setItem("adminToken", JSON.stringify({
          role : "admin",
          token : response.data.token,
          User :response.data.ID

        }))
        window.location.reload()
      
     }else if (response.data.role === 'client'){
              // Redirect to user dashboard
              navigate('/about',{replace:true})

              localStorage.setItem("userToken", JSON.stringify({
                role : "client",
                token : response.data.token,
                User :response.data.ID
      
              }))
              window.location.reload()
      
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

  const logoutFunction = ()=>{
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    setTimeout(() => {navigate("/login", {replace:true})}, 400);
    setTimeout(()=> { window.location.reload()},500)
}


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
      <button onClick={()=> logoutFunction()}>Logout</button>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginPage;
