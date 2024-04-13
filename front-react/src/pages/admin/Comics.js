import React, { useState, useEffect } from "react";
import AdminNav from '../../components/adminNav'
import axios from 'axios';
import { Link } from "react-router-dom";



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



   return (
        <div>
            <AdminNav />
            <h1>Comics crud</h1> 

            <div>
                  <Link to={'/admin/comics/create'}>Comics</Link>
            </div>




            <div>
        <h1>Comic List</h1>
        <table>
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
                <td>{comic.Comic_Description}</td>
                <Link to={`/admin/comics/update/${comic.Comic_ID}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={()=>handleDelete(comic.Comic_ID)}>Delete</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        </div>
    );
}

export default Comics; 