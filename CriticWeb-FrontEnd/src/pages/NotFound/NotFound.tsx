import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
    </div>
  );
}

export default NotFound;
