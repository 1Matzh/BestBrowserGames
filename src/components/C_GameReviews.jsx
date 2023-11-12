// GameReviews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import C_EditReview from "./C_EditReview";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const GameReviews = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    axios.get(`https://bestbrowsergamesapi--1matzh.repl.co/games/${gameId}/ratings`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching game reviews:', error.response.data);
      });
  }, [gameId]);

  const handleUpdateReviews = () => {
    setEditingReviewId(null);
  };

  const handleEditReview = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const renderReview = (review) => {
    const cookies = new Cookies();
    const loggedInUserId = cookies.get("token") ? jwtDecode(cookies.get("token")).id : null;

    if (review._id === editingReviewId) {
      return (
        <C_EditReview
          key={review._id}
          review={review}
          onUpdate={handleUpdateReviews}
        />
      );
    } else {
      const isCurrentUserReview = loggedInUserId === review.user._id;

      return (
        <div key={review._id}>
          <strong>{review.user.name}</strong> - Nota: {review.score}/5<br />
          {review.description}<br />
          {isCurrentUserReview && (
            <button onClick={() => handleEditReview(review._id)}>Editar</button>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <h3>Avaliações dos Usuários</h3>
      {reviews.length === 0 ? (
        <p>Nenhuma avaliação disponível.</p>
      ) : (
        <ul>
          {reviews.map(renderReview)}
        </ul>
      )}
    </div>
  );
};

export default GameReviews;

