import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SearchList from "../Search/component/SearchList";
import WishList from "./component/WishList";
const jwt = require("jwt-simple");
export default function Wish(props) {
  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  } else {
    window.location.href = `${process.env.REACT_APP_HOST_URL}`;
  }
  const { history } = props;
  const { id } = props.match.params;
  //const { query } = props.location;
  const { Wish } = "matrix";//props.match.params;

  console.log("Wishlist", Wish, props);
  console.log(history);
  const [open, setOpen] = useState(false);
  const [SignupOpen, SignupsetOpen] = useState(false);
  const [logout,setLogout] = useState(false)
  const rederLogout = ()=>setLogout(!logout)
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
  {/*useEffect(() => {
    setName(Wish);
  }, [Wish]);*/}
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12}>
        <NavBar handleClose={handleClose}
        open={open}
        handleClickOpen={handleClickOpen}
        SignupClose={SignupClose}
        SignupOpen={SignupOpen}
        handleSignupOpen={handleSignupOpen}
        rederLogout={rederLogout}
        />
        </Grid>
      <Grid item xs={11}>
        <br/>
        <Typography variant='h3'>
          Wish List
        </Typography>
      </Grid>
        <Grid item xs={10}>
          <br />
          <br />
          {/* <Grid container justify="center"> */}
            <WishList decoded={decoded} id={id} />
          {/* </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}
