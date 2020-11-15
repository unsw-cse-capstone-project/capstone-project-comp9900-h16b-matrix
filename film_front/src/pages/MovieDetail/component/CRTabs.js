import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Typography} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Comment from './Comment';
import Review from './Review';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
const TabPanel=(props)=>{
    const { children, value, index, ...other } = props;
    return(
        <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
    )
}
export default function CRTabs(props) {
  const classes = useStyles();
  const {decoded,handleClickOpen,movieId,logout} = props
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Paper className={classes.root}>
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Comments" />
        <Tab label="Reviews" />
        
      </Tabs>
      <TabPanel value={value} index={0}>
      
      <Comment  movieId={movieId} decoded={decoded} handleClickOpen={handleClickOpen}/>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <Review movieId={movieId} decoded={decoded} handleClickOpen={handleClickOpen}/>
    </TabPanel>
    </div>
    // </Paper>
  );
}