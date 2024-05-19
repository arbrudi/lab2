import React, { useEffect, useState } from "react"; 
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Books_P.css'

const BooksPage = () =>{

    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/admin/book/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="bookP-container">
                <div className="bookP" key={book.ISBN}>
                    <div className="imgP-container">
                        <img src={book.Book_image} alt={book.Book_title} />
                    </div>
                    <div className="bookP_status">
                        <a>Option 1</a>
                    </div>
                    <div className="textP-section">
                        <div className="bookP-title">
                            <h2>{book.Book_title}</h2>
                        </div>
                        <div className="bookP-author">
                            <p>Author: {book.Book_author}</p>
                        </div>
                        <div className="bookP-genre">
                            <p>Genre: {book.Book_genre}</p>
                        </div>
                        <div className="bookP-description">
                            <p>{book.Book_description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BooksPage; 
