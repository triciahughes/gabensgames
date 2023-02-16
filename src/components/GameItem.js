import { useRouteMatch, useHistory } from "react-router-dom";

function GameItem({ game, savedGameIds, handleSave, handleRemove }) {
  const { name, id, genres, esrb_rating, metacritic, background_image } = game;
  const ratingString = `metacritic: ${metacritic}` + "\n" + `ESRB: ${esrb_rating.name}`;

  let gamePageButttonText;
  if (savedGameIds) {
    gamePageButttonText = savedGameIds.includes(id) ? 'Saved' : 'Save Game'; 
  };

  const history = useHistory();


  function handleClickRemove() {
    fetch(`http://localhost:3000/games/${id}`, {
      method: "DELETE",
    }).then(() => handleRemove(id));
  }

  function handleClickEdit() {
    history.push(`/saved${id}/edit`);
  }

  function handleClickRemove() {
    fetch(`http://localhost:3000/games/${id}`, {
      method: "DELETE",
    }).then(() => handleRemove(id));
  }

  function handleClickEdit() {
    history.push(`/saved${id}/edit`);
  }

  function handleClickSave() {
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
          <h2 className="card-title"><u>{name}</u></h2>
          <div className="card-detail">
            <ul>
              {genres.map(genreObj => {
                return (
                  <div key={genreObj.id}>
                    <li >{genreObj.name}</li>
                    <br/>
                  </div>
                );
              })}
            </ul>
            <br />
            <i>{`metacritic: ${metacritic}`}<br />{`ESRB: ${esrb_rating.name}`}</i>

          </div>
          {useRouteMatch().url == "/games" ? (
            <button onClick={handleClickSave} className="button-save">
              {gamePageButttonText}
            </button>
          ) : (
            <div className="button-container">
              <button className="button-edit" onClick={handleClickEdit}>
                Edit Game
              </button>
              <button className="button-remove" onClick={handleClickRemove}>
                Remove Game
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default GameItem;
