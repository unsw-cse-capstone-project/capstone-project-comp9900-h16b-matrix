import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Card from "components/Card/Card.js";

import poster from '../../../image/poster.jpeg'
import { Card, Grid } from "@material-ui/core";

export default function SectionCarousel(){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    
    <Carousel {...settings} style={{height:'500',width:'400'}}>
                <div>
                    <img src={poster} />
                    <p >Legend 1</p>
                </div>
                <div>
                    <img src={poster}  />
                    <p >Legend 2</p>
                </div>
                <div>
                    <img src={poster} />
                    <p >Legend 3</p>
                </div>
            </Carousel>

  );
}