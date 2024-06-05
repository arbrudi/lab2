import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar'
import axios from 'axios';
import { Link } from "react-router-dom";
import '../admin/css/Books_.css'



const Comic_rating = () =>{

    const [comicRating, setComicRating] = useState([]);
    const user_id = localStorage.getItem('user_id'); // Get user_id from localStorage

    useEffect(() => {
        const fetchComicRating = async () => {
          try {
            const response = await axios.get(`/comic/get_all_ratings/${user_id}`);
            setComicRating(response.data);
          } catch (error) {
            console.error("Error fetching Comics:", error);
          }
        };
    
        if (user_id) {
            fetchComicRating();
        }
      },[user_id]);


      const handleDelete = async (comic_id) => {
        try {
            const response = await axios.delete('/comic/delete_rating', {
                data: {
                    user_id: user_id,
                    comic_id: comic_id
                }
            });
            if (response.status === 200) {
                // Update state after successful deletion
                setComicRating(comicRating.filter(comic => comic.Comic_ID !== comic_id));
                console.log('Rating deleted successfully');
            } else {
                console.error('Failed to delete rating');
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };



   return (
        <div class='container'>
            <AdminBar />
      
            <div>
        <h1 class='list'>Rating List</h1>
        <table class='table'>
          <thead>
            <tr>
              <th>Comic_rating_ID</th>

              <th>User_ID</th>
              <th>Comic_ID</th>
              <th>Comic_Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comicRating.map((comic) => (
              <tr key={comic.Comic_rating_ID}> 
              <td>{comic.Comic_rating_ID}</td>
                <td>{comic.User_ID}</td>
                <td>{comic.Comic_ID}</td>
                <td>{comic.Comic_Rating}</td>
                    <button class='del-bttn' onClick={()=>handleDelete(comic.Comic_ID)}>Delete</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 

        </div>
    );
}

export default Comic_rating; 