import React, { useEffect, useState } from "react";
import axios from "axios";

const GameReviews = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`https://bestbrowsergamesapi--1matzh.repl.co/games/${gameId}/ratings`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching game reviews:', error);
      });
  }, [gameId]);

  return (
    <div>
      <h3>Avaliações dos Usuários</h3>
      {reviews.length === 0 ? (
        <p>Nenhuma avaliação disponível.</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review._id}>
              <strong>{review.user.name}</strong> - Nota: {review.score}/5<br />
              {review.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameReviews;
