import React, { useEffect, useState } from "react";
import * as RLikeAPI from "../../api/reviewLikeAPI";
import * as reviewAPI from "../../api/reviewAPI";
import NavBar from "../NavBar/NavBar";
import { Link as RLink } from "react-router-dom";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import {
  Button,
  Grid,
  Input,
  Paper,
  TextField,
  Divider,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core";
import Reply from "./component/replyArea";
const jwt = require("jwt-simple");
export default function ReviewDetail(props) {
  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  }
  const { poster, movieId } = props.match.params;
  const [value, setValue] = useState({});
  const [like, setLike] = useState(0);
  const [rid, setRid] = useState(0);
  const [open, setOpen] = useState(false);
  const [SignupOpen, SignupsetOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [posterInfo, setPoster] = useState({});
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
    const getReview = async () => {
      const res = await reviewAPI.getByUidMid(poster, movieId);
      //   console.log(res, res.user.name);
      setPoster(res.user);
      setValue(res);
    };

    getReview();
  }, [poster, movieId]);
  useEffect(() => {
    const getLike = async () => {
      const res = await RLikeAPI.getByID(decoded.id, value.id);
      console.log(res);
      if (res) {
        setRid(res.id);
        if (res.jud) {
          setLike(1);
        } else {
          setLike(-1);
        }
      }
    };
    if (value && decoded) {
      getLike();
    } else {
      setLike(0);
    }
  }, [value, decoded]);
  const handleLike = async () => {
    if (decoded) {
      if (like != 1) {
        setLike(1);
        const data = {
          uid: decoded.id,
          review_id: value.id,
          judgement: true,
        };
        const res = await RLikeAPI.likeorunlike(data);
        console.log(res);
        setRid(res.id);
        const res1 = await reviewAPI.getByUidMid(poster, movieId);
        setPoster(res1.user);
        setValue(res1);
      } else {
        setLike(0);
        const res = await RLikeAPI.cancellikeorunlike(rid);
        const res1 = await reviewAPI.getByUidMid(poster, movieId);
        setPoster(res1.user);
        setValue(res1);
      }
    }
  };
  const handleUnLike = async () => {
    if (decoded) {
      if (like != -1) {
        setLike(-1);
        const data = {
          uid: decoded.id,
          review_id: value.id,
          judgement: false,
        };
        const res = await RLikeAPI.likeorunlike(data);

        console.log(res);
        setRid(res.id);
        const res1 = await reviewAPI.getByUidMid(poster, movieId);
        //   console.log(res, res.user.name);
        setPoster(res1.user);
        setValue(res1);
      } else {
        setLike(0);
        const res = await RLikeAPI.cancellikeorunlike(rid);
        const res1 = await reviewAPI.getByUidMid(poster, movieId);
        setPoster(res1.user);
        setValue(res1);
      }
    }
  };
  return (
    <div>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={12}>
          <NavBar
            handleClose={handleClose}
            open={open}
            handleClickOpen={handleClickOpen}
            SignupClose={SignupClose}
            SignupOpen={SignupOpen}
            handleSignupOpen={handleSignupOpen}
            rederLogout={rederLogout}
            history={props.history}
          />
        </Grid>

        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3">
                {value ? value.title : null}
                <Typography align="right" color="textSecondary" variant="body2">
                  {value.likes}
                  <IconButton onClick={handleLike}>
                    {like == 1 ? (
                      <AiFillLike style={{ color: "orange" }} />
                    ) : (
                      <AiOutlineLike />
                    )}
                  </IconButton>
                  {value.unLikes}
                  <IconButton onClick={handleUnLike}>
                    {like == -1 ? <AiFillDislike /> : <AiOutlineDislike />}
                  </IconButton>
                </Typography>
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={7}>
              <Typography variant="body2">
                By{" "}
                <Link
                  component="button"
                  onClick={() => {
                    const w = window.open("about:blank");
                    w.location.href = `/wish/${posterInfo.id}`;
                  }}
                >
                  {posterInfo.name}
                </Link>{" "}
                , {value.submitTime}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />

              <div
                dangerouslySetInnerHTML={{
                  __html: value ? value.content : null,
                }}
              ></div>
            </Grid>
            <Grid item xs={12}>
              {decoded ? (
                poster == decoded.id ? (
                  <Typography align="right">
                    <Link
                      component="button"
                      component={RLink}
                      to={{ pathname: `/editReview/${movieId}` }}
                    >
                      Edit
                    </Link>
                   
                  </Typography>
                ) : null
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Comment</Typography>

              <Divider />
            </Grid>
            <Grid item xs={10}>
              <Reply
                poster={posterInfo}
                rid={value.id}
                handleClickOpen={handleClickOpen}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
