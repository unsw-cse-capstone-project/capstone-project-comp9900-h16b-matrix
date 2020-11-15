import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavBar from "../NavBar/NavBar";
import default_img from "../../image/No_picture_available.png";
import poster from "../../image/poster.jpeg";
import Rate from "./component/Rate";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from "@material-ui/core/styles";
import CRTabs from "./component/CRTabs";
import { Link as RouteLink } from "react-router-dom";
import * as Empty from "../../component/Empty";
import * as movieAPI from "../../api/movieAPI";
import * as wishAPI from "../../api/wishAPI"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "98%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderStyle: "groove",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const jwt = require("jwt-simple");
export default function MovieDetail(props) {
  const apiKey = process.env.REACT_APP_KEY;
  const { id } = props.match.params;
  const [info, setInfo] = useState({});
  const [director, setDirector] = useState([]);
  const [casts, setCasts] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [video, setVideo] = useState({});
  const [like, setLike] = useState(false);
  const [movieId,setMovieId] = useState(undefined);
  const [wishId,setWishId] = useState(undefined)
  const classes = useStyles();
  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  }
  const [open, setOpen] = useState(false);
  const [SignupOpen, SignupsetOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const rederLogout = () => setLogout(!logout);
  const handleSignupOpen = () => {
    SignupsetOpen(true);
    handleClose();
  };
  const SignupClose = () => {
    SignupsetOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getInfo = async () => {
      console.log(id);
      
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      console.log("detail", data);
      setInfo(data);
      const movie_res = await movieAPI.getMovieByTid(id);
      setMovieId(movie_res.id)
      if (!movie_res.description) {
        const update_res = await movieAPI.updateDetail({
          id: movie_res.id,
          description: data.overview,
          title: data.title,
          poster: `http://image.tmdb.org/t/p/w185${data.poster_path}`,
        });
        console.log(update_res);
      }
      

      const cre = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
      );
      const credits = await cre.json();
      let array_dir = [];
      credits.crew.forEach((element) => {
        if (element.job === "Director") {
          array_dir.push(element.name);
        }
      });
      setDirector(array_dir);
      setCasts(credits.cast);
      console.log(credits.cast);
      // if(data.video){
      const vid = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
      );
      const trailer = await vid.json();
      console.log(trailer.results);
      for (let i = 0; i < trailer.results.length; i++) {
        console.log(trailer.results[i]);
        if (trailer.results[i].type === "Trailer") {
          setVideo(trailer.results[i]);
          console.log(trailer.results[i]);
          break;
        }
      }
    };
    getInfo();
  }, []);
  useEffect(()=>{
    const getWish = async()=>{
      if(decoded){
        const res = await wishAPI.getByIds(decoded.id,movieId)
        console.log('init wish',res)
        if(res){
          setLike(true)
        }
      }
    }
    if(decoded){
      getWish()
    }
  },[decoded])
  const changeDateFormate = (day) => {
    if (!day) {
      return " ";
    }
    let date = new Date(day.replace(/-/g, "/"));
    let DateArray = date.toUTCString().split(" ");
    return `${DateArray[1]} ${DateArray[2]}, ${DateArray[3]}`;
  };
  const handleLike = async() => {
    if (decoded) {
      if(like==false){
        const res = await wishAPI.addWish({
          uid:decoded.id,
          movie_id:movieId
        })
        console.log(res)
        setWishId(res.id)
        setLike(true)
      }
      else{
        const res = await wishAPI.delWish(wishId)
        console.log(res)
        setLike(false)
      }
    } else {
      handleClickOpen();
    }
  };
  return (
    <div>
      {console.log(video)}
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12}>
          <NavBar
            handleClose={handleClose}
            open={open}
            handleClickOpen={handleClickOpen}
            SignupClose={SignupClose}
            SignupOpen={SignupOpen}
            handleSignupOpen={handleSignupOpen}
            rederLogout={rederLogout}
            history = {props.history}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item style={{ marginLeft: "3%" }}>
              <div style={{ width: "200px", backgroundColor: "aqua" }}></div>
              <div
                style={{ position: "fixed", top: "50px", paddingTop: "100px" }}
              >
                <img
                  src={
                    info.poster_path
                      ? `http://image.tmdb.org/t/p/w185${info.poster_path}`
                      : null
                  }
                />
                {video.key ? (
                  <div className={classes.root} > 
                    <Typography variant="body2" style={{backgroundColor:'LightGray'}}>Trailer</Typography>
                    <Typography>
                      <IconButton>
                        {/* <ListItemIcon> */}
                        <YouTubeIcon style={{ color: "red" }} />
                        {/* </ListItemIcon> */}
                      </IconButton>

                      <a href={`https://www.youtube.com/watch?v=${video.key}`}>
                        Youtube
                      </a>
                    </Typography>
                  </div>
                ) : null}
              </div>
            </Grid>

            <Grid item xs={7} alignItems="center" justify="center">
              <Grid container>
                <Grid item xs={12} alignItems="center" justify="center">
                  <Typography variant="h3">
                    {info.title}
                    &nbsp;&nbsp;
                    <IconButton onClick={handleLike}>
                      {like ? (
                        <FavoriteIcon color="secondary" fontSize="large" />
                      ) : (
                        <FavoriteBorderIcon
                          color="secondary"
                          fontSize="large"
                        />
                      )}
                    </IconButton>
                  </Typography>
                  <Typography>
                    {info.status === "Released"
                      ? changeDateFormate(info.release_date)
                      : "UNRELEASED"}
                  </Typography>
                  <Divider />
                  <Typography variant="h5">Movie Detail</Typography>
                  <br />
                  <Typography align="justify">{info.overview}</Typography>
                  <br />
                </Grid>

                <Grid item xs={4} alignItems="center" justify="center">
                  <Typography align="right">
                    {console.log(JSON.stringify(info.genres) === "[]")}
                    {!Empty.isEmpty(director) ? (
                      <Typography>
                        <b style={{ color: "gray" }}>Director : </b>
                      </Typography>
                    ) : null}
                    {!Empty.isEmpty(info.genres) ? (
                      <Typography>
                        <b style={{ color: "gray" }}>Genres : </b>
                      </Typography>
                    ) : null}
                    {!Empty.isEmpty(info.spoken_languages) ? (
                      <Typography>
                        <b style={{ color: "gray" }}>Language : </b>
                      </Typography>
                    ) : null}
                    {info.runtime ? (
                      <Typography>
                        <b style={{ color: "gray" }}>Runtime : </b>
                      </Typography>
                    ) : null}
                    {!Empty.isEmpty(info.production_companies) ? (
                      <Typography>
                        <b style={{ color: "gray" }}>Production Co : </b>
                      </Typography>
                    ) : null}
                  </Typography>
                </Grid>
                <Grid item xs={8} alignItems="center" justify="center">
                  <Typography align="left">
                    {!Empty.isEmpty(director) ? (
                      <Typography>{director.toString()}</Typography>
                    ) : null}
                    {!Empty.isEmpty(info.genres) ? (
                      <Typography>
                        {info.genres.map((item, index) =>
                          index < info.genres.length - 1
                            ? ` ${item.name},`
                            : ` ${item.name}`
                        )}
                      </Typography>
                    ) : null}
                    {!Empty.isEmpty(info.spoken_languages) ? (
                      <Typography>
                        {info.spoken_languages.map((item, index) =>
                          index < info.spoken_languages.length - 1
                            ? ` ${item.name}, `
                            : ` ${item.name}`
                        )}
                      </Typography>
                    ) : null}
                    {info.runtime ? (
                      <Typography>{info.runtime} min</Typography>
                    ) : null}
                    {!Empty.isEmpty(info.production_companies) > 0 ? (
                      <Typography>
                        {info.production_companies.map((item, index) =>
                          index < info.production_companies.length - 1
                            ? ` ${item.name},`
                            : ` ${item.name}`
                        )}
                      </Typography>
                    ) : null}
                  </Typography>
                </Grid>

                <Grid item xs={12} justify="center">
                  <br />
                  <Divider />
                  <Typography variant="h5">Casts</Typography>
                  <Grid container>
                    {casts
                      .map((item, index) => (
                        <Grid
                          item
                          alignItems="center"
                          justify="center"
                          spacing={5}
                        >
                          <Box key={index} width={120} marginRight={0.5} my={5}>
                            <img
                              style={{ width: "120px", hight: "150px" }}
                              src={
                                item.profile_path
                                  ? `http://image.tmdb.org/t/p/w185${item.profile_path}`
                                  : default_img
                              }
                            />
                            <Typography>{item.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {item.character}
                            </Typography>
                          </Box>
                        </Grid>
                      ))
                      .slice(0, hidden ? 5 : casts.length)}
                  </Grid>
                  <Typography
                    align="right"
                    onClick={() => {
                      setHidden(!hidden);
                    }}
                  >
                    <Link component="button">
                      {" "}
                      {hidden ? "Show All Casts" : "Hidden"}{" "}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} justify="center">
                  <br />
                  <Divider />
                  <CRTabs
                    decoded={decoded}
                    handleClickOpen={handleClickOpen}
                    movieId={movieId}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} justify="center" alignItems="center">
              <div style={{ backgroundColor: "aqua" }}></div>
              <div
                style={{ position: "fixed", top: "50px", paddingTop: "100px" }}
              >
                <Rate
                  decoded={decoded}
                  vote_average={info.vote_average}
                  vote_count={info.vote_count}
                  handleClickOpen={handleClickOpen}
                  movieId={movieId}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    
    </div>
  );
}
