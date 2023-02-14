function GameItem({ game }) {
  const { name, id, genres, esrb_rating, metacritic, background_image } = game;
  const genreString = Array.from(genres.map((genre) => genre.name)).join(", ");
  const ratingString =
    `metacritic: ${metacritic}` + "\n" + `ESRB: ${esrb_rating.name}`;

  return (
    <li className="cards-item" id={id}>
      <div className="card">
        <img
          src={background_image}
          alt="Card image cap"
          styles="width:100%"
        />
        <div className="card-content">
          <div className="card-title">{name}</div>
          <p className="card-detail">
            <i>{genreString}</i>
            <br />
            <i>{ratingString}</i>
          </p>
          <button className="button">Save Game</button>
        </div>
      </div>
    </li>
  );
}

export default GameItem;
