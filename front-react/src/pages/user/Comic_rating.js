import React, { useState, useEffect } from "react";
import UserBar from '../../components/UserBar';
import axios from 'axios';
import StarRating from '../user/user_comp/StarRating';
import '../pages_css/Comic_R.css';


const ComicRating = () => {
    const [comicRating, setComicRating] = useState([]);
    const [comics, setComics] = useState([]);
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

    const getComicName = (comicId) => {
        const comic = comics.find(c => c.Comic_ID === comicId);
        return comic ? comic.Comic_title : "Unknown Comic";
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

    return (
        <div className="comic-rating-container">
            <UserBar />
            <div>
                <h1 className="comic-rating-list">Rating List</h1>
                <table className="comic-rating-table">
                    <thead>
                        <tr>
                            <th>Comic Name</th>
                            <th>Comic Rating</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comicRating.map((rating) => (
                            <tr key={rating.Comic_rating_ID}
                            ><td>{getComicName(rating.Comic_ID)}</td>
                                <td><StarRating rating={rating.Comic_Rating} /></td>
                                
                                <td>
                                    <button
                                        className="comic-rating-button comic-rating-button-delete"
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
        </div>
    );
}

export default ComicRating;
