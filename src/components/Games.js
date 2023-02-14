import GameItem from "./GameItem";

function Games({ games, handleClick }) {
  const gameList = games.map((gameObj) => (
    <GameItem key={gameObj.id} game={gameObj} handleClick={handleClick} />
  ));

  return (
    <div id="game-list">
      <ul className="game-list">{gameList}</ul>
    </div>
  );
}

export default Games;
