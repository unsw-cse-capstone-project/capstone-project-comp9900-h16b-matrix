import React, { useState } from 'react';
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

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [userInfo, setUserInfo] = useState({
    'Old password': "",
    'New password': "",
    'Confirm New Password': ""
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
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

  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Anna' },
    { key: 1, label: 'Becky' },
    { key: 2, label: 'Charlie' },
    { key: 3, label: 'Denny' },
    { key: 4, label: 'Flora' },
  ]);

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
                  <TextField id="outlined-basic" label="Old Password" variant="outlined" fullWidth={true} size="small" onChange={passwordChange} name="password" type="password" />
                </Typography>

                <Typography gutterBottom>
                  <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth={true} size="small" onChange={passwordChange} name="password" type="password" />
                </Typography>

                <Typography gutterBottom>
                  <TextField id="outlined-basic" label="Confirm New Password" variant="outlined" fullWidth={true} size="small" onChange={passwordChange} name="password" type="password" />
                </Typography>

                <Button variant="contained" color="primary" fullWidth={true}>
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
                        primary={data.label}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={handleDelete(data)}>
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
        </Grid>
      </Grid>
    </div>
  );
}
