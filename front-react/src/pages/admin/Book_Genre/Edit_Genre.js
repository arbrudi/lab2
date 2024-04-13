import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Edit_Genre = () => {
    const { Book_Genre_ID } = useParams()
    const [genre, setGenre] = useState({});
    const [formData, setFormData] = useState({
        Book_Genre_ID: "",
        ISBN: "",
        Genre_Name: "",
        

    });

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axios.get(`/admin/book_genre/${Book_Genre_ID}`);
                setGenre(response.data);
                setFormData({
                    Book_Genre_ID: response.data.Book_Genre_ID,
                    ISBN: response.data.ISBN,
                    Genre_Name: response.data.Genre_Name,
                });
            } catch (error) {
                console.error("Error fetching genre:", error);
            }
        };

        fetchGenre();
    }, [Book_Genre_ID]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/book_genre/update/${Book_Genre_ID}`, formData);
            window.location.href = "/admin/book";
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div>
            <h1>Edit Genre</h1>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label>Genre ID</label>
                    <input type="text" name="Book_Genre_ID" value={formData.Book_Genre_ID} onChange={handleChange} />
                </div>
                <div>
                    <label>ISBN</label>
                    <input type="text" name="ISBN" value={formData.ISBN} onChange={handleChange} />
                </div>
                <div>
                    <label>Genre Name</label>
                    <input type="text" name="Genre_Name" value={formData.Genre_Name} onChange={handleChange} />
                </div>
                <button type="submit">Update Genre</button>
            </form>
            <Link to={'/admin/book'}>Cancel</Link>
        </div>
    );
};

export default Edit_Genre;
