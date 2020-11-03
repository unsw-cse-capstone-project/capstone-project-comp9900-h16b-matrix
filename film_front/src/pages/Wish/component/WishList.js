import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import default_img from "../../../image/No_picture_available.png";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
  root: {
    width: 350,
    height: 450,
  },
  media: {
    height: 350,
  },
});

export default function WishList(props) {
  const { queryValue } = props;
  //const [movie, setMovie] = useState([]);
  const [movie, setMovie] = useState([
    {title: "m1", overview: "this is a good movie", rating: 3},
    {title: "m2", overview: "this is a good movie", rating: 3},
    {title: "m3", overview: "this is a good movie", rating: 3},
    {title: "m4", overview: "this is a good movie", rating: 3},
    {title: "m5", overview: "this is a good movie", rating: 3},
    {title: "m6", overview: "this is a good movie", rating: 3},
    {title: "m7", overview: "this is a good movie", rating: 3},
    {title: "m8", overview: "this is a good movie", rating: 3},

  ]);
  const apiKey = process.env.REACT_APP_KEY;
  const classes = useStyles();

  const [value, setValue] = React.useState('default');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleDelete = (chipToDelete) => () => {
    setMovie((chips) => chips.filter((chip) => chip.title !== chipToDelete.title));
  };

  // sort by name
  movie.sort(function(a, b) {
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
      <Grid container spacing={8} justify='flex-start' >
      {/*<Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend"> Sorting </FormLabel>
          <RadioGroup row aria-label="sorting" name="sorting1" value={value} onChange={handleChange}>
            <FormControlLabel value="default" control={<Radio />} label="Default" />
            <FormControlLabel value="latest" control={<Radio />} label="Latest" />
            <FormControlLabel value="rating" control={<Radio />} label="Rating" />
            <FormControlLabel value="hottest" control={<Radio />} label="Hottest" />
          </RadioGroup>
        </FormControl>
      </Grid>*/}
        {movie.length > 0
          ? movie.map((item) => (
              <Grid
                item
                xs={4}
              >
                <Card>
                  <CardActionArea className={classes.root}>
                    <CardMedia
                      className={classes.media}
                      image={
                        item.poster_path
                          ? `http://image.tmdb.org/t/p/w185${item.poster_path}`
                          : default_img
                      }
                      title={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" noWrap={true}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        noWrap={true}
                      >
                        {item.overview}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={{ pathname: `/movieDetail/${item.id}` }}
                    >
                      Learn More
                    </Button>
                    <IconButton aria-label="delete" className={classes.margin} onClick = {handleDelete(item)}>
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>

              // <Button
              // component = {Link}
              // to = {{pathname:`/movieDetail/${item.id}`}}
              // >{item.title}</Button>
            ))
          : "no result"}
      </Grid>
    </div>
  );
}
