import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateParticipant = () => {
    const [formData, setFormData] = useState({
        Event_ID: "",
        User_ID: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/event_participant/create', formData);
            navigate('/admin/event');
            alert("Participant registered successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Add a new Participant</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Event ID:
                    <input type="text" name="Event_ID" value={formData.Event_ID} onChange={handleChange} />
                </label>
                <label>
                    User ID:
                    <input type="text" name="User_ID" value={formData.User_ID} onChange={handleChange} />
                </label> 
                
                <button type="submit">Create Participant</button>
            </form>
        </div>
    );
}

export default CreateParticipant;