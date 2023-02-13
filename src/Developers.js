import { useState, useEffect } from "react";
import DeveloperItem from "./DeveloperItem";

const API_KEY = 'a77f9483f3f14f5292692794e7fba92a';

function Developers() {
    const [ devs, setDevs ] = useState([]);

    const devList = devs.map(gameObj => {
        return <li key={gameObj.id}>{gameObj.name}</li>;
    });

    useEffect(() => {
        fetch(`https://api.rawg.io/api/developers?key=${API_KEY}`)
          .then(r => r.json())
          .then(data => setDevs(data.results));
    }, []);

    return (
        <ul>{devList}</ul>
    );
}

export default Developers;