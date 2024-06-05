import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Books_P.css';

const ComicsPage = () => {
    const { id } = useParams();
    const [comic, setComic] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [ratingEntryExists, setRatingEntryExists] = useState(false);

    useEffect(() => {
        const fetchComic = async () => {
            try {
                // Fetch comic details
                const response = await axios.get(`/admin/comics/${id}`);
                setComic(response.data);

                const user_id = localStorage.getItem('user_id');
                if (user_id) {
                    // Fetch user rating for the comic
                    const ratingResponse = await axios.get(`/comic/get_rating_by_id/${id}/${user_id}`);
                    if (ratingResponse.status === 200) {
                        if (ratingResponse.data.Comic_Rating !== 'Rating not available') {
                            setStatus(ratingResponse.data.Comic_Rating);
                            setRatingEntryExists(true);
                        } else {
                            setStatus("");
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

    const handleStatusChange = async (event) => {
        const newRating = parseInt(event.target.value);
        setStatus(newRating);

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
                    comic_rating: newRating
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="bookP-container">
                <div className="bookP" key={comic.Comic_ID}>
                    <div className="imgP-container">
                        <img src={comic.Comic_image} alt={comic.Comic_title} />
                        <div className="bookP_status">
                            <label htmlFor="status-select">Comic Rating:</label>
                            <select 
                                id="status-select" 
                                value={status || ""} 
                                onChange={handleStatusChange}
                            >
                                <option value="" disabled>Select a rating</option>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <option key={rating} value={rating}>
                                        {rating}
                                    </option>
                                ))}
                            </select> 
                            {message && <div className="message">{message}</div>}
                        </div>
                    </div> 
                      
                    <div className="textP-section">
                        <div className="bookP-title">
                            <h2>{comic.Comic_title}</h2>
                        </div>
                        <div className="bookP-author">
                            <p>Type: {comic.Comic_type}</p>
                        </div>
                        <div className="bookP-description">
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
