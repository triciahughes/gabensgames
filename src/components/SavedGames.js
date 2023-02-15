import GameItem from "./GameItem";
import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

function SavedGames({ games, handleAddGame, handleRemove }) {
  const initialFormValues = {
    name: "",
    genres: [],
    metacritic: "",
    esrb_rating: {
      name: "",
    },
    background_image: "",
  };

  const [formData, setFormData] = useState(initialFormValues);

  const gameList = games.map((gameObj) => (
    <GameItem key={gameObj.id} game={gameObj} handleRemove={handleRemove} />
  ));

  const handleOnSelect = (item1) => setFormData({ ...formData, genres: item1 });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const genreArray = formData.genres.map((genre) => {
      return { name: genre };
    });
    const esrbObj = { name: formData.esrb_rating };
    console.log(formData.genres);
    const newSavedGameData = {
      name: formData.name,
      genres: genreArray,
      metacritic: parseInt(formData.metacritic),
      esrb_rating: esrbObj,
      background_image: formData.background_image,
    };

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newSavedGameData),
    };

    fetch("http://localhost:3000/games", configObj)
      .then((r) => r.json())
      .then((newGameData) => handleAddGame(newGameData))
      .catch((error) =>
        alert("Sorry there's been an ERROR. Please try again (:")
      );

    setFormData(initialFormValues);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="title">Game Title: </label>
          <input
            type="text"
            id={formData.name}
            name="name"
            value={formData.name}
            onChange={handleInput}
          />
          <br></br>
          <label htmlFor="genres">Genres: </label>
          <Multiselect
            // id={formData.genre}
            // name="genre"
            selectedValues={formData.genres}
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            // onRemove={handleOnRemove}
            // onSearch={function noRefCheck() {}}
            onSelect={handleOnSelect}
            //onChange={handleInput}
            options={[
              "Sandbox",
              "Real-time strategy (RTS)",
              "Shooter",
              "MOBA",
              "Role-playing (RPG, ARPG, and More)",
              "Simulation and sports",
              "Puzzlers and party games",
              "Action-adventure",
              "Survival and horror",
              "Platformer",
            ]}
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
            <option value="N/A">Choose</option>
            <option>Early Childhood</option>
            <option>Everyone</option>
            <option>Everyone 10+</option>
            <option>Teen</option>
            <option>Mature</option>
            <option>Adults Only</option>
            <option>Rating Pending</option>
          </select>
          <br></br>
          <label htmlFor="img">Image Url: </label>
          <input
            type="text"
            id={formData.url}
            name="background_image"
            value={formData.background_image}
            onChange={handleInput}
          />
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
