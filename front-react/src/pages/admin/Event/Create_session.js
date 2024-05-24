import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminBar';
import axios from 'axios';
import '../../../assets/css/Create.css'; // Assuming this CSS file contains styles for the Create_Event component

const Create_Event_session = () => {
    const [formData, setFormData] = useState({ 
        Session_ID:"",
        Event_ID: "",
        Session_title: "", 
        Session_description:"", 
        Session_start_time:"", 
        Session_end_time:""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/event_session/create', formData);
            navigate('/admin/event_session');
            alert("Event session registered successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container_c">
            <AdminNav />
            <h1>Add a New Event session</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}> 
            <label>
                    Session ID:
                    <input type="text" name="Session_ID" value={formData.Session_ID} onChange={handleChange} />
                </label>
                <label>
                    Event ID:
                    <input type="text" name="Event_ID" value={formData.Event_ID} onChange={handleChange} />
                </label>
                <label>
                    Session title:
                    <input type="text" name="Session_title" value={formData.Session_title} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="Session_description" value={formData.Session_description} onChange={handleChange}></textarea>
                </label>
                <label>
                    Session Start Date:
                    <input type="date" name="Session_start_time" value={formData.Session_start_time} onChange={handleChange} />
                </label> 
                <label>
                    Session End Date:
                    <input type="date" name="Session_end_time" value={formData.Session_end_time} onChange={handleChange} />
                </label>
                <button type="submit">Create Event session</button>
            </form>
        </div>
    );
};

export default Create_Event_session;
