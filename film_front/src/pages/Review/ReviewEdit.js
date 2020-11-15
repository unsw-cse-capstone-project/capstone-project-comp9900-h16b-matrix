import { Button, Grid, Typography, Paper, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import BraftEditor from "./component/editor";
import { Link } from "react-router-dom";
import * as reviewAPI from "../../api/reviewAPI";
import * as rateAPI from "../../api/rateAPI";
import InputAdornment from "@material-ui/core/InputAdornment";
import Rating from "@material-ui/lab/Rating";
const jwt = require("jwt-simple");
const labels = {
  0.5: "0.5",
  1: "1.0",
  1.5: "1.5",
  2: "2.0",
  2.5: "2.5",
  3: "3.0",
  3.5: "3.5",
  4: "4.0",
  4.5: "4.5",
  5: "5.0",
};

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
  const [reviewId, setRid] = useState(-1);
  const [values, setValues] = useState({
    title: "",
    content: "",
    rating: 10,
    rated: false,
  });
  const [update, setUpdate] = useState(false);
  const [hover, setHover] = useState(-1);
  useEffect(() => {
    const getReview = async () => {
      const res = await reviewAPI.getByUidMid(decoded.id, movieid);
      const rate_res = await rateAPI.get(decoded.id, movieid);
        console.log("init rate", res);
      if (res) {
        setUpdate(true);
        setRid(res.id);
        const reviewJson = localStorage.getItem(reviewKey);
        console.log('init',res)
        if (!reviewJson) {
          if(rate_res){
            setValues({ ...values, title: res.title, content: res.content,rating:rate_res.rating,rated:true});
          }
          else{
            setValues({ ...values, title: res.title, content: res.content,rating:10,rated:false});
          }
         
          // setValues({ ...values,  });
        }
      }
    };
   
    if (decoded) {
      getReview();
      console.log('init',values)
    }
    console.log('init',values, update);
  }, [decoded.id]);
  useEffect(() => {
    const reviewJson = localStorage.getItem(reviewKey);
    const reviewValue = JSON.parse(reviewJson);
    console.log(reviewValue, reviewJson);
   
    if (reviewValue) {
      const data = {
        title: reviewValue.title,
        content: reviewValue.content,
        rating: reviewValue.rating,
        rated: reviewValue.rated
      };
      setValues(data);
      console.log('init',values)
    }
    
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
    if (update) {
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
    } else {
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
    if(values.rated){
      const data = {
        'uid' : decoded.id,
        'movie_id' : movieid,
        'rating' : values.rating
      }
      const res = await rateAPI.updateRate(data)
    }
    else{
      const data = {
        'uid' : decoded.id,
        'movie_id' : movieid,
        'rating' : values.rating
      }
      const res = await rateAPI.addRate(data)
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
          history={props.history}
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
              to={{ pathname: `/movieDetail/${movieid}` }}
            >
              {update ? "Update" : "Send"}
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
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={6}>
            {console.log('init',values)}
            <Typography>
              Your rating :
              <Rating
                name="hover-feedback"
                value={(values.rating / 2).toFixed(1)}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValues({ ...values, rating: newValue * 2 });
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {decoded
                ? values.rating !== null &&
                  labels[hover !== -1 ? hover : (values.rating / 2).toFixed(1)]
                : null}
            </Typography>
          </Grid>
        </Grid>
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
