import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import { fetchAllUserData, fetchFilterData } from "./apiServices";
import { allCard } from "./boxStyle";

export default function Dashboard(props) {
  const [service, setService] = useState("");
  const [booking, setBooking] = useState(0);
  const filterData = useSelector((state) => state.service.data);
  const failed = useSelector((state) => state.service.error);
  const loading = useSelector((state) => state.service.loading);

  const handleChange = (event) => {
    setService(event.target.value);
  };

  useEffect(() => {
    localStorage.getItem("token") !== "undefined" && fetchAllUserData();
  }, []);

  const handleClick = () => {
    fetchFilterData(service);
  };

  return (
    <>
      {localStorage.getItem("token") !== "undefined" ? (
        <div id="backgroundDashboard">
          {loading && <h1>Loading Data...</h1>}
          {failed !== "" && <h1>{failed}</h1>}
          {failed === "" && !loading ? (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                  <Toolbar>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      Welcome
                    </Typography>
                    <Button
                      onClick={() => {
                        props.history.push({
                          pathname: "/userDetails",
                          state: { email: props.location.state.email },
                        });
                      }}
                      color="inherit"
                    >
                      profile
                    </Button>
                  </Toolbar>
                </AppBar>
              </Box>
              <div id="form2">
                <Box
                  sx={{
                    maxWidth: 320,
                    marginLeft: 96,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Service
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={service}
                      label="Select Service"
                      onChange={handleChange}
                    >
                      <MenuItem value={"plumber"}>Plumber</MenuItem>
                      <MenuItem value={"electrician"}>Electrician</MenuItem>
                      <MenuItem value={"washerman"}>Washerman</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button onClick={handleClick} variant="outlined">
                  Filter
                </Button>
              </div>

              {filterData.length !== 0 &&
                filterData.map((item, index) => {
                  if (item.price === null) {
                    return false;
                  }

                  return (
                    <Card id="cardBackground" key={index} sx={allCard}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h4" component="div">
                            Name : {item.name}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            Email : {item.email} <br />
                            Mobile : {item.mob_no} <br />
                            Service : {item.role}
                            <br />
                            Price : {item.price} Rs/- <br />
                            Address : {item.address}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        {booking === item._id ? (
                          <span id="book">
                            <br /> Booked
                          </span>
                        ) : (
                          <Button
                            size="large"
                            variant="outlined"
                            color="success"
                            onClick={() => setBooking(item._id)}
                          >
                            Book Appointment
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  );
                })}
            </>
          ) : null}
        </div>
      ) : (
        <h1 className="loginFirst">Login First</h1>
      )}
    </>
  );
}
