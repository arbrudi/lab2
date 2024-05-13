import React, { useState, useEffect } from "react";
import axios from 'axios';


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
        <div>
            <h1>This is the Book_list_page!</h1>
            <div>
                {books.map((book )=> (
                    <div key={book.ISBN}>
                        <h2>{book.Book_title}</h2>
                        <p>{book.Book_author}</p>
                        <p>{book.Book_genre}</p>
                        <p>{book.Book_description}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Book_list_page; 