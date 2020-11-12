import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import default_img from "../../../image/No_picture_available.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Rating from "@material-ui/lab/Rating";
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 530,
  },
  media: {
    height: 350,
  },
});
const mapId = {
  action: 28,
  animated: 16,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  comedy: 35,
  war: 10752,
  crime: 80,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  science: 878,
  horror: 27,
  tv: 10770,
  thriller: 53,
  western: 37,
  adventure: 12,
};
export default function SearchList(props) {
  const { queryValue } = props;
  const [movie, setMovie] = useState([]);
  const apiKey = process.env.REACT_APP_KEY;
  const classes = useStyles();
  const [value, setValue] = React.useState("default");
  const [state, setState] = React.useState({
    action: false,
    adventure: false,
    animation: false,
    comedy: false,
    crime: false,
    documentary: false,
    drama: false,
    family: false,
    fantasy: false,
    history: false,
    horror: false,
    music: false,
    mystery: false,
    romance: false,
    science: false,
    tv: false,
    thriller: false,
    war: false,
    western: false,
  });
  const handleGenres = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    const radio = event.target.value;
    console.log(radio);
    if (radio == "latest") {
      const newSort = movie.sort(function (a, b) {
        if (
          (a.release_date &&
            b.release_date &&
            a.release_date > b.release_date) ||
          !b.release_date
        ) {
          return -1;
        }
        // if (nameA > nameB) {
        //   return 1;
        // }
        return 1;
      });
      console.log("last", newSort);
      setMovie(newSort);
    } else if (radio == "rating") {
      const newSort = movie.sort(function (a, b) {
        if (a.vote_average > b.vote_average) {
          return -1;
        }
        // if (nameA > nameB) {
        //   return 1;
        // }
        return 1;
      });
      console.log("last", newSort);
      setMovie(newSort);
    } else if (radio == "default") {
      const newSort = movie.sort(function (a, b) {
        if (a.popularity > b.popularity) {
          return -1;
        }
        // if (nameA > nameB) {
        //   return 1;
        // }
        return 1;
      });
      console.log("last", newSort);
      setMovie(newSort);
    }
  };

  useEffect(() => {
    const getMovie = async () => {
      console.log(apiKey);
      if (queryValue != -1) {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${queryValue}`
        );
        const data = await res.json();
        console.log(data);
        const defaultSort = data.results.sort(function (a, b) {
          if (a.popularity > b.popularity) {
            return -1;
          }
          // if (nameA > nameB) {
          //   return 1;
          // }
          return 1;
        });
        setMovie(defaultSort);
      }
    };
    getMovie();
  }, [queryValue]);
  const filter = (geners) => {
    console.log(geners, state, Object.keys(state));
    const keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
      if (state[keys[i]]) {
        const gId = mapId[keys[i]];
        console.log(gId, geners.includes(gId));
        if (geners.includes(gId) == false) {
          console.log("return");
          return false;
        }
      }
    }
    return true;
  };
  return (
    <div style={{ margin: "auto" }}>
      <Grid container spacing={4} justify="flex-start">
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend"> Sorting </FormLabel>
            <RadioGroup
              row
              aria-label="sorting"
              name="sorting1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="default"
                control={<Radio />}
                label="Default"
              />
              <FormControlLabel
                value="latest"
                control={<Radio />}
                label="Latest"
              />
              <FormControlLabel
                value="rating"
                control={<Radio />}
                label="Rating"
              />
              {/* <FormControlLabel
                value="hottest"
                control={<Radio />}
                label="Hottest"
              /> */}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Genres</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.action}
                    onChange={handleGenres}
                    name="action"
                    color="primary"
                  />
                }
                label="Action"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.adventure}
                    onChange={handleGenres}
                    name="adventure"
                    color="primary"
                  />
                }
                label="Adventure"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.animation}
                    onChange={handleGenres}
                    name="animation"
                    color="primary"
                  />
                }
                label="Animation"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.comedy}
                    onChange={handleGenres}
                    name="comedy"
                    color="primary"
                  />
                }
                label="Comedy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.crime}
                    onChange={handleGenres}
                    name="crime"
                    color="primary"
                  />
                }
                label="Crime"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.documentary}
                    onChange={handleGenres}
                    name="documentary"
                    color="primary"
                  />
                }
                label="Documentary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.drama}
                    onChange={handleGenres}
                    name="drama"
                    color="primary"
                  />
                }
                label="Drama"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.family}
                    onChange={handleGenres}
                    name="family"
                    color="primary"
                  />
                }
                label="Family"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.fantasy}
                    onChange={handleGenres}
                    name="fantasy"
                    color="primary"
                  />
                }
                label="Fantasy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.history}
                    onChange={handleGenres}
                    name="history"
                    color="primary"
                  />
                }
                label="History"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.horror}
                    onChange={handleGenres}
                    name="horror"
                    color="primary"
                  />
                }
                label="Horror"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.music}
                    onChange={handleGenres}
                    name="music"
                    color="primary"
                  />
                }
                label="Music"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.mystery}
                    onChange={handleGenres}
                    name="mystery"
                    color="primary"
                  />
                }
                label="Mystery"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.romance}
                    onChange={handleGenres}
                    name="romance"
                    color="primary"
                  />
                }
                label="Romance"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.science}
                    onChange={handleGenres}
                    name="science"
                    color="primary"
                  />
                }
                label="Science"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.tv}
                    onChange={handleGenres}
                    name="tv"
                    color="primary"
                  />
                }
                label="TV Movie"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.thriller}
                    onChange={handleGenres}
                    name="thriller"
                    color="primary"
                  />
                }
                label="Thriller"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.war}
                    onChange={handleGenres}
                    name="war"
                    color="primary"
                  />
                }
                label="War"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.western}
                    onChange={handleGenres}
                    name="western"
                    color="primary"
                  />
                }
                label="Western"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        {movie.length > 0
          ? movie.map((item) =>
              filter(item.genre_ids) ? (
                <Grid
                  item
                  xs={3}
                  // style={{ margin: "auto" }}
                >
                  <Card className={classes.root}>
                    {/* <CardActionArea className={classes.root}> */}
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
                      <Tooltip title={
                          <React.Fragment>
                            <Typography>{item.title}</Typography>
                          </React.Fragment>
                        }>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          noWrap={true}
                        >
                          {item.title}
                        </Typography>
                      </Tooltip>

                      <Rating
                        name="read-only"
                        value={(item.vote_average / 2).toFixed(1)}
                        readOnly
                        precision={0.5}
                      />
                      <Tooltip
                        title={
                          <React.Fragment>
                            <Typography>{item.overview}</Typography>
                          </React.Fragment>
                        }
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          noWrap={true}
                        >
                          {item.overview}
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
                    </CardActions>
                  </Card>
                </Grid>
              ) : // <Button
              // component = {Link}
              // to = {{pathname:`/movieDetail/${item.id}`}}
              // >{item.title}</Button>
              null
            )
          : "no result"}
      </Grid>
    </div>
  );
}
