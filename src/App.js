import "./App.css";
import NavBar from "./NavBar";
import Games from "./Games";
import Developers from "./Developers";
import img from "./name.png";
import SavedGames from "./SavedGames";

function App() {
  return (
    <div>
      <header>
        <img className="headerImg" src={img} alt="nameImg"></img>
      </header>
      <NavBar />
      {/* Adding routing to following three pages */}
      <Games />
      <Developers />
      <SavedGames />
    </div>
  );
}

export default App;
