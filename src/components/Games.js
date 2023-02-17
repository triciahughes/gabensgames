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
      <form className="new-form">
        <select name="esrb_rating" onChange={handleSortChange}>
          <option>ALL</option>
          <option>Sandbox</option>
          <option>Real-time strategy (RTS)</option>
          <option>Shooter</option>
          <option>Massively Multiplayer</option>
          <option>RPG</option>
          <option>Simulation</option>
          <option>Puzzle</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Survival and horror</option>
          <option>Platformer</option>
          <option>Indie</option>
        </select>
      </form>
      <div className="game-list-container">
        <ul className="game-list">{gameList}</ul>
      </div>
    </>
  );
}

export default Games;
