import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Grid from '@material-ui/core/Grid';
import { Link } from "@material-ui/core";
import Signupdialog from "../Login & Sign up/Signup";
import * as userAPI from "../../api/userAPI"
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

// 文本框
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// 第三方登录 带有icons的按钮
const useStyles2 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
}));


// 栅格
const useStyles3 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const jwt = require("jwt-simple");
export default function Logindialog(props) {
  const { open, handleClose, handleClickOpen, SignupClose, SignupOpen, handleSignupOpen } = props
  console.log(props, open)
  const classes = useStyles2();
  const classes3 = useStyles3();

  const [userInfo, setUserInfo] = useState({
    'name': "",
    'password': ""
  })
  const userLogin = async () => {
    const data = { 'name': userInfo.name, 'password': userInfo.password }
    const res = await userAPI.login(data)
    console.log(res)
    if (res) {
      const secreatInfo = jwt.encode(res, process.env.REACT_APP_TOKEN_SECRET)
      localStorage.setItem("userInfo", secreatInfo)
      handleClose()
    }

  }

  const handleChange = (e) => {
    setUserInfo(
      {
        ...userInfo,
        [e.target.name]: e.target.value
      }
    )
  }
  return (
    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Login
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} justify='center'>
            <Grid item xs={8}>
              <Typography variant="h5" gutterBottom align='center'>
                Login to your account
          </Typography>

              <Typography gutterBottom align='center'>
                <br />
              </Typography>


              <Typography gutterBottom>
                <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth={true} size="small" onChange={handleChange} name="name" />
              </Typography>

              <Typography gutterBottom>
                <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} size="small" onChange={handleChange} name="password" type="password" />
              </Typography>

              <Button variant="contained" color="primary" fullWidth={true} onClick={userLogin} >
                Confirm
          </Button>


              <Typography gutterBottom align='center'>
                <br />Or
          </Typography>

              <Button variant="contained" style={{ background: '#FFFFFF' }} className={classes.button} startIcon={<FcGoogle />} fullWidth={true} >
                Login with Google account
          </Button>

              <Button variant="contained" style={{ background: '#FFFFFF' }} className={classes.button} startIcon={<FaFacebook color='#4267B2' />} fullWidth={true} >
                Login with Facebook account
          </Button>

              <Button variant="contained" style={{ background: '#FFFFFF' }} className={classes.button} startIcon={<FaApple color='#555555' />} fullWidth={true}>
                Login with Apple account
          </Button>

              <Typography gutterBottom align='center'>
                <br />
              </Typography>

              <Divider variant="middle" />

              <Typography gutterBottom align='center'>
                <br />
              </Typography>

              <Typography align='center'>
                <Grid container spacing={3} justify='center'>
                  <Grid item xs={6}>
                    <Link color="primary" href="#" > Forgot password </Link>
                  </Grid>

                  <Grid item xs={6}>
                    <Link onClick={handleSignupOpen} color="primary" href="#" > Sign up </Link>
                  </Grid>

                  <Typography gutterBottom align='center'>
                    <br />
                  </Typography>

                </Grid>
              </Typography>
            </Grid>
          </Grid>

        </DialogContent>

      </Dialog>
      <Signupdialog SignupClose={SignupClose} SignupOpen={SignupOpen} handleClickOpen={handleClickOpen} />
    </div>
  );
}
