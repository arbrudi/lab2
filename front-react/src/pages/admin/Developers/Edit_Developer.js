import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import "../css/Create.css";

const Edit_Developer = () => {
    const { id } = useParams();
    const [Developer, setDeveloper] = useState({});
    const [formData, setFormData] = useState({ 
        icon: "",
        name: "", 
        description: ""
    });

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await axios.get(`/admin/Developer/${id}`);
                setDeveloper(response.data);
                setFormData({ 
                    icon: response.data.icon,
                    name: response.data.name,
                    description: response.data.description
                });
            } catch (error) {
                console.error("Error fetching Developer:", error);
            }
        };

        fetchDevelopers();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/Developer/update/${id}`, formData);
            window.location.href = "/admin/Developer";
        } catch (error) {
            console.error("Error updating feature:", error);
        }
    };

    return (
        <div className="container_c">
            <h1>Edit Developer</h1>
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
                <button type="submit">Update Developer</button>
            </form>
            <Link to={'/admin/Developer'}>Cancel</Link>
        </div>
    );
};

export default Edit_Developer;