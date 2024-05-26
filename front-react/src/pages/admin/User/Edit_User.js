import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";

const Edit_User = () => {
    const { User_ID } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: "",
        Surname: "",
        User_Role: "",
        Email: "",
        Username: "",
        Password: ""
    });
   

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/admin/user/${User_ID}`);
                setFormData({
                    Name: response.data.Name || "",
                    Surname: response.data.Surname || "",
                    User_Role: response.data.User_Role || "",
                    Email: response.data.Email || "",
                    Username: response.data.Username || "",
                    Password: "" 
                });
          
            } catch (error) {
                console.error("Error fetching User:", error);
              
            }
        };

        fetchUser();
    }, [User_ID]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/user/update/${User_ID}`, formData);
            navigate("/admin/user");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

 


    return (
        <div className="container_c">
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
                </div>
                <div>
                    <label>Surname:</label>
                    <input type="text" name="Surname" value={formData.Surname} onChange={handleChange} />
                </div>
                <div>
                    <label>User Role:</label>
                    <select name="User_Role" value={formData.User_Role} onChange={handleChange}>
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="client">Client</option>
                    </select>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="Username" value={formData.Username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="Password" value={formData.Password} onChange={handleChange} />
                </div>
                <button type="submit">Update User</button>
            </form>
            <Link to="/admin/user">Back</Link>
        </div>
    );
};

export default Edit_User;
