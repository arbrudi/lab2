import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './pages_css/Books_P.css'


const ComicsPage = () =>{
    const { id } = useParams();
    const [Comic, setComic] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/admin/comics/${id}`);
                setComic(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comic:", error);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="bookP-container">
                <div className="bookP" key={Comic.Comic_ID}>
                    <div className="imgP-container">
                        <img src={Comic.Comic_image} alt={Comic.Book_title} />
                    <div className="bookP_status">
                        <a>Option 1</a>
                    </div>
                    </div>
                    <div className="textP-section">
                        <div className="bookP-title">
                            <h2>{Comic.Comic_title}</h2>
                        </div>
                        <div className="bookP-author">
                            <p>Type: {Comic.Comic_type}</p>
                        </div>
                        <div className="bookP-description">
                            <p>Description:</p>
                            <p>{Comic.Comic_Description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComicsPage; 