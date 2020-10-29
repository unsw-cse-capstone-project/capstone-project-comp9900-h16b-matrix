import React,{useState} from 'react';
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
import Grid from '@material-ui/core/Grid';
import { Link } from "@material-ui/core";
import Signupdialog from "../Login & Sign up/Signup";

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

export default function Logindialog(props) {
    const {open,handleClose,handleClickOpen}=props
    console.log(props,open)
    const classes = useStyles2();
    const classes3 = useStyles3();
    
    const [SignupOpen,SignupsetOpen]=useState(false)
    const handleSignupOpen = () => {
      SignupsetOpen(true);
      handleClose()
    };
    const SignupClose = () => {
      SignupsetOpen(false);
    };


 
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
            Send reset link to email
          </Typography>

          <Typography gutterBottom align='center'>
            <br/>
          </Typography>
          
          <Typography gutterBottom>
            <TextField id="outlined-basic" label="Email address" variant="outlined" fullWidth={true} size="small"/>
          </Typography>

          <Button variant="contained" color="primary" fullWidth={true} >
            Send
          </Button>

          <Divider variant="middle" />

          <Typography gutterBottom align='center'>
            <br/>
          </Typography>

          <Grid item xs={12}>
            <Link  onClick={()=>{handleClickOpen();SignupClose()}} color="primary" href="#" > Back to Login </Link>
          </Grid>

          </Grid>
          </Grid>

        </DialogContent>
        
      </Dialog>
    </div>
  );
}
