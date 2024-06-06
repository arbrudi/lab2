import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/Comic_.css';

const Comics = () => {

  const [Comics, setComics] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get("/admin/comics");
        setComics(response.data);
      } catch (error) {
        console.error("Error fetching Comics:", error);
      }
    };
    fetchComics();
  }, []);

  const handleDelete = async (Comic_ID) => {
    try {
      await axios.delete(`/admin/comics/delete/${Comic_ID}`);
      setComics(Comics.filter(comic => comic.Comic_ID !== Comic_ID));
    } catch (error) {
      console.error("Error deleting comics:", error);
    }
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("/admin/Comics_Author");
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching Authors:", error);
      }
    };
    fetchAuthors();
  }, [Comics]);

  const handleAuthorDelete = async (Comics_Author_ID) => {
    try {
      await axios.delete(`/admin/comics_Authors/delete/${Comics_Author_ID}`);
      setAuthors(authors.filter(author => author.Comics_Author_ID !== Comics_Author_ID));
    } catch (error) {
      console.error("Error deleting comics_Author:", error);
    }
  };

  return (
    <div className='container'>
      <AdminBar />
      <div>
        <h1 className='clist' >Comic List</h1>
        <div className='add-link'>
          <Link to={'/admin/comics/create'} className='add-button'>+</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Comic ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Comics.map((comic) => (
              <tr key={comic.Comic_ID}>
                <td>{comic.Comic_ID}</td>
                <td>{comic.Comic_title}</td>
                <td>{comic.Comic_type}</td>
                <td className='truncate'>{comic.Comic_Description}</td>
                <td>
                  <Link to={`/admin/comics/update/${comic.Comic_ID}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleDelete(comic.Comic_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className='clist'>Author List</h1>
        <div className='add-link'>
          <Link to={'/admin/comics_Author/create'} className='add-button'>+</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Author ID</th>
              <th>Author Name</th>
              <th>Publisher</th>
              <th>Author Notes</th>
              <th>Comic ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.Comics_Author_ID}>
                <td>{author.Comics_Author_ID}</td>
                <td>{author.Author_Name}</td>
                <td>{author.Publisher}</td>
                <td className='truncate'>{author.Author_notes}</td>
                <td>{author.Comic_ID}</td>
                <td>
                  <Link to={`/admin/comics_Author/update/${author.Comics_Author_ID}`}>
                    <button className='edit-bttn'>Edit</button>
                  </Link>
                  <button className='del-bttn' onClick={() => handleAuthorDelete(author.Comics_Author_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comics;
