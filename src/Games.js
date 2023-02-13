import { useEffect } from "react";

const API_KEY = 'a77f9483f3f14f5292692794e7fba92a';

function Games() {

    useEffect(() => {
        fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`, {
            headers: {

            }
        })
          .then(r => r.json())
          .then(console.log);
    }, []);

    return <h1>GAMES</h1>;
}

export default Games;