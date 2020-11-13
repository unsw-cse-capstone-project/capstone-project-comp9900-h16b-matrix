import { Button, Grid, Input, Paper, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const myDate = new Date();
const jwt = require("jwt-simple");

let decoded;
const token = localStorage.getItem("userInfo");
if (token) {
  decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
} else {
  window.location.href = `${process.env.REACT_APP_HOST_URL}`;
}

const theme = createMuiTheme({
  typography: {
    title: {
      fontSize: 100,
    },
    title1: {
      fontSize: 120,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: "italic",
    },
  },
});

export default function Preview(props) {
  var url = window.location.href;
  var arrUrl = url.split("/");
  const movieid = arrUrl[arrUrl.length - 1];
  const reviewKey = decoded.id.toString() + "@" + movieid;
  const reviewJson = localStorage.getItem(reviewKey);
  const reviewValue = JSON.parse(reviewJson);
  console.log(reviewKey, reviewValue);
  const [Date, setDate] = useState(myDate.toLocaleDateString());
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

  const removeSet = (uid) => {
    localStorage.removeItem(uid);
  };
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12}>
        <NavBar
          handleClose={handleClose}
          open={open}
          handleClickOpen={handleClickOpen}
          SignupClose={SignupClose}
          SignupOpen={SignupOpen}
          handleSignupOpen={handleSignupOpen}
          rederLogout={rederLogout}
        />
      </Grid>
      <Grid item xs={10}>
        <Grid container justify="flex-end" spacing={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={{ pathname: `/editReview/${movieid}` }}
            >
              Edit Preview
            </Button>
            :
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              //   onClick={localStorage.removeItem(reviewKey)}
              component={Link}
              to={{ pathname: `/movieDetail/${movieid}` }}
            >
              Send
            </Button>
            :
          </Grid>
          <Grid item xs={12}>
            <ThemeProvider theme={theme}>
              <Typography variant="h3">
                {reviewValue ? reviewValue.title : null}
              </Typography>
              <Typography variant="title1">{reviewKey}</Typography>
              <Typography>body1</Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: reviewValue ? reviewValue.content : null,
                }}
              ></div>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
