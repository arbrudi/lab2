import React, { useState, useEffect } from "react";
import AdminNav from '../../components/adminNav';
import axios from 'axios';
import { Link } from "react-router-dom";

const Book = () => {
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

  const handleDelete = async (ISBN) => {
    try {
      await axios.delete(`/admin/book/delete/${ISBN}`);
      setBooks(books.filter(book => book.ISBN !== ISBN));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const[genres, setGenre] = useState([])

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response_genre = await axios.get("/admin/book_genres");
        setGenre(response_genre.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenre();
  }, []);

  const Delete_Genre = async (Book_Genre_ID) => {
    try {
      await axios.delete(`/admin/book_genre/delete/${Book_Genre_ID}`);
      setGenre(genres.filter(genre => genre.Book_Genre_ID !== Book_Genre_ID));
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  return (
    <div>
      <AdminNav />
      <div>
        <Link to={'/admin/book/create'}>Add a new book</Link>
      </div>
      <div>
        <h1>Books List</h1>
        <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.ISBN}>
                <td>{book.ISBN}</td>
                <td>{book.Book_title}</td>
                <td>{book.Book_author}</td>
                <td>{book.Book_genre}</td>
                <td>{book.Book_description}</td>
                <td>
                    <Link to={`/admin/book/update/${book.ISBN}`}>
                        <button>Edit</button>
                    </Link>
                        <button onClick={()=>handleDelete(book.ISBN)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link to={'/admin/book_genre/create'}>Add a new Genre</Link>
      </div>
      <div>
        <h1>Genre List</h1>
        <table>
          <thead>
            <tr>
              <th>Genre_ID</th>
              <th>Genre_Name</th>
              <th>ISBN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.Book_Genre_ID}>
                <td>{genre.Book_Genre_ID}</td>
                <td>{genre.Genre_Name}</td>
                <td>{genre.ISBN}</td>
                <td>
                    <Link to={`/admin/book_genre/update/${genre.Book_Genre_ID}`}>
                        <button>Edit</button>
                    </Link>
                        <button onClick={()=>Delete_Genre(genre.Book_Genre_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Book;
