function DeveloperItem({ dev }) {
const { name, games, games_count, image_background } = dev;

//   const gamesList = games.map((gameObj) => {
//     return <li key={gameObj.id}>{gameObj.name}</li>;
//   });

const gameTitles = games.map(gameObj => gameObj.name);
const gamesString = Array.from(gameTitles).join(' - ');


  return (
    <li className="cards-item">
      <div className="card dev-card" style={{'backgroundImage': `url(${image_background})`}}>
        <div className="card-content dev-card-content">
          <h1 className="card-title">{name}</h1>
          {/* <ul>{gamesList}</ul> */}
          <p>
            {gamesString}
            <br />
            <i>{games_count} games</i>
          </p>
        </div>
      </div>
    </li>
  );
}

export default DeveloperItem;
