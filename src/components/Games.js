import GameItem from "./GameItem";

function Games({
  games,
  savedGames,
  handleSave,
  handleRemove,
  handleSortChange,
}) {
  const savedGameIds = savedGames.map((gameObj) => gameObj.id);

  const gameList = games.map((gameObj) => (
    <GameItem
      key={gameObj.id}
      game={gameObj}
      savedGameIds={savedGameIds}
      handleSave={handleSave}
      handleRemove={handleRemove}
    />
  ));

  return (
    <>
      {/* <button className="toggle-form" onClick={handleSort}>
        Sort By Genre
      </button> */}
      <form className="new-form">
        <select
          //id={formData.esrb_rating}
          name="esrb_rating"
          //value={formData.esrb_rating}
          onChange={handleSortChange}
        >
          <option>ALL</option>
          <option>Sandbox</option>
          <option>Real-time strategy (RTS)</option>
          <option>Shooter</option>
          <option>MOBA</option>
          <option>Role-playing (RPG, ARPG, and More)</option>
          <option>Simulation and sports</option>
          <option>Puzzlers and party games</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Survival and horror</option>
          <option>Platformer</option>
        </select>
      </form>
      <div className="game-list-container">
        <ul className="game-list">{gameList}</ul>
      </div>
    </>
  );
}

export default Games;
