import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { withRouter } from "react-router";
import { postData } from "./apiServices";
import { style } from "./boxStyle";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Signup(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    address: "",
    mob_no: "",
    password: "",
    price: "",
  });
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    localStorage.setItem("token", "undefined");
    localStorage.setItem("name", "undefined");
  }, []);

  const handelChange = () => {
    if (isDisabled) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
      setUser((previousState) => {
        return { ...previousState, role: "", price: "" };
      });
    }
  };

  const handleClick = async () => {
    let data = {
      name: user.name,
      email: user.email,
      mob_no: user.mob_no,
      role: user.role,
      address: user.address,
      password: user.password,
      price: user.price,
    };

    if (
      (user.name !== "" &&
        user.email !== "" &&
        user.mob_no !== "" &&
        user.password !== "" &&
        user.address !== "" &&
        isDisabled) ||
      (user.name !== "" &&
        user.email !== "" &&
        user.mob_no !== "" &&
        user.password !== "" &&
        user.address !== "" &&
        user.role !== "" &&
        user.price !== "" &&
        !isDisabled)
    ) {
      await postData(data);
      if (localStorage.getItem("name") !== "undefined") {
        setOpen(true);
        setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      } else {
        alert("Email already registered");
      }
    } else {
      alert("Fill the data according to given condition");
    }
  };

  return (
    <>
      <div className="background">
        <form id="form" action="">
          <h1>Enter your details</h1>
          <br />
          <TextField
            id="outlined-required 1"
            required
            className="input"
            label="Name"
            placeholder="Enter your name here"
            value={user.name}
            onChange={(event) => {
              setUser((previousState) => {
                return { ...previousState, name: event.target.value };
              });
            }}
          />{" "}
          <br /> <br />
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
            id="outlined-number"
            required
            autoComplete="username"
            className="input"
            label="Mobile Number"
            type="number"
            value={user.mob_no}
            onChange={(event) =>
              setUser((previousState) => {
                return { ...previousState, mob_no: event.target.value };
              })
            }
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-required "
            required
            label="address"
            className="input"
            placeholder="Enter your address here"
            value={user.address}
            onChange={(event) =>
              setUser((previousState) => {
                return { ...previousState, address: event.target.value };
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
          <br />
          <br />
          <div id="note">
            Note : If you want to register as a service provider then tick the
            below checkbox and fill the remaining the fields properly{" "}
          </div>
          <Checkbox {...label} onChange={handelChange} />
          <Box sx={{ maxWidth: "50%", marginLeft: 23 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Service</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.role}
                label="role"
                disabled={isDisabled}
                onChange={(event) =>
                  setUser((previousState) => {
                    return { ...previousState, role: event.target.value };
                  })
                }
                autoComplete="role"
              >
                <MenuItem value={"plumber"}>plumber</MenuItem>
                <MenuItem value={"washerman"}>washerman</MenuItem>
                <MenuItem value={"electrician"}>electrician</MenuItem>
              </Select>
            </FormControl>
          </Box>{" "}
          <br />
          <TextField
            id="outlined-number "
            autoComplete="price"
            label="Price"
            type="number"
            disabled={isDisabled}
            className="input"
            value={user.price}
            onChange={(event) =>
              setUser((previousState) => {
                return { ...previousState, price: event.target.value };
              })
            }
          />{" "}
          <br /> <br />
          <Button onClick={handleClick} variant="outlined" className="btn1">
            Sign Up
          </Button>
          <Button
            onClick={() => props.history.push("/login")}
            variant="outlined"
            color="success"
            className="btn2"
          >
            Login
          </Button>
        </form>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              Sign Up Successfully
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default withRouter(Signup);
