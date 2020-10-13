import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchBar from "./component/SearchBar";

import { Link } from "react-router-dom";
import { DialogTitle } from "@material-ui/core";
import Logindialog from "../Login & Sign up/Login";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search:{
    
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
      
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  title: {
    flexGrow: 1,
  },
}));
const NavBar = (props) => {
  const classes = useStyles();
    const {history,barValue} = props
    const [open,setOpen]=useState(false)
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div className={classes.root} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to = {'/home'}
          >
            FilmFinder
          </IconButton>
          <Typography variant="h6" className={classes.title} />

         <SearchBar />
          
          
          <Button onClick={handleClickOpen} color="inherit">Login/Sign up</Button>

        </Toolbar>
      </AppBar>
      <Logindialog handleClose={handleClose} open={open} handleClickOpen={handleClickOpen}/>
    </div>
  );
};
export default NavBar;
