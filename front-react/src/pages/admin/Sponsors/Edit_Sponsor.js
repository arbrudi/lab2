import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Edit_Sponsor = () => {
    const { id } = useParams();
    const [sponsor, setSponsor] = useState({});
    const [formData, setFormData] = useState({ 
        Logo: "",
        Sponsor_name: "", 
        Joined_on: ""
    });

    useEffect(() => {
        const fetchSponsor = async () => {
            try {
                const response = await axios.get(`/admin/sponsor/${id}`);
                setSponsor(response.data);
                setFormData({ 
                    Logo: response.data.Logo,
                    Sponsor_name: response.data.Sponsor_name,
                    Joined_on: response.data.Joined_on
                });
            } catch (error) {
                console.error("Error fetching sponsor:", error);
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
            await axios.put(`/admin/sponsors/update/${id}`, formData);
            window.location.href = "/admin/sponsors";
        } catch (error) {
            console.error("Error updating sponsor:", error);
        }
    };

    return (
        <div>
            <h1>Edit Sponsor</h1>
            <form onSubmit={handleSubmit}> 
                <div>
                    <label>Logo:</label>
                    <input type="text" name="Logo" value={formData.Logo} onChange={handleChange} />
                </div>
                <div>
                    <label>Sponsor name:</label>
                    <input type="text" name="Sponsor_name" value={formData.Sponsor_name} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="date"name="Joined_on" value={formData.Joined_on} onChange={handleChange} />
                </div>
                <button type="submit">Update Sponsor</button>
            </form>
            <Link to={'/admin/sponsors'}>Cancel</Link>
        </div>
    );
};

export default Edit_Sponsor;