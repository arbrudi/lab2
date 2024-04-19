import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/AdminBar';
import axios from 'axios';

const Create_Event = () => {
    const [formData, setFormData] = useState({
        Event_ID: "",
        Event_image: "",
        Event_description: "",
        Event_date: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/event/create', formData);
            navigate('/admin/event');
            alert("Event registered successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <AdminNav />
            <h1>Add a New Event</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Event ID:
                    <input type="text" name="Event_ID" value={formData.Event_ID} onChange={handleChange} />
                </label>
                <label>
                    Event Image URL:
                    <input type="text" name="Event_image" value={formData.Event_image} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="Event_description" value={formData.Event_description} onChange={handleChange}></textarea>
                </label>
                <label>
                    Event Date:
                    <input type="date" name="Event_date" value={formData.Event_date} onChange={handleChange} />
                </label>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default Create_Event;