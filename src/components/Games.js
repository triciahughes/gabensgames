import GameItem from "./GameItem";

function Games({ games, savedGames, handleSave, handleRemove }) {
  const savedGameIds = savedGames.map(gameObj => gameObj.id);
  console.log(savedGameIds)
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
    <div id="game-list">
      <ul className="game-list">{gameList}</ul>
    </div>
  );
}

export default Games;
