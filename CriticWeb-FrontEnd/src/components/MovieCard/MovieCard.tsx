import React from 'react';
import './MovieCard.css';

interface MovieCardProps {
  id: number;
  name: string;
  rate: number;
  year: number;
  categories: string[];
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, name, rate, year, categories, poster }) => {
  const redirectToMovie = () => {
    window.location.href = `/movie/${id}`;
  };

  return (
    <div className="movie-container" onClick={redirectToMovie}>
      <div className="movie-card">
        <div className="poster-container">
          <img src={poster} className="poster" alt={name} />
        </div>
        <div className="movie-info">
          <div className="movie-name-rate">
            <p className="movie-name">{name}</p>
            <p className="movie-rate">{rate} <i className="bi bi-star-fill"></i></p>
          </div>
          <div className="movie-year-categories">
            <p className="movie-year">{year} |</p>
            <p className="movie-categories">{categories.join(' - ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;