import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import * as movieAPI from "../../../api/movieAPI";
import Rating from "@material-ui/lab/Rating";
import default_img from "../../../image/No_picture_available.png";
import Tooltip from "@material-ui/core/Tooltip";
export default function Similar(props) {
  // const { loading = false } = props;
  const { history, movieId, decoded } = props;
  const [newMovie, setNew] = useState([]);
  useEffect(() => {
    const getMovie = async () => {
      const res = await movieAPI.recommend(decoded ? decoded.id : "", movieId);
      console.log("recommend", res);
      setNew(res);
    };

    getMovie();
  }, [decoded, movieId]);
  console.log("media", history);
  const handleDetail = (id) => {
    console.log("click", id);
    history.push({
      pathname: `/movieDetail/${id}`,
      // state: data
    });
  };
  return (
    <Grid container justify="flex-start">
      {newMovie.length > 0 ? (
        newMovie.map((item, index) => (
          <Grid item xs={3} alignItems="center" justify="center" spacing={1}>
            <Box>
              <img
                style={{ width: 140, height: 200 }}
                alt={item.title}
                src={
                  item.poster
                    ? `http://image.tmdb.org/t/p/w185${item.poster}`
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
                value={(item.tmdb_rates / 2).toFixed(1)}
                readOnly
                precision={0.5}
              />
            </Box>
          </Grid>
        ))
      ) : (
        <Typography variant="h6">No Recommendation</Typography>
      )}
    </Grid>
  );
}
