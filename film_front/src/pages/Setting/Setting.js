import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { FaUserCircle } from "react-icons/fa";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import NavBar from "../NavBar/NavBar";
import * as userAPI from "../../api/userAPI";
import * as blackAPI from "../../api/blackAPI";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
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
  console.log("decoded", decoded);
  const [alert, setAlert] = useState(false);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [userInfo, setUserInfo] = useState({
    Old_password: "",
    New_password: "",
    Confirm_New_Password: "",
  });
  const [oldError, setOld] = useState(false);
  const [newError, setNew] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = async (delId) => {
    const del_res = await blackAPI.delById(delId);
    const res = await blackAPI.getAll(decoded.id);
    setChipData(res);
  };

  const passwordChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [chipData, setChipData] = React.useState([]);

  const [dense, setDense] = React.useState(false);
  const [type, setType] = useState("g");
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

  const handleConfirm = async () => {
    console.log(decoded);
    const data = { name: decoded.name, password: userInfo.Old_password };
    const res = await userAPI.login(data);
    console.log("change", res);
    if (res == "Wrong password") {
      setOld(true);
    } else if (userInfo.New_password != userInfo.Confirm_New_Password) {
      setNew(true);
      setOld(false);
    } else {
      const up_date = {
        id: decoded.id,
        password: userInfo.New_password,
      };
      const update_res = await userAPI.update(up_date);
      console.log(update_res);
      if (update_res) {
        setUserInfo({
          Old_password: "",
          New_password: "",
          Confirm_New_Password: "",
        });
        setNew(false);
        setOld(false);
        setAlert(true);
      }
    }
  };
  const handleType = async (e) => {
    setType(e.target.value);
    const data = {
      id: decoded.id,
      genre:
        e.target.value == "g" ? true : e.target.value == "gd" ? true : false,
      director:
        e.target.value == "d" ? true : e.target.value == "gd" ? true : false,
    };
    const res = await userAPI.updateType(data);
    if (res) {
      const secreatInfo = jwt.encode(res, process.env.REACT_APP_TOKEN_SECRET);
      localStorage.setItem("userInfo", secreatInfo);
    }
  };

  useEffect(() => {
    const getBlack = async () => {
      const res = await blackAPI.getAll(decoded.id);
      setChipData(res);
      console.log(res);
    };
    getBlack();
    if (decoded.genre && decoded.director) {
      setType("gd");
    } else if (decoded.genre) {
      setType("g");
    } else {
      setType("d");
    }
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <NavBar
            handleClose={handleClose}
            open={open}
            handleClickOpen={handleClickOpen}
            SignupClose={SignupClose}
            SignupOpen={SignupOpen}
            handleSignupOpen={handleSignupOpen}
            rederLogout={rederLogout}
            history={props.history}
          />
        </Grid>

        <Grid item xs={2}>
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

        <Grid item xs={10}>
          <TabPanel value={value} index={0}>
            <Typography variant="h5" style={{ paddingLeft: "3%" }}>
              Change Password
              <br />
              <br />
            </Typography>

            <Grid container spacing={3} justify="center">
              <Grid item xs={5}>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    value={userInfo.Old_password}
                    label="Old Password"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    onChange={passwordChange}
                    name="Old_password"
                    type="password"
                    error={oldError}
                    helperText={oldError ? "wrong password" : null}
                  />
                </Typography>

                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    value={userInfo.New_password}
                    label="New Password"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    onChange={passwordChange}
                    name="New_password"
                    type="password"
                  />
                </Typography>

                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    value={userInfo.Confirm_New_Password}
                    label="Confirm New Password"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    onChange={passwordChange}
                    name="Confirm_New_Password"
                    type="password"
                    error={newError}
                    helperText={newError ? "different password" : null}
                  />
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
                <Collapse in={alert}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setAlert(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Update successful!
                  </Alert>
                </Collapse>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography variant="h5" style={{ paddingLeft: "3%" }}>
              Banlist management
              <br />
              <br />
            </Typography>

            <Grid container spacing={3} justify="center">
              <Grid item xs={5}>
                <List dense={dense}>
                  {chipData.map((data) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FaUserCircle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={data.banned_user.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(data.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography variant="h5" style={{ paddingLeft: "3%" }}>
              <br />
              Similar movie recommendation preference
              <br />
              <br />
            </Typography>

            <Grid container spacing={3} justify="center">
              <Grid item xs={7}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Recommended movies will be based on genre and/or director
                    you choose
                  </FormLabel>
                  <RadioGroup row value={type} onChange={handleType}>
                    <FormControlLabel
                      value="g"
                      control={<Radio />}
                      label="Genre"
                    />
                    <FormControlLabel
                      value="d"
                      control={<Radio />}
                      label="Director"
                    />
                    <FormControlLabel
                      value="gd"
                      control={<Radio />}
                      label="Genre and Director"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
