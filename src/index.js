import React from "react";
import ReactDom from "react-dom";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Card />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
