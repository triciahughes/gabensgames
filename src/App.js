import "./App.css";
import NavBar from "./NavBar";
import img from "./name.png";

function App() {
  return (
    <div>
      <header>
        <img className="headerImg" src={img} alt="nameImg"></img>
      </header>
      <NavBar />
    </div>
  );
}

export default App;
