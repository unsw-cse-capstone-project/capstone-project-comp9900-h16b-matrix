import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Rating from "@material-ui/lab/Rating";
import default_img from "../../../image/No_picture_available.png";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "@material-ui/core";
export default function Similar(props){
  // const { loading = false } = props;
  const { history } = props;
  const apiKey = process.env.REACT_APP_KEY;
  const [newMovie, setNew] = useState([]);
  useEffect(() => {
    const getMovie = async () => {
      
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing/?api_key=${apiKey}`
        );
        const data = await res.json();
        console.log(data);
        setNew(data.results);
      
       
    };

    getMovie();
  }, []);
  console.log("media", history);
  const handleDetail = (id) => {
    console.log("click", id);
    history.push({
      pathname: `/movieDetail/${id}`,
      // state: data
    });
  };
  return (
    <Grid container   justify="flex-start">
      {newMovie
        .map((item, index) => (
          <Grid item xs={3} alignItems="center" justify="center" spacing={1}>
           <Box>
              
                <img
                  style={{ width: 140, height: 200 }}
                  alt={item.title}
                  src={
                    item.poster_path
                      ? `http://image.tmdb.org/t/p/w185${item.poster_path}`
                      : default_img
                  }
                  onClick={() => handleDetail(item.id)}
                />
             
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography>{item.title}</Typography>
                      </React.Fragment>
                    }
                  >
                    <Typography noWrap={true}>{item.title}</Typography>
                  </Tooltip>

                  
                    <Rating
                      name="read-only"
                      value={(item.vote_average / 2).toFixed(1)}
                      readOnly
                      precision={0.5}
                    />
              
                </Box>
            
          </Grid>
        ))
        .slice(0, 8)}
    </Grid>
  );
};




