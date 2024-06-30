import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from '../../components/Review/Review';
import "./MyCritics.css";

interface Movie {
  title: string;
  image: string;
  description: string;
  year: number;
}

interface ReviewData {
  reviewId: number;
  description: string;
  rating: number;
  movie: Movie;
  reviewer: string;
}

const MyCritics: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8080/criticweb/review', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            limit: 100
          }
        });

        if (response.data && Array.isArray(response.data.items)) {
          setReviews(response.data.items);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(review =>
    review.movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
  ).reverse();

  return (
    <div className="container-mycritics">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nome do filme ou usuário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="reviews-page mycritics-reviews">
        <div className="reviews-container">
          {filteredReviews.map(review => (
            <Review 
              key={review.reviewId}
              id={review.reviewId} 
              username={review.reviewer} // Ajuste conforme necessário
              rate={review.rating} 
              description={review.description} 
              movieName={review.movie.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCritics;
