import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { fetchSingleUserData } from "./apiServices";
import { deleteUserData } from "./apiServices";
import { style, style2 } from "./boxStyle";

export default function ServiceUser(props) {
  const filterData = useSelector((state) => state.service.singleData);
  const failed = useSelector((state) => state.service.error);
  const loading = useSelector((state) => state.service.loading);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") !== "undefined" &&
      fetchSingleUserData(props.location.state.email);
  }, []);

  const handleClick = () => {
    deleteUserData(filterData._id);
    setOpen(true);
    setTimeout(() => {
      props.history.push("/");
    }, 2000);
  };

  return (
    <>
      {localStorage.getItem("token") !== "undefined" ? (
        <div id="background">
          {" "}
          {loading && <h1>Loading Data...</h1>}
          {failed !== "" && <h1>{failed}</h1>}
          {failed === "" && !loading ? (
            <>
              <Card sx={style2}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      Name : {filterData.name} <br />
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {" "}
                      Email : {filterData.email} <br />
                      Mobile : {filterData.mob_no} <br />
                      {filterData.price !== null && (
                        <span>
                          {" "}
                          Price : {filterData.price} Rs/-
                          <br />
                        </span>
                      )}
                      {filterData.price !== null && (
                        <span>
                          Service : {filterData.role}
                          <br />
                        </span>
                      )}
                      Address : {filterData.address}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => props.history.push("/editDetails")}
                  >
                    Edit Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      props.history.push({
                        pathname: "/dashboard",
                        state: { email: filterData.email },
                      })
                    }
                  >
                    Dashboard
                  </Button>
                </CardActions>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClick}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => props.history.push("/login")}
                  >
                    Log out
                  </Button>
                </CardActions>
              </Card>
            </>
          ) : null}
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h1">
                Data deleted succefully
              </Typography>
            </Box>
          </Modal>
        </div>
      ) : (
        <h1 className="loginFirst"> Login First</h1>
      )}
    </>
  );
}
