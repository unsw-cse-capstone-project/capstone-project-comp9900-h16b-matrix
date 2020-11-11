import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchBar from "./component/SearchBar";
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import { DialogTitle } from "@material-ui/core";
import Logindialog from "../Login & Sign up/Login";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import default_avatar from "../../image/images.jpeg"
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
const jwt = require("jwt-simple");
const NavBar = (props) => {
  const user = localStorage.getItem("userInfo")
  let decoded;
  if (user) {
    decoded = jwt.decode(user, process.env.REACT_APP_TOKEN_SECRET);
  } 
  const classes = useStyles();
  const [menu,setMenu] = useState(null)
  const {open,handleClose,handleClickOpen,SignupClose,SignupOpen,handleSignupOpen,rederLogout}=props
    const handleLogout = ()=>{
      setMenu(null)
      rederLogout()
      localStorage.removeItem("userInfo")
    }
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
          &nbsp;&nbsp;
          {decoded?<Button onClick={e=>setMenu(e.currentTarget)}> <Avatar  /></Button> :  <Button onClick={handleClickOpen} color="inherit">Login/Sign up</Button>}
        {decoded?  <Menu
        id="simple-menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={()=>setMenu(null)}
      >
        <MenuItem onClick={()=>setMenu(null)} component={Link} to = {'/Setting'}>Settings </MenuItem>
        <MenuItem onClick={()=>setMenu(null)} component={Link} to = {`/wish/${decoded.id}`}>Wish list</MenuItem>
        <MenuItem onClick={()=>handleLogout()}>Logout</MenuItem>

      </Menu>:null}

        </Toolbar>
      </AppBar>
      <Logindialog handleClose={handleClose} open={open} handleClickOpen={handleClickOpen} SignupClose={SignupClose} SignupOpen={SignupOpen} handleSignupOpen={handleSignupOpen}/>
    </div>
  );
};
export default NavBar;
