import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './pages_css/RegisterPage.css'; // Import the CSS file

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        Name: '' ,
        Surname: '',
        User_Role: 'client',
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
            <h1 className="register-header">Register Page</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className="register-label">Name:</label>
                <input 
                    type="text" 
                    name="Name" 
                    value={formData.Name} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <label className="register-label">Surname:</label>
                <input 
                    type="text" 
                    name="Surname" 
                    value={formData.Surname} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <label className="register-label">Email:</label>
                <input 
                    type="email" 
                    name="Email" 
                    value={formData.Email} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <label className="register-label">Username:</label>
                <input 
                    type="text" 
                    name="Username" 
                    value={formData.Username} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <label className="register-label">Password:</label>
                <input 
                    type="password" 
                    name="Password" 
                    value={formData.Password} 
                    onChange={handleChange} 
                    required 
                    className="register-input" 
                />
                
                <button type="submit" className="register-button">Submit</button>
            </form>
        </div> 
        </div>
    );
};

export default RegisterPage;