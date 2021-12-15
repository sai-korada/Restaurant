import React from "react";
import ReactDom from "react-dom";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import CardList from "./Components/CardList";
import requestMenu from "./Apis/Menu";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    requestMenu
      .get("/menu/items")
      .then((data) => {
        this.setState({
          data: data.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <CardList menu={this.state.data} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
