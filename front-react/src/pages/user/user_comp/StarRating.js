import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (rate) => {
        onRatingChange(rate);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
