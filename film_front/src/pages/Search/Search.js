import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SearchList from "./component/SearchList";

export default function Search(props) {
  const { history } = props;
  // const { query } = props.location;
  const { search,type } = props.match.params;
  const [name, setName] = useState(search);

  console.log("search", name, search, props);
  console.log(history);
  const [open, setOpen] = useState(false);
  const [SignupOpen, SignupsetOpen] = useState(false);
  const [logout,setLogout] = useState(false)
  const rederLogout = ()=>setLogout(!logout)
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
  useEffect(() => {
    setName(search);
  }, [search]);
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12}>
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

        <Grid item xs={10}>
          {console.log(name)}
          <br />
          <br />
          {/* <Grid container justify="center"> */}
            <SearchList queryValue={name} type={type} />
          {/* </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}
