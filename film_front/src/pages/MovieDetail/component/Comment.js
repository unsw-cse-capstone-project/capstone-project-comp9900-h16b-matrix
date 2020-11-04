import React, { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Link,
  TextField,
} from "@material-ui/core";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import * as moment from "moment";
import CommentArea from "./CommentArea";
import * as Empty from "../../../component/Empty";
import Logindialog from "../../Login & Sign up/Login";
import * as commentAPI from "../../../api/commentAPI";
export default function Comment(props) {
  const [value, setValue] = useState("");
  const [sended, setSend] = useState([]);
  const { decoded, handleClickOpen, movieId } = props;
  useEffect(() => {
    const getComments = async () => {
      const res = commentAPI.getAll(movieId);
      var a = Promise.resolve(res);
      a.then(function (result) {
        setSend(result)
      });

      // console.log('comment',res)
    };
    getComments();
  }, [movieId]);
  const handleRemove = async (index) => {
    console.log(index);
    const del_res = await commentAPI.deleteComment(sended[index].id);
    const res = commentAPI.getAll(movieId);
      var a = Promise.resolve(res);
      a.then(function (result) {
        setSend(result)
      });
  };
  function handleSend() {
    const sendComment = async () => {
      const data = {
        uid: decoded.id,
        movie_id: movieId,
        n_likes: 0,
        content: value,
      };
      const add_res = await commentAPI.sendComment(data);
      console.log(add_res);
      const res = commentAPI.getAll(movieId);
      var a = Promise.resolve(res);
      a.then(function (result) {
        setSend(result)
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
    if(decoded){
      const nlike_res = await commentAPI.updateNlike({
        id: sended[index].id,
        isLike: sended[index].like?false:true,
      });
         
      const res = commentAPI.getAll(movieId);
        var a = Promise.resolve(res);
        a.then(function (result) {
          setSend(result)
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
          <Button onClick={() => handleSend()}>send</Button>
        </Grid>
        <Grid item xs={12}>
          <CommentArea
            sended={sended}
            handleRemove={handleRemove}
            decoded={decoded}
            handleLike={handleLike}
          />
        </Grid>
      </Grid>
    </div>
  );
}
