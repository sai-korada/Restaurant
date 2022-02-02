import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function UserLogin({ setLoginStatus }) {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  const navigate = useNavigate();

  let handleSubmit = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();

    let data = {};

    Object.assign(data, email, password);

    try {
      await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/login",
        data: data,
      })
        .then((response) => {
          cookies.set("jwt", response.data.token);
        })
        .then(() => {
          setLoginStatus(true);
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-light w-25 p-3 position-absolute top-50 start-50 translate-middle px-5 py-4 shadow p-3 mb-5 g-body rounded ">
        <div className="form-floating mb-4">
          <input
            name="email"
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(event) => {
              setEmail({ [event.target.name]: event.target.value });
            }}
          ></input>
          <label for="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-4">
          <input
            name="password"
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(event) => {
              setPassword({ [event.target.name]: event.target.value });
            }}
          ></input>
          <label for="floatingPassword">Password</label>
        </div>

        <input
          type="submit"
          value="submit"
          className="bg-dark text-light"
        ></input>
      </div>
    </form>
  );
}

export default UserLogin;
