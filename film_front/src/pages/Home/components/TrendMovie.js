import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import { Tooltip, Typography } from "@material-ui/core";
import default_img from "../../../image/No_picture_available.png";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: "white",
  },
  star: {
    color: "orange",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));
export default function TrendMovie(props) {
  const classes = useStyles();
  const { history } = props;
  const [trend, setTrend] = useState([]);
  const apiKey = process.env.REACT_APP_KEY;
  useEffect(() => {
    const getMovie = async () => {
      console.log(apiKey);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
      );
      const data = await res.json();
      console.log(data);
      setTrend(data.results);
    };

    getMovie();
  }, []);
  const handleDetail = (id) => {
    console.log("click", id);
    history.push({
      pathname: `/movieDetail/${id}`,
    });
  };
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.2} cellHeight={400}>
        {trend
          .map((item, index) => (
            <GridListTile>
              <img
                src={
                  item.poster_path
                    ? `http://image.tmdb.org/t/p/w185${item.poster_path}`
                    : default_img
                }
                alt={item.title}
                onClick={() => handleDetail(item.id)}
              />
              <GridListTileBar
                title={
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography>{item.title}</Typography>
                      </React.Fragment>
                    }
                  >
                    <div>{item.title}</div>
                  </Tooltip>
                }
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${item.title}`}>
                    <Typography className={classes.title}>
                      {(item.vote_average / 2).toFixed(1)}
                    </Typography>

                    <StarIcon className={classes.star} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))
          .slice(0, 6)}
      </GridList>
    </div>
  );
}
