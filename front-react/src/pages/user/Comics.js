import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../user/user_comp/StarRating';
import '../pages_css/Comic_U.css';

const Comic = () => {
    const [comicRating, setComicRating] = useState([]);
    const [comics, setComics] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const user_id = localStorage.getItem('user_id');

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
    }, [user_id]);

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

    const handleDelete = async (comic_id) => {
        try {
            const response = await axios.delete('/comic/delete_rating', {
                data: {
                    user_id: user_id,
                    comic_id: comic_id
                }
            });
            if (response.status === 200) {
                setComicRating(comicRating.filter(comic => comic.Comic_ID !== comic_id));
                console.log('Rating deleted successfully');
            } else {
                console.error('Failed to delete rating');
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };

    const handleRatingChange = async (comic_id, newRating) => {
        try {
            const token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
            if (!token || !user_id) {
                console.error("Please log in to update the rating.");
                return;
            }

            await axios({
                method: 'POST',
                url: '/comic/rating',
                data: {
                    user_id: parseInt(user_id),
                    comic_id: comic_id,
                    comic_rating: newRating
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            setComicRating(comicRating.map(rating => 
                rating.Comic_ID === comic_id ? { ...rating, Comic_Rating: newRating } : rating
            ));
            console.log("Rating updated successfully.");
        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    const handleFDelete = async (Comic_ID) => {
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
        <div className="conetet">
            <UserBar />
            <div className="user-dash">
                <div className="rating-container">
                    <h1 className="rating-list">Rating List</h1>
                    <table className="rating-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Comic Name</th>
                                <th>Comic Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comicRating.map((rating) => (
                                <tr key={rating.Comic_rating_ID}>
                                    <td className="img-box">
                                        <img src={getComicImage(rating.Comic_ID)} alt="Comic" />
                                    </td>
                                    <td>{getComicName(rating.Comic_ID)}</td>
                                    <td>
                                        <StarRating 
                                            rating={rating.Comic_Rating} 
                                            onRatingChange={(newRating) => handleRatingChange(rating.Comic_ID, newRating)} 
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="rating-button rating-button-delete"
                                            onClick={() => handleDelete(rating.Comic_ID)}
                                        >
                                            Delete
                                        </button>  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="fav-comics-container">
                    <h1 className="fav-comics-user">Favorite Comics</h1>
                    <table className="fav-comic-tb">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorites.map((comic) => (
                                <tr key={comic.Favorite_Comic_Id}>
                                    <td className="img-box">
                                        <img src={getComicImage(comic.Comic_ID)} alt="Comic" />
                                    </td>
                                    <td>{getComicName(comic.Comic_ID)}</td>
                                    <td>
                                        <button className="comic-favorite-button comic-favorite-button-delete" onClick={() => handleFDelete(comic.Comic_ID)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {favorites.length === 0 && (
                        <div className="no-favorite-comics">
                            <p>No favorite comics found.</p>
                            <button className="browse-comics-button">
                                <Link to="/comics">Browse Comics</Link>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comic;
