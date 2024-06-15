import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/Books_.css'
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
    <div class='container'>
      <AdminBar />
      <div className="flex-book-contt">
        <div className="b-list_">
        <h1>Books in the system</h1>
        <div className="cb_list">
        <Link to={'/admin/book/create'} className="link">Add a new book</Link>
        </div>
        </div>
        <table class='table-b'>
          <thead>
            <tr>
              <th>Book img</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Description</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.ISBN}>
                <td><img src={book.Book_image} alt={book.Book_title} /></td>
                <td>{book.ISBN}</td>
                <td>{book.Book_title}</td>
                <td>{book.Book_author}</td>
                <td>{book.Book_genre}</td>
                <td className="truncate">{book.Book_description}</td>
                <td >
                    <Link to={`/admin/book/update/${book.ISBN}`}>
                        <button class='edit-bttn'>Edit</button>
                    </Link>
                        <button  class='del-bttn' onClick={()=>handleDelete(book.ISBN)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stepp">
      <div className="flex-book-conttt">
        <div className="bg-list_">
        <h1>Books Genres</h1>
        <div className="cb_list_">
        <Link to={'/admin/book_genre/create'} className="link">Add a new Genre</Link>
        </div>
        </div>
        <table class='table-c'>
          <thead>
            <tr>
              <th>Genre_ID</th>
              <th>Genre_Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.Book_Genre_ID}>
                <td>{genre.Book_Genre_ID}</td>
                <td>{genre.Genre_Name}</td>
                <td>
                    <Link to={`/admin/book_genre/update/${genre.Book_Genre_ID}`}>
                        <button class='edit-bttn' >Edit</button>
                    </Link>
                        <button  class='del-bttn' onClick={()=>Delete_Genre(genre.Book_Genre_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-book-conttt"> {/* change here */}
         <div className="bg-list_">  {/* change here */}
        <h1>Books by genre</h1>
        </div>
        <p>pychart</p>
        </div>
    </div>
    </div>
  );
};


export default Book;
