import { Box, Divider, Grid, Link, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavBar from "../NavBar/NavBar";
import default_img from '../../image/No_picture_available.png'
import poster from '../../image/poster.jpeg'
export default function MovieDetail(props) {
  const apiKey = process.env.REACT_APP_KEY;
  const { id } = props.match.params;
  const [info, setInfo] = useState({});
  const [director,setDirector] = useState([])
  const [casts,setCasts] = useState([])
  const [hidden,setHidden] = useState(true)
  useEffect(() => {
    const getInfo = async () => {
      console.log(id);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      console.log(data);
      setInfo(data);
      const cre = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
      )
      const credits = await cre.json();
      let array_dir = []
      credits.crew.forEach(element => {
          if(element.job==='Director'){
              array_dir.push(element.name)
          }
      });
      setDirector(array_dir)
      setCasts(credits.cast)
      console.log(credits.cast)
    };
    getInfo();
  }, []);
  const changeDateFormate = (day) => {
    if (!day) {
      return " ";
    }
    let date = new Date(day.replace(/-/g, "/"));
    let DateArray = date.toUTCString().split(" ");
    return `${DateArray[1]} ${DateArray[2]}, ${DateArray[3]}`;
  };
  const isEmpty = (obj)=>{
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    //检验数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }
    //检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
  }
  return (
    <div>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item style={{ marginLeft: "3%" }}>
            
              <div style={{ width: "200px", backgroundColor: "aqua" }}></div>
              <div style={{ position: "fixed", top:'50px', paddingTop: "100px" }}>
                  
                <img
                  src={info.poster_path ? `http://image.tmdb.org/t/p/w185${info.poster_path}`:null}
                />
              </div>

            </Grid>
            
            <Grid item xs={8} alignItems="center" justify="center">
                <Grid container>
                
                <Grid item xs={12} alignItems="center" justify="center">
              <Typography variant="h3">
                {info.title}
                &nbsp;&nbsp;
                <FavoriteBorderIcon color="secondary" fontSize="large" />
              </Typography>
              <Typography>
                {info.status === "Released"
                  ? changeDateFormate(info.release_date)
                  : "UNRELEASED"}
              </Typography>
              <Divider />
              <Typography variant="h5">Movie Detail</Typography>
              <br/>
              <Typography align="justify">{info.overview}</Typography>
              <br/>
              </Grid>

              <Grid item xs={4} alignItems="center" justify="center">

              <Typography align="right">
                  {console.log(JSON.stringify(info.genres) ==='[]' )}
              {!isEmpty(director) ? (
                  <Typography>
                   <b style={{color:'gray'}}>Director : </b> 
                  </Typography>
                ) : null}
                {!isEmpty(info.genres)  ? (
                  <Typography>
                   <b style={{color:'gray'}}>Genres : </b> 
                    
                  </Typography>
                ) : null}
                 {!isEmpty(info.spoken_languages) ? (
                  <Typography>
                   <b style={{color:'gray'}}>Language : </b>
                   
                  </Typography>
                ) : null}
                {info.runtime ? (
                  <Typography>
                   <b style={{color:'gray'}}>Runtime : </b>  
                   
                  </Typography>
                ) : null}
                {!isEmpty(info.production_companies) ? (
                  <Typography>
                   <b style={{color:'gray'}}>Production Co : </b>
                 
                  </Typography>
                ) : null}
              </Typography>
                </Grid>
                <Grid item xs={8} alignItems="center" justify="center">

                <Typography align="left">
              {!isEmpty(director) ? (
                  <Typography>
                 
                    {director.toString()}
                  </Typography>
                ) : null}
                {!isEmpty(info.genres) ? (
                  <Typography>
                  
                    {info.genres.map((item, index) => (
                      index < info.genres.length - 1
                        ? ` ${item.name},`
                        :` ${item.name}`
                ))}
                  </Typography>
                ) : null}
                 {!isEmpty(info.spoken_languages)? (
                  <Typography>
                    {info.spoken_languages.map((item, index) => (
                      index < info.spoken_languages.length - 1
                        ? ` ${item.name}, `
                        :` ${item.name}`
                    ))}
                  </Typography>
                ) : null}
                {info.runtime ? (
                  <Typography>
                 
                    {info.runtime} min
                  </Typography>
                ) : null}
                {!isEmpty(info.production_companies)>0 ? (
                  <Typography>
                  
                    {info.production_companies.map((item, index) => (
                      index < info.production_companies.length - 1
                        ? ` ${item.name},`
                        :` ${item.name}`
                ))}
                  </Typography>
                ) : null}
              </Typography>
                </Grid>
             
            
             <Grid item xs={12} justify='center'>
                 <br/>
             <Divider/>
             <Typography variant='h5'>Casts</Typography>
             <Grid container >
                 {casts.map((item,index)=>(
                     <Grid item alignItems='center' justify='center' spacing={5}>
                     <Box key={index} width={120} marginRight={0.5} my={5}>
                         <img style={{width:'120px',hight:'150px'}} src={item.profile_path ? `http://image.tmdb.org/t/p/w185${item.profile_path}`:default_img}/>
                         <Typography  >
                            {item.name}
                        </Typography>
                        <Typography  variant='body2' color='textSecondary'>
                            {item.character}
                        </Typography>
                    </Box>
                    </Grid>
                         
                 )) .slice(0,hidden?7:casts.length)}
                
             </Grid>
             <Typography align='right' onClick={()=>{setHidden(!hidden)}}>
                   <Link> {hidden? 'Show All Casts':'Hidden'} </Link>
            </Typography>
             </Grid>
             </Grid>
            </Grid>
            <Grid item justify='center' alignItems='center'>
              <Typography variant="h3">{info.vote_average}</Typography>
            </Grid>
          </Grid>
        </Grid>
     
      </Grid>
    </div>
  );
}
