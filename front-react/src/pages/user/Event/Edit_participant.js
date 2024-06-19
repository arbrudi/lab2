import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Edit_Participant = () => {
    const { Event_ID, User_ID } = useParams();
    const [participant, setParticipant] = useState({});
    const [event, setEvent] = useState({});
    const [formData, setFormData] = useState({
        Event_ID: "",
    });

    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const responseParticipant = await axios.get(`/user/event_participant/${User_ID}/${Event_ID}`);
                setParticipant(responseParticipant.data);
            } catch (error) {
                console.error("Error fetching participant:", error);
            }
        };

        const fetchEvent = async () => {
            try {
                const responseEvent = await axios.get(`/user/events/user/${User_ID}`);
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
            await axios.put(`/user/event_participant/update/${formData.Event_ID}/${User_ID}`);
            window.location.href = "/user/event";
        } catch (error) {
            console.error("Error updating participant:", error);
        }
    };

    return (
        <div className="container_p">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event ID</label>
                    <input type="text" name="Event_ID" value={formData.Event_ID} onChange={handleChange} />
                </div>
                <button type="submit">Update</button>
            </form>
            <Link className="cancel" to={'/user/events'}>Cancel</Link>
        </div>
    );
};

export default Edit_Participant;