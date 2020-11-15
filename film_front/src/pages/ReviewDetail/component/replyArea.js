import React, { useEffect, useState } from "react";
import * as replyAPI from "../../../api/reviewReplyAPI";
import * as blackAPI from "../../../api/blackAPI";
import Pagination from "@material-ui/lab/Pagination";
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
const jwt = require("jwt-simple");
export default function Reply(props) {
  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  }
  const { poster, rid, handleClickOpen } = props;
  const [value, setValue] = useState("");
  const [reply, setReply] = useState([]);
  const [rvalue, setRValue] = useState("");
  const [open, setOpen] = useState(-1);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const getAll = async () => {
      const list = await replyAPI.getById(rid,decoded?decoded.id:-1);
      console.log(list);
      setReply(list);
    };
    if (rid) {
      getAll();
    }
  }, [rid]);

  const handleSend = async (index) => {
    if (decoded) {
      if (index>=0) {
        var data = {
          reviewid: rid,
          review_uid: reply[index].reply_user.id,
          reply_uid: decoded.id,
          content: rvalue,
        };
        setRValue("");
        setOpen(-1);
      } else {
        var data = {
          reviewid: rid,
          review_uid: poster.id,
          reply_uid: decoded.id,
          content: value,
        };
        setValue("");
      }

      const res = await replyAPI.sendReply(data);
      console.log(res);
      const list = await replyAPI.getById(rid,decoded?decoded.id:-1);
      console.log(list);

      setReply(list);
    } else {
      handleClickOpen();
    }
  };
  const handleBan = async (uid) => {
    const res = await blackAPI.addBlack({
      uid: decoded.id,
      banned_uid: uid,
    });
    console.log(res);
    const list = await replyAPI.getById(rid,decoded?decoded.id:-1);
    setReply(list);
  };
  const handleRemove = async (index) => {
    const del_res = await replyAPI.delById(reply[index].id);
    const list = await replyAPI.getById(rid,decoded?decoded.id:-1);
    setReply(list);
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
          <Button onClick={() => handleSend()} variant='outlined' color='primary'>send</Button>
        </Grid>
        <Grid item xs={12}>
          {reply.map((item, index) => (
               index>=(page-1)*10&&index<(page-1)*10+10?
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <Typography>
                  <Link
                    component="button"
                    variant="h6"
                    onClick={() => {
                      const w = window.open("about:blank");
                      w.location.href = `/wish/${item.reply_user.id}`;
                    }}
                  >
                    {item.reply_user.name}
                  </Link>
                  &nbsp;reply&nbsp;
                  <Link
                    component="button"
                    variant="h6"
                    onClick={() => {
                      const w = window.open("about:blank");
                      w.location.href = `/wish/${item.review_user.id}`;
                    }}
                  >
                    {item.review_user.name}
                  </Link>
                  <Typography variant="p" style={{ color: "gray" }}>
                    &nbsp;&nbsp;{item.rsubmitTime}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Grid item xs={11}>
                    <Typography>{item.content}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justify="flex-end">
                  <Grid item xs={3}>
                    {decoded ? (
                      <Link
                        id={index}
                        onClick={() => {
                          setOpen(index);
                        }}
                        component="button"
                      >
                        Reply
                      </Link>
                    ) : null}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {decoded && decoded.id == item.reply_user.id ? (
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
                        onClick={() => handleBan(item.reply_user.id)}
                        component="button"
                      >
                        Add to Banlist
                      </Link>
                    ) : null}
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
              {index == open ? (
                <Grid item xs={12}>
                  <TextField
                    rows={3}
                    rowsMax={3}
                    multiline
                    variant="outlined"
                    placeholder="Write your comment here"
                    defaultValue=""
                    value={rvalue}
                    fullWidth
                    inputProps={{ maxLength: "200" }}
                    onChange={(e) => {
                      if (decoded) {
                        setRValue(e.target.value);
                      }
                    }}
                  />
                  <Typography
                    align="right"
                    variant="body2"
                    color="textSecondary"
                  >
                    {rvalue.length}/200
                  </Typography>
                  <Button
                    onClick={() => handleSend(index)}
                    color="primary"
                    variant="contained"
                  >
                    send
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    onClick={() => {
                      setOpen(-1);
                    }}
                    color="primary"
                    variant="outlined"
                  >
                    cancel
                  </Button>
                </Grid>
              ) : null}
            </Grid>:null
          ))}

          <Grid container justify="center">
            <Grid item xs={10}>
              {/* <div style={{left:50}}> */}
              {reply.length > 0 ? (
                <Pagination
                  count={Math.ceil(reply.length / 10)}
                  page={page}
                  onChange={handleChange}
                />
              ) : null}
              {/* </div> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
