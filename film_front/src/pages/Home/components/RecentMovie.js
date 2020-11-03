import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';
import poster from '../../../image/poster.jpeg'
import default_img from '../../../image/No_picture_available.png'
import Tooltip from '@material-ui/core/Tooltip';
const Media = props=>{
    // const { loading = false } = props;
    const { history,type } = props;
    const apiKey = process.env.REACT_APP_KEY;
    const [newMovie,setNew] = useState([])
    useEffect(() => {
      const getMovie = async () => {
        console.log(apiKey,type);
        if(type==0){
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing/?api_key=${apiKey}`
          )
          const data = await res.json();
          console.log(data);
          setNew(data.results);
        }
        else if(type==1){
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
          )
          const data = await res.json();
          console.log(data);
          setNew(data.results);
        }
         
        }
      
        getMovie();
    }, []);
    console.log('media',history)
    const handleDetail=(id)=>{
        console.log('click',id)
        history.push({
            pathname: `/movieDetail/${id}`,
            // state: data
          });
    }
  return (
    <Grid container wrap="nowrap" lignItems='center' justify='center'>
      {newMovie.map((item, index) => (
        <Grid item alignItems='center' justify='center' spacing={1}>
        <Box key={index} width={150} marginRight={0.5} my={5}>
          {item ? (
            <img style={{ width: 140, height: 200 }} alt={item.title} src={item.poster_path?`http://image.tmdb.org/t/p/w185${item.poster_path}`:default_img} onClick={()=>handleDetail(item.id)}/>
          ) : (
            <Skeleton variant="rect" width={210} height={118} />
          )}

          {item ? (
            <Box pr={2} onClick={()=>handleDetail(item.id)}>
              <Tooltip title={item.title}>
              <Typography  noWrap={true} >
                  {item.title}
              </Typography>
              </Tooltip>
             
              <Typography display="block" variant="caption" color="textSecondary">
                Rating: {(item.vote_average/2).toFixed(1)}
                <Rating name="read-only" value={(item.vote_average/2).toFixed(1)} readOnly precision={0.5} />
              </Typography>
              {/* <Typography variant="caption" color="textSecondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography> */}
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
        </Grid>
      )).slice(0,6)}
    </Grid>
  );
}  

Media.propTypes = { 
    loading: PropTypes.bool,
  };
  
const  TopMovie = (props)=> {
    const {history,type} = props
    return (
      <Box overflow="hidden">
        {/* <Media loading /> */}
        <Media history={history} type={type} />
      </Box>
    );
  }
  export default TopMovie