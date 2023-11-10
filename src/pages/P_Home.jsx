import React, { useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

import C_CategoryFilter from "../components/C_CategoryFilter";
import C_GameCards from "../components/C_GameCards";
import C_GameCard from "../components/C_GameCard";

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

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("token", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  return (
    <div className="context">
      <h1>BestBrowserGames</h1>

      <h2>Jogos Novos</h2>
      <C_GameCards games={games} />

      <h2>Jogos por Categoria</h2>
      <C_CategoryFilter onCategoryChange={handleCategoryChange} />

      <Carousel>
        {filteredGames.map(game => (
          <Carousel.Item key={game._id}>
            <C_GameCard game={game} />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* logout */}
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
