import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";
import { Grid, Select } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root:{width: 400,},
  type: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 120,
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,

  },
}));
export default function SearchBar(props) {
  const classes = useStyles();
  const { history } = props;
  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  console.log("bar", history);
  const handleChange = (e)=>{
    setType(e.target.value)
  }
  return (
    <Paper component="form" className={classes.search}>
    <Select
      native 
      value={type}
      onChange={handleChange}
    >
      <option value={1}>Title</option>
      <option value={2}>Description</option>
    </Select>
      <InputBase
        className={classes.input}
        placeholder="Search Movie"
        inputProps={{ "aria-label": "search movie" }}
        onChange={(e) => {
          setName(e.target.value);
          console.log(name);
        }}
        onKeyDown = {(e)=>{
          if(e.nativeEvent.keyCode === 13) {
            history.push({pathname: `/search/${name ? name : -1}` })
           }
        }}
      />
     
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        component={Link}
        to={{ pathname: `/search/${name ? name : -1}` }}
        
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
