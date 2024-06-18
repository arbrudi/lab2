import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminBar';
import axios from 'axios';
import '../../../assets/css/Create.css'; 

const Create_Sponsor = () => {
    const [formData, setFormData] = useState({
        Logo: "",
        Sponsor_name: "",
        Joined_on: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/sponsors/create', formData);
            navigate('/admin/sponsors');
            alert("Sponsor registered successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container_c">
            <h1>Add a New Sponsor</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}> 
                <label>
                    Logo:
                    <input type="text" name="Logo" value={formData.Logo} onChange={handleChange} />
                </label> 
                <label>
                    Sponsor name:
                    <input type="text" name="Sponsor_name" value={formData.Sponsor_name} onChange={handleChange} />
                </label>
                <label>
                    Date joined:
                    <input type='date' name="Joined_on" value={formData.Joined_on} onChange={handleChange}></input>
                </label>
                <button type="submit">Create Sponsor</button>
            </form>
        </div>
    );
};

export default Create_Sponsor;