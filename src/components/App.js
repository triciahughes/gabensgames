import "../App.css";
import Developers from "./Developers";
import EditGame from "./EditGame";
import Games from "./Games";
import NavBar from "./NavBar";
import SavedGames from "./SavedGames";
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
  //////// Search Bar Filtered Lists ////////
  const filteredGameList = games.filter((game) => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const filteredSaveGameList = savedGames.filter((game) => {
    return game.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const filteredDevList = devs.filter((dev) => {
    return dev.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  function handleSave(gameData) {
    setSavedGames((currentState) => [...currentState, gameData]);
  }

  function handleRemove(id) {
    const newSavedGames = savedGames.filter((gameObj) => gameObj.id !== id);
    setSavedGames(newSavedGames);
  }

  const handleAddGame = (formData) => {
    setSavedGames((savedGames) => [...savedGames, formData]);
  };

  const onUpdateGame = (updatedGame) => {
    const updatedGameList = savedGames.map((oldGame) => {
      if (updatedGame.id === oldGame.id) {
        return updatedGame;
      } else {
        return oldGame;
      }
    });
    setSavedGames(updatedGameList);
  };

  const completeEditing = () => {
    setGameId(null);
  };

  // const enterGameEditModeFor = (gameId) => {
  //   setGameId(gameId);
  // };

  // const renderForm = () => {
  //   if (gameId) {
  //     return (
  //       <EditGame
  //         gameId={gameId}
  //         completeEditing={completeEditing}
  //         onUpdateGame={onUpdateGame}
  //       />
  //     );
  //   }
  // };

  return (
    <div>
      <NavBar
        handleSearchChange={handleSearchChange}
        searchInput={searchInput}
      />
      <Switch>
        <Route path="/games">
          <Games
            games={filteredGameList}
            savedGames={savedGames}
            handleSave={handleSave}
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
      </Switch>
    </div>
  );
}

export default App;
