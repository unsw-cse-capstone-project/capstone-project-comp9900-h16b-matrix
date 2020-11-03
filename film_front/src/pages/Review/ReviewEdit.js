import { Button, Grid, Input, Paper, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import BraftEditor from "./component/editor";

import InputAdornment from "@material-ui/core/InputAdornment";
const jwt = require("jwt-simple");
export default function ReviewEdit(props) {
  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  } else {
    window.location.href = `${process.env.REACT_APP_HOST_URL}`;
  }
  const [values, setValues] = useState({ title: "", content: "" });
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
  const handleContent = (e) => {
    setValues({ ...values, content: e });
    console.log(values,'values')
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
                  <Button variant="contained" color="primary">
                      Send
                  </Button>
                  </Grid>
                  <Grid item>
                  <Button variant="outlined" color="primary">
                      Preview
                  </Button>
              </Grid>
          </Grid>

      </Grid>
      <Grid item xs={6}>
        <TextField
          id="standard-start-adornment"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Title:</InputAdornment>
            ),
          }}
          onChange={(e) => {
            setValues({ ...values, title: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={10}>
        <Paper elevation={3}>
          <BraftEditor
            handleContent={handleContent}
            content={values.content}
            id={undefined}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
