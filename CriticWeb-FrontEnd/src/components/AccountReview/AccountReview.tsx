import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import '../Review/Review.css';

interface AccountReviewProps {
  id: number;
  username: string;
  rate: string; // Alterado para string por causa do toFixed(1)
  description: string;
  movieName: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const AccountReview: React.FC<AccountReviewProps> = ({ id, username, rate, description, movieName, onEdit, onDelete }) => {
  return (
    <div className="review">
      <div className="review-header">
        <span className="review-username">{username}</span>
        <span className="review-rate">{rate} <i className="bi bi-star-fill"></i></span>
        <span className="review-movie-name">{movieName}</span>
        <span onClick={() => onEdit(id)} style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '1.2rem', color: '#4CAF50' }}>
          <FiEdit />
        </span>
        <span onClick={() => onDelete(id)} style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '1.2rem', color: '#F44336' }}>
          <FiTrash />
        </span>
      </div>
      <p className="review-description">{description.split('\n').map((str, index) => <span key={index}>{str}<br /></span>)}</p>
    </div>
  );
}

export default AccountReview;
