import React,{useState} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button, Grid, IconButton, Typography,Link } from '@material-ui/core';
import { AiOutlineLike,AiOutlineDislike,AiFillLike,AiFillDislike } from "react-icons/ai";
import * as Empty from "../../../component/Empty"
import * as  moment from 'moment'
export default function CommentArea(props) {
    const {sended,handleRemove,decoded}=props
    console.log(sended)
    return(
        <div>
            {decoded?sended.map((comments,index)=>(
        <Grid container>
            <Grid item xs={12} alignItems='center'>
                <Grid container alignItems='center' >
                    <Grid item xs={8}>
                <Typography>
                    {console.log(comments)}
                    {decoded.name}  &nbsp;&nbsp;
                    <Typography variant="p" style={{color:'gray'}}>{moment().format("DD-MM-YY, hh:mm:ss")} </Typography>
                </Typography>
                </Grid>
                <Grid item xs={4}>
                    <IconButton>
                    <AiOutlineLike/>
                    </IconButton>
                    <IconButton>
                    <AiOutlineDislike/>
                    </IconButton>
                    
                </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-end">
                    <Grid item xs={11}>
                    <Typography>
                    {comments.comment}
                </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-end">
                    <Grid item xs={2}>
                    <Link id={index} onClick={()=>handleRemove(index) } component="button" >Remove</Link>
                    </Grid>
                </Grid>
            </Grid>
        
        </Grid>
       
            )):null}
        </div>
    )
}