import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Link,
  Divider,
} from "@material-ui/core";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import * as blackAPI from "../../../api/blackAPI";
import * as Empty from "../../../component/Empty";
import * as moment from "moment";
export default function CommentArea(props) {
  const { sended, handleRemove, decoded, handleLike } = props;
  console.log(sended);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleBan = async (uid) => {
    const res = await blackAPI.addBlack({
      uid: decoded.id,
      banned_uid: uid,
    });
    console.log(res);
  };
  return (
    <div>
      {sended.map((comments, index) => (
        index>=(page-1)*10&&index<(page-1)*10+10?
        <Grid container>
          <Grid item xs={12} alignItems="center">
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <Typography>
                  <Link
                    component="button"
                    variant="h6"
                    onClick={() => {
                      const w = window.open("about:blank");
                      w.location.href = `/wish/${comments.post_userid}`;
                    }}
                  >
                    {comments.post_username}
                  </Link>
                  &nbsp;&nbsp;
                  <Typography variant="p" style={{ color: "gray" }}>
                    {comments.submit_time}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align="right" color="textSecondary">
                  {comments.n_likes}
                  <IconButton onClick={() => handleLike(index)}>
                    {comments.your_user_id ? (
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
                {decoded && decoded.id == comments.post_userid ? (
                  <Link
                    id={index}
                    onClick={() => handleRemove(index)}
                    component="button"
                  >
                    Remove
                  </Link>
                ) : decoded ? (
                  <Link
                    id={index}
                    onClick={() => handleBan(comments.post_userid)}
                    component="button"
                  >
                    Add to Banlist
                  </Link>
                ) : null}
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        </Grid>:null
      
      ))}
      <Grid container justify="center">
        <Grid item xs={10}>
          {/* <div style={{left:50}}> */}
          {sended.length>0?
          <Pagination
            count={Math.ceil(sended.length / 10)}
            page={page}
            onChange={handleChange}
            
          />:null}
          {/* </div> */}
        </Grid>
      </Grid>
    </div>
  );
}
