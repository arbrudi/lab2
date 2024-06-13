import React, { useState, useEffect } from "react";
import AdminBar from '../../components/AdminBar';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../pages_css/Comic_F.css';

const FavoriteComics = () => {
  const [favorites, setFavorites] = useState([]);
  const [comics, setComics] = useState([]);
  const user_id = localStorage.getItem('user_id');

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

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await axios.get(`/comic/Favorite/${user_id}`);
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorite comics:", error);
      }
    };

    if (user_id) {
      fetchFavorite();
    }
  }, [user_id]);

  const getComicName = (comicId) => {
    const comic = comics.find(c => c.Comic_ID === comicId);
    return comic ? comic.Comic_title : "Unknown Comic";
  };

  const getComicImage = (comicId) => {
    const comic = comics.find(c => c.Comic_ID === comicId);
    return comic ? comic.Comic_image : "Unknown Image";
  };

  const handleDelete = async (Comic_ID) => {
    try {
      await axios.delete(`/comic/Favorite/Delete`, {
        data: { user_id: user_id, comic_id: Comic_ID }
      });
      setFavorites(favorites.filter(comic => comic.Comic_ID !== Comic_ID));
    } catch (error) {
      console.error("Error deleting favorite comic:", error);
    }
  };

  return (
    <div className='favorite-comics-container'>
      <AdminBar />
      <div>
        <h1 className='favorite-comics-list'>Favorite Comics</h1>
        <table className='favorite-comics-table'>
          <thead>
            <tr>
              <th>Comic</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((comic) => (
              <tr key={comic.Favorite_Comic_Id}>
                <td className="favorite-comics-img-box">
                  <img src={getComicImage(comic.Comic_ID)} alt="Comic" />
                </td>
                <td>{getComicName(comic.Comic_ID)}</td>
                <td>
                  <button className='favorite-comics-button favorite-comics-button-delete' onClick={() => handleDelete(comic.Comic_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FavoriteComics;
