import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Comic_P.css';

const ComicsPage = () => {
    const { id } = useParams();
    const [comic, setComic] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [message, setMessage] = useState("");
    const [ratingEntryExists, setRatingEntryExists] = useState(false);

    useEffect(() => {
        const fetchComic = async () => {
            try {
                const response = await axios.get(`/admin/comics/${id}`);
                setComic(response.data);

                const user_id = localStorage.getItem('user_id');
                if (user_id) {
                    const ratingResponse = await axios.get(`/comic/get_rating_by_id/${id}/${user_id}`);
                    if (ratingResponse.status === 200) {
                        if (ratingResponse.data.Comic_Rating !== 'Rating not available') {
                            setStatus(ratingResponse.data.Comic_Rating);
                            setRatingEntryExists(true);
                        } else {
                            setStatus(0);
                            setRatingEntryExists(false);
                        }
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comic:", error);
                setLoading(false);
            }
        };

        fetchComic();
    }, [id]);

    const handleStarClick = async (rating) => {
        setStatus(rating);

        const admin_token = localStorage.getItem('adminToken');
        const user_token = localStorage.getItem('userToken');
        const user_id = localStorage.getItem('user_id');

        if ((!admin_token && !user_token) || !user_id) {
            setMessage("Please log in to add a rating to the comic.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const token = admin_token || user_token;

            await axios({
                method: 'POST',
                url: '/comic/rating',
                data: {
                    user_id: parseInt(user_id),
                    comic_id: id,
                    comic_rating: rating
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage("Rating updated successfully.");
        } catch (error) {
            console.error("Error updating rating:", error);
            setMessage("Error updating rating.");
        }

        setTimeout(() => setMessage(""), 3000);
    };



    // add to favorite part


    const user_id = localStorage.getItem('user_id');

    const addToFavorites = async (comic_id) => {
        try {
            const response = await axios.post(`/comic/favorite`, { user_id, comic_id });
            console.log('Response from add to favorites:', response);
            if (response.status === 200) {
                alert('Comic added to favorites');
            }
        } catch (error) {
            console.error("Error adding comic to favorites:", error);
        }
    };
    




    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="comic-container">
                <div className="comic-page" key={comic.Comic_ID}>
                    <div className="comic-img-container">
                        <img src={comic.Comic_image} alt={comic.Comic_title} />
                        <div className="comic-status">

                        <div className="Add-FavoriteComics">
                         <button onClick={() => addToFavorites(comic.Comic_ID)}>+</button>
                             </div>

                            <label>Comic Rating:</label>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <i
                                        key={rating}
                                        className={`star ${rating <= (hoverRating || status) ? "hover" : ""} ${rating <= status ? "active" : ""}`}
                                        onClick={() => handleStarClick(rating)}
                                        onMouseEnter={() => setHoverRating(rating)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    >
                                        ★
                                    </i>
                                ))}
                            </div>
                            {message && <div className="comic-message">{message}</div>}
                        </div>
                    </div> 
                      
                    <div className="comic-text-section">
                        <div className="comic-title">
                            <h2>{comic.Comic_title}</h2>
                        </div>
                        <div className="comic-author">
                            <p>Type: {comic.Comic_type}</p>
                        </div>
                        <div className="comic-description">
                            <p>Description:</p>
                            <p>{comic.Comic_Description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComicsPage;
