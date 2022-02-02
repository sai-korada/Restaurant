import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const LoginForm = ({ setLoginStatus }) => {
  const navigate = useNavigate();
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [employer, setEmployer] = useState();
  let [password, setPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState();

  let handleSubmit = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();

    let data = {};

    Object.assign(data, name, email, employer, password, confirmPassword);

    try {
      await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/signup",
        data: data,
      })
        .then(function (response) {
          cookies.set("jwt", response.data.token);
        })
        .then(() => {
          setLoginStatus(true);
          navigate("/");
        });
    } catch (err) {
      console.log("Request failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-light w-25 p-3 position-absolute top-50 start-50 translate-middle px-5 py-4 shadow p-3 mb-5 g-body rounded ">
        <div className="form-floating mb-2">
          <input
            name="name"
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(event) => {
              setName({ [event.target.name]: event.target.value });
            }}
          ></input>
          <label for="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-2">
          <input
            name="email"
            type="email"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(event) => {
              setEmail({ [event.target.name]: event.target.value });
            }}
          ></input>
          <label for="floatingPassword">Email</label>
        </div>
        <div className="form-floating mb-2">
          <input
            name="employer"
            type="employer"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(event) => {
              setEmployer({ [event.target.name]: event.target.value });
            }}
          ></input>
          <label for="floatingPassword">Employer</label>
        </div>
        <div className="form-floating mb-2">
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
        <div className="form-floating mb-2">
          <input
            name="passwordConfirm"
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(event) => {
              setConfirmPassword({ [event.target.name]: event.target.value });
            }}
          ></input>
          <label for="floatingPassword">Password Confirm</label>
        </div>
        <input type="submit" value="Submit" className="bg-dark text-light" />
        <Link aria-current="page" to="/existingUser">
          Already have an account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
