import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { FaUserCircle } from "react-icons/fa";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import NavBar from '../NavBar/NavBar'
import * as userAPI from '../../api/userAPI'
import * as blackAPI from "../../api/blackAPI"
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const jwt = require("jwt-simple");

export default function VerticalTabs(props) {

  let decoded;
  const token = localStorage.getItem("userInfo");
  if (token) {
    decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
  } else {
    window.location.href = `${process.env.REACT_APP_HOST_URL}`;
  }


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [userInfo, setUserInfo] = useState({
    'Old_password': "",
    'New_password': "",
    'Confirm_New_Password': ""
  })
  const [oldError, setOld] = useState(false)
  const [newError, setNew] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = async (delId) => {
    const del_res = await blackAPI.delById(delId)
    const res = await blackAPI.getAll(decoded.id)
    setChipData(res)
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const passwordChange = (e) => {
    setUserInfo(
      {
        ...userInfo,
        [e.target.name]: e.target.value
      }
    )
  }

  const [chipData, setChipData] = React.useState([]);

  const [dense, setDense] = React.useState(false);

  const [open, setOpen] = useState(false);
  const [SignupOpen, SignupsetOpen] = useState(false);
  const [logout, setLogout] = useState(false)
  const rederLogout = () => setLogout(!logout)
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

  const handleConfirm = async () => {
    console.log(decoded)
    const data = { 'name': decoded.name, 'password': userInfo.Old_password }
    const res = await userAPI.login(data)
    console.log('change', res)
    if (res == "Wrong password") {
      setOld(true)
    }
    else if (userInfo.New_password != userInfo.Confirm_New_Password) {
      setNew(true)
      setOld(false)
    }
    else {
      setNew(false)
      setOld(false)
    }
  }

  const [state, setState] = React.useState({
    action: false,
    adventure: false,
    animation: false,
    comedy: false,
    crime: false,
    documentary: false,
    drama: false,
    family: false,
    fantasy: false,
    history: false,
    horror: false,
    music: false,
    mystery: false,
    romance: false,
    science: false,
    tv: false,
    thriller: false,
    war: false,
    western: false,
    genre: false,
    director: false,
  });
  const handleGenres = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  useEffect(() => {
    const getBlack = async () => {
      const res = await blackAPI.getAll(decoded.id)
      setChipData(res)
      console.log(res)
    }
    getBlack()
  }, [])
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12} >
          <NavBar handleClose={handleClose}
            open={open}
            handleClickOpen={handleClickOpen}
            SignupClose={SignupClose}
            SignupOpen={SignupOpen}
            handleSignupOpen={handleSignupOpen}
            rederLogout={rederLogout}
            history = {props.history}
          />
        </Grid>

        <Grid item xs={2} >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Change password" {...a11yProps(0)} />
            <Tab label="Banlist management" {...a11yProps(1)} />
            <Tab label="Recommendation preference" {...a11yProps(2)} />

          </Tabs>
        </Grid>

        <Grid item xs={10} >
          <TabPanel value={value} index={0}>

            <Typography variant='h5' style={{ paddingLeft: '3%' }} >
              Change Password
              <br />
              <br />
            </Typography>

            <Grid container spacing={3} justify='center'>
              <Grid item xs={5}>
                <Typography gutterBottom>
                  <TextField id="outlined-basic" label="Old Password" variant="outlined" fullWidth={true} size="small" onChange={passwordChange} name="Old_password" type="password" error={oldError} helperText={oldError ? "wrong password" : null} />
                </Typography>

                <Typography gutterBottom>
                  <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth={true} size="small" onChange={passwordChange} name="New_password" type="password" />
                </Typography>

                <Typography gutterBottom>
                  <TextField id="outlined-basic" label="Confirm New Password" variant="outlined" fullWidth={true} size="small" onChange={passwordChange} name="Confirm_New_Password" type="password" error={newError} helperText={newError ? "different password" : null} />
                </Typography>

                <Button variant="contained" color="primary" fullWidth={true} onClick={handleConfirm}>
                  Confirm
              </Button>

              </Grid>
            </Grid>

          </TabPanel>


          <TabPanel value={value} index={1}>

            <Typography variant='h5' style={{ paddingLeft: '3%' }} >
              Banlist management
              <br />
              <br />
            </Typography>

            <Grid container spacing={3} justify='center'>
              <Grid item xs={5}>
                <List dense={dense}>
                  {chipData.map((data) => (

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FaUserCircle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={data.banned_user.name}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(data.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                  }
                </List>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>

            <Typography variant='h5' style={{ paddingLeft: '3%' }} >
              Home page recommendation preference
              <br />
              <br />
            </Typography>

            <Grid container spacing={3} justify='center'>
              <Grid item xs={7}>

                <FormControl component="fieldset">
                  <FormLabel component="legend">Recommended movies will be based on the favorite genre(s) you choose</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.action}
                          onChange={handleGenres}
                          name="action"
                          color="primary"
                        />
                      }
                      label="Action"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.adventure}
                          onChange={handleGenres}
                          name="adventure"
                          color="primary"
                        />
                      }
                      label="Adventure"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.animation}
                          onChange={handleGenres}
                          name="animation"
                          color="primary"
                        />
                      }
                      label="Animation"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.comedy}
                          onChange={handleGenres}
                          name="comedy"
                          color="primary"
                        />
                      }
                      label="Comedy"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.crime}
                          onChange={handleGenres}
                          name="crime"
                          color="primary"
                        />
                      }
                      label="Crime"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.documentary}
                          onChange={handleGenres}
                          name="documentary"
                          color="primary"
                        />
                      }
                      label="Documentary"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.drama}
                          onChange={handleGenres}
                          name="drama"
                          color="primary"
                        />
                      }
                      label="Drama"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.family}
                          onChange={handleGenres}
                          name="family"
                          color="primary"
                        />
                      }
                      label="Family"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.fantasy}
                          onChange={handleGenres}
                          name="fantasy"
                          color="primary"
                        />
                      }
                      label="Fantasy"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.history}
                          onChange={handleGenres}
                          name="history"
                          color="primary"
                        />
                      }
                      label="History"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.horror}
                          onChange={handleGenres}
                          name="horror"
                          color="primary"
                        />
                      }
                      label="Horror"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.music}
                          onChange={handleGenres}
                          name="music"
                          color="primary"
                        />
                      }
                      label="Music"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.mystery}
                          onChange={handleGenres}
                          name="mystery"
                          color="primary"
                        />
                      }
                      label="Mystery"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.romance}
                          onChange={handleGenres}
                          name="romance"
                          color="primary"
                        />
                      }
                      label="Romance"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.science}
                          onChange={handleGenres}
                          name="science"
                          color="primary"
                        />
                      }
                      label="Science"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.tv}
                          onChange={handleGenres}
                          name="tv"
                          color="primary"
                        />
                      }
                      label="TV Movie"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.thriller}
                          onChange={handleGenres}
                          name="thriller"
                          color="primary"
                        />
                      }
                      label="Thriller"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.war}
                          onChange={handleGenres}
                          name="war"
                          color="primary"
                        />
                      }
                      label="War"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.western}
                          onChange={handleGenres}
                          name="western"
                          color="primary"
                        />
                      }
                      label="Western"
                    />
                  </FormGroup>
                </FormControl>

              </Grid>
            </Grid>

            <Typography variant='h5' style={{ paddingLeft: '3%' }} >
              <br />
              Similar movie recommendation preference
              <br />
              <br />
            </Typography>


            <Grid container spacing={3} justify='center'>
              <Grid item xs={7}>

                <FormControl component="fieldset">
                  <FormLabel component="legend">Recommended movies will be based on genre and/or director you choose</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.genre}
                          onChange={handleGenres}
                          name="genre"
                          color="primary"
                        />
                      }
                      label="Genre"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.director}
                          onChange={handleGenres}
                          name="director"
                          color="primary"
                        />
                      }
                      label="Director"
                    />
                    
                  </FormGroup>
                </FormControl>

              </Grid>
            </Grid>

          </TabPanel>


        </Grid>
      </Grid>
    </div>
  );
}
