import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import "../css/Create.css";

const Edit_footballer = () => {
    const { id } = useParams();
    const [sponsor, setSponsor] = useState({});

    const [formData, setFormData] = useState({ 
        GroupName: "",
        Description:""
    });

    useEffect(() => {
        const fetchSponsor = async () => {
            try {
                const response = await axios.get(`/group/${id}`);
                setSponsor(response.data);
                setFormData({ 
                    GroupName: response.data.GroupName,
                    Description: response.data.Description
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
            <h1>Edit Group</h1>
            <form onSubmit={handleSubmit}> 
                <div>
                    <label>GroupName:</label>
                    <input type="text" name="GroupName" value={formData.GroupName} onChange={handleChange} />
                    <label>Description:</label>
                    <input type="text" name="Description" value={formData.Description} onChange={handleChange} />
                
                </div>
                <button type="submit">Update Name</button>
            </form>
            <Link to={'/footballer'}>Cancel</Link>
        </div>
    );
};

export default Edit_footballer;