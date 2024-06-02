import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Books_P.css';

const BooksPage = () => {
    const { id } = useParams();  // id here is ISBN
    const [book, setBook] = useState({});
    const [genres, setGenres] = useState([]);
    const [status, setStatus] = useState("");
    const [statusOptions, setStatusOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [userBookEntryExists, setUserBookEntryExists] = useState(false);
    const [recommendedBooks, setRecommendedBooks] = useState([]);

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

                const user_id = localStorage.getItem('user_id');
                if (user_id) {
                    const statusResponse = await axios.get(`/book/get_status_by_id/${id}/${user_id}`);
                    if (statusResponse.status === 200) {
                        setStatus(statusResponse.data.Book_state);
                        setUserBookEntryExists(true);
                    }
                }

                // Fetch recommended books
                const recommendationsResponse = await axios.get(`/recommendations/recommend_book?book_name=${bookResponse.data.Book_title}`);
                if (recommendationsResponse.status === 200) {
                    setRecommendedBooks(recommendationsResponse.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setUserBookEntryExists(false);
                } else {
                    console.error("Error fetching status:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        const selectedStatus = statusOptions.find(option => option.Book_Status_ID === parseInt(newStatus));
    
        setStatus(selectedStatus.Book_state);
    
        const admin_token = localStorage.getItem('adminToken');
        const user_token = localStorage.getItem('userToken');
        const user_id = localStorage.getItem('user_id');
    
        if ((!admin_token && !user_token) || !user_id) {
            setMessage("Please log in to update the book status.");
            return;
        }
    
        try {
            const method = userBookEntryExists ? 'PUT' : 'POST';
            const token = admin_token || user_token;
    
            const resp = await axios({
                method: method,
                url: '/book/status',
                data: {
                    user_id: parseInt(user_id),
                    isbn: id,
                    book_status: newStatus
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage(method === 'POST' ? "Book status added successfully." : "Book status updated successfully.");
            setUserBookEntryExists(true);
    
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Error updating status:", error);
            setMessage("Error updating status.");
    
            setTimeout(() => setMessage(""), 3000);
        }
    };
    
    return (
        <div>
            <div className="bookP-container">
                <div className="bookP" key={book.ISBN}>
                    <div className="imgP-container">
                        <img src={book.Book_image} alt={book.Book_title} />
                        <div className="bookP_status">
                            <label htmlFor="status-select">Book Status:</label>
                            <select 
                                id="status-select" 
                                value={statusOptions.find(option => option.Book_state === status)?.Book_Status_ID || ""} 
                                onChange={handleStatusChange}
                            >
                                <option value="" disabled>Select a status</option>
                                {statusOptions.map((option) => (
                                    <option key={option.Book_Status_ID} value={option.Book_Status_ID}>
                                        {option.Book_state}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p>{message}</p>
                        <div className="book-rating">
                            <p>rating</p>
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
                        <div className="ml-button-cont">
                            <button>What to read next?</button>
                        </div>
                    </div>
                </div>
                <div className="recommendations-section">
                    <h3>Recommended Books</h3>
                    {recommendedBooks.length > 0 ? (
                        <ul>
                            {recommendedBooks.map((recommendedBook, index) => (
                                <li key={index}>{recommendedBook}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recommendations available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BooksPage;
