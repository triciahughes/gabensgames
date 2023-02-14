function DeveloperItem({ dev }) {
    console.log(dev);
    const { name, games, games_count } = dev;

    const gamesList = games.map(gameObj => {
        return <li key={gameObj.id}>{gameObj.name}</li>;
    });

    return (
      <li className="cards-item">
        <div className="card" >  
            <h1>{name}</h1>
            <ul>
              {gamesList}
            </ul>
            <p><i>{games_count} games</i></p>
        </div>
      </li>
    );
}

export default DeveloperItem;