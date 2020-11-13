import { Button, Grid, Typography, Link, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link as RLink } from "react-router-dom";
import * as reviewAPI from "../../../api/reviewAPI";
import * as blackAPI from "../../../api/blackAPI";
import Pagination from "@material-ui/lab/Pagination";
export default function Review(props) {
  const { decoded, handleClickOpen, movieId } = props;
  const [reviewList, setReviewList] = useState([]);
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
  const handleRemove = async (index) => {
    console.log(index);
    const del_res = await reviewAPI.deleteReview(reviewList[index].id);
    const res = await reviewAPI.getAll(movieId);
    console.log("review page", res);
    setReviewList(res);
  };
  useEffect(() => {
    const getAll = async () => {
      const res = await reviewAPI.getAll(movieId);
      console.log("review page", res);
      setReviewList(res);
    };
    getAll();
  }, [movieId]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {decoded ? (
            <Button
              size="large"
              color="primary"
              component={RLink}
              to={{ pathname: `/editReview/${movieId}` }}
            >
              Edit Review
            </Button>
          ) : (
            <Button size="large" color="primary" onClick={handleClickOpen}>
              Edit Review
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={10}>
              {reviewList.map((item, index) =>
                index >= (page - 1) * 10 && index < (page - 1) * 10 + 10 ? (
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
                                w.location.href = `/wish/${item.user.id}`;
                              }}
                            >
                              {item.user.name}
                            </Link>
                            &nbsp;&nbsp;
                            <Typography variant="p" style={{ color: "gray" }}>
                              {item.submitTime}
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography align="right" color="textSecondary">
                            {item.likes} likes
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="flex-end">
                        <Grid item xs={11}>
                          <Link component="button" variant="h6" component={RLink}
              to={{ pathname: `/reviewDetail/movieId=${movieId}/poster=${item.user.id}` }} >
                            {item.title}
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="flex-end">
                        <Grid item xs={2}>
                          {decoded && decoded.id == item.user.id ? (
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
                              onClick={() => handleBan(item.user.id)}
                              component="button"
                            >
                              Add to Banlist
                            </Link>
                          ) : null}
                        </Grid>
                      </Grid>
                      <Divider />
                    </Grid>
                  </Grid>
                ) : null
              )}
              <Grid container justify="center">
                <Grid item xs={10}>
                  {/* <div style={{left:50}}> */}
                  {reviewList.length > 0 ? (
                    <Pagination
                      count={Math.ceil(reviewList.length / 10)}
                      page={page}
                      onChange={handleChange}
                    />
                  ) : null}
                  {/* </div> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
