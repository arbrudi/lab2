
import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar'
import axios from 'axios';
import { Link } from "react-router-dom";
import './css/Books_.css'



const Comics = () =>{

    const [Comics, setComics] = useState([]);


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

      const[authors, setauthor] = useState([])

      useEffect(() => {
        const fetchAuthor = async () => {
          try {
            const response_Author = await axios.get("/admin/Comics_Author");
            setauthor(response_Author.data);
          } catch (error) {
            console.error("Error fetching Authors:", error);
          }
        };
    
        fetchAuthor();
      }, [Comics]);

      const handleAuthorDelete = async (Comics_Author_ID) => {
        try {
          await axios.delete(`/admin/comics_Authors/delete/${Comics_Author_ID}`);
          setComics(Comics.filter(comic => comic.Comics_Author_ID !== Comics_Author_ID));
        } catch (error) {
          console.error("Error deleting comics_Author:", error);
        }
      };



   return (
        <div class='container'>
            <AdminBar />
      

         




            <div>
        <h1 class='list'>Comic List</h1>
           <div class='add-link' >
                  <Link to={'/admin/comics/create'}> Add Comics</Link>
            </div>
        <table class='table'>
          <thead>
            <tr>
              <th>Comic ID</th>
              <th>Image</th>
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
                <td>{comic.Comic_image}</td>
                <td>{comic.Comic_title}</td>
                <td>{comic.Comic_type}</td>
                <td>{comic.Comic_Description}</td>
                <Link to={`/admin/comics/update/${comic.Comic_ID}`}>
                        <button class='edit-bttn'>Edit</button>
                    </Link>
                    <button class='del-bttn' onClick={()=>handleDelete(comic.Comic_ID)}>Delete</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            <div>
           <h1 class='list'>Author List</h1>
           <div class='add-link'>
                  <Link to={'/admin/comics_Author/create'}> Add Comics Author</Link>
            </div>
           <table class='table'>
          <thead>
            <tr>
              <th>Comic_ID</th>
              <th>Author_Name</th>
              <th>Publisher</th>
              <th>Author_notes</th>
              <th>Comic_ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.Comics_Author_ID}>
                <td>{author.Comics_Author_ID}</td>
                <td>{author.Author_Name}</td>
                <td>{author.Publisher}</td>
                <td>{author.Author_notes}</td>
                <td>{author.Comic_ID}</td>
                <td>
                <Link to={`/admin/comics_Author/update/${author.Comics_Author_ID}`}>
                        <button>Edit</button>
                        
                    </Link>

                    <button onClick={()=>handleAuthorDelete(author.Comics_Author_ID)}>Delete</button>
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