import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import axios from 'axios';
import StarRating from '../user/user_comp/StarRating';
import '../pages_css/Book_U.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate as a fallback

const Book = () => {
    const [bookRating, setBookRating] = useState([]);
    const [books, setBooks] = useState([]);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate(); // Use useNavigate as a fallback

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

        if (user_id) {
            fetchBookRating();
            fetchBooks();
            fetchFavoriteBooks();
        }
    }, [user_id]);

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

    const handleRedirectToBooksPage = () => {
        navigate('/books'); // Use navigate to redirect to the books page
    };

    return (
        <div>
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
        </div>
    );
}

export default Book;
