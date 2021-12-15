import React from "react";

let Card = ({ name, description, size, price }) => {
  return (
    <div
      className="card shadow mb-5 bg-body rounded"
      style={{ width: "18rem" }}
    >
      <img src="pizza.jpg" className="card-img-top" alt="Cheese Pizza" />
      <div className="card-body">
        <h5 className="card-title">
          {name} ({size})
        </h5>
        <p>
          {"\u20B9"} {price}
        </p>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">
          Add to Cart
        </a>
      </div>
    </div>
  );
};

export default Card;
