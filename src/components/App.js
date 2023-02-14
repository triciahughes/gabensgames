import "../App.css";
import NavBar from "./NavBar";
import Games from "./Games";
import Developers from "./Developers";
// import img from "./name.png";
import SavedGames from "./SavedGames";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [games, setGames] = useState([]);
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => setGames(data.results));

    fetch(`https://api.rawg.io/api/developers?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => setDevs(data.results));
  }, []);

  return (
    <div>
      {/* <header>
        <img className="headerImg" src={img} alt="nameImg"></img>
      </header> */}
      <NavBar />
      <Switch>
        <Route path="/games">
          <Games games={games} />
        </Route>
        <Route path="/developers">
          <Developers devs={devs} />
        </Route>
        <Route path="/saved">
          <SavedGames />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
