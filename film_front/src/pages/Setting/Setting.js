import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { FaUserCircle } from "react-icons/fa";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = () => {
     console.info('You clicked the delete icon.');
  };
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };



  

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Change password" {...a11yProps(0)} />
        <Tab label="Banlist management" {...a11yProps(1)} />
        
      </Tabs>

      <Grid container spacing={3} justify='center'>
        <Grid item xs={5}>
          <TabPanel value={value} index={0}>

            <Typography variant='h5' style={{paddingLeft: '3%'}} >
              Change Password
            </Typography>

            <Grid container spacing={3} justify='center'>
            <Grid item xs={12}>
              <Typography gutterBottom>
                <TextField id="outlined-basic" label="Old Password" variant="outlined" fullWidth={true} size="small" onChange={handleChange} name="password" type="password"/>
              </Typography>

              <Typography gutterBottom>
                <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth={true} size="small" onChange={handleChange} name="password" type="password"/>
              </Typography>

              <Typography gutterBottom>
                <TextField id="outlined-basic" label="Confirm New Password" variant="outlined" fullWidth={true} size="small" onChange={handleChange} name="password" type="password"/>
              </Typography>

              <Button variant="contained" color="primary" fullWidth={true}>
                Confirm
              </Button>
            
            </Grid>
            </Grid>
           </TabPanel>

          
          <TabPanel value={value} index={1}>
             <Grid container spacing={3} justify='center'>
               <Grid item xs={12}>

                  <Typography variant='h5' style={{paddingLeft: '3%'}} >
                    Banlist management
                  </Typography>
                  
                  <Chip
                  icon={<FaUserCircle />}
                  label="Anna"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  />
                  <Divider />

                  <Chip
                  icon={<FaUserCircle />}
                  label="Becky"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  />
                  <Divider />

                  <Chip
                  icon={<FaUserCircle />}
                  label="Charlie"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  />
                  <Divider />

                  <Chip
                  icon={<FaUserCircle />}
                  label="Denny"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  />
                  <Divider />

                  <Chip
                  icon={<FaUserCircle />}
                  label="Flora"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  />
               </Grid>
             </Grid>
           </TabPanel>
          
         </Grid>
       </Grid>

    </div>
  );
}
