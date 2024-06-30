import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css";
import MovieCard from '../../components/MovieCard/MovieCard';
import { Link } from "react-router-dom";

interface Movie {
  movieId: number; // Adicionando a propriedade movieId
  title: string;
  description: string
  category: string;
  image: string;
  year: number;
  rating: number;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8080/criticweb/movie', {
          headers: {
            'Authorization': `Bearer ${token}` // substitua `token` pela lógica para obter o token se necessário
          },
          params: {
            limit: 100
          }
        });

        // Certifique-se de que a resposta contém o objeto items
        if (response.data && Array.isArray(response.data.items)) {
          const formattedMovies = response.data.items.map((movie: Movie) => ({
            ...movie,
            rating: parseFloat(movie.rating.toFixed(1)) // Formatar o rating para ter apenas uma casa decimal
          }));
          setMovies(formattedMovies);
        } else {
          console.error('Unexpected response data:', response.data);
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]); // Defina um array vazio em caso de erro
      }
    };

    fetchMovies();
  }, []);

  const resultMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  return ( 
    <div className="container">
      <div className="content">
        <h1 className='title'>Filmes</h1>
        <div className="controls">
          <Link to="/registerMovie">
            <button type="button" className="add-movie-button">
              Cadastrar filme +
            </button>
          </Link>
          <div className="input-group  search-home">
            <input
              type="text"
              className="form-control search-input-home"
              placeholder="O que está procurando?"
              aria-label="search"
              aria-describedby="basic-addon1"
              value={searchItem}
              onChange={handleSearchChange}
            />
            <button type="button" className="btn btn-light-home" id="basic-addon1">
              <i className="bi bi-search search-icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="catalog">
        {resultMovies.map((movie) => (
          <Link to={`/movie/${movie.movieId}`} key={movie.movieId}>
            <MovieCard
              id={movie.movieId} // Usando o movieId retornado pela API
              name={movie.title}
              rate={movie.rating} // Adicione a lógica para a taxa se disponível
              year={movie.year}
              categories={[movie.category]}
              poster={movie.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
