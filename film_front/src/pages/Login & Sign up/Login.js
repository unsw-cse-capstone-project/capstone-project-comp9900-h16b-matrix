import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Link } from "@material-ui/core";
import Signupdialog from "../Login & Sign up/Signup";
import * as userAPI from "../../api/userAPI";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const jwt = require("jwt-simple");
export default function Logindialog(props) {
  const {
    open,
    handleClose,
    handleClickOpen,
    SignupClose,
    SignupOpen,
    handleSignupOpen,
  } = props;
  console.log(props, open);
  const [loginerror, setLoginerror] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
  });
  const userLogin = async () => {
    const data = { name: userInfo.name, password: userInfo.password };
    const res = await userAPI.login(data);
    console.log(res, typeof res);
    if (res == "Wrong password") {
      console.log(res);
      setLoginerror(true);
    } else if (res) {
      const secreatInfo = jwt.encode(res, process.env.REACT_APP_TOKEN_SECRET);
      localStorage.setItem("userInfo", secreatInfo);
      setLoginerror(false);
      handleClose();
    }
  };
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Login
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} justify="center">
            <Grid item xs={8}>
              <Typography variant="h5" gutterBottom align="center">
                Login to your account
              </Typography>

              <Typography gutterBottom align="center">
                <br />
              </Typography>

              <Typography gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  fullWidth={true}
                  size="small"
                  onChange={handleChange}
                  name="name"
                  error={loginerror}
                  helperText={loginerror ? "Incorrect entry." : null}
                />
              </Typography>

              <Typography gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  fullWidth={true}
                  size="small"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  error={loginerror}
                  helperText={loginerror ? "Incorrect entry." : null}
                />
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={userLogin}
              >
                Confirm
              </Button>

              <Divider variant="middle" />

              <Typography gutterBottom align="center">
                <br />
              </Typography>

              <Typography align="center">
                <Grid container spacing={3} justify="center">
                  <Grid item xs={6}>
                    <Link onClick={handleSignupOpen} color="primary" href="#">
                      {" "}
                      Sign up{" "}
                    </Link>
                  </Grid>

                  <Typography gutterBottom align="center">
                    <br />
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Signupdialog
        SignupClose={SignupClose}
        SignupOpen={SignupOpen}
        handleClickOpen={handleClickOpen}
      />
    </div>
  );
}
