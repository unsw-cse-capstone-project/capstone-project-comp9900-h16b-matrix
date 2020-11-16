import { Button, Grid, Typography, Tooltip } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import default_img from "../../../image/No_picture_available.png";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import * as wishAPI from "../../../api/wishAPI";
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 530,
  },
  media: {
    height: 350,
  },
});

export default function WishList(props) {
  const { decoded, id } = props;
  const [movie, setMovie] = useState([]);
  const classes = useStyles();
  const handleDelete = async (wid) => {
    const del_res = await wishAPI.delWish(wid);
    const res = await wishAPI.getAll(id);
    console.log(del_res, res);
    setMovie(res);
  };
  useEffect(() => {
    const getAll = async () => {
      const res = await wishAPI.getAll(id);
      console.log(res);
      setMovie(res);
    };
    getAll();
  }, [id]);
  // sort by name
  movie.sort(function (a, b) {
    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <div style={{ margin: "auto" }}>
      <Grid container spacing={8} justify="flex-start">
        {movie.length > 0
          ? movie.map((item) => (
              <Grid item xs={4}>
                <Card className={classes.root}>
                  {/* <CardActionArea > */}
                  <CardMedia
                    className={classes.media}
                    image={
                      item.poster
                        ? `http://image.tmdb.org/t/p/w185${item.poster}`
                        : default_img
                    }
                    title={item.title}
                  />
                  <CardContent>
                    <Tooltip
                      title={
                        <React.Fragment>
                          <Typography>{item.title}</Typography>
                        </React.Fragment>
                      }
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        noWrap={true}
                      >
                        {item.title}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title={
                        <React.Fragment>
                          <Typography>{item.description}</Typography>
                        </React.Fragment>
                      }
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        noWrap={true}
                      >
                        {item.description}
                      </Typography>
                    </Tooltip>
                  </CardContent>
                  {/* </CardActionArea> */}
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={{ pathname: `/movieDetail/${item.id}` }}
                    >
                      Learn More
                    </Button>
                    {decoded && decoded.id == id ? (
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        onClick={() => handleDelete(item.wishlist_id)}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    ) : null}
                  </CardActions>
                </Card>
              </Grid>
            ))
          : "no result"}
      </Grid>
    </div>
  );
}
