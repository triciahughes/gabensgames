import "./App.css";
import NavBar from "./NavBar";
import Games from "./Games";
import Developers from "./Developers";
// import img from "./name.png";
import SavedGames from "./SavedGames";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <header>
        <img className="headerImg" src={img} alt="nameImg"></img>
      </header> */}
      <NavBar />
      <Switch>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/developers">
          <Developers />
        </Route>
        <Route path="/saved">
          <SavedGames />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
