import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import C_GameRating from "../components/C_GameRating";
import C_GameReviews from "../components/C_GameReviews";
import C_Header from "../components/C_Header";

const P_GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios.get(`https://bestbrowsergamesapi--1matzh.repl.co/games/${gameId}`)
      .then(response => {
        setGame(response.data);
      })
      .catch(error => {
        console.error('Error fetching game details:', error);
      });
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <C_Header />

      <div className="game-page">
        <h2>{game.name}</h2>
        <p>{game.description}</p>

        <C_GameRating gameId={gameId} />

        <C_GameReviews gameId={gameId} />
      </div>
    </div>
  );
};

export default P_GamePage;
