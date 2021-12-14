import React from "react";

function Card() {
  return (
    <div className="d-flex justify-content-around mt-5 container-lg">
      <div
        className="card shadow mb-5 bg-body rounded"
        style={{ width: "18rem" }}
      >
        <img src="pizza.jpg" className="card-img-top" alt="Cheese Pizza" />
        <div className="card-body">
          <h5 className="card-title">Cheese Pizza (Small)</h5>
          <a href="#" className="btn btn-primary">
            Add to Cart
          </a>
        </div>
      </div>
      <div
        className="card shadow mb-5 bg-body rounded"
        style={{ width: "18rem" }}
      >
        <img src="./pizza.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Cheese Pizza (Medium)</h5>
          <a href="#" className="btn btn-primary">
            Add to Cart
          </a>
        </div>
      </div>
      <div
        className="card shadow mb-5 bg-body rounded"
        style={{ width: "18rem" }}
      >
        <img src="./pizza.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Cheese Pizza (Large)</h5>
          <a href="#" className="btn btn-primary">
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
