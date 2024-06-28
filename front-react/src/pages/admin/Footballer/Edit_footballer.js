import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import "../css/Create.css";

const Edit_footballer = () => {
    const { id } = useParams();
    const [sponsor, setSponsor] = useState({});
    const [formData, setFormData] = useState({ 
        Name: "",
    });

    useEffect(() => {
        const fetchSponsor = async () => {
            try {
                const response = await axios.get(`/team/${id}`);
                setSponsor(response.data);
                setFormData({ 
                    Name: response.data.Name,
                });
            } catch (error) {
                console.error("Error fetching team:", error);
            }
        };

        fetchSponsor();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/team/update/${id}`, formData);
            window.location.href = "/footballer";
        } catch (error) {
            console.error("Error updating team:", error);
        }
    };

    return (
        <div className="container_c">
            <h1>Edit Team</h1>
            <form onSubmit={handleSubmit}> 
                <div>
                    <label>Name:</label>
                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
                </div>
                <button type="submit">Update Name</button>
            </form>
            <Link to={'/footballer'}>Cancel</Link>
        </div>
    );
};

export default Edit_footballer;