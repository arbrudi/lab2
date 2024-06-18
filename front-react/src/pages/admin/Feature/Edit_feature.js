import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Edit_Feature = () => {
    const { id } = useParams();
    const [feature, setFeature] = useState({});
    const [formData, setFormData] = useState({ 
        icon: "",
        name: "", 
        description: ""
    });

    useEffect(() => {
        const fetchFeature = async () => {
            try {
                const response = await axios.get(`/admin/feature/${id}`);
                setFeature(response.data);
                setFormData({ 
                    icon: response.data.icon,
                    name: response.data.name,
                    description: response.data.description
                });
            } catch (error) {
                console.error("Error fetching feature:", error);
            }
        };

        fetchFeature();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/feature/update/${id}`, formData);
            window.location.href = "/admin/features";
        } catch (error) {
            console.error("Error updating feature:", error);
        }
    };

    return (
        <div>
            <h1>Edit Feature</h1>
            <form onSubmit={handleSubmit}> 
                <div>
                    <label>Icon:</label>
                    <input type="text" name="icon" value={formData.icon} onChange={handleChange} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>
                <button type="submit">Update Feature</button>
            </form>
            <Link to={'/admin/features'}>Cancel</Link>
        </div>
    );
};

export default Edit_Feature;