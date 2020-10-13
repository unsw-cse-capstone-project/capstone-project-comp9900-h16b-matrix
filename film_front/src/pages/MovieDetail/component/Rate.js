import { Grid, Typography,Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState, useEffect } from "react";

const labels = {
  0.5: "0.5",
  1: "1+",
  1.5: "1.5",
  2: "2",
  2.5: "2.5",
  3: "3",
  3.5: "3.5",
  4: "4",
  4.5: "4.5",
  5: "5",
};

export default function Rate(props) {
  const [rate, setRate] = useState(4.5);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [rating,setRating] = useState(false)
  return (
    <div>
      <Grid container justify='center'>
        <Grid item xs={8}  >
       
          <Typography variant="h4">
            {rate}
            <Rating name="read-only" value={rate} readOnly precision={0.5} />
          </Typography>
          <Typography color="textSecondary"> averaged by x ratings</Typography>
         
        </Grid>
        <Grid item xs={8}>
          <br />
          <Typography variant="h4">{rating?'Your Rating': 'Rate here'}</Typography>
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
              setRating(true)
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            // readOnly = {rating}
          />
          {value !== null && labels[hover !== -1 ? hover : value]}
        </Grid>
      </Grid>
    </div>
  );
}
