import {
  Button,
  Grid,
  Divider,
  Typography,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

import * as moment from "moment";
import * as reviewAPI from "../../api/reviewAPI";
import * as rateAPI from "../../api/rateAPI";
const jwt = require("jwt-simple");
const myDate = new Date();

export default function Preview(props) {
  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  } else {
    window.location.href = `${process.env.REACT_APP_HOST_URL}`;
  }
  const movieid = props.match.params.id;
  const reviewKey = decoded.id.toString() + "@" + movieid;
  const reviewJson = localStorage.getItem(reviewKey);
  const reviewValue = JSON.parse(reviewJson);
  const [update, setUpdate] = useState(false);
  const [reviewId, setRid] = useState(-1);
  console.log(reviewKey, reviewValue);
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
  useEffect(() => {
    const getReview = async () => {
      const res = await reviewAPI.getByUidMid(decoded.id, movieid);
      console.log("update", res);
      if (res) {
        setUpdate(true);
        setRid(res.id);
      }
    };

    if (decoded) {
      getReview();
    }
  }, [decoded]);
  const handleSend = async () => {
    if (update) {
      const data = {
        review_id: reviewId,
        uid: decoded.id,
        title: reviewValue.title,
        content: reviewValue.content,
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
        title: reviewValue.title,
        content: reviewValue.content,
      };
      const res = await reviewAPI.sendReview(data);
      if (res) {
        console.log(res);
        localStorage.removeItem(reviewKey);
      }
    }
    if (reviewValue.rated) {
      const data = {
        uid: decoded.id,
        movie_id: movieid,
        rating: reviewValue.rating,
      };
      const res = await rateAPI.updateRate(data);
    } else {
      const data = {
        uid: decoded.id,
        movie_id: movieid,
        rating: reviewValue.rating,
      };
      const res = await rateAPI.addRate(data);
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
      <Grid item xs={8}>
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
          </Grid>
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
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3">
              {reviewValue ? reviewValue.title : null}
              <Typography variant="body2" color="textSecondary" align="right">
                0
                <IconButton>
                  <AiOutlineLike />
                </IconButton>{" "}
                0{" "}
                <IconButton>
                  <AiOutlineDislike />
                </IconButton>
              </Typography>
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={7}>
            <Typography variant="body2">
              By {decoded.name}, {moment(myDate).format("YYYY-MM-DD")}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />

            <div
              dangerouslySetInnerHTML={{
                __html: reviewValue ? reviewValue.content : null,
              }}
            ></div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Comment</Typography>

            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
