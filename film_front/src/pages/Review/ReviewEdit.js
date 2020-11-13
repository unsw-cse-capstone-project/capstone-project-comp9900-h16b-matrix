import { Button, Grid, Input, Paper, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import BraftEditor from "./component/editor";
import { Link } from "react-router-dom";
import * as reviewAPI from "../../api/reviewAPI";
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

  const reviewKey = decoded.id.toString() + "@" + movieid;
  const [reviewId,setRid] = useState(-1)
  const [values, setValues] = useState({ title: "", content: "" });
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const getReview = async () => {
      const res = await reviewAPI.getByUidMid(decoded.id, movieid);

      if (res) {
        setUpdate(true);
        setRid(res.id)
        const reviewJson = localStorage.getItem(reviewKey);
        if (!reviewJson) {
          const data = {
            title: res.title,
            content: res.content,
          };
          console.log(res, data);
          setValues(data);
        }
      }
    };

    if (decoded) {
      getReview();
    }
    console.log(values, update);
  }, [decoded.id]);
  useEffect(() => {
    const reviewJson = localStorage.getItem(reviewKey);
    const reviewValue = JSON.parse(reviewJson);
    console.log(reviewValue, reviewJson);
    let t = "";
    let c = "";
    if (reviewValue) {
      c = reviewValue.content;
      t = reviewValue.title;
    }
    const data = {
      title: t,
      content: c,
    };
    setValues(data);
  }, []);

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
    console.log(values, "values");
  };
  const handleSet = (uid, review) => {
    var myJson = JSON.stringify(review);
    console.log(uid, review);
    localStorage.setItem(uid, myJson);
  };
  const handleSend = async () => {
    if (update){
      const data = {
        review_id: reviewId,
        uid: decoded.id,
        title: values.title,
        content: values.content,
      };
      const res = await reviewAPI.update(data);
      if (res) {
        console.log(res);
        localStorage.removeItem(reviewKey);
      }
    }
    else{
      const data = {
        uid: decoded.id,
        movie_id: movieid,
        title: values.title,
        content: values.content,
      };
      const res = await reviewAPI.sendReview(data);
      if (res) {
        console.log(res);
        localStorage.removeItem(reviewKey);
      }
    }
    
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
              onClick={handleSend}
              component={Link}
              to={{ pathname: `/home` }}
            >
              {update?"Update": "Send"}
            </Button>
          </Grid>
          <Grid item>
            {decoded ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSet(reviewKey, values)}
                component={Link}
                to={{ pathname: `/Preview/${movieid}` }}
              >
                Preview
              </Button>
            ) : (
              <Button size="large" color="primary" onClick={handleClickOpen}>
                Preview
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
       
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
        />
        {console.log(values)}
      </Grid>
      <Grid item xs={10}>
    
        <Paper elevation={3}>
          {console.log(values.content)}
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
