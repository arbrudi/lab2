import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Books_P.css';

const BooksPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [genres, setGenres] = useState([]);
    const [status, setStatus] = useState("");
    const [statusOptions, setStatusOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookResponse = await axios.get(`/admin/book/${id}`);
                setBook(bookResponse.data);

                const genreResponse = await axios.get(`/books_by_genre/${id}`);
                const genresArray = Array.isArray(genreResponse.data) ? genreResponse.data : [genreResponse.data];
                setGenres(genresArray);

                const statusOptionsResponse = await axios.get('/book/get_book_status');
                setStatusOptions(statusOptionsResponse.data);

                const statusResponse = await axios.get(`/book/get_status_by_id/${id}`);
                setStatus(statusResponse.data.Book_state);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching book or genres:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        console.log('ssssssss', newStatus)
        setStatus(newStatus);
        

        const token = localStorage.getItem('adminToken');
        const user_id = localStorage.getItem('user_id');

        if (!token || !user_id) {
            setMessage("Please log in to update the book status.");
            return;
        }

        try {
            const resp = await axios.put('/book/update_status', {
                user_id: user_id,
                isbn: id,
                book_status: newStatus
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage("Book status updated successfully.");
            console.log('Response:', resp.data); // Log the response from the backend
        } catch (error) {
            console.error("Error updating status:", error);
            setMessage("Error updating status.");
        }
    };

    const handleAddStatus = async () => {
        const token = localStorage.getItem('adminToken');
        const user_id = localStorage.getItem('user_id');
        console.log('token', token)
        console.log('user', user_id)
        if (!token || !user_id) {
            setMessage("Please log in to add book status.");
            return;
        }

        try {
            const resp = await axios.post('/book/add_status', {
                user_id: user_id,
                isbn: id,
                book_status: status
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage("Book status added successfully.");
            console.log('Response:', resp.data); // Log the response from the backend
        } catch (error) {
            console.error("Error adding status:", error);
            setMessage("Error adding status.");
        }
    };

    return (
        <div>
            <div className="bookP-container">
                <div className="bookP" key={book.ISBN}>
                    <div className="imgP-container">
                        <img src={book.Book_image} alt={book.Book_title} />
                        <div className="bookP_status">
                            <label htmlFor="status-select">Status:</label>
                            <select 
                                id="status-select" 
                                value={status} 
                                onChange={handleStatusChange}
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.Book_Status_ID} value={option.Book_Status_ID}>
                                        {option.Book_state}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleAddStatus}>Add Status</button>
                        </div>
                    </div>
                    <div className="textP-section">
                        <div className="bookP-title">
                            <h2>{book.Book_title}</h2>
                        </div>
                        <div className="bookP-author">
                            <p>Author: {book.Book_author}</p>
                        </div>
                        <div className="bookP-genre">
                            <p>Genres: {genres.join(", ")}</p>
                        </div>
                        <div className="bookP-description">
                            <p>Description:</p>
                            <p>{book.Book_description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p>{message}</p>
        </div>
    );
}

export default BooksPage;
