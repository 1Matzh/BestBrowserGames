import React from "react";
import { Carousel } from "react-bootstrap";
import C_GameCard from "./C_GameCard";

const C_GameCards = ({ games, numberOfCards }) => {
  const getGameGroups = () => {
    const gameGroups = [];
    for (let i = 0; i < games.length; i += numberOfCards) {
      const group = games.slice(i, i + numberOfCards);
      gameGroups.push(group);
    }
    return gameGroups;
  };

  const gameGroups = getGameGroups();

  return (
    <Carousel interval={null}>
      {gameGroups.map((group, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-around">
            {group.map(game => (
              <C_GameCard key={game._id} game={game} />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default C_GameCards;