import { useState } from "react";
import { useRouteMatch } from "react-router-dom";

function GameItem({ game, handleSave }) {
  const { name, id, genres, esrb_rating, metacritic, background_image } = game;
  const genreString = Array.from(genres.map((genre) => genre.name)).join(", ");
  const ratingString =
    `metacritic: ${metacritic}` + "\n" + `ESRB: ${esrb_rating.name}`;

  function handleClick() {
    const gameData = {
      name: name,
      id: id,
      genres: genres,
      esrb_rating: esrb_rating,
      metacritic: metacritic,
      background_image: background_image,
    };

    fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(gameData),
    })
      .then((r) => r.json())
      .then((gameData) => handleSave(gameData))
      .catch((error) =>
        alert(
          "You've already saved this game, please choose a different one (:"
        )
      );
  }

  return (
    <li className="cards-item" id={id}>
      <div className="card">
        <img src={background_image} alt="Card image cap" styles="width:100%" />
        <div className="card-content">
          <div className="card-title">{name}</div>
          <p className="card-detail">
            <i>{genreString}</i>
            <br />
            <i>{ratingString}</i>
          </p>
          {useRouteMatch().url == "/games" ? (
            <button onClick={handleClick} className="button-save">
              Save Game
            </button>
          ) : (
            <button className="button-edit">Edit Game</button>
          )}
        </div>
      </div>
    </li>
  );
}

export default GameItem;
