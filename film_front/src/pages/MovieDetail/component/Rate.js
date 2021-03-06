import { Grid, Typography, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import * as rateAPI from "../../../api/rateAPI";
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

export default function Rate(props) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const { decoded, vote_average, vote_count, handleClickOpen, movieId } = props;
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [newRate, setNew] = useState(true);
  useEffect(() => {
    const getAll = async () => {
      const res = await rateAPI.getAvg(decoded ? decoded.id : -1, movieId);
      console.log("initavg", res);
      if (res) {
        const avg = res[0];
        const count = res[1];
        console.log("initial", average, count, vote_average, vote_count);
        setAverage(avg);
        setCount(count);
      }
    };

    getAll();
  }, [movieId, decoded, value]);
  useEffect(() => {
    const getRate = async () => {
      console.log("init rate", decoded);
      if (decoded) {
        const res = await rateAPI.get(decoded.id, movieId);
        console.log("init rate", res);
        if (res) {
          setNew(false);
          setValue(res.rating);
        } else {
          setNew(true);
          setValue(0);
        }
      }
    };

    getRate();
  }, [decoded]);
  const updateRating = async (newValue) => {
    const addRate = async () => {
      const data = {
        uid: decoded.id,
        movie_id: movieId,
        rating: newValue,
      };
      const res = await rateAPI.addRate(data);
      console.log("ratelog", "add", res);
      setNew(false);
    };
    const updateRate = async () => {
      const data = {
        uid: decoded.id,
        movie_id: movieId,
        rating: newValue,
      };
      const res = await rateAPI.updateRate(data);
      console.log("ratelog", "update", res);
    };
    console.log("newRate", newRate);
    if (newRate && decoded) {
      addRate();
    } else if (newRate == false && decoded) {
      updateRate();
    }
    setValue(newValue);
    const res = await rateAPI.getAvg(decoded ? decoded.id : -1, movieId);
    console.log("initavg", res);
    if (res) {
      const avg = res[0];
      const count = res[1];
      console.log("initial", average, count, vote_average, vote_count);
      setAverage(avg);
      setCount(count);
    }
  };
  return (
    <div>
      <Grid container justify="center">
        {average ? (
          <Grid item xs={8}>
            <Typography variant="h4">
              {(average / 2).toFixed(1)}
              <Rating
                name="read-only"
                value={average / 2}
                readOnly
                precision={0.5}
              />
            </Typography>
            <Typography color="textSecondary">
              {" "}
              averaged by {count} ratings
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={8}>
            <CircularProgress disableShrink />
          </Grid>
        )}

        <Grid item xs={8}>
          <br />
          <Typography variant="h4">
            {decoded
              ? !newRate
                ? "Your Rating"
                : "Rate here"
              : "Login to raing"}
          </Typography>
          {decoded ? (
            <Rating
              name="hover-feedback"
              value={(value / 2).toFixed(1)}
              precision={0.5}
              onChange={(event, newValue) => {
                updateRating(newValue * 2);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          ) : (
            <IconButton onClick={() => handleClickOpen()}>
              <StarRateIcon fontSize="large" />
              <StarRateIcon fontSize="large" />
              <StarRateIcon fontSize="large" />
              <StarRateIcon fontSize="large" />
              <StarRateIcon fontSize="large" />
            </IconButton>
          )}

          {decoded
            ? value !== null &&
              labels[hover !== -1 ? hover : (value / 2).toFixed(1)]
            : null}
        </Grid>
      </Grid>
    </div>
  );
}
