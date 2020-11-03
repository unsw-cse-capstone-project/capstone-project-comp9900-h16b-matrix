import { Grid, Typography, Box, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState, useEffect } from "react";
import Logindialog from "../../Login & Sign up/Login";
import StarRateIcon from '@material-ui/icons/StarRate';
import * as rateAPI from "../../../api/rateAPI"
const labels = {
  0.5: "0.5",
  1: "1",
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
  const [value, setValue] = useState(0);
  const [lastValue,setLast] = useState(0);
  const [hover, setHover] = useState(-1);
  const [rating, setRating] = useState(false);
  const { decoded, vote_average, vote_count,handleClickOpen,movieId } = props;
  const [average, setAverage] = useState(vote_average / 2);
  const [count, setCount] = useState(vote_count);
  const [newRate,setNew] = useState(true)
  useEffect(() => {
    console.log("initial",movieId);
    const getAll = async()=>{
      const res = await rateAPI.getAll(movieId)
      console.log('initavg',res)
      if(res.avg){
        const avg = (res.avg*(res.count)+vote_average*vote_count)/(vote_count+res.count)
        const count = vote_count+res.count
        console.log("initial", average, count, vote_average,vote_count );
        setAverage(avg);
        setCount(count);
      }
      else{
        setAverage(vote_average);
        setCount(vote_count);
      }
      
    }
    getAll()
    
  }, [movieId]);
  useEffect(() => {
    const newAvg = (average * count-lastValue + value) / (count + (newRate?1:0));
    const newCount = count +  (newRate?1:0)
    
    const addRate = async()=>{
      const data = {
        'uid' : decoded.id,
        'movie_id' : movieId,
        'rating' : value
      }
      const res = await rateAPI.addRate(data)
      console.log('ratelog','newRate',res)
      setNew(false)
    }
    const updateRate = async()=>{
      
      const data = {
        'uid' : decoded.id,
        'movie_id' : movieId,
        'rating' : value
      }
      const res = await rateAPI.updateRate(data)
      console.log('ratelog','newRate',res)
    }
    console.log('newRate',newRate)
    if(newRate==true&&decoded){
      addRate();
      
    }
    else if(newRate==false&&decoded){
      updateRate()
    }
    
    console.log('test rate',count,newRate,(newRate?1:0))
    setAverage(newAvg.toFixed(1));
    setCount(newCount);
    
  }, [value]);
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={8}>
          <Typography variant="h4">
            {(average/2).toFixed(1)}
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
                setLast(value)
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
