import React,{useEffect,useState} from 'react'
import * as RLikeAPI from "../../api/reviewLikeAPI"
import * as reviewAPI from "../../api/reviewAPI";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { IconButton, Typography } from '@material-ui/core';
const jwt = require("jwt-simple");
export default function ReviewDetail(props){
    let decoded;
    const token = localStorage.getItem("userInfo");
    if (token) {
      decoded = jwt.decode(token, process.env.REACT_APP_TOKEN_SECRET);
    }
    const {poster,movieId} = props.match.params
    const [value,setValue] =  useState({})
    const [like,setLike] = useState(0)
    const [rid,setRid] = useState(0)
    useEffect(()=>{
        const getReview = async () => {
            const res = await reviewAPI.getByUidMid(poster, movieId);
            console.log(res)
            setValue(res)
        }
       
        getReview()
    },[poster,movieId])
    useEffect(()=>{
        const getLike = async()=>{
            const res = await RLikeAPI.getByID(poster,value.id)
             console.log(res)
             if(res){
                 setRid(res.id)
                 if(res.jud){
                     setLike(1)
                 }
                 else{
                     setLike(-1)
                 }
             }
        }
        if(value){
            getLike()
        }
    },[value])
    const handleLike = async()=>{
        if(decoded){
            if(like==0){
                setLike(1)
                const data = {
                    uid:decoded.id,
                    review_id:value.id,
                    judgement:true
                }
                const res = await RLikeAPI.likeorunlike(data)
                console.log(res)
                setRid(res.id)
            }
            else{
                setLike(0)
                const res = await RLikeAPI.cancellikeorunlike(rid)
            }
        }
       
    }
    const handleUnLike = async()=>{
        if(decoded){
            if(like==0){
                setLike(-1)
                const data = {
                    uid:decoded.id,
                    review_id:value.id,
                    judgement:false
                }
                const res = await RLikeAPI.likeorunlike(data)
                console.log(res)
                setRid(res.id)
            }
            else{
                setLike(0)
                const res = await RLikeAPI.cancellikeorunlike(rid)
            }
        }
    }
    return(
        <div>
            <Typography>
            {value.title}
            </Typography>
            <Typography align="right" color='textSecondary' variant='body2'>
            {value.likes}
            <IconButton onClick={handleLike}>
                {like==1?<AiFillLike/>:<AiOutlineLike/>}
            </IconButton>
            {value.unLikes}
            <IconButton onClick={handleUnLike}>
               {like==-1?<AiFillDislike />: <AiOutlineDislike/>}
            </IconButton>
            </Typography>
            
            {value.content}
        </div>
    )
}