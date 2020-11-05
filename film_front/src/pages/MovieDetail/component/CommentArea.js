import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Link,
  Divider,
} from "@material-ui/core";
import {
  AiOutlineLike,
  AiFillLike,
} from "react-icons/ai";
import * as blackAPI from "../../../api/blackAPI"
import * as Empty from "../../../component/Empty";
import * as moment from "moment";
export default function CommentArea(props) {
  const { sended, handleRemove, decoded, handleLike } = props;
  console.log(sended);
  const handleBan = async(uid)=>{
    const res = await blackAPI.addBlack({
      uid:decoded.id,
      banned_uid:uid
    })
    console.log(res)
  }
  return (
    <div>
      {
         sended.map((comments, index) => (
            <Grid container>
              <Grid item xs={12} alignItems="center">
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <Typography >
                      <Link component='button' variant='h6' onClick={
                        ()=>{
                          const w = window.open("about:blank");
                          w.location.href = `/wish/${comments.user.id}`;
                        }
                      }>
                      {comments.user.name}
                      </Link>
                       &nbsp;&nbsp;
                      <Typography variant="p" style={{ color: "gray" }}>
                       {comments.submit_date}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="right" color="textSecondary">
                      {comments.n_likes}
                      <IconButton onClick={() => handleLike(index)}>
                        {comments.like ? (
                          <AiFillLike style={{ color: "orange" }} />
                        ) : (
                          <AiOutlineLike />
                        )}
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Grid item xs={11}>
                    <Typography>{comments.content}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Grid item xs={2}>
                    {decoded&&decoded.id==comments.user.id?
                    <Link
                    id={index}
                    onClick={() => handleRemove(index)}
                    component="button"
                  >
                    Remove
                  </Link>:decoded?
                  <Link
                  id={index}
                  onClick={() => handleBan(comments.user.id)}
                  component="button"
                >
                  Add to Banlist
                </Link>
                  :null
                    }
                    
                  </Grid>
                 
                </Grid>
                <Divider />
              </Grid>
            </Grid>
          ))
        }
    </div>
  );
}
