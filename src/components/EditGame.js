import Multiselect from "multiselect-react-dropdown";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditGame({ onUpdateGame }) {
  const { id } = useParams();

  const initialState = {
    name: "",
    genres: [],
    metacritic: "",
    esrb_rating: {
      name: "",
    },
    background_image: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { name, genres, metacritic, esrb_rating, background_image } = formData;

  useEffect(() => {
    fetch(`http://localhost:3000/games/${id}`)
      .then((r) => r.json())
      .then((game) => setFormData(game));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function submitEdit(e) {
    e.preventDefault();

    const newGenreArray = genres.map((genre) => {
      return { name: genre };
    });
    // const newEsrbObj = { name: esrb_rating };

    const newSavedGameData = {
      name: formData.name,
      genres: newGenreArray,
      metacritic: parseInt(formData.metacritic),
      esrb_rating: formData.newEsrbObj,
      background_image: formData.background_image,
    };

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newSavedGameData),
    };

    fetch(`http://localhost:3000/games/${id}`, configObj)
      .then((r) => r.json())
      .then((updatedGame) => {
        onUpdateGame(updatedGame);
        setFormData(initialState);
      });
    //completeEditing();
  }

  const selectedGenres = genres.map((genre) => genre.name);

  const handleOnSelect = (item1) => setFormData({ ...formData, genres: item1 });

  return (
    <div>
      <form onSubmit={submitEdit} autoComplete="off">
        <label htmlFor="title">Game Title: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="genres">Genres: </label>
        <Multiselect
          // id={formData.genre}
          // name="genre"
          selectedValues={selectedGenres}
          isObject={false}
          onKeyPressFn={function noRefCheck() {}}
          // onRemove={handleOnRemove}
          // onSearch={function noRefCheck() {}}
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
        <br></br>
        <label htmlFor="metacritic">Metacritic: </label>
        <input
          type="text"
          id="{formData.metacritic}"
          name="metacritic"
          value={metacritic}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="esrb_rating">ESRB: </label>
        <select
          id={formData.esrb_rating}
          name="esrb_rating"
          value={esrb_rating.name}
          onChange={handleChange}
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
          id="{formData.url}"
          name="background_image"
          value={background_image}
          onChange={handleChange}
        />
        <br></br>
        <button type="submit">Save Game</button>
      </form>
    </div>
  );
}

export default EditGame;
