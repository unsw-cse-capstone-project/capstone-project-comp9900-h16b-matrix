import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import WishList from "./component/WishList";
const jwt = require("jwt-simple");
export default function Wish(props) {
  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  }
  const { history } = props;
  const { id } = props.match.params;
  console.log(history);
  const [open, setOpen] = useState(false);
  const [SignupOpen, SignupsetOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const rederLogout = () => setLogout(!logout);
  const handleSignupOpen = () => {
    SignupsetOpen(true);
    handleClose();
  };
  const SignupClose = () => {
    SignupsetOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <NavBar
            handleClose={handleClose}
            open={open}
            handleClickOpen={handleClickOpen}
            SignupClose={SignupClose}
            SignupOpen={SignupOpen}
            handleSignupOpen={handleSignupOpen}
            rederLogout={rederLogout}
            history={props.history}
          />
        </Grid>
        <Grid item xs={11}>
          <br />
          <Typography variant="h3">Wish List</Typography>
        </Grid>
        <Grid item xs={10}>
          <br />
          <br />
          <WishList decoded={decoded} id={id} />
        </Grid>
      </Grid>
    </div>
  );
}
