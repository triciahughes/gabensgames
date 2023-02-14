import { NavLink } from "react-router-dom";

function NavBar({ handleSearchChange, searchInput }) {
  return (
    <header>
      <div className="navbar">
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/developers">Developers</NavLink>
        <NavLink to="/saved">My Saved Games</NavLink>
        <input
          onChange={handleSearchChange}
          value={searchInput}
          className="input"
          type="text"
          placeholder="Search..."
        ></input>
      </div>
    </header>
  );
}

export default NavBar;
