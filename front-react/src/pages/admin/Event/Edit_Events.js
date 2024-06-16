import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import '../../../assets/css/Create.css';
const Edit_Events = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [formData, setFormData] = useState({ 
        Event_title: "",
        Event_image: "", 
        Event_description: "",
        Event_date: ""
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/admin/event/${id}`);
                setEvent(response.data);
                setFormData({ 
                    Event_title: response.data.Event_title,
                    Event_image: response.data.Event_image,
                    Event_description: response.data.Event_description,
                    Event_date: response.data.Event_date
                });
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/event/update/${id}`, formData);
            window.location.href = "/admin/events";
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
        <div>
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}> 
            <div>
                    <label>Event Title:</label>
                    <input type="text" name="Event_title" value={formData.Event_title} onChange={handleChange} />
                </div>
                <div>
                    <label>Event Image URL:</label>
                    <input type="text" name="Event_image" value={formData.Event_image} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="Event_description" value={formData.Event_description} onChange={handleChange} />
                </div>
                <div>
                    <label>Event Date:</label>
                    <input type="date" name="Event_date" value={formData.Event_date} onChange={handleChange} />
                </div>
                <button type="submit">Update Event</button>
            </form>
            <Link to={'/admin/events'}>Cancel</Link>
        </div>
    );
};

export default Edit_Events;