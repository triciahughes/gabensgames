import GameItem from "./GameItem";
import { useState } from "react";

function SavedGames({ games }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    genre: "",
    metacritic: "",
    esrb_rating: "",
  });

  const gameList = games.map((gameObj) => (
    <GameItem key={gameObj.id} game={gameObj} />
  ));

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // fetch("http://localhost:3000/games", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((r) => r.json())
    //   .then((newGameData) => onSubmit(newGameData))
    //   .catch((error) =>
    //     alert("Sorry there's been an ERROR. Please try again (:")
    //   );
  }
  // onSubmit={handleSubmit}

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} method="GET|POST">
          <label htmlFor="title">Game Title: </label>
          <input
            type="text"
            id={formData.name}
            name="name"
            value={formData.name}
            onChange={handleInput}
          />
          <br></br>
          <label htmlFor="img">Image Url: </label>
          <input
            type="text"
            id={formData.url}
            name="url"
            value={formData.url}
            onChange={handleInput}
          />
          <br></br>
          <label htmlFor="genre">Genres: </label>
          <input
            type="text"
            id={formData.genre}
            name="genre"
            value={formData.genre}
            onChange={handleInput}
          />
          <br></br>
          <label htmlFor="metacritic">Metacritic: </label>
          <input
            type="text"
            id={formData.metacritic}
            name="metacritic"
            value={formData.metacritic}
            onChange={handleInput}
          />
          <br></br>
          <label htmlFor="esrb_rating">ESRB: </label>
          <select
            id={formData.esrb_rating}
            name="esrb_rating"
            value={formData.esrb_rating}
            onChange={handleInput}
          >
            <option value="1">Early Childhood</option>
            <option value="2">Everyone</option>
            <option value="3">Everyone 10+</option>
            <option value="4">Teen</option>
            <option value="5">Mature</option>
            <option value="6">Adults Only</option>
            <option value="7">Rating Pending</option>
          </select>
          <br></br>
          <button type="submit">Add Game</button>
        </form>
      </div>
      <div id="game-list">
        <ul className="game-list">{gameList}</ul>
      </div>
    </>
  );
}

export default SavedGames;
