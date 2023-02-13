import { useState, useEffect } from "react";

function Games({ games }) {
    const gameList = games.map(gameObj => {
        return <li key={gameObj.id}>{gameObj.name}</li>;
    });

    return (
        <ul>{gameList}</ul>
    );
}

export default Games;