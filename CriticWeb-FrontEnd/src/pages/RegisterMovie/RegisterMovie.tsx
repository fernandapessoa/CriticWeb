import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterMovie.css';

const RegisterMovie: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [genreInput, setGenreInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const predefinedGenres = [
    'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica', 
    'Terror', 'Romance', 'Animação', 'Documentário', 'Fantasia'
  ];

  const handleAddGenre = () => {
    if (genreInput && !genres.includes(genreInput)) {
      setGenres([...genres, genreInput]);
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setGenres(genres.filter(genre => genre !== genreToRemove));
  };

  const handleDiscard = () => {
    navigate('/home');
  };

  const translateMessage = (message: string): string => {
    const translations: { [key: string]: string } = {
      "Invalid field title. It must be at least 3 characters and at most 20.":
        "Campo título inválido. Deve ter pelo menos 3 caracteres e no máximo 20.",
      "Invalid field image. It must be at least 5 characters and at most 200.":
        "Campo imagem inválido. Deve ter pelo menos 5 caracteres e no máximo 200.",
      "Invalid field description. It must be at least 10 characters and at most 500.":
        "Campo descrição inválido. Deve ter pelo menos 10 caracteres e no máximo 500.",
      "Invalid field category. It must contain only allowed categories: 'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Romance', 'Animação', 'Documentário', 'Fantasia'. If there is more than one value, they must be separated by comma without blank: Romance,Drama.":
        "Campo categoria inválido. Deve conter apenas as categorias permitidas: 'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Romance', 'Animação', 'Documentário', 'Fantasia'. Se houver mais de um valor, eles devem ser separados por vírgula sem espaço: Romance,Drama."
    };
    return translations[message] || message;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validação dos campos obrigatórios
    if (!title || !year || !description || genres.length === 0 || !imageUrl) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const movieData = {
      title,
      category: genres.join(', '),
      image: imageUrl,
      description,
      year: parseInt(year)
    };

    try {
      const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
      const response = await axios.post('http://localhost:8080/criticweb/movie', movieData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        navigate('/home');
      }
    } catch (error: any) {
      console.error('Error registering movie:', error);
      if (error.response && error.response.data && error.response.data[0] && error.response.data[0].message) {
        setError(translateMessage(error.response.data[0].message));
      } else {
        setError('Erro ao registrar o filme.');
      }
    }
  };

  return (
    <div className="registerMovie-container">
      <h1 className="title">Cadastrar filme</h1>
      <form className="registerMovie-form" onSubmit={handleSubmit}>
        <div className="flex-row">
          <div className="form-group">
            <label htmlFor="image-url" className="upload-label">
              <input 
                type="text" 
                id="image-url" 
                className="form-control" 
                placeholder="Insira o URL da imagem"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            {imageUrl && (
              <div className="image-preview">
                <img src={imageUrl} alt="Preview" />
              </div>
            )}
          </div>
          <div className="flex-column">
            <div className="form-group">
              <label htmlFor="movie-name">Nome do filme</label>
              <input 
                type="text" 
                id="movie-name" 
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="movie-year">Ano de lançamento do filme</label>
              <input 
                type="text" 
                id="movie-year" 
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="synopsis">Sinopse</label>
              <textarea 
                id="synopsis" 
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Gêneros:</label>
          <div className="genres-list">
            {genres.map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
                <button type="button" className="remove-genre-button" onClick={() => handleRemoveGenre(genre)}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div className="form-group search-group">
          <label htmlFor="add-genre">Adicionar gênero</label>
          <div className="search-container">
            <select
              id="add-genre"
              className="form-control search-input"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
            >
              <option value="" disabled>Selecione um gênero</option>
              {predefinedGenres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
            <button type="button" className="btn btn-light search-button" onClick={handleAddGenre}>
              Adicionar
            </button>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group buttons">
          <button type="button" className="btn discard-button" onClick={handleDiscard}>Descartar</button>
          <button type="submit" className="btn submit-button">Cadastrar Filme</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterMovie;
