import "../App.css";
import Developers from "./Developers";
import EditGame from "./EditGame";
import Games from "./Games";
import NavBar from "./NavBar";
import SavedGames from "./SavedGames";
import Signin from "./Signin";
import Signup from "./Signup";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [games, setGames] = useState([]);
  const [savedGames, setSavedGames] = useState([]);
  const [devs, setDevs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [gameId, setGameId] = useState(null);
  const history = useHistory();
  const [sort, setSort] = useState("ALL");

  //////// Data Fetching ///////
  useEffect(() => {
    history.push("/games");

    fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => setGames(data.results));

    fetch(`https://api.rawg.io/api/developers?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => setDevs(data.results));

    fetch("http://localhost:3000/games")
      .then((r) => r.json())
      .then((data) => setSavedGames(data));
  }, []);

  //////// Search Bar ////////
  function handleSearchChange(e) {
    setSearchInput(e.target.value);
  }
  //////// Filtered Lists ////////
  const filteredGameList = games.filter((game) => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const sortFilter = filteredGameList.filter((game) => {
    const goodName = game.genres.map((genre) => genre.name);
    return goodName.includes(sort) || sort === "ALL";
  });

  const filteredDevList = devs.filter((dev) => {
    return dev.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  //////// Saved Games ////////
  const filteredSaveGameList = savedGames.filter((game) => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  function handleSave(gameData) {
    setSavedGames((currentState) => [...currentState, gameData]);
  }

  //////// Add && Remove Games && Update////////
  function handleRemove(id) {
    const newSavedGames = savedGames.filter((gameObj) => gameObj.id !== id);
    setSavedGames(newSavedGames);
  }

  function handleAddGame(formData) {
    setSavedGames((savedGames) => [...savedGames, formData]);
  }

  function onUpdateGame(updatedGame) {
    const updatedGameList = savedGames.map((oldGame) => {
      if (updatedGame.id === oldGame.id) {
        return updatedGame;
      } else {
        return oldGame;
      }
    });
    setSavedGames(updatedGameList);
  }

  function completeEditing() {
    setGameId(null);
  }

  //////// Sorting ////////
  function handleSort(genreSort) {
    setSort(genreSort);
  }

  function handleSortChange(e) {
    const genreSort = e.target.value;
    handleSort(genreSort);
  }

  return (
    <div>
      <NavBar
        handleSearchChange={handleSearchChange}
        searchInput={searchInput}
      />
      <Switch>
        <Route path="/games">
          <Games
            games={sortFilter}
            savedGames={savedGames}
            handleSave={handleSave}
            handleSortChange={handleSortChange}
          />
        </Route>
        <Route path="/developers">
          <Developers devs={filteredDevList} />
        </Route>
        <Route path="/saved">
          <SavedGames
            games={filteredSaveGameList}
            handleRemove={handleRemove}
            handleAddGame={handleAddGame}
          />
        </Route>
        <Route path="/saved:id/edit">
          <EditGame
            gameId={gameId}
            completeEditing={completeEditing}
            onUpdateGame={onUpdateGame}
          />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
