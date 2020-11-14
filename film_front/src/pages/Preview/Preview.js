import { Button, Grid, Input, Paper, TextField, Divider,Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

const jwt = require("jwt-simple");
const myDate = new Date();




export default function Preview(props) {
//   var url = window.location.href;
//   var arrUrl = url.split("/");
//   const movieid = arrUrl[arrUrl.length - 1];
let decoded;
const token = localStorage.getItem("userInfo");
if (token) {
  decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
} else {
  window.location.href = `${process.env.REACT_APP_HOST_URL}`;
}
    const movieid = props.match.params.id;
  const reviewKey = decoded.id.toString() + "@" + movieid;
  const reviewJson = localStorage.getItem(reviewKey);
  const reviewValue = JSON.parse(reviewJson);
  console.log(reviewKey, reviewValue);
  const [open, setOpen] = useState(false);
  const [SignupOpen, SignupsetOpen] = useState(false);
  const [logout, setLogout] = useState(false);
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
  const removeSet = (uid) => {
    localStorage.removeItem(uid);
  };
  const setdate = () => {
    myDate.toLocaleDateString(); 
  }

  const theme = createMuiTheme({
    typography: {
      title: {
        fontSize: 100,      
        fontStyle: "italic",
  
      },
      title1: {
        fontSize: 120,
        fontStyle: "italic",
  
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: "italic",
      },
    },
  });
  const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(10),
        margin: 'auto',
        maxWidth: 600,
      },
      root2: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
      },
      paper2: {
        maxWidth: 450,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
      root3: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
    }));
    const classes = useStyles();

    const defaultProps = {
      bgcolor: 'background.paper',
      borderColor: 'primary.main',
      m: 1,
      border: 2,
      style: { width: '17rem', height: '13rem' },
    };

  return (
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
        />
      </Grid>
      <Grid item xs={8}>
        <Grid container justify="flex-end" spacing={3}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={{ pathname: `/editReview/${movieid}` }}
            >
              Edit Preview
            </Button>
            
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              //onClick={localStorage.removeItem(reviewKey)}
              component={Link}
              to={{ pathname: `/movieDetail/${movieid}` }}
            >
              Send
            </Button>
            
          </Grid>
          {/*<Grid item style = {{ marginLeft: "3%" }}>*/}
          <div className={classes.root}>

          <Paper className={classes.paper}>
          <Grid container spacing={2}>

          <Grid item xs={10} alignItems="center" justify="center">
                    {/*<Paper className={classes.paper}>*/}

            <ThemeProvider theme={theme}>
              <Typography variant="h3">
                {reviewValue ? reviewValue.title : null}
              </Typography>
              
              <Typography variant="title1">{myDate.toLocaleDateString()}</Typography>
              <Divider />

              <Typography>

                  
              &nbsp;&nbsp;

              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: reviewValue ? reviewValue.content : null,
                }}
              ></div>
            </ThemeProvider>
          </Grid>
          </Grid>
          </Paper>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container justify="center" spacing={3}>
            <Grid item xs={8}>
                Comment
                <Divider />

            </Grid>
            <Divider />
            <Grid item xs={8}>
            {/*<Box display="flex" p={1} bgcolor="background.paper">

                <Box display="flex" 
                    flexDirection="column" >
                        <Box display="flex" borderRadius="borderRadius" {...defaultProps} justifyContent="center">
                            
                            <BorderColorIcon></BorderColorIcon>
                            <Box>
                                This is a work of profound and melancholic beauty!
                            </Box>            
                        </Box>
                        <Box borderRadius="borderRadius" {...defaultProps} justifyContent="center">
                            <Box>
                                I confess I find it too opaque to make the kind of investment 
                                that would qualify me as a real fan. But it should be seen. 
                            </Box>           
                        </Box>
                </Box>
                <Box display="flex" 
                    flexDirection="column" >
                        <Box borderRadius="borderRadius" {...defaultProps} >
                        <Card className={classes.root3}>
                            <CardActionArea>
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                Learn More
                                </Button>
                            </CardActions>
                        </Card>           
                        </Box>
                        <Box borderRadius="borderRadius" {...defaultProps} >
                            <div className={classes.root2}>
                                <Paper className={classes.paper2}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar>W</Avatar>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap>Truncation should be conditionally applicable on this long line of text
                                                    as this is a much longer line than what the container can support.
                                        </Typography>
                                        <Button size="small" color="primary">
                                        Learn More
                                        </Button>
                                    </Grid>
                                    </Grid>
                                </Paper>
                            </div>          
                        </Box>
                </Box>
            </Box>
            */}
            <div className={classes.root2}>
                                <Paper className={classes.paper2}>
                                    <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar>W</Avatar>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap>Truncation should be conditionally applicable on this long line of text
                                                    as this is a much longer line than what the container can support.
                                        </Typography>
                                        <Button size="small" color="primary">
                                        Learn More
                                        </Button>
                                    </Grid>
                                    </Grid>
                                </Paper>
                            </div>            
            <div className={classes.root2}>
                <Paper className={classes.paper2} elevation={7}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>Y</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap> confess I find it too opaque to make 
                                the kind of investment that would qualify me as a real fan. 
                                But it should be seen.
                            </Typography>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                            </div> 
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
