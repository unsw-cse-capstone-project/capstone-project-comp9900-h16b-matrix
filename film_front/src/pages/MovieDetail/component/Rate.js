import { Grid, Typography, Box, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState, useEffect } from "react";
import Logindialog from "../../Login & Sign up/Login";
import StarRateIcon from '@material-ui/icons/StarRate';
const labels = {
  0.5: "1",
  1: "2",
  1.5: "3",
  2: "4",
  2.5: "5",
  3: "6",
  3.5: "7",
  4: "8",
  4.5: "9",
  5: "10",
};

export default function Rate(props) {
  const [rate, setRate] = useState(4.5);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [rating, setRating] = useState(false);
  const { decoded, vote_average, vote_count,handleClickOpen } = props;
  const [average, setAverage] = useState(vote_average / 2);
  const [count, setCount] = useState(vote_count);
  
  useEffect(() => {
    console.log("initial");

    setAverage(vote_average);
    setCount(vote_count);
    console.log("initial", average, count, vote_average);
  }, [vote_average, vote_count]);
  useEffect(() => {
    let initial = vote_average;
    const newAvg = (initial * vote_count + value) / (vote_count + 1);
    setAverage(newAvg.toFixed(1));
    setCount(vote_count + 1);
  }, [value]);
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={8}>
          <Typography variant="h4">
            {average}
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
        <Grid item xs={8}>
          <br />
          <Typography variant="h4">
            {decoded?rating ? "Your Rating" : "Rate here":"Login to raing"}
          </Typography>
          {decoded? <Rating
            name="hover-feedback"
            value={value/2}
            precision={0.5}
            // disabled = {!decoded}
            // onClick={()=>handleClickOpen()}
            onChange={(event, newValue) => {
              
                setValue(newValue * 2);
                setRating(true);
              
            }}
            onChangeActive={(event, newHover) => {
             
                setHover(newHover);
              
            }}
            // readOnly = {rating}
          />:
          <IconButton onClick={()=>handleClickOpen()}>
            <StarRateIcon fontSize="large"  /><StarRateIcon fontSize="large"/><StarRateIcon fontSize="large"/><StarRateIcon fontSize="large"/><StarRateIcon fontSize="large"/>
            </IconButton>
            
       
            }
         
          {decoded?value !== null && labels[hover !== -1 ? hover : value]:null}
        </Grid>
      </Grid>
    </div>
  );
}
