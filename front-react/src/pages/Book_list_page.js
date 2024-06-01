import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages_css/BookList.css'

const Book_list_page = () =>{

    const [books, setBooks] = useState([]);

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


    return (
        <div className="book-box">
            <h1 className="h1-book-list">Explore our library!</h1>
            <div className="book-container">
                {books.map((book )=> (
                  <div className="book" key={book.ISBN}>
                    <div key={book.ISBN}>
                      <div className="book-img">
                        <img src={book.Book_image} alt={book.Book_title} />
                        </div>
                        <div className="book-title">
                        <h2>{book.Book_title}</h2>
                        </div>
                        <div className="book-author">
                        <p>{book.Book_author}</p>
                        </div>
                        <div className="read-more-b">
                          <Link to={`/book/${book.ISBN}`}>
                          <button>Read more</button>
                          </Link>
                          </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Book_list_page; 