import React from 'react';
import { Link } from "react-router-dom";

const C_GameCard = ({ game }) => {

  return (
    <Link to={`/games/${game._id}`} style={{ textDecoration: 'none' }}>
      <div className="card game-card">
        <img src={game.imageURL} className="card-img-top" alt={game.name} />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">{game.description}</p>
          <p className="card-text">Categoria: {game.category.name}</p>
          <a href={game.url} className="btn btn-primary">Jogar Agora</a>
        </div>
      </div>
    </Link>
  );
};

export default C_GameCard
