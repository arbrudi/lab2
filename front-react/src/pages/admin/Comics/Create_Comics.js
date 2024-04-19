import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Create_Comics = () => {
    const [formData, setFormData] = useState({
        Comic_ID: "",
        Comic_image: "",
        Comic_title: "",
        Comic_type: "",
        Comic_Description: ""
    });


    const [error, setError] = useState(null);
    const navigate =useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/comics/create', formData);
            navigate('/admin/comics')
            alert("Comics registered successfully!")
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
           
            <h1>Comics</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Comic ID:
                    <input type="text" name="Comic_ID" value={formData.Comic_ID} onChange={handleChange} />
                </label>
                <label>
                   Comic Image URL:
                    <input type="text" name="Comic_image" value={formData.Comic_image} onChange={handleChange} />
                </label>
                <label>
                    Title:
                    <input type="text" name="Comic_title" value={formData.Comic_title} onChange={handleChange} />
                </label>
                <label>
                    Type:
                    <input type="text" name="Comic_type" value={formData.Comic_type} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="Comic_Description" value={formData.Comic_description} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Create Comic</button>
            </form>
        </div>
    );
}

export default Create_Comics;