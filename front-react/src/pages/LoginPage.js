import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

const LoginPage = () => {
 

  const[data, setData] = useState([])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data.members);
        console.log(data.members);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div>
      <h1>Login Page</h1>
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
      </form>
      <div>
        <p>API CALL TESTING</p>
        <h2>Members:</h2>
        <ul>
            {data.map((member, index) => (
            <li key={index}>{member}</li>
            ))}
        </ul>
        </div>
        <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginPage;
