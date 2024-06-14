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
    const [userBookEntryExists, setUserBookEntryExists] = useState(false);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [ratingStatus, setRatingStatus] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [ratingEntryExists, setRatingEntryExists] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // New state for favorite status

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
                    
                    const ratingResp = await axios.get(`/books/get_rating_by_id/${id}/${user_id}`);
                    if (ratingResp.data.Book_Rating !== 'Rating not available') {
                        setRatingStatus(ratingResp.data.Book_Rating);
                        setRatingEntryExists(true);
                    } else {
                        setRatingStatus(0);
                        setRatingEntryExists(false);
                    }

                    const favoriteResponse = await axios.get(`/favorite/book/${user_id}/${id}`);
                    if (favoriteResponse.status === 200) {
                        setIsFavorite(true);
                    } else {
                        setIsFavorite(false);
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setUserBookEntryExists(false);
                } else {
                    console.error("Error fetching status:", error);
                    setMessage("Error fetching book details.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleStarClick = async (rating) => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');

        if (!user_id || !token) {
            setMessage("Please log in to add a rating to the book.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            await axios.post('/books/ratings', {
                user_id: parseInt(user_id),
                book_id: id,
                book_rating: rating
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setRatingStatus(rating);
            setMessage("Rating updated successfully.");
        } catch (error) {
            console.error("Error updating rating:", error);
            setMessage("Error updating rating.");
        }

        setTimeout(() => setMessage(""), 3000);
    };

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        const selectedStatus = statusOptions.find(option => option.Book_Status_ID === parseInt(newStatus));
        setStatus(selectedStatus.Book_state);

        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');

        if (!user_id || !token) {
            setMessage("Please log in to update the book status.");
            return;
        }

        try {
            const method = userBookEntryExists ? 'PUT' : 'POST';
            await axios({
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
        } catch (error) {
            console.error("Error updating status:", error);
            setMessage("Error updating status.");
        }

        setTimeout(() => setMessage(""), 3000);
    };

    const handleRecommendationClick = async () => {
        try {
            const recommendationsResponse = await axios.get(`/recommendations/recommend_book?book_name=${book.Book_title}`);
            if (recommendationsResponse.status === 200) {
                setRecommendedBooks(recommendationsResponse.data);
                setShowRecommendations(true);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    const handleHeartClick = async () => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');

        if (!user_id || !token) {
            setMessage("Please log in to add this book to your favorites.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            if (isFavorite) {
                await axios.delete('/favorite/book/delete', {
                    data: { User_ID: parseInt(user_id), ISBN: id },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIsFavorite(false);
                setMessage("Book removed from favorites.");
            } else {
                await axios.post('/favorite/book/add', {
                    User_ID: parseInt(user_id),
                    ISBN: id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIsFavorite(true);
                setMessage("Book added to favorites.");
            }
        } catch (error) {
            console.error("Error updating favorite status:", error);
            setMessage("Error updating favorite status.");
        }

        setTimeout(() => setMessage(""), 3000);
    };

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

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
                        
                        <div className="book-rating">
                            <div className="book-status">
                                <div className="book-stars">
                                    <h3>Rate this book</h3>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <i
                                            key={rating}
                                            className={`star ${rating <= (hoverRating || ratingStatus) ? "hover" : ""} ${rating <= ratingStatus ? "active" : ""}`}
                                            onClick={() => handleStarClick(rating)}
                                            onMouseEnter={() => setHoverRating(rating)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            ★
                                        </i>
                                    ))}
                                </div>
                                <p>{message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="textP-section">
                        <div className="bookP-title">
                            <h2>{book.Book_title}</h2>
                            <button className={`heart-button ${isFavorite ? 'active' : ''}`} onClick={handleHeartClick}>
                                ♥
                            </button>
                        </div>
                        <div className="bookP-author">
                            <p>Author: {book.Book_author}</p>
                        </div>
                        <div className="bookP-genre">
                            <p>Genre: {genres.length > 0 ? genres[0].Genre : "Genre not available"}</p>
                        </div>
                        <div className="bookP-description">
                            <p>Description:</p>
                            <p>{book.Book_description}</p>
                        </div>
                        <div className="ml-button-cont">
                            <button onClick={handleRecommendationClick}>What to read next?</button>
                            {showRecommendations && (
                                <div className="recommendations-section">
                                    <h3>We recommend:</h3>
                                    <div className="recommendations-list">
                                        {recommendedBooks.map((recommendedBook, index) => (
                                            <div className="recommended-book" key={index}>
                                                <img src={recommendedBook.img_url} alt={recommendedBook.title} />
                                                <div className="book-details">
                                                    <p className="book-title">{recommendedBook.title}</p>
                                                    <p className="book-author">Author: {recommendedBook.author}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BooksPage;
