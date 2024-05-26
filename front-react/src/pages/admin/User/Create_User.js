import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Create.css'

import axios from 'axios';

const Create_User = () => {
    const [formData, setFormData] = useState({
        User_ID: "",
        Name: "",
        Surname: "",
        User_Role: "",
        Email: "",
        Username: "",
        Password: ""
    });


    const [error, setError] = useState(null);
    const navigate =useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/user/create', formData);
            navigate('/admin/user')
            alert("User registered successfully!")
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container_c" >
           
            <h1>User</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                Name:
                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
                </label>
                <label>
                Surname:
                    <input type="text" name="Surname" value={formData.Surname} onChange={handleChange} />
                </label>
                <label>
                User_Role:
                <select name="User_Role" value={formData.User_Role} onChange={handleChange}>
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="clinet">client</option>
                </select>
                </label>
                <label>
                Email:
                    <input type="text" name="Email" value={formData.Email} onChange={handleChange} />
                </label>
                <label>
                Username:
                    <input type="text" name="Username" value={formData.Username} onChange={handleChange} />
                </label>
                <label>
                Password:
                    <input type="text" name="Password" value={formData.Password} onChange={handleChange} />
                </label>


                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default Create_User;