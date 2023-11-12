import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const GameRating = ({ gameId }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, [token]);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSaveRating = () => {
    // Verifique se o usuário está autenticado
    if (!token || !userId) {
      console.error("Usuário não autenticado. Não é possível enviar a avaliação.");
      return;
    }

    // Crie o objeto de avaliação
    const ratingData = {
      score: rating,
      description,
      game: gameId,
      user: userId,
    };

    // Envie a avaliação para a API
    axios.post("https://bestbrowsergamesapi--1matzh.repl.co/ratings", ratingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log("Avaliação enviada com sucesso:", response.data);
      setRating(0);
      setDescription("");
    })
    .catch(error => {
      console.error("Erro ao enviar avaliação:", error.response.data);
    });
  };

  return (
    <div className="rating-container">
      <h3>Avaliação</h3>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            color={star <= rating ? "gold" : "gray"}
            onClick={() => handleStarClick(star)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      <textarea className="rating-description"
        placeholder="Digite sua avaliação..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSaveRating}>Salvar Avaliação</button>
    </div>
  );
};

export default GameRating;
