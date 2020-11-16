import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import RecentMoive from "./components/RecentMovie";
import Divider from "@material-ui/core/Divider";
import TrendMovie from "./components/TrendMovie";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const Home = (props) => {
  const { history } = props;
  console.log("home", props, history);
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
  return (
    <div>
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
            history = {props.history}
          />
        </Grid>
        <Grid item xs={11}>
          <Divider />
          <br />
          {/* <div style={{left: '50%'}}> */}
          <Typography variant="h4" style={{ paddingLeft: "3%" }}>
            Popular Movie
          </Typography>
          {/* </div> */}
          <TrendMovie history={history} />
          {/* <SectionCarousel/> */}
        </Grid>
        <Grid item xs={10}>
          <br />
          <br />
          <Divider />
          <br />
          <Typography variant="h4" style={{ paddingLeft: "3%" }}>
            New Movie
          </Typography>
          <RecentMoive history={history} type={0} />
        </Grid>
        <Grid item xs={10}>
          <br />
          <br />
          <Divider />
          <br />
          <Typography variant="h4" style={{ paddingLeft: "3%" }}>
            Top Rated Movie
          </Typography>
          <RecentMoive history={history} type={1} />
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
