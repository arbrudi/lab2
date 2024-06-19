import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminBar';
import axios from 'axios';
import '../../../assets/css/Create.css'; // Assuming this CSS file contains styles for the Create_Feature component

const Create_Developer = () => {
    const [formData, setFormData] = useState({
        icon: "",
        name: "",
        description: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/Developer/create', formData);
            navigate('/admin/Developer');
            alert("Developer registered successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container_c">
            <AdminNav />
            <h1>Add a New Developer</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}> 
                <label>
                    Icon:
                    <input type="text" name="icon" value={formData.icon} onChange={handleChange} />
                </label> 
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Create Developer</button>
            </form>
        </div>
    );
};

export default Create_Developer;