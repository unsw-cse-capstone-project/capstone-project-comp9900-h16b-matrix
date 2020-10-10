import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 300,
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
  
  const { barValue } = props;
  const [name, setName] = useState(barValue);
  console.log('bar',barValue)
  return (
    <Paper component="form" className={classes.search}>
      <InputBase
        className={classes.input}
        placeholder="Search Movie"
        inputProps={{ "aria-label": "search movie" }}
        onChange={(e) => {
          setName(e.target.value);
          console.log(name);
        }}
        defaultValue={barValue=='-1'?'':barValue}
       
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        component={Link}
        to={{ pathname: `/search/${name?name:-1}` }}
        //   onClick = {handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
