import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import '../../../assets/css/Create.css';
const Edit_participant = () => {
    const { Event_ID } = useParams()
    const [participant, setParticipant] = useState({});
    const [formData, setFormData] = useState({
        User_ID: "",
    });

    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const response = await axios.get(`/admin/event_participant/${Event_ID}`);
                setParticipant(response.data);
                setFormData({
                    User_ID: response.data.User_ID,
                });
            } catch (error) {
                console.error("Error fetching participant:", error);
            }
        };

        fetchParticipant();
    }, [Event_ID]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/event_participant/update/${Event_ID}`, formData);
            window.location.href = "/admin/event";
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
        <div>
            <h1>Edit Participant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User_ID</label>
                    <input type="text" name="User_ID" value={formData.User_ID} onChange={handleChange} />
                </div>
                <button type="submit">Update Participant</button>
            </form>
            <Link to={'/admin/event'}>Cancel</Link>
        </div>
    );
};

export default Edit_participant;