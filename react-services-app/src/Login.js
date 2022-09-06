import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { withRouter } from "react-router";
import { login } from "./apiServices";

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    localStorage.setItem("token", "undefined");
    localStorage.removeItem("name");
  }, []);

  const handleClick = async () => {
    let data = {
      email: user.email,
      password: user.password,
    };

    if (user.email !== "" && user.password !== "") {
      await login(data);
      if (localStorage.getItem("token") !== "undefined") {
        props.history.push({
          pathname: "/dashboard",
          state: { email: user.email },
        });
      } else {
        alert("incorrect email or password");
      }
    } else {
      alert("Fill all details properly");
    }
  };

  return (
    <>
      <div className="background">
        <form id="form3">
          <h1>Enter your details for Login</h1>
          <br />
          <TextField
            id="outlined-required"
            required
            label="Email"
            className="input"
            placeholder="Enter your mail here"
            value={user.email}
            onChange={(event) =>
              setUser((previousState) => {
                return { ...previousState, email: event.target.value };
              })
            }
          />
          <br /> <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={user.password}
            required
            className="input"
            placeholder="Enter your Password here"
            onChange={(event) =>
              setUser((previousState) => {
                return { ...previousState, password: event.target.value };
              })
            }
            autoComplete="current-password"
          />{" "}
          <br /> <br />
          <br />
          <Button onClick={handleClick} variant="outlined" className="btn1">
            Login
          </Button>
          <Button
            onClick={() => props.history.push("/")}
            color="success"
            variant="outlined"
            className="btn1"
          >
            Sign up
          </Button>
        </form>
      </div>
    </>
  );
}

export default withRouter(Login);
