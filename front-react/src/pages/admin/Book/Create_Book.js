import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../../components/adminNav'
import axios from 'axios';

const Create_Book = () => {
    const [formData, setFormData] = useState({
        ISBN: "",
        Book_image: "",
        Book_title: "",
        Book_author: "",
        Book_genre: "",
        Book_description: ""
    });
    const [error, setError] = useState(null);
    const navigate =useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/admin/book/create', formData);
            navigate('/admin/book')
            alert("Book registered successfully!")
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
           
            <h1>Add a new book</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ISBN:
                    <input type="text" name="ISBN" value={formData.ISBN} onChange={handleChange} />
                </label>
                <label>
                    Book Image URL:
                    <input type="text" name="Book_image" value={formData.Book_image} onChange={handleChange} />
                </label>
                <label>
                    Title:
                    <input type="text" name="Book_title" value={formData.Book_title} onChange={handleChange} />
                </label>
                <label>
                    Author:
                    <input type="text" name="Book_author" value={formData.Book_author} onChange={handleChange} />
                </label>
                <label>
                    Genre:
                    <input type="text" name="Book_genre" value={formData.Book_genre} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="Book_description" value={formData.Book_description} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Create Book</button>
            </form>
        </div>
    );
}

export default Create_Book;