import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movie.css';
import Review from '../../components/Review/Review';
import { useParams } from "react-router-dom";

interface ReviewData {
  description: string;
  isLiked: boolean;
  rating: number;
  reviewer: string;
}

interface MovieData {
  movieId: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: number;
  reviews: ReviewData[];
  rating: number;
}

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:8080/criticweb/movie/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}` // substitua `token` pela lógica para obter o token se necessário
          },
          params: {
            limit: 100
          }
        });

        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`http://localhost:8080/criticweb/review/${id}`, {
        description,
        rating: rating,
        isLiked
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMovieData(prevData => prevData ? { ...prevData, reviews: [...prevData.reviews, response.data] } : null);
      handleCloseModal();
      window.location.reload(); // Recarrega a página após a submissão da crítica
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!movieData) {
    return <div>Filme não encontrado</div>;
  }

  return (
    <div className="filme"> 
      <div className="cartao">
        <div className="cartaz">
          <img src={movieData.image} alt={movieData.title} /> 
        </div>
        <div className="detalhes"> 
          <p className='nome'>{movieData.title}</p>
          <p className="ano">{movieData.year}  |  {movieData.category}</p>
          <p className='nota'>{movieData.rating.toFixed(1)} <i className="bi bi-star-fill"></i></p>
          <p className="titulo">Sinopse</p>
          <p className="sinopse">{movieData.description}</p>
          <button className="botao-avaliar" onClick={handleOpenModal}>Avaliar</button>
        </div>
      </div>
      <div className="comentarios">
        <p>Críticas • {movieData.reviews.length}</p>
        <div className="reviews">
          {movieData.reviews.map((review, index) => (
            <Review 
              key={index}
              id={index}
              username={review.reviewer}
              rate={review.rating}
              description={review.description}              
            />
          ))}
        </div>
      </div>
      <div className={`modal fade ${modalOpen ? 'show' : ''}`} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen} style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Avaliar Filme</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <h5 className="modal-movie" id="exampleModalLabel">{movieData.title}</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label movie-placeholder">Quantas estrelas você dá a esse filme?</label>
                  <input
                    type="number"
                    className="form-control movie-input"
                    id="recipient-name"
                    value={rating}
                    min="0"
                    max="5"
                    step={0.5}
                    onChange={(e) => {
                      const value = Math.min(Math.max(e.target.value, 0), 5);
                      const roundedValue = Math.round(value * 2) / 2; // Arredonda para o mais próximo 0.5
                      setRating(roundedValue);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label movie-placeholder">Descreva sua crítica:</label>
                  <textarea
                    className="form-control movie-input"
                    id="message-text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" data-bs-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
              <button type="button" className="btn-save" onClick={handleSubmitReview}>Publicar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
