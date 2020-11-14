import { Button, Grid, Input, Paper, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import BraftEditor from "./component/editor";
import { Link } from "react-router-dom";

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

  const movieid = props.match.params.id;

  let t = "";
  let c = "";
  let reviewKey = decoded.id.toString()+"@"+movieid;

  const reviewJson = localStorage.getItem(reviewKey);
  const reviewValue = JSON.parse(reviewJson);
  console.log(reviewValue, reviewJson);
  if (reviewValue){
    c = reviewValue.content;
    t = reviewValue.title;
  }
  const [values, setValues] = useState({ title: t, content: c });

  console.log(values)

 
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
  const handleSet = (uid, review) => {
    var myJson = JSON.stringify(review);
    console.log(uid,review);    
    localStorage.setItem(uid, myJson);
  }
  // const removeSet = (uid) => {
  //   localStorage.removeItem(uid);
  // }
  
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
                  <Button variant="contained" 
                  color="primary"
                  // onClick={()=>removeSet(reviewKey)}
                  component={Link}
                  to={{ pathname: `/movieDetail/${movieid}` }}>
                      Send
                  </Button>
                  </Grid>
                  <Grid item>
                  {decoded?
                      <Button variant="outlined" 
                          color="primary"
                          onClick={()=>handleSet(reviewKey, values)}
                          component={Link}
                          to={{ pathname: `/Preview/${movieid}` }}
                          >
                      Preview
                      </Button>:
                      <Button
                          size="large"
                          color="primary"
                          onClick={handleClickOpen}>
                      Preview
                      </Button>
                  }
              </Grid>
          </Grid>

      </Grid>
      <Grid item xs={6}>
        {reviewValue?
        <TextField
        id="standard-start-adornment"
        fullWidth
        value={values.title}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">Title:</InputAdornment>
          ),
        }}
        onChange={(e) => {
          setValues({ ...values, title: e.target.value });
        }}
        //reviewValue = {NaN}
      />:
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
      }
      </Grid>
      <Grid item xs={10}>
         {reviewValue?
          <Paper elevation={3}>
          <BraftEditor
            handleContent={handleContent}
            content={reviewValue.content}
            id={undefined}
          />
        </Paper>: 
          <Paper elevation={3}>
          <BraftEditor
            handleContent={handleContent}
            content={values.content}
            id={undefined}
        />
        </Paper>
        }
      </Grid>
    </Grid>
  );
}
