import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function EditGame({ onUpdateGame }) {
  const { id } = useParams();
  const history = useHistory();
  const multiselectOptions = [
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
  ].map(x => { return {name: x}}); 
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

  function handleChangeMultiselect(genresArr) {
    const newGenres = genresArr.map(genreObj => { return { name: genreObj.name} });
    setFormData({ ...formData, genres: newGenres });
  }

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === 'metacritic') {
      value = parseInt(value);
    };
    if (name == 'esrb_rating') {
      value = { name: value};
    };

    setFormData({ ...formData, [name]: value });
  };

  function submitEdit(e) {
    e.preventDefault();
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:3000/games/${id}`, configObj)
      .then((r) => r.json())
      .then((updatedGame) => {
        onUpdateGame(updatedGame);
        setFormData(initialState);
      });
    history.push('/saved');
  }

  return (
    <div className="new-form-container">
      <img src={background_image}></img>
      <form 
        onSubmit={submitEdit} 
        autoComplete="off"
        className="new-form"
      >
        <label htmlFor="title">Game Title: </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="genres">Genres: </label>
        <Multiselect
          className="multiselect"
          displayValue={'name'}
          isObject={true}
          options={multiselectOptions}
          selectedValues={genres}
          onKeyPressFn={function noRefCheck() {}}
          onRemove={handleChangeMultiselect}
          onSelect={handleChangeMultiselect}
        />
        <br></br>
        <label htmlFor="metacritic">Metacritic: </label>
        <input
          id="{formData.metacritic}"
          name="metacritic"
          type="text"
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
        <br />
        <label htmlFor="img">Image Url: </label>
        <input
          type="text"
          id="{formData.url}"
          name="background_image"
          value={background_image}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save Game</button>
      </form>
    </div>
  );
}

export default EditGame;
