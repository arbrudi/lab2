import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Edit_Books = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [formData, setFormData] = useState({
        Book_image:"",
        Book_title: "",
        Book_author: "",
        Book_genre: "",
        Book_description: ""
    });

    useEffect(() => {
       
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/admin/book/${id}`);
                setBook(response.data);
                setFormData({
                    Book_image:response.data.Book_image,
                    Book_title: response.data.Book_title,
                    Book_author: response.data.Book_author,
                    Book_genre: response.data.Book_genre,
                    Book_description: response.data.Book_description
                });
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/admin/book/update/${id}`, formData);
            window.location.href = "/admin/book";
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <div>
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label>Cover:</label>
                    <input type="text" name="Book_image" value={formData.Book_image} onChange={handleChange} />
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" name="Book_title" value={formData.Book_title} onChange={handleChange} />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" name="Book_author" value={formData.Book_author} onChange={handleChange} />
                </div>
                <div>
                    <label>Genre:</label>
                    <input type="text" name="Book_genre" value={formData.Book_genre} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="Book_description" value={formData.Book_description} onChange={handleChange} />
                </div>
                <button type="submit">Update Book</button>
            </form>
            <Link to={'/admin/book'}>Cancel</Link>
        </div>
    );
};

export default Edit_Books;
