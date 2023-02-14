function Card({ name, id }) {
  return (
    <li className="cards-item" id={id} /*style="width: 18rem;"*/>
      <div className="card">
        <img
          className="card-image"
          src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2014/11/GTA-5-1.jpg"
          alt="Card image cap"
          styles="width:100%"
        />
        <div className="card-content">
          <div className="card-title">{name}</div>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="card-detail">
            <p>insert more content here if needed</p>
            <p>insert more content here if needed</p>
          </div>
          {/* <a href="#" class="btn btn-primary">
          Go somewhere
        </a> */}
        </div>
      </div>
    </li>
  );
}

export default Card;
