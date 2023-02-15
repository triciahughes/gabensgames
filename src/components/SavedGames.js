import GameItem from "./GameItem";

function SavedGames({ games, handleRemove }) {
  const gameList = games.map((gameObj) => (
    <GameItem 
      key={gameObj.id} 
      game={gameObj} 
      handleRemove={handleRemove} 
    />
  ));

  return (
    <div id="game-list">
      <ul className="game-list">{gameList}</ul>
    </div>
  );
}

export default SavedGames;
