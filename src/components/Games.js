import Card from "./Card";

function Games({ games }) {
  const gameList = games.map((gameObj) => (
    <Card key={gameObj.id} id={gameObj.id} name={gameObj.name} />
  ));

  return (
    <div id="dev-list">
      <ul>{gameList}</ul>
    </div>
  );
}

export default Games;
