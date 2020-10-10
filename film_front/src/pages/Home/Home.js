// import { Divider } from '@material-ui/core'
import React from 'react'
import NavBar from '../NavBar/NavBar'
import TopMovie from './components/TopMovie'
import Divider from '@material-ui/core/Divider'
import TrendMovie from './components/TrendMovie'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import SectionCarousel from './components/testTrend'
const Home = props =>{
    const {history}=props;
    console.log('home',props,history)
    return (
        <div>
            <Grid container spacing={3} justify='center'>
            <Grid item xs={12} >
            <NavBar />
            </Grid>
            <Grid item >
            <Divider/>
            <br/>
            {/* <div style={{left: '50%'}}> */}
            <Typography variant='h4' style={{paddingLeft: '3%'}} >
                Top Movie
            </Typography>
            {/* </div> */}
            <TrendMovie/>
            {/* <SectionCarousel/> */}
            </Grid>
            <Grid item  justify='center' alignItems='center'>
                <br/><br/>
            <Divider/>  
            <br/>
            <Typography variant='h4' style={{paddingLeft: '3%'}}>
                New/Upcomming Movie
            </Typography>
            <TopMovie history={history} />
            </Grid>
            <Grid item   justify='center'>
            <br/><br/>
            <Divider/>  
            <br/>
            <Typography variant='h4' style={{paddingLeft: '3%'}}>
                Recommendation
            </Typography>
            <TopMovie  history={history}/>
            </Grid>
            </Grid>
        </div>
    )
}
export default Home