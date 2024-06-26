import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import axios from 'axios';
import StarRating from '../user/user_comp/StarRating';
import '../pages_css/Book_U.css';
import { useNavigate, useParams } from 'react-router-dom';

const Book = () => {
    const [booksWithStatus, setBooksWithStatus] = useState([]);
    const [bookRating, setBookRating] = useState([]);
    const [books, setBooks] = useState([]);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [stat, setStat] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const user_id = localStorage.getItem('user_id');
    const { book_status_id } = useParams(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchBookRating = async () => {
            try {
                const response = await axios.get(`/books/get_all_ratings/${user_id}`);
                setBookRating(response.data);
            } catch (error) {
                console.error("Error fetching book ratings:", error);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get("/admin/books");
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        const fetchFavoriteBooks = async () => {
            try {
                const response = await axios.get(`/favorite/book/${user_id}`);
                setFavoriteBooks(response.data);
            } catch (error) {
                console.error("Error fetching favorite books:", error);
            }
        };

        const fetchStatus = async () => {
            try {
                const response = await axios.get("/book/get_book_status");
                setStat(response.data);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        const fetchBooksByStatus = async (statusId) => {
            try {
                const response = await axios.get(`/book/get_status_book/${user_id}/${statusId}`);
                setBooksWithStatus(response.data);
            } catch (error) {
                console.error("Error fetching books with status:", error);
                setBooksWithStatus([]);
            }
        };

        if (user_id) {
            fetchBookRating();
            fetchBooks();
            fetchFavoriteBooks();
            fetchStatus();
            if (selectedStatus) {
                fetchBooksByStatus(selectedStatus);
            }
        }
    }, [user_id, selectedStatus]);

    const getBookName = (bookId) => {
        const book = books.find(b => b.ISBN === bookId);
        return book ? book.Book_title : "Unknown Book";
    };

    const getBookAuthor = (bookId) => {
        const book = books.find(b => b.ISBN === bookId);
        return book ? book.Book_author : "Unknown Author";
    };

    const getBookImage = (bookId) => {
        const book = books.find(b => b.ISBN === bookId);
        return book ? book.Book_image : "Unknown Image";
    };

    const isBookFavorite = (bookId) => {
        return favoriteBooks.some(book => book.ISBN === bookId);
    };

    const removeFromFavorites = async (bookId) => {
        try {
            const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
            if (!token || !user_id) {
                console.error("Please log in to update favorites.");
                return;
            }

            await axios.delete('/favorite/book/delete', {
                data: {
                    User_ID: user_id,
                    ISBN: bookId
                }
            });
            setFavoriteBooks(favoriteBooks.filter(book => book.ISBN !== bookId));
            console.log("Book removed from favorites.");
        } catch (error) {
            console.error("Error removing from favorites:", error);
        }
    };

    const handleDeleteRating = async (bookId) => {
        try {
            const response = await axios.delete('/books/delete_rating', {
                data: {
                    user_id: user_id,
                    book_id: bookId
                }
            });
            if (response.status === 200) {
                setBookRating(bookRating.filter(rating => rating.ISBN !== bookId));
                console.log('Rating deleted successfully');
            } else {
                console.error('Failed to delete rating');
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };

    const handleRatingChange = async (bookId, newRating) => {
        try {
            const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
            if (!token || !user_id) {
                console.error("Please log in to update the rating.");
                return;
            }

            await axios.post('/books/ratings', {
                user_id: parseInt(user_id),
                book_id: bookId,
                book_rating: newRating
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setBookRating(bookRating.map(rating =>
                rating.ISBN === bookId ? { ...rating, Book_rating: newRating } : rating
            ));
            console.log("Rating updated successfully.");
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    const handleStatus = (statusId) => {
        setSelectedStatus(statusId); 
    };

    const handleRedirectToBooksPage = () => {
        navigate('/books');
    };

    return (
        <div className="main-body"> 
            <UserBar />
            <div className="book-user-dash">
                <div className="book-rating-container">
                    <h1 className="book-rating-list">Books rated</h1>
                    <table className="book-rating-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Book Title</th>
                                <th>Book Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookRating.map((rating) => (
                                <tr key={rating.Book_rating_ID}>
                                    <td className="img-box">
                                        <img src={getBookImage(rating.ISBN)} alt="Book" />
                                    </td>
                                    <td>{getBookName(rating.ISBN)}</td>
                                    <td>
                                        <StarRating
                                            rating={rating.Book_rating}
                                            onRatingChange={(newRating) => handleRatingChange(rating.ISBN, newRating)}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="book-rating-button book-rating-button-delete"
                                            onClick={() => handleDeleteRating(rating.ISBN)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="fav-books-container">
                    <div className="fav-books-user">
                        <h1>Favorite books</h1>
                        {favoriteBooks.length > 0 ? (
                            <table className="fav-book-tb">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Book Title</th>
                                        <th>Book Author</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favoriteBooks.map((favBook) => (
                                        <tr key={favBook.ISBN}>
                                            <td className="img-box">
                                                <img src={getBookImage(favBook.ISBN)} alt="Book" />
                                            </td>
                                            <td>{getBookName(favBook.ISBN)}</td>
                                            <td>{getBookAuthor(favBook.ISBN)}</td>
                                            <td>
                                                <button
                                                    className="book-favorite-button"
                                                    onClick={() => removeFromFavorites(favBook.ISBN)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="no-favorite-books">
                                <p>Still haven't found your favorite book?</p>
                                <button onClick={handleRedirectToBooksPage}>Discover Books</button>
                            </div>
                        )}
                    </div>
                </div>
                </div>
                <div className="books-with-status-container">
                <h1>Books with Status</h1>
                <div className="book_stat_dropdown">
                    <select id="status" value={selectedStatus} onChange={(e) => handleStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        {stat.map((status) => (
                            <option key={status.Book_Status_ID} value={status.Book_Status_ID}>
                                {status.Book_state}
                            </option>
                        ))}
                    </select>
                </div>
                {booksWithStatus.length > 0 ? (
                    <table className="books-with-status-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booksWithStatus.map((book) => (
                                <tr key={book.ISBN}>
                                    <td className="img-box">
                                        <img src={book.Image} alt="Book" />
                                    </td>
                                    <td>{book.Title}</td>
                                    <td>{book.Author}</td>
                                    <td>{book.Book_Status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        ) : (
                            <p>No books found with the selected status.</p>
                        )}
            </div>
        </div>
        
    );
};

export default Book;
