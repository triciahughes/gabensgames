import { useState, useEffect } from "react";

const API_KEY = 'a77f9483f3f14f5292692794e7fba92a';

function Games() {
    const [ games, setGames ] = useState([]);

    const gameList = games.map(gameObj => {
        return <li key={gameObj.id}>{gameObj.name}</li>;
    });

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
          .then(r => r.json())
          .then(data => setGames(data.results));
    }, []);

    return (
        <ul>{gameList}</ul>
    );
}

export default Games;