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
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import * as Empty from "../../../component/Empty";
import * as moment from "moment";
export default function CommentArea(props) {
  const { sended, handleRemove, decoded, handleLike } = props;
  console.log(sended);
  return (
    <div>
      {decoded
        ? sended.map((comments, index) => (
            <Grid container>
              <Grid item xs={12} alignItems="center">
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <Typography>
                      {console.log(comments)}
                      {decoded.name} &nbsp;&nbsp;
                      <Typography variant="p" style={{ color: "gray" }}>
                       {comments.release_date}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="right" color="textSecondary">
                      {comments.n_like}
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
                    <Typography>{comments.comment}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Grid item xs={2}>
                    <Link
                      id={index}
                      onClick={() => handleRemove(index)}
                      component="button"
                    >
                      Remove
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        : null}
    </div>
  );
}
