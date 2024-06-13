import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/Create.css';
import axios from 'axios';

const Create_Comics = () => {
    const [formData, setFormData] = useState({
        Comic_ID: "",
        Comic_image: "",
        Comic_title: "",
        Comic_type: "",
        Comic_Description: "",
        Comics_Author_ID: ""
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [Author_list, setAuthor_list] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get("/admin/Comics_Author");
                setAuthor_list(response.data);
            } catch (error) {
                console.error("Error fetching Authors:", error);
            }
        };
        fetchAuthors();
    }, []);


    const handleAuthorChange = (e) => {
        setFormData({ ...formData, Comics_Author_ID: e.target.value });
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/comics/create', formData);
            navigate('/admin/comics');
            alert("Comics registered successfully!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container_c">
            <h1>Create Comic</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Comic ID:
                    <input
                        type="text"
                        name="Comic_ID"
                        value={formData.Comic_ID}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Comic Image URL:
                    <input
                        type="text"
                        name="Comic_image"
                        value={formData.Comic_image}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Author:
                    <select
                        name="Comics_Author_ID"
                        value={formData.Comics_Author_ID}
                        onChange={handleAuthorChange}
                        required
                    >
                        <option value="">Select an author</option>
                        {Author_list.map((author) => (
                            <option key={author.Comics_Author_ID} value={author.Comics_Author_ID}>
                                {author.Author_Name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Title:
                    <input
                        type="text"
                        name="Comic_title"
                        value={formData.Comic_title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Type:
                    <input
                        type="text"
                        name="Comic_type"
                        value={formData.Comic_type}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="Comic_Description"
                        value={formData.Comic_Description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>
                <button type="submit">Create Comic</button>
            </form>
        </div>
    );
}

export default Create_Comics;
