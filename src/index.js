import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardList from "./Components/CardList";
import requestMenu from "./Apis/Menu";
import Cart from "./Components/Cart";
import LoginForm from "./Components/LoginForm";
import UserLogin from "./Components/ExistingUser";

function App() {
  let [menu, setMenu] = useState();
  let [loginStatus, setLoginStatus] = useState(false);

  let refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    requestMenu
      .get("/menu/items")
      .then((response) => {
        setMenu(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginStatus]);

  return (
    <Router>
      <div>
        <Navbar setLoginStatus={setLoginStatus} loginStatus={loginStatus} />
        <Routes>
          <Route path="/" element={<CardList menu={menu} />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/loginForm"
            element={<LoginForm setLoginStatus={setLoginStatus} />}
          />
          <Route
            path="/existingUser"
            element={<UserLogin setLoginStatus={setLoginStatus} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
