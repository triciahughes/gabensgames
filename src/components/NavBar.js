import { NavLink } from "react-router-dom";


function NavBar({ handleSearchChange, searchInput }) {
  return (
    <header>
      <nav className="navbar">
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/developers">Developers</NavLink>
        <NavLink to="/saved">My Saved Games</NavLink>
        <input
          onChange={handleSearchChange}
          value={searchInput}
          className="search"
          type="text"
          placeholder="Search..."
        />
      </nav>
    </header>
  );
}

export default NavBar;
