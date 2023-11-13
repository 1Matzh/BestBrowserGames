import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const C_SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`https://bestbrowsergamesapi--1matzh.repl.co/games`)
        .then((response) => {
          const filtered = response.data.filter((game) =>
            game.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredGames(filtered);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
        });
    } else {
      setFilteredGames([]);
    }
  }, [searchTerm]);

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Pesquisar jogos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredGames.length > 0 && (
        <ul className="search-results">
          {filteredGames.map((game) => (
            <li key={game._id} onClick={() => handleGameClick(game._id)}>
              {game.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default C_SearchBar;
