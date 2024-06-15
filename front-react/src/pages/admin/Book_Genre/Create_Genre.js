import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Create.css'

const Create_Genre = () => {
    const [formData, setFormData] = useState({
        Book_Genre_ID: "",
        Genre_Name: "",

    });
    const [error, setError] = useState(null);
    const navigate =useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/book_genre/create', formData);
            navigate('/admin/book')
            alert("Genre registered successfully!")
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container_c">
            <h1>Add a new Genre</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Book Genre ID:
                    <input type="text" name="Book_Genre_ID" value={formData.Book_Genre_ID} onChange={handleChange} />
                </label>
                
                <label>
                    Genre Name:
                    <input type="text" name="Genre_Name" value={formData.Genre_Name} onChange={handleChange} />
                </label>
                <button type="submit">Create Genre</button>
            </form>
        </div>
    );
}

export default Create_Genre;