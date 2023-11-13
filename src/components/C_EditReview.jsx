import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const C_EditReview = ({ review, onUpdate }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [editedScore, setEditedScore] = useState(review.score);
  const [editedDescription, setEditedDescription] = useState(review.description);

  const handleUpdateReview = () => {
    if (!token) {
      console.error("Usuário não autenticado. Não é possível editar a avaliação.");
      return;
    }

    const updatedReview = {
      score: editedScore,
      description: editedDescription,
      game: review.game._id,
      user: review.user._id,
    };

    axios.put(`https://bestbrowsergamesapi--1matzh.repl.co/ratings/${review._id}`, updatedReview, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log("Avaliação atualizada com sucesso:", response.data);
      onUpdate();
    })
    .catch(error => {
      console.error("Erro ao atualizar a avaliação:", error.response.data);
    });
  };

  return (
    <div>
      <h3>Editar Avaliação</h3>
      <div>
        <label>Nota:</label>
        <input
          type="number"
          value={editedScore}
          onChange={(e) => setEditedScore(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateReview}>Salvar Alterações</button>
    </div>
  );
};

export default C_EditReview
