import React from "react";
import ReactDom from "react-dom";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CardList from "./Components/CardList";
import requestMenu from "./Apis/Menu";
import Cart from "./Components/Cart";

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
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <CardList menu={this.state.data} />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
