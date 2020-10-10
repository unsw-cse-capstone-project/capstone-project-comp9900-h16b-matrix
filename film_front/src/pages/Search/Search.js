import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import SearchList from "./component/SearchList";

export default function Search(props) {
  const { history } = props;
  // const { query } = props.location;
  const { search } = props.match.params;
  const [name, setName] = useState(search);

  console.log("search", name, search, props);
  console.log(history);
  useEffect(() => {
    setName(search);
  }, [search]);
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12}>
          <NavBar barValue={name} />
        </Grid>

        <Grid item xs={12}>
          {console.log(name)}
          <br />
          <br />
          <Grid container justify="center">
            <SearchList queryValue={name} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
