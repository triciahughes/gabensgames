import { useState } from "react";
function GameItem({ game, handleSave, savedGames, setSavedGames }) {
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
    setSavedGames((currentState) => [...currentState, gameData]);
    handleSave(savedGames);
    // console.log(gameData);
  }

  return (
    <li className="cards-item" id={id}>
      <div className="card">
        <img
          className="card-image"
          src={background_image}
          alt="Card image cap"
          styles="width:100%"
        />
        <div className="card-content">
          <div className="card-title">{name}</div>
          <p className="card-detail">
            <i>{genreString}</i>
            <br />
            <i>{ratingString}</i>
          </p>
          <button className="button" onClick={handleClick}>
            Save Game
          </button>
        </div>
      </div>
    </li>
  );
}

export default GameItem;
