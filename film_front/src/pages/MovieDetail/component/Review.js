import { Button } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
export default function Review(props){
    const {decoded,handleClickOpen,movieId} = props
    return(
        <div>
            {decoded?<Button
             size="large"
             color="primary"
             component={Link}
             to={{ pathname: `/editReview/${movieId}` }}>
                 Edit Review
            </Button>:
            <Button
            size="large"
            color="primary"
            onClick={handleClickOpen}>
                Edit Review
           </Button>
            }
            
            Review
        </div>
    )
}