import React from "react";
import Card from "./Card";

function CardList(props) {
  if (props.menu.length == 0) {
    return <h4>Loading..</h4>;
  } else {
    let cardsList = props.menu.map(function (element) {
      return (
        <Card
          name={element.name}
          description={element.Description}
          size={element.size}
          price={element.price}
        />
      );
    });

    return (
      <div className="d-flex justify-content-around mt-5 container-lg">
        {cardsList}
      </div>
    );
  }
}

export default CardList;
