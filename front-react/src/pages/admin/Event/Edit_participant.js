import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import '../css/Events_.css';

const Edit_Participant = () => {
    const { Event_ID, User_ID } = useParams();
    const [participant, setParticipant] = useState({});
    const [event, setEvent] = useState({});
    const [formData, setFormData] = useState({
        User_ID: "",
        Name: ""
    });
    const [userNames, setUserNames] = useState([]);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const responseParticipant = await axios.get(`/admin/event_participant/${Event_ID}/${User_ID}`);
                setParticipant(responseParticipant.data);
                setFormData({ User_ID: responseParticipant.data.User_ID, Name: responseParticipant.data.Name });
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

        const fetchUserNames = async () => {
            try {
                const response = await axios.get("/admin/users");
                setUserNames(response.data.map((user) => user.Name));
            } catch (error) {
                console.error("Error fetching user names:", error);
            }
        };

        fetchParticipant();
        fetchEvent();
        fetchUserNames();
    }, [Event_ID, User_ID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "Name" && value) {
            const selectedUserId = userNames.findIndex((user) => user === value);
            if (selectedUserId !== -1) {
                setUserId(selectedUserId + 1);
            } else {
                setUserId(null);
                setError("User not found");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError("Invalid user name");
            return;
        }

        try {
            await axios.put(`/admin/event_participant/update/${Event_ID}/${User_ID}`, { Name: formData.Name });
            navigate("/admin/event");
            alert("Participant updated successfully!");
        } catch (error) {
            console.error("Error updating participant:", error);
            setError(error.message);
        }
    };

    return (
        <div className="container_p">
            <h1>Edit Participant for Event: {event.Event_title}</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <select name="Name" value={formData.Name} onChange={handleChange}>
                        <option value="">Select a user</option>
                        {userNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
            <Link className="cancel" to={'/admin/event'}>Cancel</Link>
        </div>
    );
};

export default Edit_Participant;