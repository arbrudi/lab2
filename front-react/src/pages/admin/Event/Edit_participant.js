import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import '../css/Events_.css';

const Edit_Participant = () => {
    const { Event_ID, User_ID } = useParams();
    const [participant, setParticipant] = useState({});
    const [event, setEvent] = useState({});
    const [formData, setFormData] = useState({
        User_ID: "",
    });

    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const responseParticipant = await axios.get(`/admin/event_participant/${Event_ID}/${User_ID}`);
                setParticipant(responseParticipant.data);
            } catch (error) {
                console.error("Error fetching participant:", error);
            }
        };

        const fetchEvent = async () => {
            try {
                const responseEvent = await axios.get(`/admin/event/${Event_ID}`);
                setEvent(responseEvent.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchParticipant();
        fetchEvent();
    }, [Event_ID, User_ID]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/event_participant/update/${Event_ID}/${formData.User_ID}`);
            window.location.href = "/admin/event";
        } catch (error) {
            console.error("Error updating participant:", error);
        }
    };

    return (
        <div className="container_p">
            <h1>Edit Participant for Event: {event.Event_title}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID</label>
                    <input type="text" name="User_ID" value={formData.User_ID} onChange={handleChange} />
                </div>
                <button type="submit">Update </button>
            </form>
            <Link className="cancel" to={'/admin/event'}>Cancel</Link>
        </div>
    );
};

export default Edit_Participant;
