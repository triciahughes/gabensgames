function DeveloperItem({ dev }) {
const { name, games, games_count, image_background } = dev;

const gameTitles = games.map(gameObj => gameObj.name);
const gamesString = Array.from(gameTitles).join(' - ');

  return (
    <li>
      <div className="card dev-card" style={{'backgroundImage': `url(${image_background})`}}>
        <div className="card-content dev-card-content">
          <h1><u>{name}</u></h1>
          <h2><i>{games_count} games</i></h2>
          <ul>
            {games.map(gameObj => {
              return <li key={gameObj.id}>{gameObj.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default DeveloperItem;
