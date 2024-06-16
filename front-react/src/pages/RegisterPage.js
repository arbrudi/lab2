import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './pages_css/RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        Name: '' ,
        Surname: '',
        User_Role: 'admin',
        Email: '',
        Username: '',
        Password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', formData);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register">
        <div className="register-container">
            <div className = "cont_reg_">
            <div className="to-login">
                <h1 className="h1-log">Already have an account?</h1>
                <p className="p-log">Then what are you waiting for? Login and rate some more!</p>
                <button className="b-log"><Link to="/login">Login</Link></button>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
            <h1 className="register-header">Sign up here!</h1>
                <input 
                    type="text" 
                    name="Name" 
                    value={formData.Name} 
                    onChange={handleChange}
                    placeholder="Name" 
                    required 
                    className="register-input" 
                />
                
                <input 
                    type="text" 
                    name="Surname" 
                    placeholder="Surname"
                    value={formData.Surname} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <input 
                    type="email" 
                    name="Email"
                    placeholder="Email" 
                    value={formData.Email} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <input 
                    type="text" 
                    name="Username" 
                    placeholder="Username"
                    value={formData.Username} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <input 
                    type="password" 
                    name="Password" 
                    placeholder="Password"
                    value={formData.Password} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <button type="submit" className="register-button">Submit</button>
            </form>
        </div> 
            </div>
        </div>
    );
};

export default RegisterPage;