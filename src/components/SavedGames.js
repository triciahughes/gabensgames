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
  const [showForm, setShowForm] = useState(false);

  const gameList = games.map((gameObj) => (
    <GameItem 
      key={gameObj.id} 
      game={gameObj} 
      handleRemove={handleRemove} 
    />
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

  function handleClickToggle() {
    setShowForm(showForm => !showForm);
  }

  return (
    <>
      <button 
        className="toggle-form" 
        onClick={handleClickToggle} 
      >
        {showForm ? 'Close Form' : 'Add New Game'}
      </button>
      {showForm ? (<div className="new-form-container">
        <form 
          onSubmit={handleSubmit} 
          autoComplete="off" 
          className="new-form"
        >
          <label htmlFor="title">Game Title: </label>
          <input
            type="text"
            id={formData.name}
            name="name"
            value={formData.name}
            onChange={handleInput}
          />
          <br />
          <label htmlFor="img">Image Url: </label>
          <input
            type="text"
            id={formData.url}
            name="background_image"
            value={formData.background_image}
            onChange={handleInput}
          />
          <br />
          <label htmlFor="metacritic">Metacritic: </label>
          <input
            type="number"
            min="0"
            max="100"
            id={formData.metacritic}
            name="metacritic"
            value={formData.metacritic}
            onChange={handleInput}
          />
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
          
          <div className="multiselect-container">
            <label htmlFor="genres">Genres: </label>
            <Multiselect
              className="multiselect"
              selectedValues={formData.genres}
              isObject={false}
              onKeyPressFn={function noRefCheck() {}}
              onSelect={handleOnSelect}
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
          </div>
          <button type="submit">Add Game</button>
        </form>
      </div>
      ) : null }
      <div id="game-list">
        <ul className="game-list">{gameList}</ul>
      </div>
    </>
  );
}

export default SavedGames;
