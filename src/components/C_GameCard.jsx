import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="card game-card">
      <img src={game.imageURL} className="card-img-top" alt={game.name} />
      <div className="card-body">
        <h5 className="card-title">{game.name}</h5>
        <p className="card-text">{game.description}</p>
        <a href={game.url} className="btn btn-primary">Jogar Agora</a>
      </div>
    </div>
  );
};

export default GameCard;
