import React, { useState } from 'react';
import "./Review.css";

interface ReviewProps {
  id: number;
  username: string;
  rate: number;
  description: string;
  movieName?: string; 
}

const Review: React.FC<ReviewProps> = ({ id, username, rate, description, movieName }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className='review'>
      <div className="review-user-rate">
        <p className='review-username'>{username}</p>
        <p className='review-rate'>{rate} <i className="bi bi-star-fill"></i></p>
        {movieName && <p className='review-movie-name'>{movieName}</p>} 
      </div>
      <div className="review-description">
        <p>{description.split('\n').map((str, index) => <span key={index}>{str}<br /></span>)}</p>
      </div>
      <div className="review-like" onClick={handleLikeClick}>
        <p>
          <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          {liked ? 'Liked' : 'Like'}
        </p>
      </div>
    </div>
  );
}

export default Review;
