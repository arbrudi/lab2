import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        Name:'' ,
        Surname: '',
        User_Role: 'admin',
        Email: '',
        Username: '',
        Password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', formData);
            navigate('/login')
            
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

  return (
    <div>
        <div>
            <h1>Register Page</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                <label>Name:</label>
                <input type="text" name="Name"  value={formData.Name} onChange={handleChange} required></input>
                </div>
                <div>
                <label>Surname:</label>
                <input type="text" name ="Surname" value={formData.Surname} onChange={handleChange}required ></input>
                </div>
                <div>
                <label >Email:</label>
                <input type="email" name="Email"value={formData.Email} onChange={handleChange} required></input>
                </div>
                <div>
                <label >Username:</label>
                <input type="text" name ="Username" value={formData.Username} onChange={handleChange} required></input>
                </div>
                <div>
                <label >Password:</label>
                <input type = "password" name="Password" value={formData.Password} onChange={handleChange} required ></input>
                </div>
                <button>Submit</button>
            </div>
        </form>
    </div>
  );
};

export default RegisterPage;
