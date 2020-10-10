import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';
import poster from '../../../image/poster.jpeg'
// import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
const data = [
    {
      src:
        poster,
      title: 'Sample Movie',
      rating : 4.8,
    //   channel: 'Don Diablo',
    //   views: '396 k views',
    //   createdAt: 'a week ago',
    },
    {
      src:
      poster,
      title: 'Sample Movie',
      rating : 4.2,
    },
    {
      src:
      poster,
      title: 'Sample Movie',
      rating : 4.1,
    },
    {
        src:
        poster,
        title: 'Sample Movie',
        rating : 4.1,
      },
      {
        src:
        poster,
        title: 'Sample Movie',
        rating : 4.1,
      },
      {
        src:
        poster,
        title: 'Sample Movie',
        rating : 4.1,
      },
      {
        src:
        poster,
        title: 'Sample Movie',
        rating : 4.1,
      },
  ];
const Media = props=>{
    // const { loading = false } = props;
    const { history } = props;
    console.log('media',history)
    const handleDetail=(data)=>{
        console.log('click',data)
        history.push({
            pathname: `/movieDetail`,
            // state: data
          });
    }
  return (
    <Grid container wrap="nowrap" lignItems='center' justify='center'>
      {data.map((item, index) => (
        <Grid item alignItems='center' justify='center' spacing={1}>
        <Box key={index} width={150} marginRight={0.5} my={5}>
          {item ? (
            <img style={{ width: 140, height: 200 }} alt={item.title} src={item.src} onClick={()=>handleDetail()}/>
          ) : (
            <Skeleton variant="rect" width={210} height={118} />
          )}

          {item ? (
            <Box pr={2} onClick={()=>handleDetail()}>
              <Typography  >
                  {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="textSecondary">
                Rating: {item.rating}
                <Rating name="read-only" value={item.rating} readOnly />
              </Typography>
              {/* <Typography variant="caption" color="textSecondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography> */}
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
        </Grid>
      ))}
    </Grid>
  );
}  

Media.propTypes = {
    loading: PropTypes.bool,
  };
  
const  TopMovie = (props)=> {
    const {history} = props
    return (
      <Box overflow="hidden">
        {/* <Media loading /> */}
        <Media history={history} />
      </Box>
    );
  }
  export default TopMovie