import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import poster from '../../../image/poster.jpeg'
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // width = 300,
    // height = 400,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  star: {
    color: 'orange',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));
const tileData = [
     {
         img: poster,
         title: 'Sample Movie',
         Rating: 4.2,
      },
      {
        img: poster,
        title: 'Sample Movie',
        Rating: 4.2,
     },
     {
        img: poster,
        title: 'Sample Movie',
        Rating: 4.2,
     },
     {
        img: poster,
        title: 'Sample Movie',
        Rating: 4.2,
     },
     {
        img: poster,
        title: 'Sample Movie',
        Rating: 4.2,
     },
    ];

export default function TrendMovie(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.2} cellHeight={400}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} /> 
            {/* <Typography>
            
                      {tile.title}
                      {tile.Rating}
                      <Rating name="read-only" value={tile.rating} readOnly />
            </Typography> */}
            <GridListTileBar
              title={
                  <div>
                     {tile.title}
                       {/* {tile.Rating} */}
                      <Rating name="read-only" value={tile.rating} readOnly style={{color:'yellow'}} />
                    </div>
              }
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
               actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                    <Typography className={classes.title}>
                    {tile.Rating }
                    </Typography>
                   
                  <StarIcon className={classes.star} />
                </IconButton>
              }
             /> 
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}