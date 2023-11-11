import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import C_CategoryFilter from "../components/C_CategoryFilter";
import C_GameCards from "../components/C_GameCards";
import Header from "../components/C_Header";

const cookies = new Cookies();

export default function P_Home() {
  const token = cookies.get("token");
  console.log(token);

  const [games, setGames] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');

  useEffect(() => {
    axios.get('https://bestbrowsergamesapi--1matzh.repl.co/games')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setFilteredCategory(category);
  };

  const filteredGames = filteredCategory
    ? games.filter(game => game.category.name === filteredCategory)
    : games;

  return (
    <div className="context">
      <Header />

      <div className="game-container">
        <h2>Jogos Novos</h2>
        <C_GameCards games={games} numberOfCards={5} />
      </div>


      <div className="game-container">
        <h2>Jogos por Categoria</h2>
        <C_CategoryFilter onCategoryChange={handleCategoryChange} />
        <C_GameCards games={filteredGames} numberOfCards={3} />
      </div>
    </div>
  );
}
