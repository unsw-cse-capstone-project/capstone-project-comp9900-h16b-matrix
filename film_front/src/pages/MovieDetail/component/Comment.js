import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import CommentArea from "./CommentArea";
import * as commentAPI from "../../../api/commentAPI";
import * as blackAPI from "../../../api/blackAPI";
export default function Comment(props) {
  const [value, setValue] = useState("");
  const [sended, setSend] = useState([]);
  const { decoded, handleClickOpen, movieId } = props;
  useEffect(() => {
    const getComments = async () => {
      const res = commentAPI.getAll(movieId, decoded ? decoded.id : -1);
      var a = Promise.resolve(res);
      a.then(function (result) {
        setSend(result);
      });
    };
    getComments();
  }, [movieId, decoded]);
  const handleRemove = async (index) => {
    console.log(index);
    const del_res = await commentAPI.deleteComment(sended[index].comment_id);
    const res = commentAPI.getAll(movieId, decoded.id);
    var a = Promise.resolve(res);
    a.then(function (result) {
      setSend(result);
    });
  };
  const handleBan = async (uid) => {
    const ban = await blackAPI.addBlack({
      uid: decoded.id,
      banned_uid: uid,
    });
    const res = commentAPI.getAll(movieId, decoded ? decoded.id : -1);
    var a = Promise.resolve(res);
    a.then(function (result) {
      setSend(result);
    });
  };
  function handleSend() {
    const sendComment = async () => {
      const data = {
        uid: decoded.id,
        movie_id: movieId,
        content: value,
      };
      const add_res = await commentAPI.sendComment(data);
      console.log(add_res);
      const res = commentAPI.getAll(movieId, decoded.id);
      var a = Promise.resolve(res);
      a.then(function (result) {
        setSend(result);
      });
      setValue("");
    };
    if (decoded) {
      if (value === "") {
        return;
      } else {
        console.log(value, sended);
        sendComment();
      }
    } else {
      handleClickOpen();
    }
  }
  const handleLike = async (index) => {
    if (decoded) {
      if (sended[index].your_user_id) {
        const nlike_res = await commentAPI.delNlike({
          uid: decoded.id,
          cid: sended[index].comment_id,
        });
      } else {
        const nlike_res = await commentAPI.addNlike({
          uid: decoded.id,
          cid: sended[index].comment_id,
        });
      }

      const res = commentAPI.getAll(movieId, decoded.id);
      var a = Promise.resolve(res);
      a.then(function (result) {
        setSend(result);
      });
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            rows={3}
            rowsMax={3}
            multiline
            variant="outlined"
            placeholder="Write your comment here"
            defaultValue=""
            value={value}
            fullWidth
            inputProps={{ maxLength: "200" }}
            onChange={(e) => {
              if (decoded) {
                setValue(e.target.value);
              } else {
                handleClickOpen();
              }
            }}
          />
          <Typography align="right" variant="body2" color="textSecondary">
            {value.length}/200
          </Typography>
          <Button
            onClick={() => handleSend()}
            variant="outlined"
            color="primary"
          >
            send
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CommentArea
            sended={sended}
            handleRemove={handleRemove}
            decoded={decoded}
            handleLike={handleLike}
            handleBan={handleBan}
          />
        </Grid>
      </Grid>
    </div>
  );
}
