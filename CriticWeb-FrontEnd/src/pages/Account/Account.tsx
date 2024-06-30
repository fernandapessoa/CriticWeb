import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountReview from '../../components/AccountReview/AccountReview.tsx';
import "./Account.css";
import { useNavigate } from 'react-router-dom';

interface ReviewData {
  reviewId: number;
  description: string;
  rating: number;
  movie: {
    title: string;
  };
  reviewer: string;
}

const Account: React.FC = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ email: '' });
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalDeleteOpen, setmodalDeleteOpen] = useState(false);
    const [modalEditOpen, setmodalEditOpen] = useState(false);

    const [idReview, setIdReview] = useState<number| null>(null);
    const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
    const [editedReview, setEditedReview] = useState<ReviewData | null>(null);


    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserInfo({ email: email || '' });

        const fetchReviews = async () => {
          try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:8080/criticweb/review/user-profile', {
              headers: {
                'Authorization': `Bearer ${token}`
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

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const handleEditReview = async (id: number | null) => {
      if (id == null || editedReview == null) {
        console.error('ID de crítica ou dados da crítica inválidos!');
        return;
      }

      const editedRating = Number(editedReview.rating);

      try {
        const token = localStorage.getItem('authToken');

        await axios.put(`http://localhost:8080/criticweb/review/${id}`, {
          description: editedReview.description,
          rating: editedRating,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setReviews(reviews.map(review => {
          if (review.reviewId === id) {
            return { ...editedReview, rating: editedRating };
          }
          return review;
        }));

        setmodalEditOpen(false);
      } catch (error) {
        console.error('Error editing review:', error);
      }
    };

    const handleDeleteReview = async (id: number | null) => {

      if (id == null) {
        console.error('ID de crítica inválido!');
        return;
      }
      else{
        try {
          const token = localStorage.getItem('authToken');
          await axios.delete(`http://localhost:8080/criticweb/review/${id}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setReviews(reviews.filter(review => review.reviewId !== id));
        } catch (error) {
          console.error('Error deleting review:', error);
        }
      } 
    };

    const filteredReviews = reviews.filter(review =>
      review.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleOpenDeleteModal = (id: number) => {
      setmodalDeleteOpen(true);
      setIdReview(id);
    };
  
    const handleCloseModal = () => {
      setmodalDeleteOpen(false);
      setmodalEditOpen(false);
      setIdReview(null);
    };

    const handleOpenEditModal = (id: number) => {
      const review = reviews.find(review => review.reviewId === id) || null;
      setSelectedReview(review);
      setEditedReview(review);
      setmodalEditOpen(true);
      setIdReview(id);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setEditedReview(prevState => {
        if (!prevState) return null;
        return {
          ...prevState,
          [name]: value
        };
      });
    };

    return (
        <div className="container-account">
            <div className="account-info">
                <div className="info-field">
                    <h2>Email</h2>
                    <p>{userInfo.email}</p>
                </div>
                <div className='logout-field'>
                     <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
            <div className='conteiner-account-critics'>
                <div className='title-account-critcs'>
                    <h2>Minhas Críticas</h2>
                </div>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Buscar por nome do filme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="account-reviews">
                    <div className="reviews-list">
                        {filteredReviews.map(review => (
                            <AccountReview 
                                key={review.reviewId}
                                id={review.reviewId} 
                                username={review.reviewer}
                                rate={review.rating.toFixed(1)}
                                description={review.description} 
                                movieName={review.movie.title}
                                onEdit={handleOpenEditModal}
                                onDelete={handleOpenDeleteModal}
                            />
                        ))}
                    </div>
                </div>
            </div>


            <div className={`modal fade ${modalDeleteOpen ? 'show' : ''}`} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden={!modalDeleteOpen} style={{ display: modalDeleteOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Deletar Critica</h1>
                      <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      Deseja realmente deletar sua crítica?
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn-cancel-delete" ddata-bs-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                      <button type="button" className="btn-delete" onClick={()=>{handleDeleteReview(idReview); handleCloseModal()}}>Deletar</button>
                    </div>
                  </div>
                </div>
            </div>


            <div className={`modal fade ${modalEditOpen ? 'show' : ''}`} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden={!modalEditOpen} style={{ display: modalEditOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Crítica</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <h5 className="modal-movie" id="exampleModalLabel">{selectedReview?.movie.title}</h5>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label movie-placeholder">Quantas estrelas você dá a esse filme?</label>
                        <input
                          type="number"
                          className="form-control movie-input"
                          id="rating"
                          name="rating"
                          value={editedReview?.rating || ''}
                          min="0"
                          max="5"
                          step="0.5"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message-text" className="col-form-label movie-placeholder">Descreva sua crítica:</label>
                        <textarea
                          className="form-control movie-input"
                          id="description"
                          name="description"
                          value={editedReview?.description || ''}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn-cancel-delete" ddata-bs-dismiss="modal" onClick={handleCloseModal}>Cancelar</button>
                      <button type="button" className="btn-delete" onClick={()=>{handleEditReview(idReview); handleCloseModal()}}>Salvar</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Account;
