import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import axios from 'axios';
import StarRating from '../user/user_comp/StarRating';
import '../pages_css/Book_U.css';

const Book = () =>{
    const [bookRating, setBookRating] = useState([]);
    const [books, setBooks] = useState([]);
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchBookRating = async () => {
            try {
                const response = await axios.get(`/books/get_all_ratings/${user_id}`);
                setBookRating(response.data);
            } catch (error) {
                console.error("Error fetching book ratings:", error);
            }
        };

        if (user_id) {
            fetchBookRating();
        }
    }, [user_id]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("/admin/books");
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    const getBookName = (bookId) => {
        const book = books.find(b => b.ISBN === bookId);
        return book ? book.Book_title : "Unknown Book";
    };

    const getBookImage = (bookId) => {
        const book = books.find(b => b.ISBN === bookId);
        return book ? book.Book_image : "Unknown Image";
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await axios.delete('/books/delete_rating', {
                data: {
                    user_id: user_id,
                    book_id: bookId
                }
            });
            if (response.status === 200) {
                setBookRating(bookRating.filter(book => book.ISBN !== bookId));
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

            await axios({
                method: 'POST',
                url: '/books/ratings',
                data: {
                    user_id: parseInt(user_id),
                    book_id: bookId,
                    book_rating: newRating
                },
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

    return (
        <div >
            <UserBar />
            <div className="book-user-dash">
            <div className="book-rating-container">
                <h1 className="book-rating-list">Books rated</h1>
                <table className="book-rating-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Book Name</th>
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
                                        onClick={() => handleDelete(rating.ISBN)}
                                    >
                                        Delete
                                    </button>  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="fav-books-user">
                {/* <h1 className="fav-book-h">Favorite books</h1> */}

            </div>
            </div>
        </div>
    );
}

export default Book; 