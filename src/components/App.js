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
  const [savedGames, setSavedGames] = useState([]);
  const [devs, setDevs] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //////// Data Fetching ///////
  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then((r) => r.json())
      .then(data => setGames(data.results));

    fetch(`https://api.rawg.io/api/developers?key=${API_KEY}`)
      .then((r) => r.json())
      .then(data => setDevs(data.results));

    fetch('http://localhost:3000/games')
      .then(r => r.json())
      .then(data => setSavedGames(data));
  }, []);

  //////// Search Bar ////////
  function handleSearchChange(e) {
    setSearchInput(e.target.value);
  }
  //////// Search Bar Filtered List ////////
  const filteredGameList = games.filter((game) => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div>
      {/* <header>
        <img className="headerImg" src={img} alt="nameImg"></img>
      </header> */}
      <NavBar
        handleSearchChange={handleSearchChange}
        searchInput={searchInput}
      />
      <Switch>
        <Route path="/games">
          <Games games={filteredGameList} />
        </Route>
        <Route path="/developers">
          <Developers devs={devs} />
        </Route>
        <Route path="/saved">
          <SavedGames games={savedGames}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
