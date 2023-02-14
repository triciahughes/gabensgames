function Games({ games }) {
    const gameList = games.map(gameObj => {
        return <li key={gameObj.id}>{gameObj.name}</li>;
    });

    return (
        <div id="dev-list">
          <ul>{gameList}</ul>
        </div>
    );
}

export default Games;